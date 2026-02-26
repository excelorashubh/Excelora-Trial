import React from 'react';
import logo from '../assets/logo.jpg'
import { BookOpen, Facebook, Instagram, Twitter, Linkedin, ArrowRight, Shield, Youtube } from 'lucide-react';
import { useAuth } from '../context/AuthContext';



const Footer = () => {

  const { user } = useAuth()


  return (
    <footer className="bg-[#000000] text-white border-t border-zinc-900 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Section (4 Columns) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <img src={logo} className="text-black w-10 h-10" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">
                Excelora
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              The premier digital campus for elite learning. Architecting the future of classroom management for Students, Teachers, and Admins.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Facebook, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="text-zinc-500 hover:text-white transition-colors duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section (2 Columns each) */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Platform</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href={user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher' : '/student'} className="hover:text-white transition">Contact Admin</a></li>
              <li><a href="#" className="hover:text-white transition">Teacher Portal</a></li>
              <li><a href="#" className="hover:text-white transition">Student Hub</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Support</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">System Status</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
            </ul>
          </div>

          {/* Newsletter (4 Columns) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Join the Newsletter</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-zinc-950 border border-zinc-800 py-4 px-4 rounded-xl text-sm focus:outline-none focus:border-zinc-500 transition-all"
              />
              <button className="absolute right-2 top-2 bg-white text-black p-2 rounded-lg hover:bg-zinc-200 transition">
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest">
              <Shield size={12} />
              End-to-end encrypted registration
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[11px] font-medium tracking-widest uppercase">
            © 2026 Excelora Classes • Designed for the Future
          </p>
          <div className="flex gap-8 text-[11px] font-medium tracking-widest uppercase text-zinc-600">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;