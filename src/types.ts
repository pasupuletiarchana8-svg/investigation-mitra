export type InsuranceCategory = 'life' | 'health' | 'motor' | 'crop' | 'general';

export interface RequiredDocument {
  id: string;
  name: string;
  teluguName?: string;
  description: string;
  required: boolean;
  iconName: string;
}

export interface InsuranceCompanyInfo {
  id: string;
  companyName: string;
  category: InsuranceCategory;
  categoryTitle: string;
  subtitle: string;
  tagline: string;
  documents: RequiredDocument[];
  verifyButtonText: string;
  tips: string[];
}

export type VerificationStatus = 'idle' | 'analyzing' | 'approved' | 'fraud';

export interface VerificationReport {
  status: VerificationStatus;
  companyName: string;
  documentType: string;
  fileName: string;
  filePreviewUrl?: string;
  timestamp: string;
  claimId: string;
  score: number;
  reason: string;
  details: {
    tamperCheck: 'PASSED' | 'FAILED';
    fontConsistency: 'PASSED' | 'FAILED';
    officialSeal: 'PASSED' | 'FAILED';
    metadataValidation: 'PASSED' | 'FAILED';
    policyRegistryMatch: 'PASSED' | 'FAILED';
  };
  investigatorNotes: string;
}
