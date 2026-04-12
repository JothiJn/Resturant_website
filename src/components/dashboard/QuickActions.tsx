"use client";

import { motion } from "framer-motion";
import { Package, Grid } from "lucide-react";

export function QuickActions() {
  return (
    <aside className="md:col-span-4 space-y-6">
      <h3 className="text-xl font-bold font-serif text-navy">Quick Actions</h3>
      
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-navy p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
          <Grid size={24} className="text-orange" />
        </div>
        <h4 className="text-lg font-bold mb-1">Menu & Order</h4>
        <p className="text-xs text-white/50">Explore our exclusive dishes</p>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-6 rounded-3xl relative overflow-hidden group cursor-pointer"
      >
        <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mb-4">
          <Package size={24} className="text-navy" />
        </div>
        <h4 className="text-lg font-bold text-navy mb-1">Past Orders</h4>
        <p className="text-xs text-navy/50">View receipts & reorder</p>
      </motion.div>
    </aside>
  );
}
