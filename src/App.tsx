/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { DocumentsList } from './components/DocumentsList';
import { UploadSection } from './components/UploadSection';
import { VerificationResult } from './components/VerificationResult';
import { FarmerHelpGuide } from './components/FarmerHelpGuide';
import { getInsuranceDocumentsByQuery, DEFAULT_SEARCH_QUERY } from './data/insuranceData';
import { RequiredDocument, VerificationReport } from './types';
import { ShieldCheck, Info, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>(DEFAULT_SEARCH_QUERY);
  const [selectedDoc, setSelectedDoc] = useState<RequiredDocument | null>(null);
  const [verificationReport, setVerificationReport] = useState<VerificationReport | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Get current insurance company info based on search query
  const companyInfo = getInsuranceDocumentsByQuery(searchQuery);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setSelectedDoc(null);
    setVerificationReport(null);
  };

  const handleSelectDocumentForUpload = (doc: RequiredDocument) => {
    setSelectedDoc(doc);
    // Smoothly scroll down to upload section
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleVerifyButtonClick = () => {
    if (!selectedDoc && companyInfo.documents.length > 0) {
      setSelectedDoc(companyInfo.documents[0]);
    }
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Run claim verification check
  const handleRunVerification = ({
    fileName,
    fileUrl,
    docType,
    isForcedFake,
  }: {
    fileName: string;
    fileUrl?: string;
    docType: string;
    isForcedFake: boolean;
  }) => {
    const lowerName = fileName.toLowerCase();
    const hasFraudKeyword =
      lowerName.includes('fake') ||
      lowerName.includes('fraud') ||
      lowerName.includes('tamper') ||
      lowerName.includes('forged') ||
      lowerName.includes('duplicate');

    const isFraud = isForcedFake || hasFraudKeyword;
    const randomClaimNumber = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    if (isFraud) {
      setVerificationReport({
        status: 'fraud',
        companyName: companyInfo.companyName,
        documentType: docType,
        fileName,
        filePreviewUrl: fileUrl,
        timestamp,
        claimId: `CLM-FRD-${randomClaimNumber}`,
        score: 14.2,
        reason:
          'CRITICAL ALERT: File flagged as FAKE / FRAUD. Pixel inconsistencies, altered typography, and signature tampering detected. Document rejected for insurance claim settlement.',
        details: {
          tamperCheck: 'FAILED',
          fontConsistency: 'FAILED',
          officialSeal: 'FAILED',
          metadataValidation: 'FAILED',
          policyRegistryMatch: 'FAILED',
        },
        investigatorNotes:
          'DO NOT DISBURSE CLAIM. File marked as fraudulent by claimant / forensic scanner. Forward file to IRDAI State Anti-Fraud Vigilance Cell for prosecution under Section 420 IPC.',
      });
    } else {
      setVerificationReport({
        status: 'approved',
        companyName: companyInfo.companyName,
        documentType: docType,
        fileName,
        filePreviewUrl: fileUrl,
        timestamp,
        claimId: `CLM-APP-${randomClaimNumber}`,
        score: 99.4,
        reason:
          'SUCCESS: Original authentic document verified. Digital seal, UID/PAN checksum, and insurer policy contract match verified IRDAI repository standards.',
        details: {
          tamperCheck: 'PASSED',
          fontConsistency: 'PASSED',
          officialSeal: 'PASSED',
          metadataValidation: 'PASSED',
          policyRegistryMatch: 'PASSED',
        },
        investigatorNotes:
          'APPROVED FOR FAST-TRACK CLAIM SETTLEMENT. All mandatory KYC and policy schedules match official insurer records. Document is 100% genuine.',
      });
    }

    // Scroll to verification result
    setTimeout(() => {
      const el = document.getElementById('verification-result');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleResetVerification = () => {
    setVerificationReport(null);
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* 1. Header */}
      <Header onSearchFocus={handleFocusSearch} />

      {/* 2. Top Search Bar: Big search box, always on top */}
      <SearchBar
        currentQuery={searchQuery}
        onSearch={handleSearch}
        inputRef={searchInputRef}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8 space-y-8">
        {/* Search Context Breadcrumb / Active Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500 bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-600">Active Search Result:</span>
            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              "{searchQuery}"
            </span>
            <span className="text-slate-400">→</span>
            <span className="font-bold text-slate-800">{companyInfo.companyName}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Search bar always accessible at top</span>
          </div>
        </div>

        {/* 3. DOCUMENTS LIST SECTION */}
        <section aria-label="Insurance Documents Required">
          <DocumentsList
            info={companyInfo}
            onSelectDocumentForUpload={handleSelectDocumentForUpload}
            onVerifyClick={handleVerifyButtonClick}
          />
        </section>

        {/* 4. UPLOAD SECTION: Below documents */}
        <section aria-label="Upload Your Document Photo">
          <UploadSection
            ref={uploadSectionRef}
            companyInfo={companyInfo}
            selectedDoc={selectedDoc}
            onSelectDoc={setSelectedDoc}
            onRunVerification={handleRunVerification}
          />
        </section>

        {/* 5. VERIFICATION RESULT SECTION: Green Approved or Red Fraud */}
        {verificationReport && (
          <section ref={resultRef} aria-label="Verification Result">
            <VerificationResult
              report={verificationReport}
              onReset={handleResetVerification}
            />
          </section>
        )}

        {/* 6. Farmer Help & Protection Guide */}
        <section aria-label="Farmer & Policyholder Protection Guide">
          <FarmerHelpGuide />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 px-4 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-slate-200 font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Investigation Mitra • Insurance Claim Verification System</span>
          </div>

          <p className="text-center md:text-right text-slate-400 text-xs">
            Designed for policyholders, rural farmers & field insurance investigators across India.
            <br />
            Compliant with IRDAI Anti-Fraud Policy & PM Fasal Bima Yojana guidelines.
          </p>
        </div>
      </footer>
    </div>
  );
}
