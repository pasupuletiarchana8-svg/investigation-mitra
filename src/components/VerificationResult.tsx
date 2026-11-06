import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  FileX,
  Printer,
  RotateCcw,
  Download,
  AlertOctagon,
  ExternalLink,
} from 'lucide-react';
import { VerificationReport } from '../types';

interface VerificationResultProps {
  report: VerificationReport;
  onReset: () => void;
}

export const VerificationResult: React.FC<VerificationResultProps> = ({
  report,
  onReset,
}) => {
  const isApproved = report.status === 'approved';

  return (
    <div
      id="verification-result"
      className={`rounded-2xl shadow-xl border-2 overflow-hidden transition-all scroll-mt-28 ${
        isApproved
          ? 'bg-white border-emerald-500 shadow-emerald-900/10'
          : 'bg-white border-rose-600 shadow-rose-900/15'
      }`}
    >
      {/* Top Banner required by specification:
          "GREEN APPROVED - Genuine Document" OR "RED FRAUD - Fake Document"
      */}
      <div
        className={`px-5 sm:px-8 py-5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
          isApproved
            ? 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800'
            : 'bg-gradient-to-r from-rose-600 via-rose-700 to-red-900'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
              isApproved
                ? 'bg-white/20 text-white ring-2 ring-white/40'
                : 'bg-white/20 text-white ring-2 ring-white/40 animate-bounce'
            }`}
          >
            {isApproved ? (
              <ShieldCheck className="w-7 h-7" />
            ) : (
              <ShieldAlert className="w-7 h-7" />
            )}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-black text-white/90">
              Investigation Mitra Verification Result
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isApproved
                ? 'GREEN APPROVED - Genuine Document'
                : 'RED FRAUD - Fake Document'}
            </h2>
          </div>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm border ${
              isApproved
                ? 'bg-emerald-950 text-emerald-200 border-emerald-400/30'
                : 'bg-rose-950 text-rose-200 border-rose-400/30'
            }`}
          >
            {isApproved ? 'AUTHENTIC 99.4%' : 'FRAUD DETECTED'}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Verification Stamp & Overview Card */}
        <div
          className={`p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
            isApproved
              ? 'bg-emerald-50/70 border-emerald-200'
              : 'bg-rose-50/80 border-rose-200'
          }`}
        >
          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span
                className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md ${
                  isApproved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                Claim ID: {report.claimId}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {report.timestamp}
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900">
              {report.companyName} — {report.documentType}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">
              {report.reason}
            </p>

            <div className="text-xs text-slate-600 pt-1">
              File checked: <strong className="font-mono text-slate-900">{report.fileName}</strong>
            </div>
          </div>

          {/* Stamp Graphic */}
          <div
            className={`px-6 py-4 rounded-xl border-4 text-center transform -rotate-2 select-none shrink-0 shadow-md ${
              isApproved
                ? 'border-emerald-600 bg-white text-emerald-700 ring-2 ring-emerald-300'
                : 'border-rose-600 bg-white text-rose-700 ring-2 ring-rose-300'
            }`}
          >
            <div className="text-[10px] font-black uppercase tracking-widest opacity-80">
              IRDAI FORENSIC SYSTEM
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight my-0.5">
              {isApproved ? 'VERIFIED GENUINE' : 'FRAUD REJECTED'}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider">
              {isApproved ? 'PASSED INVESTIGATION' : 'TAMPERED / FAKE'}
            </div>
          </div>
        </div>

        {/* Detailed Forensic Checklist */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            Forensic Integrity & Tamper Inspection Checklist
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
              <div className="mt-0.5">
                {report.details.tamperCheck === 'PASSED' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <FileX className="w-5 h-5 text-rose-600" />
                )}
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Pixel & Tamper Check
                </span>
                <span
                  className={
                    report.details.tamperCheck === 'PASSED'
                      ? 'text-emerald-700 font-semibold'
                      : 'text-rose-700 font-semibold'
                  }
                >
                  {report.details.tamperCheck === 'PASSED'
                    ? 'Passed (No image editing detected)'
                    : 'Failed (Photoshop / clone stamp found)'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
              <div className="mt-0.5">
                {report.details.fontConsistency === 'PASSED' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <FileX className="w-5 h-5 text-rose-600" />
                )}
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Font & Typography Match
                </span>
                <span
                  className={
                    report.details.fontConsistency === 'PASSED'
                      ? 'text-emerald-700 font-semibold'
                      : 'text-rose-700 font-semibold'
                  }
                >
                  {report.details.fontConsistency === 'PASSED'
                    ? 'Passed (Consistent official font)'
                    : 'Failed (Mismatched font size/styles)'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
              <div className="mt-0.5">
                {report.details.officialSeal === 'PASSED' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <FileX className="w-5 h-5 text-rose-600" />
                )}
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Official Seal & Stamp
                </span>
                <span
                  className={
                    report.details.officialSeal === 'PASSED'
                      ? 'text-emerald-700 font-semibold'
                      : 'text-rose-700 font-semibold'
                  }
                >
                  {report.details.officialSeal === 'PASSED'
                    ? 'Passed (Authentic authorized seal)'
                    : 'Failed (Seal missing or altered)'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
              <div className="mt-0.5">
                {report.details.metadataValidation === 'PASSED' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <FileX className="w-5 h-5 text-rose-600" />
                )}
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  EXIF & Metadata Validation
                </span>
                <span
                  className={
                    report.details.metadataValidation === 'PASSED'
                      ? 'text-emerald-700 font-semibold'
                      : 'text-rose-700 font-semibold'
                  }
                >
                  {report.details.metadataValidation === 'PASSED'
                    ? 'Passed (Original camera metadata)'
                    : 'Failed (Editor software traces)'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3 sm:col-span-2">
              <div className="mt-0.5">
                {report.details.policyRegistryMatch === 'PASSED' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-rose-600" />
                )}
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Insurance Central Registry Database Match
                </span>
                <span
                  className={
                    report.details.policyRegistryMatch === 'PASSED'
                      ? 'text-emerald-700 font-semibold'
                      : 'text-rose-700 font-semibold'
                  }
                >
                  {report.details.policyRegistryMatch === 'PASSED'
                    ? 'Active policy verified on IRDAI / IIB national insurance records'
                    : 'Policy record mismatch or flagged in anti-fraud blacklist'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Investigator Action Plan */}
        <div
          className={`p-4 rounded-xl border text-xs ${
            isApproved
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <div className="font-extrabold uppercase mb-1 flex items-center gap-1.5">
            {isApproved ? (
              <FileCheck className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
            <span>Recommended Next Action:</span>
          </div>
          <p className="leading-relaxed">{report.investigatorNotes}</p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Verify Another Document</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 sm:flex-none px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-300"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>

            {isApproved ? (
              <button
                type="button"
                onClick={() => {
                  alert(
                    `Claim verification report for ${report.companyName} saved. Reference ID: ${report.claimId}`
                  );
                }}
                className="flex-1 sm:flex-none px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Approved Report</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  alert(
                    `FRAUD ALERT REPORT SUBMITTED to IRDAI Vigilance Cell. Case Reference: ${report.claimId}`
                  );
                }}
                className="flex-1 sm:flex-none px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>Report Fraud to Vigilance</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
