export interface Location {
  city: string;
  province: string;
  district: string;
  address: string;
  addressTh: string;
  coordinates?: { lat: number; lng: number };
  isMainOffice: boolean;
}

export interface ReviewData {
  source: "google_api" | "manual_entry";
  lastUpdated: Date;
  rating: number;
  totalReviews: number;
  reviewsUrl: string;
}

export interface VerificationStatus {
  status: "unverified" | "pending" | "verified";
  type?: "in_person" | "business_registration" | "documents";
  date?: Date;
  registrationNumber?: string;
  notes?: string;
}

export interface ServiceCategories {
  thaiVisas: {
    types: string[];
    specialties: string[];
    expertise: "basic" | "advanced" | "expert";
  };
  foreignVisas: {
    countries: string[];
    specialties: string[];
    expertise: "basic" | "advanced" | "expert";
  };
  financialServices: {
    bankAccount: boolean;
    bankAccountTypes?: string[];
    insurance: boolean;
    insuranceTypes?: string[];
    mortgageAssistance: boolean;
  };
  legalServices: {
    companyRegistration: boolean;
    workPermit: boolean;
    marriageRegistration: boolean;
    willsAndProbate: boolean;
    contractReview: boolean;
    legalConsultation: boolean;
  };
  governmentServices: {
    driversLicense: boolean;
    taxId: boolean;
    residenceCertificate: boolean;
    policeCheck: boolean;
    extensionOfStay: boolean;
  };
  businessServices: {
    accountingServices: boolean;
    taxFiling: boolean;
    auditServices: boolean;
    businessLicensing: boolean;
    intellectualProperty: boolean;
  };
  personalServices: {
    translation: boolean;
    translationLanguages?: string[];
    notarization: boolean;
    apostille: boolean;
    documentAuthentication: boolean;
  };
  technologyServices: {
    phoneSimCard: boolean;
    internetSetup: boolean;
    bankingAppSetup: boolean;
    digitalWalletSetup: boolean;
  };
  realEstateServices: {
    propertySearch: boolean;
    propertyLegal: boolean;
    rentAgreements: boolean;
    propertyManagement: boolean;
  };
  primaryCategory:
    | "visa-specialist"
    | "full-service"
    | "legal-services"
    | "business-services";
  serviceCategories: string[];
}

export interface Agency {
  id: string;
  slug: string;
  name: string;
  nameTh: string;
  description: string;
  descriptionTh: string;
  services: ServiceCategories;
  locations: Location[];
  contact: {
    phone: string[];
    email?: string;
    website?: string;
    line?: string;
    whatsapp?: string;
  };
  googlePlaceId?: string;
  reviewData?: ReviewData;
  verification: VerificationStatus;
  image?: string;
  languages: string[];
  established?: number;
  licenses?: string[];
  specialties?: string[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
