"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, LogOut, Plus, Search, 
  Trash2, TrendingUp, TrendingDown, Filter, X 
} from "lucide-react";

export default function Dashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  // State
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All"); // All, Long, Short
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    pair: "",
    type: "Long",
    entryPrice: "",
    amount: "",
    status: "Open"
  });

  const API_URL = "http://localhost:5000/api/trades";

  // Protect Route & Fetch Data
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const fetchTrades = async () => {
      try {
        const res = await axios.get(API_URL);
        setTrades(res.data);
      } catch (error) {
        if (error.response?.status !== 401) {
          toast.error("Failed to fetch market data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, [authLoading, user, router]);

  // Creating Trade
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, formData);
      setTrades([res.data, ...trades]); // Add new trade to top
      toast.success("Trade Executed");
      setShowModal(false);
      setFormData({ pair: "", type: "Long", entryPrice: "", amount: "", status: "Open" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Execution failed");
    }
  };

  // Deleting Trade
  const handleDelete = async (id) => {
    if (!confirm("Confirm trade deletion?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTrades(trades.filter((t) => t._id !== id));
      toast.success("Trade Record Expunged");
    } catch (error) {
      toast.error("Deletion failed");
    }
  };

  // Search & Filter Logic
  const filteredTrades = trades.filter((trade) => {
    const matchesSearch = trade.pair.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || trade.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (authLoading || loading) return <div className="min-h-screen bg-crypto-bg flex items-center justify-center text-crypto-primary animate-pulse">INITIALIZING TERMINAL...</div>;

  return (
    <div className="min-h-screen bg-crypto-bg text-crypto-text">
      {/* === TOP NAVIGATION === */}
      <nav className="border-b border-crypto-border bg-crypto-card/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="text-crypto-primary" />
              <span className="font-bold text-xl tracking-tight">TRADE<span className="text-crypto-primary">PULSE</span></span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-white">{user?.name}</p>
                <p className="text-xs text-crypto-muted">{user?.email}</p>
              </div>
              <button 
                onClick={logout}
                className="p-2 hover:bg-crypto-border rounded-full transition-colors text-crypto-danger"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* === MAIN CONTENT === */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          
          {/* Search & Filter */}
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 text-crypto-muted w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search Pair (e.g. BTC)..."
                className="w-full bg-crypto-card border border-crypto-border rounded-lg py-2 pl-10 pr-4 focus:border-crypto-primary outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-crypto-muted w-4 h-4" />
              <select 
                className="bg-crypto-card border border-crypto-border rounded-lg py-2 pl-10 pr-8 focus:border-crypto-primary outline-none text-sm appearance-none cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Sides</option>
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </select>
            </div>
          </div>

          {/* Add Button */}
          <button 
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-crypto-primary text-black font-bold px-6 py-2 rounded-lg hover:bg-green-400 transition-all shadow-[0_0_15px_rgba(0,229,153,0.3)]"
          >
            <Plus size={18} /> Log Trade
          </button>
        </div>

        {/* Trades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredTrades.map((trade) => (
              <motion.div 
                key={trade._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-crypto-card border border-crypto-border rounded-xl p-6 hover:border-crypto-accent transition-colors group relative overflow-hidden"
              >
                {/* Card Glow */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${trade.type === 'Long' ? 'from-crypto-primary/10' : 'from-crypto-danger/10'} to-transparent rounded-bl-full pointer-events-none`}></div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{trade.pair}</h3>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full mt-1 ${
                      trade.type === 'Long' ? 'bg-green-900/30 text-crypto-primary' : 'bg-red-900/30 text-crypto-danger'
                    }`}>
                      {trade.type === 'Long' ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                      {trade.type.toUpperCase()}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDelete(trade._id)}
                    className="text-crypto-muted hover:text-crypto-danger transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-crypto-muted">Entry Price</span>
                    <span className="text-white font-mono">${trade.entryPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-crypto-muted">Position Size</span>
                    <span className="text-white font-mono">${trade.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-crypto-muted">Status</span>
                    <span className={`font-bold ${trade.status === 'Open' ? 'text-blue-400' : 'text-gray-500'}`}>
                      {trade.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTrades.length === 0 && (
          <div className="text-center py-20 text-crypto-muted">
            <p>No market data found matching your query.</p>
          </div>
        )}
      </main>

      {/* === MODAL === */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-crypto-card border border-crypto-border w-full max-w-md rounded-2xl p-6 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-crypto-muted hover:text-white"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6">Log New Position</h2>
              
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-xs text-crypto-muted uppercase font-bold">Asset Pair</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ETH/USDT" 
                    required
                    className="w-full bg-crypto-bg border border-crypto-border rounded-lg p-3 text-white focus:border-crypto-primary outline-none mt-1"
                    value={formData.pair}
                    onChange={(e) => setFormData({...formData, pair: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-crypto-muted uppercase font-bold">Side</label>
                    <select 
                      className="w-full bg-crypto-bg border border-crypto-border rounded-lg p-3 text-white focus:border-crypto-primary outline-none mt-1"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="Long">Long (Buy)</option>
                      <option value="Short">Short (Sell)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-crypto-muted uppercase font-bold">Status</label>
                    <select 
                      className="w-full bg-crypto-bg border border-crypto-border rounded-lg p-3 text-white focus:border-crypto-primary outline-none mt-1"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-crypto-muted uppercase font-bold">Entry ($)</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      required
                      className="w-full bg-crypto-bg border border-crypto-border rounded-lg p-3 text-white focus:border-crypto-primary outline-none mt-1"
                      value={formData.entryPrice}
                      onChange={(e) => setFormData({...formData, entryPrice: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-crypto-muted uppercase font-bold">Size ($)</label>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      required
                      className="w-full bg-crypto-bg border border-crypto-border rounded-lg p-3 text-white focus:border-crypto-primary outline-none mt-1"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-crypto-primary text-black font-bold py-4 rounded-lg mt-4 hover:bg-green-400 transition-colors"
                >
                  EXECUTE TRADE
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}