"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Utensils, Award, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const stats = [
    { icon: <Users className="text-orange" />, label: "Happy Guests", value: "50k+" },
    { icon: <Utensils className="text-orange" />, label: "Signature Dishes", value: "120+" },
    { icon: <Award className="text-orange" />, label: "Culinary Awards", value: "15+" },
    { icon: <Heart className="text-orange" />, label: "Years of Passion", value: "25+" },
  ];

  return (
    <main className="min-h-screen bg-cream selection:bg-orange selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" 
            alt="Chef Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/50 to-cream" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange font-signature text-3xl mb-4"
          >
            A Legacy of Taste
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-6xl md:text-8xl font-serif mb-6"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* The Narrative Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              style={{ y: y1 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80" 
                alt="Chef Plating" 
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-navy/10 hover:bg-transparent transition-colors duration-500" />
            </motion.div>

            <div className="space-y-8">
              <div className="inline-block p-2 bg-orange/10 rounded-lg">
                 <span className="text-orange font-bold uppercase tracking-widest text-xs">Since 1998</span>
              </div>
              <h2 className="text-5xl font-serif text-navy leading-tight">
                Crafting Memories, <br />
                <span className="text-orange italic">One Plate at a Time.</span>
              </h2>
              <div className="space-y-6 text-navy/70 leading-relaxed font-sans">
                <p>
                  Rocky Restaurant began as a small family kitchen in the heart of Coimbatore. Our founder, Chef Rocky, dreamed of a place where traditional South Indian spices could meet modern culinary artistry.
                </p>
                <p>
                  Today, we are proud to be the city's premier dining destination, where every ingredient is sourced from local farms and every recipe tells a story of passion, heritage, and excellence.
                </p>
                <p className="font-serif italic text-navy text-lg">
                  "Food is not just sustenance; it is the language of love we speak at Rocky's." 
                  <br />
                  <span className="text-sm font-sans font-bold not-italic">— Chef Rocky</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto ring-1 ring-orange/30">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-orange">{stat.value}</h3>
                  <p className="text-white/50 uppercase tracking-widest text-[10px] font-bold">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif text-navy mb-4">Meet the Visionaries</h2>
            <div className="w-24 h-1 bg-orange mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { name: "Chef Rocky", role: "Executive Chef", img: "https://images.unsplash.com/photo-1583394242235-9cd4338e55c0?auto=format&fit=crop&q=80" },
               { name: "Elena Sophia", role: "Pastry Queen", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80" },
               { name: "Marcus Thorne", role: "Sommelier", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" }
             ].map((member, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -10 }}
                 className="group relative"
               >
                 <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 shadow-xl">
                   <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                 </div>
                 <h3 className="text-xl font-bold text-navy">{member.name}</h3>
                 <p className="text-orange text-sm uppercase tracking-widest font-bold">{member.role}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
