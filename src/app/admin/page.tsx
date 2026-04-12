import React from "react";
import { getAdminDashboardData } from "../actions/admin";
import Link from "next/link";

export default async function AdminDashboard() {
  const { reservations, inquiries } = await getAdminDashboardData();

  return (
    <div className="flex-1 bg-cream min-h-screen p-8 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-crimson font-bold tracking-widest uppercase text-xs mb-2 block">Management Portal</span>
            <h1 className="text-4xl font-serif text-midnight">Admin Dashboard</h1>
          </div>
          <button className="px-6 py-2 bg-midnight/10 text-midnight font-bold tracking-widest uppercase text-sm hover:bg-midnight/20 transition-colors hidden md:block">
            Export Data
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Recent Bookings Table */}
          <div className="bg-white border border-midnight/10 shadow-sm p-6">
            <h2 className="text-xl font-serif text-midnight mb-6 border-b border-midnight/10 pb-4">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-sm">
                <thead>
                  <tr className="text-midnight/60 border-b border-midnight/5">
                    <th className="font-semibold py-3">ID</th>
                    <th className="font-semibold py-3">Guest</th>
                    <th className="font-semibold py-3">Date/Time</th>
                    <th className="font-semibold py-3">Pax</th>
                    <th className="font-semibold py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length > 0 ? reservations.map((b: any) => (
                    <tr key={b.id} className="border-b border-midnight/5 hover:bg-cream/30">
                      <td className="py-4 text-midnight/60">#{b.id.substring(0, 5)}</td>
                      <td className="py-4 font-medium text-midnight">{b.name}</td>
                      <td className="py-4 text-midnight/80">{b.date} at {b.time}</td>
                      <td className="py-4 text-midnight/80">{b.guests}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-sm ${b.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-midnight/40 italic">No bookings found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold uppercase tracking-widest text-midnight hover:bg-cream transition-colors border border-midnight/20">
              View All Bookings
            </button>
          </div>

          {/* Incoming Enquiries Table */}
          <div className="bg-white border border-midnight/10 shadow-sm p-6">
            <h2 className="text-xl font-serif text-midnight mb-6 border-b border-midnight/10 pb-4">New Enquiries</h2>
            <div className="flex flex-col gap-4">
              {inquiries.length > 0 ? inquiries.map((enq: any) => (
                <div key={enq.id} className="flex justify-between items-start border border-midnight/5 p-4 bg-cream/20">
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase text-midnight border border-midnight px-1 shrink-0">{enq.event_type}</span>
                      <span className="text-sm font-semibold text-midnight truncate">{enq.name}</span>
                    </div>
                    <p className="text-[10px] font-sans text-midnight/60 mb-2">{new Date(enq.created_at).toLocaleDateString()} by {enq.email}</p>
                    <p className="text-sm font-sans text-midnight/80 italic line-clamp-2">"{enq.details}"</p>
                  </div>
                  <button className="text-crimson font-bold uppercase text-xs hover:underline shrink-0 pl-4">Review</button>
                </div>
              )) : (
                <div className="py-12 text-center text-midnight/40 italic">No new enquiries</div>
              )}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold uppercase tracking-widest text-midnight hover:bg-cream transition-colors border border-midnight/20">
              Go to CRM
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

