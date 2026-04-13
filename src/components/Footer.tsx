import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-midnight text-cream mt-auto py-12 px-8 sm:px-16 border-t border-cream/10 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-serif text-gold mb-6 uppercase tracking-widest text-wrap">Rocky Restaurant</h2>
          <p className="text-sm text-cream/70 font-sans leading-relaxed">
            Experience the finest luxury-rustic dining with our curated menus, exceptional service, and inviting atmosphere.
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Link</h3>
          <ul className="space-y-4 text-sm text-cream/70">
            <li><Link href="/menu" className="hover:text-gold transition-colors">Menu</Link></li>
            <li><Link href="/booking" className="hover:text-gold transition-colors">Reservations</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Connect</h3>
          <ul className="space-y-4 text-sm text-cream/70">
            <li><a href="#" className="hover:text-gold transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">WhatsApp</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Visit Us</h3>
          <address className="text-sm text-cream/70 not-italic space-y-2">
            <p>123 Luxury Avenue</p>
            <p>Coimbatore, Tamil Nadu</p>
            <p className="pt-2">Open Daily: 11 AM - 11 PM</p>
          </address>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-cream/50">
        <p>&copy; {new Date().getFullYear()} Rocky Restaurant. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-cream">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-cream">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
