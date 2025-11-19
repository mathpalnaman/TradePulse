"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-glow-gradient opacity-20 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-crypto-card border border-crypto-border p-8 rounded-2xl shadow-2xl z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Welcome Back</h2>
        <p className="text-center text-crypto-muted mb-8">Enter your credentials to access the dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-crypto-muted mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-crypto-muted w-5 h-5" />
              <input
                type="email"
                required
                className="w-full bg-crypto-bg border border-crypto-border text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-crypto-primary focus:ring-1 focus:ring-crypto-primary transition-all"
                placeholder="trader@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-crypto-muted mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-crypto-muted w-5 h-5" />
              <input
                type="password"
                required
                className="w-full bg-crypto-bg border border-crypto-border text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-crypto-primary focus:ring-1 focus:ring-crypto-primary transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-crypto-primary text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors"
          >
            ACCESS TERMINAL
          </button>
        </form>

        <p className="text-center mt-6 text-crypto-muted text-sm">
          Don`&apos`t have an account?{" "}
          <Link href="/signup" className="text-crypto-primary hover:underline">
            Initialize here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}