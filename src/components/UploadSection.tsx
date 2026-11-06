import React, { useState, useRef } from 'react';
import {
  Upload,
  AlertOctagon,
  CheckCircle2,
  FileCheck2,
  FileX,
  Sparkles,
  Camera,
  Trash2,
  FileText,
  AlertTriangle,
  RefreshCw,
  SearchCheck,
} from 'lucide-react';
import { RequiredDocument, InsuranceCompanyInfo } from '../types';
import { DEMO_SAMPLE_DOCS } from '../data/insuranceData';

interface UploadSectionProps {
  companyInfo: InsuranceCompanyInfo;
  selectedDoc: RequiredDocument | null;
  onSelectDoc: (doc: RequiredDocument) => void;
  onRunVerification: (fileData: {
    fileName: string;
    fileUrl?: string;
    docType: string;
    isForcedFake: boolean;
  }) => void;
}

export const UploadSection = React.forwardRef<HTMLDivElement, UploadSectionProps>(
  ({ companyInfo, selectedDoc, onSelectDoc, onRunVerification }, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>('LIC_Original_Policy_Bond_No_84920481.pdf');
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState<string>('1.4 MB');
    const [isMarkedFake, setIsMarkedFake] = useState<boolean>(false);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

    // Selected doc type name
    const currentDocName = selectedDoc ? selectedDoc.name : companyInfo.documents[0]?.name || 'Policy Bond';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

        // Check if filename contains fake or fraud
        const lower = file.name.toLowerCase();
        if (lower.includes('fake') || lower.includes('fraud') || lower.includes('tamper')) {
          setIsMarkedFake(true);
        } else {
          setIsMarkedFake(false);
        }

        // Preview if image
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setFilePreview(event.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setFilePreview(null);
        }
      }
    };

    const handleMarkAsFake = () => {
      setIsMarkedFake((prev) => !prev);
    };

    const handleCheckClaim = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        onRunVerification({
          fileName: fileName || `${currentDocName}_Document.pdf`,
          fileUrl: filePreview || undefined,
          docType: currentDocName,
          isForcedFake: isMarkedFake,
        });
      }, 700);
    };

    const handleLoadSample = (sample: typeof DEMO_SAMPLE_DOCS[0]) => {
      setFileName(sample.name);
      setFileSize('1.8 MB');
      setIsMarkedFake(sample.isFraud);
      setFilePreview(null);
      // Try to match sample type to available documents
      const match = companyInfo.documents.find((d) =>
        sample.type.toLowerCase().includes(d.name.toLowerCase()) ||
        d.name.toLowerCase().includes(sample.type.toLowerCase())
      );
      if (match) {
        onSelectDoc(match);
      }
    };

    const handleClearFile = () => {
      setFileName('');
      setFilePreview(null);
      setIsMarkedFake(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    // Determine if file contains fraud keyword in name
    const hasFraudKeyword =
      fileName.toLowerCase().includes('fake') ||
      fileName.toLowerCase().includes('fraud') ||
      fileName.toLowerCase().includes('tamper');

    const willBeDetectedAsFraud = isMarkedFake || hasFraudKeyword;

    return (
      <div
        ref={ref}
        id="upload-section"
        className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden transition-all scroll-mt-28"
      >
        {/* Section Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Upload Your Document Photo
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Upload document for <span className="text-emerald-300 font-bold">{companyInfo.companyName}</span> verification
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Step 2 of 2: Claim Verification
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Document Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select Document Type to Verify / పత్రం రకం ఎంచుకోండి:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {companyInfo.documents.map((doc) => {
                const isSelected = currentDocName === doc.name;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => onSelectDoc(doc)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 text-xs font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate">{doc.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Demo Samples for instant testing without needing local files */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Quick Test Samples (Instant 1-Click Verification):
              </span>
              <span className="text-[11px] text-slate-400">Click to auto-load</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {DEMO_SAMPLE_DOCS.map((sample) => (
                <button
                  key={sample.name}
                  type="button"
                  onClick={() => handleLoadSample(sample)}
                  className={`p-2 rounded-lg text-left border flex items-center justify-between transition-all cursor-pointer ${
                    sample.isFraud
                      ? 'bg-rose-50/70 border-rose-200 text-rose-900 hover:bg-rose-100/70'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-900 hover:bg-emerald-100/70'
                  }`}
                >
                  <div className="truncate mr-2">
                    <span className="font-bold">{sample.label}</span>
                    <p className="text-[10px] opacity-75 truncate">{sample.description}</p>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase shrink-0 ${
                      sample.isFraud ? 'bg-rose-200 text-rose-800' : 'bg-emerald-200 text-emerald-800'
                    }`}
                  >
                    {sample.isFraud ? 'FAKE' : 'GENUINE'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
              willBeDetectedAsFraud
                ? 'border-rose-400 bg-rose-50/40 hover:bg-rose-50/70'
                : fileName
                ? 'border-emerald-400 bg-emerald-50/30 hover:bg-emerald-50/50'
                : 'border-slate-300 hover:border-emerald-400 bg-slate-50/60 hover:bg-slate-100/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            {filePreview ? (
              <div className="max-w-xs mx-auto mb-4 relative">
                <img
                  src={filePreview}
                  alt="Uploaded preview"
                  className="w-full max-h-48 object-contain rounded-xl border border-slate-300 shadow-sm"
                />
              </div>
            ) : (
              <div
                className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all ${
                  willBeDetectedAsFraud
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {willBeDetectedAsFraud ? (
                  <FileX className="w-8 h-8" />
                ) : (
                  <Upload className="w-8 h-8" />
                )}
              </div>
            )}

            {fileName ? (
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-base break-all">
                    {fileName}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                    {fileSize}
                  </span>
                  {willBeDetectedAsFraud ? (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-extrabold tracking-wide uppercase">
                      FLAGGED AS FAKE / FRAUD
                    </span>
                  ) : (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold tracking-wide uppercase">
                      ORIGINAL DOCUMENT
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Target Document Type: <b>{currentDocName}</b> • Ready for Verification
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-base font-bold text-slate-800">
                  Click to select or drag & drop document photo
                </p>
                <p className="text-xs text-slate-500">
                  Supports JPG, PNG, WEBP or PDF (Aadhaar, Passbook, Bills, RC, Land Records)
                </p>
              </div>
            )}
          </div>

          {/* Current file control bar */}
          {fileName && (
            <div className="flex items-center justify-between text-xs text-slate-600 px-1">
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                Active Document: <strong className="text-slate-800">{currentDocName}</strong>
              </span>
              <button
                type="button"
                onClick={handleClearFile}
                className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove file</span>
              </button>
            </div>
          )}

          {/* Action Buttons as requested:
              1. Upload Document Photo button
              2. Mark as FAKE File (FRAUD) button
              3. Check Claim button
          */}
          <div className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Button 1: Upload Document Photo */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-3.5 bg-slate-800 hover:bg-slate-750 text-white font-bold text-sm rounded-xl border border-slate-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload Document Photo</span>
              </button>

              {/* Button 2: Mark as FAKE File (FRAUD) */}
              <button
                type="button"
                onClick={handleMarkAsFake}
                className={`w-full px-4 py-3.5 font-bold text-sm rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                  isMarkedFake
                    ? 'bg-rose-700 hover:bg-rose-800 text-white border-rose-800 ring-4 ring-rose-500/30 shadow-lg'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300 hover:border-rose-400'
                }`}
              >
                <AlertOctagon className="w-4 h-4 text-rose-500" />
                <span>
                  {isMarkedFake
                    ? '✓ Marked as FAKE (FRAUD)'
                    : 'Mark as FAKE File (FRAUD)'}
                </span>
              </button>

              {/* Button 3: Check Claim */}
              <button
                type="button"
                disabled={!fileName || isAnalyzing}
                onClick={handleCheckClaim}
                className="w-full px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Document...</span>
                  </>
                ) : (
                  <>
                    <SearchCheck className="w-5 h-5" />
                    <span>Check Claim</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-slate-400 mt-3">
              Click <b>Check Claim</b> to run authenticity check, IRDAI format cross-validation, and forensic inspection.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

UploadSection.displayName = 'UploadSection';
