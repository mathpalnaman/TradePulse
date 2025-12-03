"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-glow-gradient opacity-40 pointer-events-none"></div>

      <div className="z-10 text-center max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold tracking-tighter mb-6">
            TRADE<span className="text-crypto-primary">PULSE</span>
            {/* <span className="text-crypto-accent">.AI</span> */}
          </h1>
          <p className="text-xl text-crypto-muted mb-10 leading-relaxed">
            The advanced trading journal for the decentralized era. <br />
            Log trades. Analyze patterns. <span className="text-white">Dominate the market.</span>
          </p>

          <div className="flex gap-6 justify-center">
            <Link href="/login">
              <button className="px-8 py-4 bg-crypto-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,229,153,0.4)] transition-all transform hover:-translate-y-1">
                Initialize Terminal
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-8 py-4 border border-crypto-border text-crypto-text font-medium rounded-lg hover:border-crypto-primary hover:text-white transition-all">
                Create Account
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left"
        >
          <div className="p-6 border border-crypto-border bg-crypto-card/50 backdrop-blur-sm rounded-xl">
            <TrendingUp className="text-crypto-primary mb-4" />
            <h3 className="text-lg font-bold text-white">Profit Tracking</h3>
            <p className="text-sm text-crypto-muted">Real-time PnL analysis with advanced charting integrations.</p>
          </div>
          <div className="p-6 border border-crypto-border bg-crypto-card/50 backdrop-blur-sm rounded-xl">
            <ShieldCheck className="text-crypto-accent mb-4" />
            <h3 className="text-lg font-bold text-white">Bank-Grade Security</h3>
            <p className="text-sm text-crypto-muted">JWT Authentication and bcrypt encryption for your data.</p>
          </div>
          <div className="p-6 border border-crypto-border bg-crypto-card/50 backdrop-blur-sm rounded-xl">
            <Zap className="text-yellow-400 mb-4" />
            <h3 className="text-lg font-bold text-white">Lightning Fast</h3>
            <p className="text-sm text-crypto-muted">Optimized Node.js backend with MongoDB indexing.</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}