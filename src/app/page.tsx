"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  Users,
  Utensils,
  Award,
  Heart,
  Instagram,
  ArrowRight,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Quote
} from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    day: "",
    hour: "",
    specialRequests: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!formData.name) newErrors.name = "This field is required.";
    if (!formData.email) newErrors.email = "This field is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address.";
    if (!formData.phone) newErrors.phone = "This field is required.";
    if (!formData.persons) newErrors.persons = "This field is required.";
    if (!formData.day) newErrors.day = "This field is required.";
    if (!formData.hour) newErrors.hour = "This field is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('guests', formData.persons);
      data.append('date', formData.day);
      data.append('time', formData.hour);
      data.append('notes', formData.specialRequests);

      try {
        const { createReservation } = await import("./actions/reservations");
        const result = await createReservation(data);
        
        if (result.success) {
          setIsSubmitted(true);
          const reservationSection = document.getElementById('reservation');
          if (reservationSection) reservationSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          setErrors({ form: result.error || "Failed to make reservation." });
        }
      } catch (err) {
        setErrors({ form: "An unexpected error occurred." });
      }
    }
  };

  // Parallax transforms for scattered ingredients
  const tomatoY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const herbY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const spiceY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="w-full bg-[#f4f3ed]">

      {/* 1. HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden px-6 md:px-24 py-20 bg-[#f4f3ed]">
        {/* Parallax Background Ingredients */}
        <motion.img
          style={{ y: tomatoY }}
          src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400"
          className="absolute top-20 left-[10%] w-32 md:w-48 opacity-20 pointer-events-none z-10"
          alt="Scattered Tomato"
        />
        <motion.img
          style={{ y: herbY }}
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400"
          className="absolute bottom-20 right-[15%] w-24 md:w-40 opacity-20 pointer-events-none z-10"
          alt="Scattered Herb"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-20 text-center flex flex-col items-center"
        >
          <motion.p
            style={{ fontFamily: "var(--font-script)" }}
            className="text-5xl md:text-8xl text-brown mb-2"
          >
            Welcome to our
          </motion.p>
          <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter text-navy uppercase leading-[0.8]">
            ROCKY
            <span className="block text-4xl md:text-6xl tracking-[0.4em] mt-8 font-sans">Restaurant</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 mt-12 justify-center">
            <Link href="#reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-navy text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#1a1a2e] transition-all shadow-xl"
              >
                Book A Table
              </motion.button>
            </Link>
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-navy text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#1a1a2e] transition-all shadow-xl"
              >
                Catering & Events
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <div id="about" className="w-full flex flex-col bg-white">
        {/* From the Chef's Heart - Agency Grade Storytelling */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1577214495770-9602e128cc1e?auto=format&fit=crop&q=80"
                    alt="Chef Rocky"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-navy p-8 rounded-2xl shadow-2xl text-white hidden md:block">
                  <p className="font-signature text-3xl text-orange mb-1">Chef Rocky</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Founder & Executive Chef</p>
                </div>
              </motion.div>

              <div className="space-y-8">
                <Quote className="text-orange/20" size={60} />
                <h2 className="text-5xl font-serif text-navy leading-tight">
                  Where Tradition <br />
                  <span className="text-orange italic">Meets Artistry.</span>
                </h2>
                <p className="text-navy/70 leading-relaxed text-lg">
                  At Rocky Restaurant, we don't just serve meals; we serve heritage. Every spice is ground by hand, every vegetable is picked from local farms at dawn, and every plate is a canvas for our culinary passion.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-xl hover:bg-navy/90 transition-all uppercase text-[10px] font-bold tracking-widest group"
                >
                  Read Our Story
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Visual Grid - Social Proof */}
        <section className="py-24 bg-cream overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Instagram className="text-orange mx-auto mb-4" size={32} />
              <h2 className="text-4xl font-serif text-navy mb-4">Recent Moments</h2>
              <p className="text-navy/50 text-xs font-sans uppercase tracking-[0.2em]">Follow @RockyRestaurant on Instagram</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-2xl overflow-hidden group relative"
                >
                  <img src={img} alt="Social Feed" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="text-white" size={24} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Row */}
        <section className="w-full flex flex-col lg:flex-row min-h-screen">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 p-16 md:p-32 flex flex-col justify-center"
          >
            <span className="text-orange font-bold tracking-[0.3em] uppercase text-xs mb-4">Our Story</span>
            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-widest text-navy mb-12 leading-none">
              ABOUT<br/>US
            </h2>
            <p className="text-navy/70 leading-relaxed font-sans text-lg lg:text-xl max-w-xl">
              At Rocky Restaurant, we blend the warmth of rustic tradition with the elegance of modern luxury. Our kitchen is a canvas where fresh, locally-sourced ingredients meet world-class culinary techniques to create an unforgettable dining experience.
            </p>
          </motion.div>
          
          {/* Right Visuals */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center p-8 bg-orange/5">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1.2 }}
               className="relative z-10 w-full aspect-square max-w-lg"
             >
               <div className="absolute inset-0 bg-orange z-0 translate-x-12 translate-y-12 rounded-2xl opacity-20" />
               <img 
                  src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800" 
                  alt="Interior" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10"
               />
               <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -left-10 w-40 h-40 border-2 border-orange border-dashed rounded-full z-20 flex items-center justify-center p-4 bg-white shadow-xl"
               >
                  <img src="https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&q=80&w=200" alt="Freshness" className="w-full h-full object-cover rounded-full" />
               </motion.div>
             </motion.div>
          </div>
        </section>
      </div>

      {/* 3. MENU SHOWCASE SECTION */}
      <section id="menu" className="w-full py-24 bg-navy text-[#f4f3ed]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
             >
                <span className="text-orange font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Signature Dishes</span>
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                  OUR MENU
                </h2>
             </motion.div>
             <Link href="/menu" className="mt-8 md:mt-0 px-10 py-4 border border-[#f4f3ed]/20 hover:bg-[#f4f3ed] hover:text-navy transition-all duration-500 font-bold uppercase tracking-widest text-xs">
                View Full Menu
             </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
             {/* Left Column: Image with "Revealing" animation */}
             <motion.div 
               initial={{ clipPath: "inset(0 100% 0 0)" }}
               whileInView={{ clipPath: "inset(0 0% 0 0)" }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="relative aspect-[4/5] overflow-hidden"
             >
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover" 
                  alt="Menu Item 1" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10">
                   <h3 className="text-3xl font-bold uppercase tracking-widest">Dining Menu</h3>
                </div>
             </motion.div>

             {/* Right Column: Featured Item Details */}
             <div className="flex flex-col justify-center space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="border-b border-[#f4f3ed]/10 pb-12"
                >
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="text-2xl font-bold uppercase tracking-widest">Lamb Chops</h4>
                      <span className="text-orange text-xl font-bold">₹1,200</span>
                   </div>
                   <p className="text-white/60 text-lg italic mb-6">lamb chops, sauce, arugula, cherry tomato, almonds</p>
                   <Link href="/menu" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-orange transition-colors">Order Now —</Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="text-2xl font-bold uppercase tracking-widest">Sea Bass</h4>
                      <span className="text-orange text-xl font-bold">₹950</span>
                   </div>
                   <p className="text-white/60 text-lg italic mb-6">grilled sea bass, lemon butter, herb reduction, seasonal greens</p>
                   <Link href="/menu" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-orange transition-colors">Order Now —</Link>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. HISTORY SECTION */}
      <section id="history" className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20 grayscale"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80')`,
            scale: useTransform(scrollYProgress, [0.5, 1], [1.1, 1.2])
          }}
        />
        <div className="absolute inset-0 bg-brown/10 z-10" />

        <div className="max-w-5xl w-full text-center px-6 relative z-20">
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             style={{ fontFamily: "var(--font-script)" }} 
             className="text-5xl text-brown mb-4"
          >
            Since 1995
          </motion.p>
          <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="text-6xl md:text-9xl font-bold uppercase tracking-tight text-navy mb-20 leading-none"
          >
            OUR HISTORY
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 text-left gap-12 pt-16 border-t border-navy/10">
            <div className="md:col-span-1">
              <h3 className="text-navy font-bold uppercase tracking-[0.3em] text-xs">
                How It All Started
              </h3>
            </div>
            <div className="md:col-span-2">
              <p className="text-navy/80 text-xl lg:text-2xl font-serif italic leading-relaxed mb-12">
                "Our story goes back over 25 years ago, when the first ember was lit in our rustic kitchen. We believed then as we do now: that food is the universal language of hospitality."
              </p>
              <button className="px-12 py-5 bg-brown text-white font-bold tracking-widest uppercase text-xs hover:bg-brown-hover transition-all duration-300 shadow-xl hover:shadow-2xl">
                Our Full History
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CATERING & EVENTS SECTION */}
      <section id="events" className="w-full py-32 bg-textured/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1 }}
             className="relative z-10"
           >
              <span className="text-orange font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Occasions</span>
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-navy mb-8">
                CATERING<br/>& EVENTS
              </h2>
              <p className="text-navy/70 text-lg lg:text-xl font-sans mb-12 max-w-lg">
                From intimate private dinners to grand corporate gatherings, Rocky Restaurant brings the art of fine dining to your most precious moments.
              </p>
              
              <div className="space-y-6 mb-12">
                 {[
                   { title: "Weddings & Galas", desc: "Exquisite multi-course menus for your special day." },
                   { title: "Corporate Events", desc: "Professional catering and private spaces for business." },
                   { title: "Private Dining", desc: "Intimate chef-led experiences in our exclusive lounge." }
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.2 }}
                     className="flex gap-4 items-start"
                   >
                     <div className="w-2 h-2 rounded-full bg-orange mt-2" />
                     <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm text-navy">{item.title}</h4>
                        <p className="text-navy/60 text-sm mt-1">{item.desc}</p>
                     </div>
                   </motion.div>
                 ))}
              </div>

              <Link href="/events">
                <button className="px-12 py-5 bg-navy text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#1a1a2e] transition-all shadow-xl">
                   Plan Your Event
                </button>
              </Link>
           </motion.div>

           <div className="relative aspect-[4/5] lg:aspect-square">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="w-full h-full relative z-10 overflow-hidden rounded-3xl shadow-2xl"
              >
                 <img 
                   src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" 
                   className="w-full h-full object-cover" 
                   alt="Events & Catering" 
                 />
                 <div className="absolute inset-0 bg-navy/20" />
              </motion.div>
              {/* Decorative script overlay */}
              <motion.div 
                style={{ y: useTransform(scrollYProgress, [0.6, 1], [50, -50]) }}
                className="absolute -bottom-10 -right-10 z-20 hidden md:block"
              >
                 <span style={{ fontFamily: "var(--font-script)" }} className="text-8xl text-orange/30 whitespace-nowrap">
                   The Perfect Celebration
                 </span>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 6. REVIEWS SECTION */}
      <section id="reviews" className="w-full py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-navy mb-4">Guest Reviews</h2>
            <div className="flex justify-center gap-1 text-orange">
               {[...Array(5)].map((_, i) => (
                 <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John Doe", text: "The best lamb chops I've ever had. Truly a premium experience!", rating: 5 },
              { name: "Sarah Smith", text: "Ambiance is incredible, and the staff is so attentive. Highly recommended.", rating: 5 },
              { name: "Michael Chen", text: "Every visit to Rocky is a delight. The Sea Bass was cooked to perfection.", rating: 5 }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-textured p-8 rounded-2xl border border-navy/5 shadow-sm"
              >
                <p className="text-navy/70 italic mb-6 font-serif">"{review.text}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-navy/20" />
                   <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest">{review.name}</h4>
                      <p className="text-[10px] text-navy/50">Google Review</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RESERVATIONS SECTION */}
      <section id="reservation" className="relative min-h-screen py-32 flex items-center justify-center bg-white px-6">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f4f3ed] z-0 hidden lg:block" />
        
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2"
          >
            <p style={{ fontFamily: "var(--font-script)" }} className="text-4xl text-brown mb-2">
              Reservations
            </p>
            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-navy mb-12 leading-none">
              BOOK A<br/>TABLE
            </h2>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover" 
                  alt="Reservation" 
                />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-[#f4f3ed] p-12 rounded-3xl shadow-xl text-center border border-navy/5"
               >
                 <div className="w-16 h-16 bg-navy/5 text-navy rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-navy uppercase tracking-widest mb-4 text-center">Table Reserved!</h3>
                 <p className="text-navy/60 font-sans mb-10 text-center">
                   We've received your request, {formData.name}. You can track your booking status in your dashboard.
                 </p>
                 <div className="flex flex-col gap-4">
                   <Link href="/dashboard" className="w-full py-4 bg-navy text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#1a1a2e] transition-all">
                     Go To Dashboard
                   </Link>
                   <button 
                     onClick={() => setIsSubmitted(false)}
                     className="w-full py-4 border border-navy/10 text-navy font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all"
                   >
                     Book Another Table
                   </button>
                 </div>
               </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-8 max-w-lg">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-navy/50">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full bg-white border-b ${errors.name ? 'border-red-500' : 'border-navy/10'} py-4 px-2 focus:outline-none focus:border-navy transition-all font-sans text-lg`} 
                  />
                  {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-navy/50">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full bg-white border-b ${errors.email ? 'border-red-500' : 'border-navy/10'} py-4 px-2 focus:outline-none focus:border-navy transition-all font-sans text-lg`} 
                  />
                  {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-1">{errors.email}</p>}
                </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-navy/50">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    placeholder="+91"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full bg-white border-b ${errors.phone ? 'border-red-500' : 'border-navy/10'} py-4 px-2 focus:outline-none focus:border-navy transition-all font-sans text-lg`} 
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-navy/50">Guests <span className="text-red-500">*</span></label>
                  <input 
                    type="number" min="1"
                    placeholder="PAX"
                    value={formData.persons}
                    onChange={(e) => setFormData({...formData, persons: e.target.value})}
                    className={`w-full bg-white border-b ${errors.persons ? 'border-red-500' : 'border-navy/10'} py-4 px-2 focus:outline-none focus:border-navy transition-all font-sans text-lg`} 
                  />
                  {errors.persons && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-1">{errors.persons}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-navy/50">Date <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    value={formData.day}
                    onChange={(e) => setFormData({...formData, day: e.target.value})}
                    className={`w-full bg-white border-b ${errors.day ? 'border-red-500' : 'border-navy/10'} py-4 px-2 focus:outline-none focus:border-navy transition-all font-sans text-lg`} 
                  />
                  {errors.day && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-1">{errors.day}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-navy/50">Time <span className="text-red-500">*</span></label>
                  <input 
                    type="time" 
                    value={formData.hour}
                    onChange={(e) => setFormData({...formData, hour: e.target.value})}
                    className={`w-full bg-white border-b ${errors.hour ? 'border-red-500' : 'border-navy/10'} py-4 px-2 focus:outline-none focus:border-navy transition-all font-sans text-lg`} 
                  />
                  </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-navy/50">Special Requests <span className="text-navy/30 lowercase italic tracking-normal">(optional)</span></label>
                <textarea 
                  placeholder="Tell us about any allergies or special occasions..."
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  className="w-full bg-white border-b border-navy/10 py-4 px-2 focus:outline-none focus:border-navy transition-all font-sans text-lg resize-none" 
                />
              </div>

              <div className="pt-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="w-full py-6 bg-navy text-white font-bold tracking-[0.3em] uppercase text-xs hover:bg-[#1a1a2e] transition-all shadow-2xl"
                >
                  Confirm Reservation
                </motion.button>
              </div>
            </form>
            )}
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
