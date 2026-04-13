"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Users, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import { createReservation } from "@/app/actions/reservations";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
    occasion: "None",
    notes: ""
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    const data = new FormData(e.currentTarget);
    // Ensure all formData state that might not be in form are appended (but they are all inputs!)
    // Just to be safe, we will create a fresh FormData from our state
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    const result = await createReservation(submitData);

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setStep(3);
  };

  return (
    <main className="flex-1 bg-cream min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-crimson font-bold tracking-widest uppercase text-sm block mb-4">Reservations</span>
          <h1 className="text-5xl md:text-6xl font-serif text-midnight mb-6">Book a Table</h1>
          <p className="text-midnight/70 font-sans max-w-xl mx-auto">
            Reserve your exceptional dining experience. For parties larger than 8 or private dining inquiries, please visit our Contact page.
          </p>
        </div>

        {/* Booking Form Container */}
        <div className="bg-white border border-midnight/10 shadow-2xl p-8 md:p-12 relative overflow-hidden">

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-crimson transition-all duration-500 ease-out"
            style={{ width: step === 1 ? "50%" : step === 2 ? "100%" : "100%" }} />

          {step === 1 && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleNext}
              className="space-y-8"
            >
              <h2 className="text-2xl font-serif text-midnight border-b border-midnight/10 pb-4">1. Where & When</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70 flex items-center gap-2">
                    <Calendar size={14} /> Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-cream border border-midnight/20 p-4 text-midnight focus:outline-none focus:border-crimson transition-colors font-sans"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70 flex items-center gap-2">
                    <Clock size={14} /> Time
                  </label>
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-cream border border-midnight/20 p-4 text-midnight focus:outline-none focus:border-crimson transition-colors font-sans appearance-none"
                  >
                    <option value="" disabled>Select Time</option>
                    <option value="18:00">18:00 (6:00 PM)</option>
                    <option value="18:30">18:30 (6:30 PM)</option>
                    <option value="19:00">19:00 (7:00 PM)</option>
                    <option value="19:30">19:30 (7:30 PM)</option>
                    <option value="20:00">20:00 (8:00 PM)</option>
                    <option value="20:30">20:30 (8:30 PM)</option>
                    <option value="21:00">21:00 (9:00 PM)</option>
                  </select>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70 flex items-center gap-2">
                    <Users size={14} /> Guests
                  </label>
                  <select
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-cream border border-midnight/20 p-4 text-midnight focus:outline-none focus:border-crimson transition-colors font-sans appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button type="submit" className="px-8 py-4 bg-midnight text-cream font-bold tracking-widest uppercase text-sm hover:bg-crimson transition-colors flex items-center gap-2">
                  Continue to Details <ArrowRight size={16} />
                </button>
              </div>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <h2 className="text-2xl font-serif text-midnight border-b border-midnight/10 pb-4">2. Guest Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-cream border border-midnight/20 p-4 font-sans focus:outline-none focus:border-crimson"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-cream border border-midnight/20 p-4 font-sans focus:outline-none focus:border-crimson"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-cream border border-midnight/20 p-4 font-sans focus:outline-none focus:border-crimson"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-midnight/70">Special Occasion (Optional)</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="w-full bg-cream border border-midnight/20 p-4 font-sans focus:outline-none focus:border-crimson appearance-none"
                  >
                    <option value="None">None</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Business Meal">Business Meal</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 border border-red-100 flex items-center gap-3 font-sans text-sm mt-4">
                  <AlertTriangle size={16} />
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between pt-6 gap-4">
                <button type="button" onClick={() => setStep(1)} className="px-8 py-4 bg-transparent border border-midnight/20 text-midnight font-bold tracking-widest uppercase text-sm hover:bg-midnight/5 transition-colors text-center">
                  Back
                </button>
                <button disabled={isSubmitting} type="submit" className="px-8 py-4 bg-crimson text-cream font-bold tracking-widest uppercase text-sm hover:bg-crimson-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? "Confirming..." : "Confirm Booking"} <ArrowRight size={16} />
                </button>
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-6"
            >
              <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-8">
                <Calendar size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-midnight">Reservation Confirmed</h2>
              <p className="text-lg text-midnight/70 font-sans max-w-md mx-auto">
                Thank you, <span className="font-bold">{formData.name}</span>. Your table for <span className="font-bold">{formData.guests}</span> is booked for <span className="font-bold">{formData.date}</span> at <span className="font-bold">{formData.time}</span>.
              </p>
              <p className="text-sm text-midnight/50 font-sans pb-8">
                We have sent a confirmation email and SMS with the details.
              </p>
              <button onClick={() => window.location.href = '/dashboard'} className="px-8 py-4 bg-midnight text-cream font-bold tracking-widest uppercase text-sm hover:bg-midnight/90 transition-colors">
                View Dashboard
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </main>
  );
}
