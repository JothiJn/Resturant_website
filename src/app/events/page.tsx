"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Users, MapPin, MessageSquare, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { createEventInquiry } from "@/app/actions/events";

export default function EventsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    guestCount: "",
    eventDate: "",
    services: [] as string[],
    additionalDetails: ""
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Full Catering", "Venue Rental", "Bar Service", "Floral Design", "Live Music", "Photography"
  ];

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    // Instead of parsing from form, let's inject state into FormData to ensure we get all data.
    const submitData = new FormData(e.currentTarget);
    
    // Add dynamically toggled services
    submitData.delete('services');
    formData.services.forEach(s => submitData.append('services', s));
    
    // Use `createEventInquiry`
    const result = await createEventInquiry(submitData);

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#f4f3ed] pt-40 px-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl text-center border border-navy/5"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-navy uppercase tracking-tighter mb-4">Inquiry Received</h2>
          <p className="text-navy/60 font-sans mb-8">
            Thank you, {formData.name}. Our event planning signature team will reach out within 24 hours to discuss your {formData.eventType} details.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/dashboard">
              <button className="w-full py-4 bg-navy text-white font-bold uppercase tracking-widest text-xs hover:bg-[#1a1a2e] transition-all">
                Go To Dashboard
              </button>
            </Link>
            <Link href="/">
              <button className="w-full py-4 border border-navy/10 text-navy font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
                Return Home
              </button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#f4f3ed] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Signature Celebrations
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-navy"
          >
            PLAN YOUR<br/>EVENT
          </motion.h1>
        </header>

        {error && (
          <div className="max-w-5xl mx-auto mb-8 bg-red-50 text-red-600 p-4 border border-red-100 flex items-center gap-3 font-sans text-sm rounded-xl">
            <AlertTriangle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl border border-navy/5">
          {/* Contact Details */}
          <div className="space-y-8">
             <h3 className="text-xl font-bold uppercase tracking-widest text-navy flex items-center gap-3">
               <Users size={20} className="text-orange" /> Personal Info
             </h3>
             
             <div className="space-y-6">
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-textured/20 border-b border-navy/10 py-4 px-4 focus:outline-none focus:border-navy transition-all font-sans"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-textured/20 border-b border-navy/10 py-4 px-4 focus:outline-none focus:border-navy transition-all font-sans"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input 
                  required
                  name="phone"
                  type="tel" 
                  placeholder="Phone Number"
                  className="w-full bg-textured/20 border-b border-navy/10 py-4 px-4 focus:outline-none focus:border-navy transition-all font-sans"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
             </div>
          </div>

          {/* Event Details */}
          <div className="space-y-8">
             <h3 className="text-xl font-bold uppercase tracking-widest text-navy flex items-center gap-3">
               <Calendar size={20} className="text-orange" /> Event Specs
             </h3>
             
             <div className="space-y-6">
                <select 
                  name="event_type"
                  className="w-full bg-textured/20 border-b border-navy/10 py-4 px-4 focus:outline-none focus:border-navy transition-all font-sans appearance-none"
                  onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                >
                  <option>Wedding</option>
                  <option>Corporate Gala</option>
                  <option>Birthday Party</option>
                  <option>Private Dining</option>
                  <option>Product Launch</option>
                </select>
                <div className="flex gap-4">
                  <input 
                    required
                    name="date"
                    type="date" 
                    className="flex-1 bg-textured/20 border-b border-navy/10 py-4 px-4 focus:outline-none focus:border-navy transition-all font-sans"
                    onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                  />
                  <input 
                    required
                    name="guests"
                    type="number" 
                    placeholder="Pax"
                    className="w-32 bg-textured/20 border-b border-navy/10 py-4 px-4 focus:outline-none focus:border-navy transition-all font-sans"
                    onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                  />
                </div>
             </div>
          </div>

          {/* Services Selection */}
          <div className="md:col-span-2 space-y-8">
             <h3 className="text-xl font-bold uppercase tracking-widest text-navy flex items-center gap-3">
               <MapPin size={20} className="text-orange" /> Requested Services
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {services.map(service => (
                  <button 
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`py-4 px-6 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                      formData.services.includes(service) 
                        ? 'bg-navy text-white border-navy shadow-lg' 
                        : 'bg-white text-navy/40 border-navy/10 hover:border-navy/30'
                    }`}
                  >
                    {service}
                  </button>
                ))}
             </div>
          </div>

          <div className="md:col-span-2 space-y-8">
             <h3 className="text-xl font-bold uppercase tracking-widest text-navy flex items-center gap-3">
               <MessageSquare size={20} className="text-orange" /> Additional Details
             </h3>
             <textarea 
               name="details"
               placeholder="Tell us more about your vision (theme, menu preferences, special requests)..."
               rows={4}
               className="w-full bg-textured/20 border-b border-navy/10 py-4 px-4 focus:outline-none focus:border-navy transition-all font-sans resize-none"
               onChange={(e) => setFormData({...formData, additionalDetails: e.target.value})}
             />
          </div>

          <div className="md:col-span-2 pt-8">
             <button 
               type="submit"
               disabled={isSubmitting}
               className="w-full py-6 bg-navy text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-[#1a1a2e] transition-all shadow-2xl disabled:opacity-50"
             >
               {isSubmitting ? "Submitting..." : "Submit Event Inquiry"}
             </button>
          </div>
        </form>
      </div>
    </main>
  );
}
