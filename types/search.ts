export interface ServiceFilter {
  // Visa services
  visaTypes?: string[];
  visaCountries?: string[];

  // Non-visa services
  bankAccount?: boolean;
  driversLicense?: boolean;
  companyRegistration?: boolean;
  translation?: boolean;
  realEstate?: boolean;

  // Service categories
  categories?: string[];
  primaryCategory?: string[];

  // Expertise level
  visaExpertise?: ("basic" | "advanced" | "expert")[];

  // Location and other existing filters
  city?: string;
  verified?: boolean;
}

export type SortOption =
  | "name"
  | "rating"
  | "verified"
  | "location"
  | "featured";

export interface SearchFilters {
  query?: string;
  city?: string;
  visaType?: string;
  language?: string;
  verified?: boolean;
  serviceFilter?: ServiceFilter;
  sortBy?: SortOption;
}
