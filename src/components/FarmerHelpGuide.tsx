import React from 'react';
import {
  ShieldAlert,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  FileCheck,
  Wheat,
  Clock,
  Lock,
} from 'lucide-react';

export const FarmerHelpGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Wheat className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Farmer & Policyholder Protection Guide
            </h3>
            <p className="text-xs text-slate-500">
              రైతు సోదరుల కోసం ముఖ్యమైన సమాచారం / Essential Anti-Fraud Safety Tips
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
            100% Free Verification
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-black text-sm">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
              1
            </span>
            <span>Check Within 72 Hours</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            For PM Fasal Bima (Crop Insurance) or accident claims, always notify within <b>72 hours</b> to the toll-free number or bank branch.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <div className="flex items-center gap-2 text-rose-700 font-black text-sm">
            <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">
              2
            </span>
            <span>Never Give Blank Papers</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Never hand over blank signed cheques or original bank passbooks to unauthorized middle-men or fake surveyors.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <div className="flex items-center gap-2 text-sky-700 font-black text-sm">
            <span className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-xs">
              3
            </span>
            <span>Verify Document Here First</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Use the top search bar to check exact document requirements for LIC, Star Health, PM Fasal, or Bike insurance before submission.
          </p>
        </div>
      </div>

      {/* Helplines Strip */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">Official Free Government Helplines:</span>
            <span className="text-slate-300">
              IRDAI Grievance (Bima Bharosa): <strong>155255</strong> | Kisan PMFBY: <strong>14447</strong>
            </span>
          </div>
        </div>

        <a
          href="https://bimabharosa.irdai.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs shrink-0 transition-all shadow"
        >
          IRDAI Bima Bharosa Portal
        </a>
      </div>
    </div>
  );
};
