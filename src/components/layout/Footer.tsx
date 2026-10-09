import React from 'react';
import { useApp } from '../../context/AppContext';
import { Server, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-display font-extrabold text-white text-sm">
                GF
              </div>
              <span className="font-display font-bold text-lg text-white">GameForge</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The high-performance gaming marketplace and enterprise-grade dedicated game server hosting ecosystem. Sub-millisecond netcode, global server mesh, zero compromises.
            </p>
            <div className="flex items-center gap-4 text-slate-400 text-xs pt-1">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> DDoS Protected</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-indigo-400" /> NVMe Tier-4</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-violet-400" /> Global Anycast</span>
            </div>
          </div>

          {/* Store links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Marketplace</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('store')} className="hover:text-cyan-400 transition-colors">Browse All Games</button></li>
              <li><button onClick={() => navigate('store')} className="hover:text-cyan-400 transition-colors">Special Offers & Deals</button></li>
              <li><button onClick={() => navigate('store')} className="hover:text-cyan-400 transition-colors">New Releases</button></li>
              <li><button onClick={() => navigate('library')} className="hover:text-cyan-400 transition-colors">My Library</button></li>
              <li><button onClick={() => navigate('profile')} className="hover:text-cyan-400 transition-colors">Account & Wallet</button></li>
            </ul>
          </div>

          {/* Hosting links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Server Hosting</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('hosting')} className="hover:text-cyan-400 transition-colors">Hosting Dashboard</button></li>
              <li><button onClick={() => navigate('servers')} className="hover:text-cyan-400 transition-colors">Public Server Browser</button></li>
              <li><button onClick={() => navigate('hosting')} className="hover:text-cyan-400 transition-colors">Deploy New Server</button></li>
              <li><button onClick={() => navigate('hosting')} className="hover:text-cyan-400 transition-colors">Mod Manager & Configs</button></li>
              <li><button onClick={() => navigate('hosting')} className="hover:text-cyan-400 transition-colors">High-Tick Datacenters</button></li>
            </ul>
          </div>

          {/* Community & Support */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Community & Network</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('community')} className="hover:text-cyan-400 transition-colors">Discussion Forums</button></li>
              <li><button onClick={() => navigate('community')} className="hover:text-cyan-400 transition-colors">Guides & Blueprints</button></li>
              <li><button onClick={() => navigate('community')} className="hover:text-cyan-400 transition-colors">Patch Notes</button></li>
              <li><button onClick={() => navigate('admin')} className="hover:text-cyan-400 transition-colors">Admin Governance</button></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <p>© {new Date().getFullYear()} GameForge Interactive Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">API Documentation</span>
            <span className="hover:text-slate-300 cursor-pointer">Status Page</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
