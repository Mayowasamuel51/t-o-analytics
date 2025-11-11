import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export default function StockDashboard() {
  const [stocks, setStocks] = useState([
    { symbol: "AAPL", name: "Apple Inc.", price: 228.92, change: +1.34 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 256.81, change: -2.11 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 164.73, change: +0.84 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 180.25, change: +2.65 },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 121.45, change: -1.02 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 433.78, change: +3.14 },
  ]);

  // Fake price fluctuation every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          const delta = (Math.random() - 0.5) * 2; // random small change
          const newPrice = Math.max(1, s.price + delta);
          const change = parseFloat((newPrice - s.price).toFixed(2));
          return { ...s, price: parseFloat(newPrice.toFixed(2)), change };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            {/* 📈 Stock & Options Dashboard */}
          </h1>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Track live stock market changes and visualize trends just like
            Splunk dashboards — fast, sleek, and interactive.
          </p>
        </motion.div>

        {/* Stock Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((s, i) => (
            <motion.div
              key={s.symbol}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700 hover:border-green-400/40 shadow-md"
            >
              {/* Price & Symbol */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-white">
                  {s.symbol}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    s.change >= 0
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {s.change >= 0 ? "↑ Gain" : "↓ Loss"}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-2">{s.name}</p>

              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">
                  ${s.price.toFixed(2)}
                </p>
                {s.change >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-400" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-400" />
                )}
              </div>

              {/* Animated Change */}
              <motion.p
                key={s.change}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-sm mt-2 ${
                  s.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {s.change >= 0 ? "+" : ""}
                {s.change.toFixed(2)} today
              </motion.p>

              {/* Subtle Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Want to learn how to trade these movements?
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold flex items-center gap-2 mx-auto hover:shadow-lg hover:scale-[1.03] transition">
            Explore Trading Strategies
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
