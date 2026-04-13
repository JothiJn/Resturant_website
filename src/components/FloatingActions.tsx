"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, MessageSquare, X } from "lucide-react";
import { useState } from "react";

export function FloatingActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const toggleChat = () => {
    if (!isChatOpen) setHasUnread(false);
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-end gap-4">
        
        {/* AI Chat Window Placeholder */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-navy/10 mb-2"
            >
              <div className="bg-navy p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center">
                    <MessageSquare size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest">Rocky AI</h4>
                    <span className="text-white/50 text-[10px]">Online</span>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/70 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              
              <div className="h-[300px] p-4 bg-textured/30 flex flex-col justify-end">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm text-sm text-navy max-w-[80%] mb-4">
                  Hello! I'm Rocky's AI assistant. Do you have any questions about our menu or want to book a table?
                </div>
                <div className="flex gap-2">
                   <input 
                     type="text" 
                     placeholder="Type your message..."
                     className="flex-1 bg-white border border-navy/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-navy"
                   />
                   <button className="bg-orange text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange/90 transition-colors">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <MessageSquare size={14} />
                      </motion.div>
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* WhatsApp Support */}
          <motion.a 
            href="https://wa.me/914221234567"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="w-14 h-14 bg-[#25D366] rounded-full shadow-xl flex items-center justify-center text-white"
          >
            <MessageCircle size={28} />
          </motion.a>

          {/* AI Chat Trigger */}
          <motion.button 
            onClick={toggleChat}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="w-14 h-14 bg-navy rounded-full shadow-xl flex items-center justify-center text-white relative"
          >
            {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
            {hasUnread && !isChatOpen && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full border-2 border-white" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
