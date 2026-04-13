"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Search, ChevronRight } from "lucide-react";
import Image from "next/image";

export function RoyaltyHeader({ userName }: { userName: string }) {
  const initials = userName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'JF';

  return (
    <div className="relative pt-6 pb-8">
      {/* Search and Location bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-navy/80 hover:text-navy group cursor-pointer transition-colors">
          <MapPin size={18} className="text-orange" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-navy/50">Your location</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">Coimbatore, RS Puram</span>
              <ChevronRight size={14} className="text-navy/40 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-navy/5 flex items-center justify-center hover:bg-navy/5 transition-colors">
            <Search size={18} className="text-navy/70" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
            <div className="w-full h-full bg-orange flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Card - Glassmorphic */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card rounded-[2rem] p-6 lg:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-6"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
            <Image 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" 
              alt={userName || "Member"} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-orange to-red-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
            <Star size={16} fill="white" />
          </div>
        </div>

        <div className="relative z-10 flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-navy mb-1 tracking-tight">{userName || "Jane Foster"}</h1>
          <p className="text-navy/50 font-sans text-xs tracking-widest uppercase font-bold mb-6">Platinum Executive Member</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-1.5 text-orange mb-1">
                <Star size={16} fill="currentColor" />
                <span className="text-xl font-bold text-navy">280</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Points Balance</span>
            </div>
            
            <div className="w-px h-10 bg-navy/10 hidden md:block" />

            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl font-bold text-navy mb-1">12</div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Reservations</span>
            </div>

            <div className="w-px h-10 bg-navy/10 hidden md:block" />

            <div className="flex flex-col items-center md:items-start">
              <div className="text-xl font-bold text-navy mb-1">45</div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Saved Dishes</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
