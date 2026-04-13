"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Play } from "lucide-react";

const galleryItems = [
  { id: 1, type: "Food", src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80", title: "Smoked Wagyu" },
  { id: 2, type: "Ambiance", src: "https://images.unsplash.com/photo-1550966841-3ee5ad443564?auto=format&fit=crop&q=80", title: "Garden Dining" },
  { id: 3, type: "Events", src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80", title: "Grand Wedding Decor" },
  { id: 4, type: "Food", src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80", title: "Artisan Pizza" },
  { id: 5, type: "Ambiance", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80", title: "Interior Elegance" },
  { id: 6, type: "Events", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80", title: "Corporate Gala" },
  { id: 7, type: "Food", src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80", title: "Signature Dessert" },
  { id: 8, type: "Ambiance", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80", title: "Evening Glow" },
  { id: 9, type: "Events", src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80", title: "Private Party" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.type === filter);

  return (
    <main className="min-h-screen bg-cream selection:bg-orange selection:text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-navy text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <Camera className="text-orange mx-auto mb-6" size={40} />
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Visual Story</h1>
          <p className="text-white/50 font-sans tracking-[0.2em] uppercase text-xs">Capturing the heart of Rocky Restaurant</p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white sticky top-20 z-10 shadow-sm">
        <div className="flex justify-center gap-4 md:gap-8 overflow-x-auto px-4 no-scrollbar">
          {["All", "Food", "Ambiance", "Events"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                filter === tab 
                  ? "bg-navy text-white shadow-xl scale-105" 
                  : "bg-navy/5 text-navy/40 hover:bg-navy/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative cursor-zoom-in aspect-square rounded-3xl overflow-hidden shadow-xl"
                >
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                     <span className="text-orange font-bold uppercase tracking-tighter text-[10px] mb-1">{item.type}</span>
                     <h3 className="text-white text-xl font-serif">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-5xl w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-navy/90 to-transparent">
                 <h2 className="text-white text-4xl font-serif mb-2">{selectedImage.title}</h2>
                 <p className="text-orange uppercase tracking-widest text-xs font-bold">{selectedImage.type}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
