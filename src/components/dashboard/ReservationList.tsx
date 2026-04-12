"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Trash2, Calendar, Undo } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { cancelReservation } from "@/app/actions/reservations";

type ReservationStatus = "Upcoming" | "Completed" | "Canceled" | "Confirmed";

export function ReservationList({ initialReservations = [] }: { initialReservations?: any[] }) {
  // Use Confirmed as equivalent to Upcoming in our DB
  const [activeTab, setActiveTab] = useState<ReservationStatus | string>("Confirmed");
  // Map our DB reservations to something similar to our UI shape if needed,
  // or just use them directly. Let's adapt the initial data to match shape
  const adaptedReservations = initialReservations.map(r => ({
    id: r.id,
    date: r.date ? r.date.split('-')[2] : "00",
    day: new Date(r.date || "").toLocaleDateString('en-US', { weekday: 'short' }),
    month: new Date(r.date || "").toLocaleDateString('en-US', { month: 'short' }),
    title: `Reservation for ${r.guests} guests`,
    time: r.time,
    reservationId: r.id.substring(0, 8).toUpperCase(),
    tableNo: "TBD", // From backend
    seats: r.guests,
    location: "Main Dining",
    specialRequests: r.notes ? [r.notes] : [],
    status: r.status,
    fullDate: new Date(r.date || "").toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    barcode: `||| | ||| ${r.id.substring(0,6)} || |`
  }));

  const [reservations, setReservations] = useState<Array<Record<string, any>>>(adaptedReservations);
  const [toast, setToast] = useState<{ id: string, message: string } | null>(null);

  const handleCancel = async (id: string, reservationTitle?: string) => {
    const backup = [...reservations];
    
    // Optimistic UI Update
    setReservations(prev => prev.map((r) => r.id === id ? { ...r, status: "Canceled" } : r));
    
    setToast({ id, message: `Reservation successfully cancelled!` });

    // Auto-hide toast after 5s
    setTimeout(() => {
      setToast(null);
    }, 5000);

    try {
      const result = await cancelReservation(id);
      if (result.error) {
        throw new Error(result.error);
      }
    } catch (e) {
      console.error("Failed to cancel server-side, reverting", e);
      setReservations(backup);
      setToast({ id, message: `Failed to cancel. Try again.` });
    }
  };

  const handleUndo = (id: string) => {
    // Since cancel is already requested on server, we won't fully implement undo on server side yet.
    setReservations(prev => prev.map((r) => r.id === id ? { ...r, status: "Confirmed" } : r));
    setToast(null);
  };

  // Status mapping: Active tabs vs DB matching  
  const filteredReservations = reservations.filter(r => r.status === activeTab);

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold font-serif text-navy tracking-tight">Reservations</h2>
        <button className="w-8 h-8 rounded-full border border-navy/10 flex items-center justify-center hover:bg-navy/5 transition-colors">
          <div className="flex flex-col gap-1 w-3">
            <span className="w-full h-[2px] bg-navy/70 rounded-full"></span>
            <span className="w-2/3 h-[2px] bg-navy/70 rounded-full"></span>
            <span className="w-full h-[2px] bg-navy/70 rounded-full"></span>
          </div>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white/50 backdrop-blur-md rounded-full p-1 mb-8 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] border border-white">
        {(["Confirmed", "Completed", "Canceled"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative z-10",
              activeTab === tab ? "text-white" : "text-navy/50 hover:text-navy/70"
            )}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-navy rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab} {tab === "Completed" && <span className="text-orange">*</span>}
          </button>
        ))}
      </div>

      {/* Dynamic Date Header for Upcoming */}
      {activeTab === "Confirmed" && (
        <div className="mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[14, 15, 16, 17, 18].map((date, i) => (
              <div 
                key={date} 
                className={cn(
                  "flex flex-col items-center justify-center w-16 h-20 rounded-2xl shrink-0 transition-all cursor-pointer",
                  i === 0 ? "bg-gradient-to-b from-orange to-red-500 text-white shadow-lg shadow-orange/30" : "bg-white text-navy border border-navy/5 hover:border-orange/30"
                )}
              >
                <span className="text-2xl font-bold tracking-tighter">{date}{i === 0 && <span className="text-[10px] align-top">*</span>}</span>
                <span className={cn("text-[10px] uppercase font-bold tracking-widest", i === 0 ? "text-white/80" : "text-navy/40")}>
                  {['Wed','Thu','Fri','Sat','Sun'][i]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm font-bold text-navy mt-2">Starts in 2h 32min</p>
        </div>
      )}

      {/* Reservation List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredReservations.map((res, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              key={res.id}
              className="bg-white rounded-3xl p-5 border border-navy/5 shadow-sm relative overflow-hidden group"
            >
              <div className="flex gap-4">
                <div className="shrink-0 text-navy/20">
                   <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center">
                     <span className="font-serif text-xl font-bold text-navy">{res.date}</span>
                   </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy truncate pr-8">{res.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-navy/50 mt-1 mb-3">
                    <span>Reservation ID: <span className="font-bold">{res.reservationId}</span></span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {res.time}</span>
                  </div>

                  {/* Primary card gets extra details like the barcode and table info */}
                  {i === 0 && activeTab === "Confirmed" && (
                    <div className="bg-[#f4f3ed]/50 rounded-2xl p-4 border border-navy/5 mb-2">
                       <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-1 text-sm font-bold text-navy">
                             Table No.{res.tableNo} 
                             <span className="flex items-center text-navy/50 text-xs ml-1"><Users size={12} className="mr-0.5"/> {res.seats}</span>
                          </div>
                          <span className="text-xs text-navy/50 font-semibold">{res.location}</span>
                       </div>
                       <p className="text-[10px] text-navy/40 uppercase font-bold tracking-widest mb-2">Special requests:</p>
                       <div className="flex gap-2">
                         {Array.isArray(res.specialRequests) && res.specialRequests.map((req:string, i:number) => (
                           <span key={i} className="px-2.5 py-1 bg-white border border-navy/10 rounded-lg text-[10px] font-bold text-navy flex items-center gap-1 shadow-sm">
                             {req === 'Transfer' && <span className="w-3 h-3 bg-navy/10 rounded-full flex items-center justify-center">🚗</span>}
                             {req === 'Wine' && <span className="w-3 h-3 bg-red-100 rounded-full flex items-center justify-center">🍷</span>}
                             {req}
                           </span>
                         ))}
                       </div>
                    </div>
                  )}

                  {i === 0 && activeTab === "Confirmed" && (
                     <div className="mt-4 opacity-50 tracking-[0.2em] font-mono text-xl overflow-hidden truncate">
                       {res.barcode}
                     </div>
                  )}
                </div>
              </div>

              {/* Swipe to Delete Action (Simulated with a hover/click absolute layer for now since we don't have full touch gesture handlers implemented complexly, but we can make it a lovely animated button) */}
              {activeTab === "Confirmed" && (
                <div className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCancel(res.id, res.title)}
                      className="w-10 h-10 bg-red-500 rounded-full text-white shadow-lg flex items-center justify-center translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
             <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <Calendar size={24} className="text-navy/30" />
             </div>
             <h3 className="text-navy font-bold">No {activeTab.toLowerCase()} reservations</h3>
             <p className="text-navy/50 text-sm mt-1">When you book a table, it will appear here.</p>
          </div>
        )}
      </div>

      {/* Floating Snackbar for Undo Action */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-[#1a4a38] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between z-50 border border-[#2a6a52]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                 <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
              <div>
                 <p className="text-sm font-bold">{toast.message}</p>
                 <p className="text-[10px] text-white/60">We have updated the notification for booking cancellation.</p>
              </div>
            </div>
            <button 
              onClick={() => handleUndo(toast.id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors"
            >
              <Undo size={14} />
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
