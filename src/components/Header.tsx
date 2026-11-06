import React from 'react';
import { ShieldCheck, PhoneCall, CheckCircle2, Search } from 'lucide-react';

interface HeaderProps {
  onSearchFocus: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchFocus }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      {/* Top micro bar for helpline & farmer support */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/40 px-4 py-1.5 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-300 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>IRDAI & Govt Standards • Official Claim & Document Verification Portal</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden sm:inline">Toll-Free Helpline:</span>
            <a
              href="tel:155255"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>155255 (Bima Bharosa)</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-amber-300 font-medium">PMFBY: 14447</span>
          </div>
        </div>
      </div>

      {/* Main branding header */}
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Investigation Mitra
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                v2.4 Live
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              Insurance Document Search & Fraud Detection System
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-lg border border-slate-700/80 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Farmer & Policyholder Friendly</span>
          </div>
          <button
            onClick={onSearchFocus}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-all shadow-md active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Search Company</span>
          </button>
        </div>
      </div>
    </header>
  );
};
