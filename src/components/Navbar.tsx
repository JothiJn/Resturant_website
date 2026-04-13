"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, Calendar, Phone, LogIn, LogOut, User as UserIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { logout } from "@/app/login/actions";

export function Navbar({ user }: { user: User | null }) {
  const pathname = usePathname();

  // For the new template, most links will anchor to the homepage sections 
  // but we keep the ability to go to / if on another page.
  const isHome = pathname === "/";
  const getHref = (hash: string) => isHome ? hash : `/${hash}`;

  const navItems = [
    { name: "Home", href: getHref("#home"), icon: Home },
    { name: "Our Menu", href: getHref("#menu"), icon: Menu },
    { name: "History", href: getHref("#history"), icon: Calendar },
    ...(user ? [{ name: "Dashboard", href: "/dashboard", icon: Calendar }] : []),
    { name: "Contact", href: getHref("#contact"), icon: Phone },
  ];

  const [lang, setLang] = useState("EN");

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 w-full z-50 bg-[#f4f3ed]/90 backdrop-blur-md border-b border-navy/10 h-24 items-center justify-between px-8 sm:px-16 transition-all">

        {/* Left Links */}
        <nav className="flex gap-8 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs tracking-widest uppercase font-bold text-navy hover:text-brown transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex flex-col items-center justify-center flex-1">
          <Link href="/" className="flex flex-col items-center group">
            <span className="text-3xl font-sans text-navy font-bold tracking-widest">
              ROCKY
            </span>
            <span className="text-[10px] font-sans text-navy tracking-[0.3em] uppercase mt-1">
              Restaurant
            </span>
          </Link>
        </div>

        {/* Right CTA & Lang */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <div className="flex gap-2 pr-6 border-r border-navy/10">
            {["EN", "TA"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-[10px] font-bold tracking-widest ${lang === l ? 'text-orange' : 'text-navy/30'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 border-r border-navy/10 pr-6">
            {user ? (
              <form action={logout}>
                <button className="text-[10px] font-bold tracking-widest uppercase text-navy hover:text-brown transition-colors">
                  Log Out
                </button>
              </form>
            ) : (
              <Link 
                href="/login"
                className="text-[10px] font-bold tracking-widest uppercase text-navy hover:text-brown transition-colors"
              >
                Log In / Sign Up
              </Link>
            )}
          </div>

          <Link
            href="/booking"
            className="px-6 py-3 bg-brown text-white uppercase text-xs font-bold tracking-widest hover:bg-brown-hover transition-colors shadow-sm"
          >
            Make Reservation
          </Link>
        </div>
      </header>



      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[#f4f3ed] border-t border-navy/10 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center w-full h-full gap-1 text-navy/70 hover:text-navy"
              >
                <Icon size={20} className="stroke-2" />
                <span className="text-[10px] uppercase font-bold tracking-wider">{item.name}</span>
              </Link>
            );
          })}
          
          {/* Mobile Login/Logout Bottom Nav Icon */}
          {user ? (
            <form action={logout} className="w-full h-full">
              <button className="flex flex-col items-center justify-center w-full h-full gap-1 text-navy/70 hover:text-navy">
                <LogOut size={20} className="stroke-2" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Logout</span>
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="flex flex-col items-center justify-center w-full h-full gap-1 text-navy/70 hover:text-navy"
            >
              <LogIn size={20} className="stroke-2" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Log In</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
