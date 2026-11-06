import React from 'react';
import {
  CreditCard,
  FileText,
  Award,
  Receipt,
  UserCheck,
  Landmark,
  FileCheck,
  Activity,
  ShieldCheck,
  Stethoscope,
  FileSpreadsheet,
  Truck,
  FileWarning,
  Camera,
  Upload,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { InsuranceCompanyInfo, RequiredDocument } from '../types';

interface DocumentsListProps {
  info: InsuranceCompanyInfo;
  onSelectDocumentForUpload: (doc: RequiredDocument) => void;
  onVerifyClick: () => void;
}

export const DocumentsList: React.FC<DocumentsListProps> = ({
  info,
  onSelectDocumentForUpload,
  onVerifyClick,
}) => {
  const getDocumentIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'Receipt':
        return <Receipt className="w-5 h-5 text-indigo-600" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-purple-600" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-teal-600" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-rose-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-red-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-pink-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-orange-600" />;
      case 'FileWarning':
        return <FileWarning className="w-5 h-5 text-amber-600" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-sky-600" />;
      default:
        return <FileText className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'life':
        return {
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          accent: 'border-l-emerald-500',
          gradient: 'from-emerald-50 to-teal-50',
        };
      case 'health':
        return {
          badge: 'bg-sky-100 text-sky-800 border-sky-300',
          accent: 'border-l-sky-500',
          gradient: 'from-sky-50 to-indigo-50',
        };
      case 'motor':
        return {
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          accent: 'border-l-amber-500',
          gradient: 'from-amber-50 to-orange-50',
        };
      case 'crop':
        return {
          badge: 'bg-green-100 text-green-800 border-green-300',
          accent: 'border-l-green-600',
          gradient: 'from-green-50 to-emerald-50',
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-300',
          accent: 'border-l-slate-500',
          gradient: 'from-slate-50 to-gray-50',
        };
    }
  };

  const theme = getCategoryTheme(info.category);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden transition-all">
      {/* Company Header Banner */}
      <div className={`p-5 sm:p-6 bg-gradient-to-r ${theme.gradient} border-b border-slate-200`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full border ${theme.badge}`}
              >
                {info.category.toUpperCase()} INSURANCE
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Official Document Checklist
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {info.categoryTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">{info.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{info.documents.length} Required Documents</span>
          </div>
        </div>
      </div>

      {/* Required Documents List Grid */}
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span className="uppercase tracking-wider">Mandatory Verification Checklist</span>
          <span>Click any document to verify</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {info.documents.map((doc, idx) => (
            <div
              key={doc.id}
              onClick={() => onSelectDocumentForUpload(doc)}
              className="group relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50/50 hover:bg-emerald-50/40 transition-all cursor-pointer shadow-2xs hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-emerald-300 transition-all shadow-2xs">
                {getDocumentIcon(doc.iconName)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-400 bg-slate-200/80 px-1.5 py-0.2 rounded">
                    #{idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors">
                    {doc.name}
                  </h3>
                  {doc.required && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Required
                    </span>
                  )}
                </div>

                {doc.teluguName && (
                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    {doc.teluguName}
                  </p>
                )}

                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="shrink-0 self-center">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 group-hover:text-emerald-600 group-hover:border-emerald-300 shadow-2xs transition-all">
                  <Upload className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tips / Advice box for farmers & investigators */}
        {info.tips && info.tips.length > 0 && (
          <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950 mb-1">
                Field Investigator & Farmer Alert:
              </p>
              <ul className="list-disc list-inside space-y-1 text-amber-800">
                {info.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Button below specified in requirements: "Verify [Company] Documents - Upload Here" */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Ready for forensic fraud & digital signature verification</span>
          </div>

          <button
            type="button"
            onClick={onVerifyClick}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Upload className="w-5 h-5" />
            <span>{info.verifyButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
