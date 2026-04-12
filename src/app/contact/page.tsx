"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Clock, Phone, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

type EnquiryType = "General" | "Catering" | "Private Dining";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "",
    date: "",
    details: ""
  });
  const [enquiryType, setEnquiryType] = useState<EnquiryType>("General");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('event_type', enquiryType);
    
    // Provide default values for required database fields if they are missing (e.g. for "General" enquiry)
    const guestsValue = formData.guests || "1";
    const dateValue = formData.date || new Date().toISOString().split('T')[0];
    
    data.append('guests', guestsValue);
    data.append('date', dateValue);
    data.append('details', formData.details);

    try {
      const { createEventInquiry } = await import("../actions/events");
      const result = await createEventInquiry(data);
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", email: "", guests: "", date: "", details: "" });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Submission failed.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 bg-cream min-h-screen">
      
      {/* Header */}
      <section className="bg-midnight text-cream py-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-gold mb-6">Get in Touch</h1>
        <p className="text-lg font-sans max-w-2xl mx-auto text-cream/80">
          We're here to arrange your perfect evening, discuss bespoke catering, or simply say hello.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info & Map */}
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-serif text-midnight mb-8 border-b border-midnight/10 pb-4">Visit Us</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="text-crimson mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-midnight tracking-wider uppercase text-sm mb-1">Address</h3>
                  <p className="text-midnight/70 font-sans leading-relaxed">
                    123 Luxury Avenue<br/>
                    RS Puram, Coimbatore<br/>
                    Tamil Nadu 641002
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <Clock className="text-crimson mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-midnight tracking-wider uppercase text-sm mb-1">Opening Hours</h3>
                  <p className="text-midnight/70 font-sans leading-relaxed">
                    Monday - Sunday<br/>
                    11:00 AM - 11:00 PM
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <Phone className="text-crimson mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-midnight tracking-wider uppercase text-sm mb-1">Direct Line</h3>
                  <p className="text-midnight/70 font-sans leading-relaxed">
                    +91 422 123 4567<br/>
                    <span className="text-xs opacity-70">(Reservations & Enquiries)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif text-midnight mb-8 border-b border-midnight/10 pb-4">Connect Instantly</h2>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" 
               className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold tracking-widest uppercase text-sm hover:bg-[#128C7E] transition-colors shadow-lg">
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full aspect-[16/9] border border-midnight/10 shadow-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.425937449557!2d76.9474753!3d11.0065099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8585934149097%3A0xc3f58a36b5ecac8f!2sRS%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Dynamic Enquiry Form */}
        <div className="bg-white border border-midnight/10 p-8 md:p-12 shadow-2xl h-fit">
          <h2 className="text-3xl font-serif text-midnight mb-8">Send an Enquiry</h2>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {(["General", "Catering", "Private Dining"] as EnquiryType[]).map(type => (
              <button
                key={type}
                onClick={() => setEnquiryType(type)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  enquiryType === type 
                    ? "bg-midnight text-cream" 
                    : "bg-transparent border border-midnight/20 text-midnight hover:border-midnight"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {submitStatus === "success" ? (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-serif text-midnight mb-2">Thank You!</h3>
                <p className="text-midnight/60 mb-6">Your enquiry has been sent successfully. We'll get back to you shortly.</p>
                <button onClick={() => setSubmitStatus("idle")} className="text-crimson font-bold uppercase tracking-widest text-xs underline">Send another message</button>
             </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleEnquirySubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-cream border border-midnight/20 p-4 focus:outline-none focus:border-crimson font-sans" />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Phone</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-cream border border-midnight/20 p-4 focus:outline-none focus:border-crimson font-sans" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-cream border border-midnight/20 p-4 focus:outline-none focus:border-crimson font-sans" />
              </div>

              {enquiryType !== "General" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Expected Guests</label>
                    <input required type="number" min="1" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full bg-cream border border-midnight/20 p-4 focus:outline-none focus:border-crimson font-sans" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Event Date</label>
                    <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-cream border border-midnight/20 p-4 focus:outline-none focus:border-crimson font-sans" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">
                  {enquiryType === "General" ? "Your Message" : "Event Requirements"}
                </label>
                <textarea required rows={4} value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} className="w-full bg-cream border border-midnight/20 p-4 focus:outline-none focus:border-crimson font-sans resize-none"></textarea>
              </div>

              {submitStatus === "error" && <p className="text-red-500 text-xs font-bold">{errorMessage}</p>}

              <button disabled={isSubmitting} type="submit" className="w-full flex items-center justify-center gap-2 py-5 bg-crimson text-cream font-bold tracking-widest uppercase text-sm hover:bg-crimson-hover transition-colors mt-4 disabled:opacity-50">
                {isSubmitting ? "Sending..." : "Send"} <Send size={16} />
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}
