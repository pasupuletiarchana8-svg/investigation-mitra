import { InsuranceCompanyInfo } from '../types';

export const DEFAULT_SEARCH_QUERY = 'LIC';

export function getInsuranceDocumentsByQuery(rawQuery: string): InsuranceCompanyInfo {
  const query = rawQuery.trim().toLowerCase();

  // 1. LIC / Life Insurance matching
  if (
    query.includes('lic') ||
    query.includes('life') ||
    query.includes('jeevan') ||
    query.includes('sbi life') ||
    query.includes('max life') ||
    query.includes('tata aia') ||
    query.includes('kotak life') ||
    query.includes('pnb metlife')
  ) {
    const displayName = query.includes('sbi')
      ? 'SBI Life Insurance'
      : query.includes('max')
      ? 'Max Life Insurance'
      : query.includes('tata')
      ? 'Tata AIA Life Insurance'
      : 'LIC Life Insurance';

    return {
      id: 'lic-life',
      companyName: displayName,
      category: 'life',
      categoryTitle: `${displayName} - Documents Required:`,
      subtitle: 'Life Insurance Claims, Policy Maturity & Death Claim Verification',
      tagline: 'Mandatory original documents required by Life Insurance Corporation & IRDAI',
      verifyButtonText: `Verify ${displayName.split(' ')[0]} Documents - Upload Here`,
      documents: [
        {
          id: 'aadhaar',
          name: 'Aadhaar Card',
          teluguName: 'ఆధార్ కార్డు',
          description: 'Original Aadhaar card copy of Policyholder & Nominee with clear UID number',
          required: true,
          iconName: 'CreditCard',
        },
        {
          id: 'pan',
          name: 'PAN Card',
          teluguName: 'పాన్ కార్డు',
          description: 'Permanent Account Number for TDS & high-value payout verification',
          required: true,
          iconName: 'FileText',
        },
        {
          id: 'policy_bond',
          name: 'Policy Bond',
          teluguName: 'పాలసీ బాండ్ (అసలు పత్రం)',
          description: 'Original physical policy bond certificate issued at issuance',
          required: true,
          iconName: 'Award',
        },
        {
          id: 'premium_receipts',
          name: 'Premium Receipts',
          teluguName: 'ప్రీమియం రసీదులు',
          description: 'Latest premium payment receipts / renewal notices for active status',
          required: true,
          iconName: 'Receipt',
        },
        {
          id: 'nominee_id',
          name: 'Nominee ID Proof',
          teluguName: 'నామినీ గుర్తింపు కార్డు',
          description: 'Voter ID, Passport, or Aadhaar of the registered nominee',
          required: true,
          iconName: 'UserCheck',
        },
        {
          id: 'bank_passbook',
          name: 'Bank Passbook',
          teluguName: 'బ్యాంక్ పాస్ బుక్',
          description: 'Bank passbook front page or cancelled cheque showing IFSC & Account No',
          required: true,
          iconName: 'Landmark',
        },
        {
          id: 'death_certificate',
          name: 'Death Certificate (for claim)',
          teluguName: 'మరణ ధృవీకరణ పత్రం (క్లెయిమ్ కోసం)',
          description: 'Municipal / Gram Panchayat Death Certificate with official seal (if claim)',
          required: false,
          iconName: 'FileCheck',
        },
        {
          id: 'medical_reports',
          name: 'Medical Reports',
          teluguName: 'వైద్య నివేదికలు',
          description: 'Hospital admission records, diagnostic summaries & attending doctor cert',
          required: false,
          iconName: 'Activity',
        },
      ],
      tips: [
        'Ensure the Policy Bond has the official LIC branch seal and branch code.',
        'Name on Bank Passbook must exactly match the Policyholder / Nominee name.',
        'For claims, verify Death Certificate registration number on Govt portal.',
      ],
    };
  }

  // 2. Health Insurance matching ("Health", "Star Health", "HDFC Health", "Care", "Mediclaim")
  if (
    query.includes('health') ||
    query.includes('star') ||
    query.includes('mediclaim') ||
    query.includes('hospital') ||
    query.includes('care') ||
    query.includes('niva') ||
    query.includes('aditya birla health')
  ) {
    const displayName = query.includes('star')
      ? 'Star Health Insurance'
      : query.includes('hdfc')
      ? 'HDFC ERGO Health'
      : query.includes('care')
      ? 'Care Health Insurance'
      : 'Health Insurance';

    return {
      id: 'health-insurance',
      companyName: displayName,
      category: 'health',
      categoryTitle: `${displayName} - Documents Required:`,
      subtitle: 'Cashless Hospitalization & Reimbursement Claim Verification',
      tagline: 'Standard TPA and medical expense claim submission checklist',
      verifyButtonText: `Verify ${displayName} Documents - Upload Here`,
      documents: [
        {
          id: 'aadhaar',
          name: 'Aadhaar Card',
          teluguName: 'ఆధార్ కార్డు',
          description: 'Patient & primary insured identity verification with DOB',
          required: true,
          iconName: 'CreditCard',
        },
        {
          id: 'pan',
          name: 'PAN Card',
          teluguName: 'పాన్ కార్డు',
          description: 'Required for claims above ₹1,00,000 for tax and KYC verification',
          required: true,
          iconName: 'FileText',
        },
        {
          id: 'health_card',
          name: 'Health Card',
          teluguName: 'హెల్త్ కార్డు / TPA కార్డు',
          description: 'TPA Health Insurance Card or Digital Policy Membership ID',
          required: true,
          iconName: 'ShieldCheck',
        },
        {
          id: 'hospital_bills',
          name: 'Hospital Bills',
          teluguName: 'హాస్పిటల్ ఒరిజినల్ బిల్స్',
          description: 'Original itemized indoor hospital bills with detailed breakdown & money receipt',
          required: true,
          iconName: 'Receipt',
        },
        {
          id: 'prescription',
          name: 'Prescription',
          teluguName: 'డాక్టర్ ప్రిస్క్రిప్షన్',
          description: 'Original doctor consultation prescription papers with registration number',
          required: true,
          iconName: 'Stethoscope',
        },
        {
          id: 'discharge_summary',
          name: 'Discharge Summary',
          teluguName: 'డిశ్చార్జ్ సమ్మరీ (ఆసుపత్రి నివేదిక)',
          description: 'Detailed hospital discharge card stating diagnosis, history, and treatment',
          required: true,
          iconName: 'FileSpreadsheet',
        },
        {
          id: 'lab_reports',
          name: 'Lab Reports',
          teluguName: 'ల్యాబ్ రిపోర్టులు & టెస్ట్ ఫలితాలు',
          description: 'Blood test, X-Ray, MRI/CT scan, and pathology investigation reports',
          required: true,
          iconName: 'Activity',
        },
      ],
      tips: [
        'Check hospital registration number and GSTIN on bills to avoid fake hospital billing.',
        'Pharmacy bills must be accompanied by relevant doctor prescriptions.',
        'Discharge summary must mention precise date and time of admission and discharge.',
      ],
    };
  }

  // 3. Bike / Car / ICICI Lombard / Motor Insurance matching
  if (
    query.includes('bike') ||
    query.includes('car') ||
    query.includes('icici') ||
    query.includes('lombard') ||
    query.includes('motor') ||
    query.includes('two wheeler') ||
    query.includes('four wheeler') ||
    query.includes('vehicle') ||
    query.includes('auto')
  ) {
    const displayName = query.includes('icici')
      ? 'ICICI Lombard Motor Insurance'
      : query.includes('bike')
      ? 'Bike / Two-Wheeler Insurance'
      : query.includes('car')
      ? 'Car / Motor Insurance'
      : 'Motor & Vehicle Insurance';

    return {
      id: 'motor-insurance',
      companyName: displayName,
      category: 'motor',
      categoryTitle: `${displayName} - Documents Required:`,
      subtitle: 'Accident Damage, Own Damage (OD) & Third-Party (TP) Claim Verification',
      tagline: 'Mandatory transport authority and repair assessment documentation',
      verifyButtonText: `Verify ${displayName.split(' ')[0]} Documents - Upload Here`,
      documents: [
        {
          id: 'rc_book',
          name: 'RC Book (Registration Certificate)',
          teluguName: 'RC బుక్ (వాహన రిజిస్ట్రేషన్ పత్రం)',
          description: 'Smart card or original RC Book showing engine & chassis number',
          required: true,
          iconName: 'Truck',
        },
        {
          id: 'driving_license',
          name: 'Driving License',
          teluguName: 'డ్రైవింగ్ లైసెన్స్',
          description: 'Valid Driving License of the person driving at the time of accident',
          required: true,
          iconName: 'CreditCard',
        },
        {
          id: 'policy_copy',
          name: 'Policy Copy',
          teluguName: 'పాలసీ కాపీ',
          description: 'Comprehensive or Third Party insurance policy certificate',
          required: true,
          iconName: 'Award',
        },
        {
          id: 'fir_copy',
          name: 'FIR Copy',
          teluguName: 'పోలీస్ FIR కాపీ (అవసరమైతే)',
          description: 'Police First Information Report (Required for theft, third-party bodily injury)',
          required: false,
          iconName: 'FileWarning',
        },
        {
          id: 'repair_bills',
          name: 'Repair Bills',
          teluguName: 'రిపేర్ బిల్స్ & ఎస్టిమేట్',
          description: 'Authorized workshop detailed repair estimate and final cash receipts',
          required: true,
          iconName: 'Receipt',
        },
        {
          id: 'damage_photos',
          name: 'Damage Photos',
          teluguName: 'వాహన డ్యామేజ్ ఫోటోలు',
          description: 'Clear spot photos of vehicle damages with visible number plate',
          required: true,
          iconName: 'Camera',
        },
        {
          id: 'aadhaar',
          name: 'Aadhaar Card',
          teluguName: 'యజమాని ఆధార్ కార్డు',
          description: 'Vehicle registered owner identity proof',
          required: true,
          iconName: 'UserCheck',
        },
      ],
      tips: [
        'Ensure damage photos show the vehicle registration number clearly.',
        'Driving License must be valid on the exact date and time of the incident.',
        'FIR is mandatory in case of theft or severe third-party accident.',
      ],
    };
  }

  // 4. Crop / PM Fasal / Kisan / Farmer Insurance matching
  if (
    query.includes('crop') ||
    query.includes('pm fasal') ||
    query.includes('fasal') ||
    query.includes('pmfby') ||
    query.includes('kisan') ||
    query.includes('farmer') ||
    query.includes('rythu') ||
    query.includes('agriculture') ||
    query.includes('bima')
  ) {
    const displayName = 'Crop Insurance (PM Fasal Bima Yojana)';

    return {
      id: 'crop-insurance',
      companyName: displayName,
      category: 'crop',
      categoryTitle: `${displayName} - Documents Required:`,
      subtitle: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) & Rythu Bima Claims',
      tagline: 'Simple list for farmers to verify crop loss claims and avoid fraudulent middle-men',
      verifyButtonText: 'Verify Crop Insurance Documents - Upload Here',
      documents: [
        {
          id: 'aadhaar',
          name: 'Aadhaar Card',
          teluguName: 'ఆధార్ కార్డు',
          description: 'Farmer UID Aadhaar card linked with bank account and mobile number',
          required: true,
          iconName: 'CreditCard',
        },
        {
          id: 'land_records',
          name: 'Land Records',
          teluguName: 'భూమి రికార్డులు (పట్టాదారు పాస్ బుక్ / 1-B / 7/12)',
          description: 'Pattadar Passbook, 1-B RoR, or Khasra/Khatauni land ownership document',
          required: true,
          iconName: 'FileText',
        },
        {
          id: 'bank_passbook',
          name: 'Bank Passbook',
          teluguName: 'బ్యాంక్ పాస్ బుక్ (DBT లింక్డ్)',
          description: 'Bank passbook front page with IFSC & Account linked for DBT subsidy',
          required: true,
          iconName: 'Landmark',
        },
        {
          id: 'sowing_certificate',
          name: 'Sowing Certificate',
          teluguName: 'విత్తన ధృవీకరణ పత్రం (Sowing Certificate)',
          description: 'Village Revenue Officer (VRO) / Agriculture Officer crop sown certificate',
          required: true,
          iconName: 'Award',
        },
        {
          id: 'crop_damage_photos',
          name: 'Crop Damage Photos',
          teluguName: 'పంట నష్టం ఫోటోలు (జీయో-ట్యాగ్డ్)',
          description: 'Clear field photos showing inundation, drought, pest, or hail storm damage',
          required: true,
          iconName: 'Camera',
        },
      ],
      tips: [
        'Report crop damage within 72 hours of unseasonal rains or hailstorm.',
        'Make sure land survey numbers on the sowing certificate match your passbook.',
        'Never hand over original passbooks or pay bribes to unauthorized agents.',
      ],
    };
  }

  // 5. Default / Any other name
  const companyClean = rawQuery.trim() || 'General Insurance';
  const displayTitle = rawQuery.trim()
    ? `${companyClean.toUpperCase()} Insurance`
    : 'General Insurance';

  return {
    id: 'general-insurance',
    companyName: displayTitle,
    category: 'general',
    categoryTitle: `${displayTitle} - Documents Required:`,
    subtitle: 'Standard Comprehensive Insurance Claim Checklist',
    tagline: 'Standard mandatory KYC, policy agreement, and loss settlement documents',
    verifyButtonText: `Verify ${displayTitle} Documents - Upload Here`,
    documents: [
      {
        id: 'aadhaar',
        name: 'Aadhaar Card',
        teluguName: 'ఆధార్ కార్డు',
        description: 'Primary identity verification of the insured policyholder',
        required: true,
        iconName: 'CreditCard',
      },
      {
        id: 'pan',
        name: 'PAN Card',
        teluguName: 'పాన్ కార్డు',
        description: 'Permanent Account Number for KYC compliance and tax records',
        required: true,
        iconName: 'FileText',
      },
      {
        id: 'policy_copy',
        name: 'Policy Copy',
        teluguName: 'పాలసీ కాపీ',
        description: 'Official policy contract schedule showing coverages and validity dates',
        required: true,
        iconName: 'Award',
      },
      {
        id: 'bills',
        name: 'Bills & Payment Receipts',
        teluguName: 'బిల్స్ & పేమెంట్ రసీదులు',
        description: 'Original paid invoices, repair bills, or treatment invoices',
        required: true,
        iconName: 'Receipt',
      },
      {
        id: 'bank_details',
        name: 'Bank Details',
        teluguName: 'బ్యాంక్ వివరాలు (పాస్ బుక్ / చెక్)',
        description: 'Cancelled cheque or bank statement showing account holder name and IFSC',
        required: true,
        iconName: 'Landmark',
      },
    ],
    tips: [
      'Confirm that the policy number on receipts matches the master policy copy.',
      'Ensure clear, uncropped photos with all four corners of the document visible.',
      'Verification checks verify digital seals, metadata consistency, and tamper signs.',
    ],
  };
}

export const QUICK_SEARCH_CHIPS = [
  { label: 'LIC Life Insurance', query: 'LIC', icon: 'HeartPulse', popular: true },
  { label: 'Star Health', query: 'Star Health', icon: 'ShieldCheck', popular: true },
  { label: 'HDFC Health', query: 'HDFC Health', icon: 'PlusCircle', popular: false },
  { label: 'Bike Insurance', query: 'Bike', icon: 'Bike', popular: true },
  { label: 'Car / ICICI Lombard', query: 'ICICI Lombard', icon: 'Car', popular: false },
  { label: 'Crop / PM Fasal', query: 'PM Fasal', icon: 'Wheat', popular: true },
  { label: 'General Insurance', query: 'General', icon: 'FileSpreadsheet', popular: false },
];

export const DEMO_SAMPLE_DOCS = [
  {
    name: 'LIC_Original_Policy_Bond_No_84920481.pdf',
    type: 'Policy Bond',
    isFraud: false,
    label: 'Sample Genuine: LIC Policy Bond',
    description: 'Authentic LIC bond with watermark and valid QR code',
  },
  {
    name: 'Hospital_Bill_FAKE_Alteration_Photoshop.jpg',
    type: 'Hospital Bills',
    isFraud: true,
    label: 'Sample FAKE: Altered Hospital Bill',
    description: 'Forged invoice with inflated charges & mismatched fonts',
  },
  {
    name: 'PM_Fasal_Kisan_Passbook_Original.pdf',
    type: 'Land Records',
    isFraud: false,
    label: 'Sample Genuine: Kisan Pattadar Passbook',
    description: 'Verified land record with official Tehsildar stamp',
  },
  {
    name: 'Bike_RC_Book_FRAUD_Tampered_Plate.png',
    type: 'RC Book (Registration Certificate)',
    isFraud: true,
    label: 'Sample FAKE: Tampered RC Book',
    description: 'Altered chassis number and modified owner name',
  },
];
