# CLAUDE.md - Visa Services Thailand Directory Project

## Project Overview

**Domain:** `visaservicesthailand.directory` (registered on Porkbun)

**Repository:** `git@github.com:ReynoldsWJ55/visaservicesthailand.git`

**Purpose:** A multilingual (Thai/English/Chinese) directory website for visa services in Thailand, serving:

1. Foreigners seeking Thai visa services
2. Thai citizens seeking foreign visa services

**Scope:** Nationwide coverage, starting with Bangkok and expanding to major cities

## Technical Stack

### Core Technologies

- **Framework:** Next.js 15+ with App Router (static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Hosting:** Cloudflare Pages (free tier)
- **Analytics:** Plausible (privacy-focused)
- **Forms:** Formspree with reCAPTCHA
- **Internationalization:** next-intl (en, th, zh)
- **Search:** Client-side with Fuse.js
- **Database:** PostgreSQL via Supabase (future) / JSON files (start)
- **Icons:** Custom SVG components (no emoji)

### Development Setup

```bash
# Create new project
npx create-next-app@latest visa-services-thailand --typescript --tailwind --app

# Install dependencies
npm install next-intl fuse.js react-google-recaptcha-v3 framer-motion @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time
npm install -D @types/node eslint prettier prettier-tailwindcss-plugin @types/mdx

# Git setup
git init
git remote add origin git@github.com:ReynoldsWJ55/visaservicesthailand.git

# Environment setup
cp .env.example .env.local
# Edit .env.local with your API keys

# Cloudflare-specific config with MDX support
# next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false,
  },
});
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Export static site for Cloudflare Pages
npm run export

# Run both build and export
npm run build:export

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check

# Run all quality checks
npm run check-all
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "build:export": "npm run build && npm run export",
    "start": "next start",
    "type-check": "tsc --noEmit",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check-all": "npm run type-check && npm run lint && npm run format:check"
  }
}
```

### Testing Setup

```bash
# Install testing dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# Test commands
npm run test          # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### ESLint & Prettier Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Project Structure

```text
visa-services-thailand/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── agencies/
│   │   │   ├── page.tsx
│   │   │   ├── [city]/page.tsx
│   │   │   └── [city]/[slug]/page.tsx
│   │   ├── thai-visas/
│   │   │   └── [type]/page.tsx
│   │   ├── foreign-visas/
│   │   │   └── [country]/page.tsx
│   │   └── guides/
│   │       └── [slug]/page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── icons/
│   │   └── index.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   ├── navigation/
│   │   └── BreadcrumbNav.tsx
│   └── agencies/
│       ├── AgencyCard.tsx
│       ├── AgencyList.tsx
│       ├── SearchFilters.tsx
│       └── VerificationBadge.tsx
├── data/
│   ├── agencies.ts
│   └── cities.ts
├── lib/
│   ├── search.ts
│   ├── utils.ts
│   ├── seo.ts
│   ├── indexnow.ts
│   └── mdx.ts
├── content/
│   └── blog/
│       ├── thai-tourist-visa-guide-2024.mdx
│       ├── retirement-visa-thailand-complete-guide.mdx
│       └── business-visa-requirements-bangkok.mdx
├── messages/
│   ├── en.json
│   ├── th.json
│   └── zh.json
└── public/
    └── agencies/
```

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://visaservicesthailand.directory

# Google APIs
GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY=

# Form Handling
NEXT_PUBLIC_FORMSPREE_ENDPOINT=
NEXT_PUBLIC_FORMSPREE_AGENCY_INQUIRY=
NEXT_PUBLIC_FORMSPREE_GENERAL_CONTACT=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=visaservicesthailand.directory
NEXT_PUBLIC_PLAUSIBLE_API_KEY=

# Internal
ADMIN_EMAIL=
NOTIFICATION_WEBHOOK=

# SEO & Indexing
NEXT_PUBLIC_INDEXNOW_KEY=your-indexnow-key-here
NEXT_PUBLIC_SITE_VERIFICATION_GOOGLE=
NEXT_PUBLIC_SITE_VERIFICATION_BING=
```

## Data Models

```typescript
// types/agency.ts
interface Agency {
  id: string;
  slug: string;
  name: string;
  nameTh: string;
  description: string;
  descriptionTh: string;

  // Services - Comprehensive multi-service support
  services: {
    // Primary visa services
    thaiVisas: {
      types: string[]; // ['retirement', 'business', 'tourist', 'education', 'dtv']
      specialties: string[]; // ['urgent-processing', 'complex-cases', 'renewal-specialist']
      expertise: 'basic' | 'advanced' | 'expert';
    };
    foreignVisas: {
      countries: string[]; // ['usa', 'uk', 'schengen', 'australia', 'canada', 'china']
      specialties: string[]; // ['business-travel', 'family-reunion', 'student-visas']
      expertise: 'basic' | 'advanced' | 'expert';
    };
    
    // Additional services many agencies offer
    financialServices: {
      bankAccount: boolean;
      bankAccountTypes?: string[]; // ['savings', 'current', 'fixed-deposit']
      insurance: boolean;
      insuranceTypes?: string[]; // ['health', 'vehicle', 'life', 'travel']
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
      translationLanguages?: string[]; // ['thai-english', 'thai-chinese', 'english-chinese']
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
    
    // Service categories for easy filtering
    primaryCategory: 'visa-specialist' | 'full-service' | 'legal-services' | 'business-services';
    serviceCategories: string[]; // ['visas', 'banking', 'legal', 'government', 'business', 'personal', 'real-estate']
  };

  // Location(s)
  locations: Location[];

  // Contact
  contact: {
    phone: string[];
    email?: string;
    website?: string;
    line?: string;
    whatsapp?: string;
  };

  // Google Reviews
  googlePlaceId?: string;
  reviewData?: {
    source: "google_api" | "manual_entry";
    lastUpdated: Date;
    rating: number;
    totalReviews: number;
    reviewsUrl: string;
  };

  // Verification
  verification: {
    status: "unverified" | "pending" | "verified";
    type?: "in_person" | "business_registration" | "documents";
    date?: Date;
    registrationNumber?: string; // DBD registration number
    notes?: string; // Internal use only
  };

  // Meta
  image?: string; // Optional agency photo
  languages: string[];
  established?: number;
  licenses?: string[];
  specialties?: string[];

  // Status
  featured: boolean; // Paid featured listing
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Location {
  city: string;
  province: string;
  district: string;
  address: string;
  addressTh: string;
  coordinates?: { lat: number; lng: number };
  isMainOffice: boolean;
}
```

## Multi-Service Agency UI/UX Design

### Service Discovery & Filtering

```typescript
// types/search.ts - Enhanced search for multi-service agencies
interface ServiceFilter {
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
  visaExpertise?: ('basic' | 'advanced' | 'expert')[];
  
  // Location and other existing filters
  city?: string;
  verified?: boolean;
}

// Enhanced search component
export function ServiceFilterPanel() {
  const [filters, setFilters] = useState<ServiceFilter>({});
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['visas']);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Find Services</h3>
      
      {/* Quick Service Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <ServiceQuickFilter 
          icon="visa"
          label="Visa Services"
          active={filters.categories?.includes('visas')}
          onClick={() => toggleFilter('categories', 'visas')}
        />
        <ServiceQuickFilter 
          icon="bank"
          label="Bank Account"
          active={filters.bankAccount}
          onClick={() => setFilters({...filters, bankAccount: !filters.bankAccount})}
        />
        <ServiceQuickFilter 
          icon="license"
          label="Driver's License"
          active={filters.driversLicense}
          onClick={() => setFilters({...filters, driversLicense: !filters.driversLicense})}
        />
        <ServiceQuickFilter 
          icon="business"
          label="Company Setup"
          active={filters.companyRegistration}
          onClick={() => setFilters({...filters, companyRegistration: !filters.companyRegistration})}
        />
      </div>

      {/* Expandable Category Filters */}
      <div className="space-y-4">
        <FilterCategory
          title="Visa Services"
          icon="passport"
          expanded={expandedCategories.includes('visas')}
          onToggle={() => toggleCategory('visas')}
        >
          <div className="grid grid-cols-2 gap-2">
            {THAI_VISA_TYPES.map(visa => (
              <label key={visa} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.visaTypes?.includes(visa)}
                  onChange={() => toggleFilter('visaTypes', visa)}
                />
                <span className="ml-2 text-sm">{visa}</span>
              </label>
            ))}
          </div>
        </FilterCategory>

        <FilterCategory
          title="Financial Services"
          icon="bank"
          expanded={expandedCategories.includes('financial')}
          onToggle={() => toggleCategory('financial')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.bankAccount}
                onChange={() => setFilters({...filters, bankAccount: !filters.bankAccount})}
              />
              <span className="ml-2 text-sm">Bank Account Opening</span>
            </label>
            {/* Add more financial services */}
          </div>
        </FilterCategory>

        <FilterCategory
          title="Government Services"
          icon="government"
          expanded={expandedCategories.includes('government')}
          onToggle={() => toggleCategory('government')}
        >
          <div className="space-y-2">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={filters.driversLicense}
                onChange={() => setFilters({...filters, driversLicense: !filters.driversLicense})}
              />
              <span className="ml-2 text-sm">Driver's License</span>
            </label>
            {/* Add more government services */}
          </div>
        </FilterCategory>
      </div>
    </div>
  );
}
```

### Enhanced Agency Card Display

```typescript
// components/agencies/AgencyCard.tsx - Multi-service version
export function MultiServiceAgencyCard({ agency }: { agency: Agency }) {
  const [showAllServices, setShowAllServices] = useState(false);
  const primaryServices = getPrimaryServices(agency);
  const additionalServices = getAdditionalServices(agency);

  return (
    <motion.article
      whileHover={cardHover}
      className="border rounded-lg p-6 bg-white"
      aria-labelledby={`agency-${agency.id}-name`}
    >
      <header className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold">{agency.name}</h3>
            <AgencyTypeBadge type={agency.services.primaryCategory} />
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            {agency.locations[0].district}, {agency.locations[0].city}
          </p>
          
          {/* Primary Services - Always Visible */}
          <div className="flex flex-wrap gap-2 mb-3">
            {primaryServices.map((service) => (
              <ServiceBadge 
                key={service.id}
                service={service}
                type="primary"
                expertise={service.expertise}
              />
            ))}
          </div>
        </div>
        
        <VerificationBadge verification={agency.verification} />
      </header>

      <div className="text-gray-700 mb-4 text-sm">
        {agency.description}
      </div>

      {/* Additional Services - Collapsible */}
      {additionalServices.length > 0 && (
        <div className="mb-4">
          <motion.button
            onClick={() => setShowAllServices(!showAllServices)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-2"
            whileTap={{ scale: 0.95 }}
          >
            <span>
              {showAllServices ? 'Hide' : 'Show'} additional services 
              ({additionalServices.length})
            </span>
            <motion.svg
              animate={{ rotate: showAllServices ? 180 : 0 }}
              className="w-4 h-4 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </motion.svg>
          </motion.button>
          
          <AnimatePresence>
            {showAllServices && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2">
                  {additionalServices.map((service) => (
                    <ServiceBadge 
                      key={service.id}
                      service={service}
                      type="secondary"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Service Combination Suggestions */}
      {getServiceCombinations(agency).length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Popular Service Combinations:
          </h4>
          <div className="flex flex-wrap gap-2">
            {getServiceCombinations(agency).map((combo) => (
              <span key={combo} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {combo}
              </span>
            ))}
          </div>
        </div>
      )}

      <footer className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {agency.reviewData && (
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-500" filled />
              <span className="text-sm font-medium">{agency.reviewData.rating}</span>
              <span className="text-xs text-gray-500">
                ({agency.reviewData.totalReviews})
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <ContactButton 
            href={`tel:${agency.contact.phone[0]}`}
            icon={<PhoneIcon className="w-4 h-4" />}
            label={`Call ${agency.name}`}
          />
          <Link
            href={`/agencies/${agency.slug}`}
            className="btn-primary text-sm"
          >
            View All Services & Details
          </Link>
        </div>
      </footer>
    </motion.article>
  );
}

// Helper components
function AgencyTypeBadge({ type }: { type: Agency['services']['primaryCategory'] }) {
  const config = {
    'visa-specialist': { label: 'Visa Specialist', color: 'blue' },
    'full-service': { label: 'Full Service', color: 'green' },
    'legal-services': { label: 'Legal Services', color: 'purple' },
    'business-services': { label: 'Business Services', color: 'orange' }
  };

  const { label, color } = config[type];
  
  return (
    <span className={`px-2 py-1 text-xs rounded-full bg-${color}-100 text-${color}-800`}>
      {label}
    </span>
  );
}

function ServiceBadge({ 
  service, 
  type = 'primary',
  expertise 
}: { 
  service: any; 
  type?: 'primary' | 'secondary';
  expertise?: string;
}) {
  const baseClasses = "px-2 py-1 text-xs rounded flex items-center gap-1";
  const typeClasses = type === 'primary' 
    ? "bg-blue-100 text-blue-800 font-medium" 
    : "bg-gray-100 text-gray-700";
  
  return (
    <span className={`${baseClasses} ${typeClasses}`}>
      <ServiceIcon type={service.category} />
      {service.label}
      {expertise && expertise !== 'basic' && (
        <ExpertiseBadge level={expertise} />
      )}
    </span>
  );
}

function ExpertiseBadge({ level }: { level: 'advanced' | 'expert' }) {
  return (
    <span className="ml-1">
      {level === 'expert' ? '⭐⭐⭐' : '⭐⭐'}
    </span>
  );
}

// Service utility functions
function getPrimaryServices(agency: Agency) {
  const services = [];
  
  // Add visa services as primary
  if (agency.services.thaiVisas.types.length > 0) {
    services.push({
      id: 'thai-visas',
      label: `Thai Visas (${agency.services.thaiVisas.types.length})`,
      category: 'visa',
      expertise: agency.services.thaiVisas.expertise
    });
  }
  
  if (agency.services.foreignVisas.countries.length > 0) {
    services.push({
      id: 'foreign-visas',
      label: `Foreign Visas (${agency.services.foreignVisas.countries.length})`,
      category: 'visa',
      expertise: agency.services.foreignVisas.expertise
    });
  }
  
  return services.slice(0, 3); // Limit primary services display
}

function getAdditionalServices(agency: Agency) {
  const services = [];
  
  // Add non-visa services
  if (agency.services.financialServices.bankAccount) {
    services.push({ id: 'bank-account', label: 'Bank Account', category: 'financial' });
  }
  
  if (agency.services.governmentServices.driversLicense) {
    services.push({ id: 'drivers-license', label: 'Driver\'s License', category: 'government' });
  }
  
  if (agency.services.legalServices.companyRegistration) {
    services.push({ id: 'company-setup', label: 'Company Registration', category: 'legal' });
  }
  
  if (agency.services.personalServices.translation) {
    services.push({ id: 'translation', label: 'Translation Services', category: 'personal' });
  }
  
  // Add more services based on agency configuration
  
  return services;
}

function getServiceCombinations(agency: Agency) {
  const combinations = [];
  
  // Define popular service combinations
  if (agency.services.thaiVisas.types.includes('retirement') && 
      agency.services.financialServices.bankAccount) {
    combinations.push('Retirement Visa + Bank Account');
  }
  
  if (agency.services.thaiVisas.types.includes('business') && 
      agency.services.legalServices.companyRegistration) {
    combinations.push('Business Visa + Company Setup');
  }
  
  if (agency.services.governmentServices.driversLicense && 
      agency.services.financialServices.bankAccount) {
    combinations.push('Driver\'s License + Banking');
  }
  
  return combinations;
}
```

### Service-Specific Landing Pages

```typescript
// app/[locale]/services/[service]/page.tsx
export default function ServicePage({ params }: { params: { service: string, locale: string }}) {
  const agencies = getAgenciesByService(params.service);
  
  return (
    <div>
      <ServiceHero service={params.service} />
      
      {/* Service-specific filters */}
      <ServiceSpecificFilters service={params.service} />
      
      {/* Agencies grouped by expertise/category */}
      <div className="space-y-8">
        <ExpertAgencies agencies={agencies.filter(a => hasExpertise(a, params.service))} />
        <AllAgencies agencies={agencies} />
      </div>
      
      {/* Related services suggestions */}
      <RelatedServices currentService={params.service} />
    </div>
  );
}

// Example URLs:
// /services/bank-account
// /services/company-registration  
// /services/drivers-license
// /services/thai-retirement-visa
```

## Enhanced Blog Frontmatter

```yaml
---
# Basic Information
title: "Complete Guide to Opening a Thai Bank Account for Foreigners in 2024"
description: "Step-by-step guide to opening a bank account in Thailand as a foreigner, including requirements, best banks, and agency assistance options."
excerpt: "Learn how to open a Thai bank account as a foreigner with our comprehensive 2024 guide covering all major banks, requirements, and professional assistance options."

# Publishing Details
publishedAt: "2024-01-15T10:00:00+07:00"
updatedAt: "2024-03-20T14:30:00+07:00"
status: "published" # draft, published, archived
featured: true
sticky: false # Pin to top of blog

# Content Classification
category: "banking-guides" # visa-guides, banking-guides, legal-guides, government-services, expat-tips
subcategory: "bank-accounts"
tags: 
  - "thai-bank-account"
  - "banking-for-foreigners"
  - "expat-banking"
  - "visa-requirements"
  - "financial-services"
topicTags:
  - "Bangkok Bank"
  - "Kasikorn Bank" 
  - "SCB"
  - "bank requirements"
difficulty: "intermediate" # beginner, intermediate, advanced
estimatedReadTime: 12 # minutes

# Author & Attribution
author: 
  name: "Sarah Thompson"
  role: "Banking Specialist"
  bio: "Expat banking consultant with 8 years experience helping foreigners navigate Thai financial services"
  avatar: "/authors/sarah-thompson.jpg"
  social:
    linkedin: "https://linkedin.com/in/sarahthompson"
    twitter: "@sarahthaibanking"
contributors:
  - "Legal Team Review"
  - "Banking Partner Verification"
reviewedBy: "Thai Banking Expert Panel"
reviewDate: "2024-03-15"

# SEO & Marketing
seo:
  metaTitle: "How to Open Thai Bank Account 2024: Complete Foreigner Guide | Visa Services Thailand"
  metaDescription: "Open a Thai bank account as a foreigner in 2024. Complete guide with requirements, best banks, document lists, and professional assistance options. Updated requirements."
  keywords:
    primary: "thai bank account for foreigners"
    secondary:
      - "open bank account thailand foreigner"
      - "thai bank account requirements 2024"
      - "bangkok bank foreigner account"
      - "kasikorn bank foreign account"
      - "thailand banking for expats"
    longTail:
      - "how to open bank account thailand without work permit"
      - "best thai bank for foreigners 2024"
      - "thai bank account tourist visa"
      - "bangkok bank foreigner requirements"
      - "thailand bank account visa types"
  canonicalUrl: "https://visaservicesthailand.directory/blog/thai-bank-account-foreigners-guide-2024"
  focusKeyword: "thai bank account for foreigners"
  keywordDensity: 1.2 # target percentage

# Social Media
social:
  ogImage: "/blog/images/thai-bank-account-guide-2024-og.jpg"
  ogImageAlt: "Guide to opening Thai bank account for foreigners with bank logos and documents"
  twitterImage: "/blog/images/thai-bank-account-guide-2024-twitter.jpg"
  socialTitle: "Complete Guide: Open a Thai Bank Account as a Foreigner (2024)"
  socialDescription: "Everything you need to know about opening a Thai bank account in 2024. Requirements, best banks, and agency assistance options."

# Content Structure
tableOfContents: true
sections:
  - "Bank Requirements Overview"
  - "Major Thai Banks Comparison"
  - "Required Documents"
  - "Step-by-Step Process"
  - "Common Challenges"
  - "Agency Assistance Options"
  - "Frequently Asked Questions"

# Targeting & Personalization
audience:
  primary: "expats-thailand"
  secondary: ["tourists-long-term", "business-investors", "retirees-thailand"]
visaTypes: ["tourist", "business", "retirement", "education", "elite"]
locations: ["bangkok", "phuket", "chiang-mai", "pattaya"]
demographics:
  countries: ["usa", "uk", "australia", "germany", "canada", "china", "japan"]
  ageGroups: ["25-35", "35-50", "50-65"]

# Content Features
hasVideo: true
videoUrl: "https://youtube.com/watch?v=bank-account-guide"
videoDuration: "PT8M30S" # ISO 8601 duration
hasInfographic: true
infographicUrl: "/blog/images/thai-bank-process-infographic.jpg"
hasDownload: true
downloadUrl: "/downloads/thai-bank-account-checklist.pdf"
downloadTitle: "Thai Bank Account Opening Checklist"

# Internal Linking
relatedPosts:
  - "thai-retirement-visa-banking-requirements"
  - "best-banks-foreigners-thailand-2024"
  - "thailand-tax-id-number-guide"
relatedServices:
  - "bank-account-assistance"
  - "financial-documentation"
  - "visa-for-banking"
relatedAgencies:
  - "siam-legal-international"
  - "bangkok-visa-centre"

# Monetization & Conversion
cta:
  primary:
    text: "Get Professional Bank Account Assistance"
    url: "/services/bank-account-opening"
    type: "service"
  secondary:
    text: "Download Free Banking Checklist"
    url: "/downloads/banking-checklist"
    type: "lead-magnet"
affiliateDisclosure: false
sponsoredContent: false

# Analytics & Tracking
analytics:
  campaignSource: "blog"
  campaignMedium: "organic"
  campaignName: "banking-guide-2024"
  contentGroup: "banking-guides"
  
# Content Warnings & Legal
disclaimers:
  - "Banking requirements can change. Verify current requirements with banks."
  - "This guide is for informational purposes only, not financial advice."
lastVerified: "2024-03-20"
nextReview: "2024-06-20"
legalNotice: "Content reviewed by Thai banking law specialists"

# Schema.org Enhancement
schema:
  "@type": "HowTo"
  estimatedCost: "0-5000 THB"
  totalTime: "PT2H" # 2 hours
  supply: ["passport", "visa", "residence-certificate", "embassy-letter"]
  tool: ["bank-forms", "translation-services"]

# Language & Localization
locale: "en"
alternateLanguages:
  th: "/th/blog/tai-bank-account-foreigners-guide-2024"
  zh: "/zh/blog/thai-bank-account-foreigners-guide-2024"
readingLevel: "grade-9" # Grade level
translationStatus: "needs-translation" # translated, needs-translation, in-progress

# Performance & Technical
priority: "high" # high, medium, low - for sitemap
changeFrequency: "monthly" # for sitemap
imageOptimization: true
lazyLoadImages: true
enableComments: true
enableSocialSharing: true

# Content Quality Metrics
wordsCount: 3500
imageCount: 8
internalLinks: 12
externalLinks: 5
readabilityScore: 65 # Flesch reading ease
grammarScore: 95 # Grammarly score
---
```

## Complete Project Dependencies

```json
{
  "name": "visa-services-thailand",
  "version": "1.0.0",
  "description": "Multilingual visa services directory for Thailand",
  "dependencies": {
    // Core Next.js & React
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    
    // Internationalization
    "next-intl": "^3.0.0",
    
    // Styling & UI
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "@headlessui/react": "^1.7.17", // Accessible UI components
    "@heroicons/react": "^2.0.18", // Icon library
    "class-variance-authority": "^0.7.0", // Dynamic classes
    "clsx": "^2.0.0", // Conditional classes
    "tailwind-merge": "^2.0.0", // Merge Tailwind classes
    
    // Animation
    "framer-motion": "^10.16.4",
    
    // MDX & Content
    "@next/mdx": "^14.0.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "gray-matter": "^4.0.3", // Frontmatter parsing
    "reading-time": "^1.5.0", // Reading time calculation
    "remark": "^15.0.1", // Markdown processor
    "remark-gfm": "^4.0.0", // GitHub Flavored Markdown
    "rehype": "^13.0.1", // HTML processor
    "rehype-highlight": "^7.0.0", // Syntax highlighting
    "rehype-slug": "^6.0.0", // Add IDs to headings
    "rehype-autolink-headings": "^7.0.0", // Auto-link headings
    
    // Search & Filtering
    "fuse.js": "^7.0.0", // Fuzzy search
    "@tanstack/react-query": "^5.0.0", // Data fetching/caching
    "use-debounce": "^10.0.0", // Debounced search
    
    // Forms & Validation
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.4", // Schema validation
    "@hookform/resolvers": "^3.3.2",
    "react-google-recaptcha-v3": "^1.10.1",
    
    // Maps & Location
    "@googlemaps/react-wrapper": "^1.1.35",
    "@googlemaps/js-api-loader": "^1.16.2",
    
    // Date handling
    "date-fns": "^2.30.0",
    "date-fns-tz": "^2.0.0", // Timezone support
    
    // Utilities
    "lodash.debounce": "^4.0.8",
    "uuid": "^9.0.1",
    "slugify": "^1.6.6", // URL slug generation
    
    // Image handling
    "sharp": "^0.32.6", // Image optimization
    "next-cloudinary": "^5.0.0", // Cloudinary integration (future)
    
    // Analytics & SEO
    "next-sitemap": "^4.2.3", // Sitemap generation
    "@vercel/analytics": "^1.1.1", // Vercel Analytics
    "next-seo": "^6.4.0", // SEO optimization
    
    // Data handling (future database migration)
    "@supabase/supabase-js": "^2.38.0", // Supabase client
    "prisma": "^5.6.0", // Database ORM
    "@prisma/client": "^5.6.0",
    
    // API & External Services
    "axios": "^1.6.0", // HTTP client
    "ky": "^1.0.0", // Modern fetch wrapper
    
    // Performance monitoring
    "@sentry/nextjs": "^7.77.0", // Error tracking
    "web-vitals": "^3.5.0", // Core Web Vitals
    
    // Development Quality
    "husky": "^8.0.3", // Git hooks
    "lint-staged": "^15.0.2", // Lint staged files
    "commitizen": "^4.3.0", // Conventional commits
    "@commitlint/cli": "^18.0.0",
    "@commitlint/config-conventional": "^18.0.0"
  },
  "devDependencies": {
    // TypeScript
    "typescript": "^5.2.2",
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@types/node": "^20.8.10",
    "@types/mdx": "^2.0.9",
    "@types/uuid": "^9.0.6",
    "@types/lodash.debounce": "^4.0.9",
    
    // Testing
    "jest": "^29.7.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^6.1.4",
    "@testing-library/user-event": "^14.5.1",
    "jest-environment-jsdom": "^29.7.0",
    "playwright": "^1.40.0", // E2E testing
    "@playwright/test": "^1.40.0",
    
    // Linting & Formatting
    "eslint": "^8.53.0",
    "eslint-config-next": "^14.0.0",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "eslint-plugin-jsx-a11y": "^6.8.0", // Accessibility linting
    "eslint-plugin-import": "^2.29.0",
    "prettier": "^3.0.3",
    "prettier-plugin-tailwindcss": "^0.5.7",
    
    // Build & Development
    "@tailwindcss/typography": "^0.5.10", // Better typography
    "@tailwindcss/forms": "^0.5.7", // Form styling
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "tailwindcss-animate": "^1.0.7", // Animation utilities
    
    // Documentation
    "typedoc": "^0.25.3", // API documentation
    "storybook": "^7.5.3", // Component documentation
    "@storybook/nextjs": "^7.5.3",
    
    // Performance Analysis
    "@next/bundle-analyzer": "^14.0.0",
    "lighthouse": "^11.2.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check-all": "npm run type-check && npm run lint && npm run format:check && npm run test",
    "build:analyze": "ANALYZE=true npm run build",
    "postbuild": "next-sitemap",
    "generate:prisma": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "docs:build": "typedoc",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lighthouse": "lighthouse http://localhost:3000 --output-path=./lighthouse-report.html",
    "prepare": "husky install"
  }
}
```

### Future Feature Dependencies

```json
{
  "futureFeatures": {
    "authentication": {
      "dependencies": [
        "next-auth", // Authentication
        "@auth/prisma-adapter", // Database adapter
        "@auth/supabase-adapter" // Supabase adapter
      ]
    },
    "payments": {
      "dependencies": [
        "stripe", // Payment processing
        "@stripe/stripe-js",
        "@stripe/react-stripe-js"
      ]
    },
    "realtimeFeatures": {
      "dependencies": [
        "socket.io-client", // Real-time updates
        "pusher-js", // Real-time notifications
        "@supabase/realtime-js" // Supabase realtime
      ]
    },
    "advancedSearch": {
      "dependencies": [
        "elasticsearch", // Advanced search
        "@elastic/elasticsearch",
        "algoliasearch", // Alternative search
        "@algolia/client-search"
      ]
    },
    "mobileApp": {
      "dependencies": [
        "react-native", // Mobile development
        "@react-native-community/cli",
        "expo" // Expo for rapid development
      ]
    },
    "advancedAnalytics": {
      "dependencies": [
        "mixpanel-browser", // Advanced analytics
        "hotjar", // User behavior
        "@fullstory/browser" // Session replay
      ]
    },
    "automation": {
      "dependencies": [
        "puppeteer", // Web scraping
        "cheerio", // HTML parsing
        "node-cron" // Scheduled tasks
      ]
    }
  }
}
```

## Language Strategy

### Three-Language Approach

- **English (en)**: Full content + agency listings
- **Thai (th)**: Full content + agency listings
- **Chinese (zh)**: UI/navigation only, agency listings displayed in English

```typescript
// messages/zh.json
{
  "nav": {
    "findAgencies": "查找代理机构",
    "thaiVisas": "泰国签证",
    "foreignVisas": "外国签证",
    "guides": "指南"
  },
  "search": {
    "placeholder": "搜索签证服务...",
    "filters": "筛选",
    "sortBy": "排序方式"
  },
  "agency": {
    "viewDetails": "查看详情",
    "contact": "联系方式",
    "verified": "已验证",
    "featured": "推荐"
  },
  "notice": {
    "listingsInEnglish": "代理机构信息以英文显示"
  }
}
```

## Design System

```css
/* Color Palette - Clean, minimal, professional */
:root {
  --primary: #1e40af; /* Professional blue */
  --primary-dark: #1e3a8a;
  --secondary: #10b981; /* Success green */
  --text-primary: #111827; /* Almost black */
  --text-secondary: #6b7280;
  --background: #ffffff;
  --background-alt: #f9fafb;
  --border: #e5e7eb;
  --error: #ef4444;
  --warning: #f59e0b;
}

/* Typography */
font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Components follow minimal, clean design */
/* No emojis - use custom SVG icons only */
```

## Custom Icons

```typescript
// components/icons/index.tsx
export const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

export const StarIcon = ({
  className,
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const LocationIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
```

## Animation & UX Guidelines

### Framer Motion - Minimal Animations

```typescript
// components/ui/FadeIn.tsx
import { motion } from "framer-motion";

export function FadeIn({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Page transitions
export const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
};

// Hover animations for cards
export const cardHover = {
  scale: 1.02,
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  transition: { duration: 0.2 }
};

// Stagger children animations
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};
```

### Breadcrumb Navigation

```typescript
// components/navigation/BreadcrumbNav.tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("breadcrumb");

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
            aria-label={t("home")}
          >
            {t("home")}
          </Link>
        </li>
        {items.map((item, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <svg 
              className="w-4 h-4 mx-2 text-gray-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            {item.current ? (
              <span 
                className="text-gray-900 font-medium" 
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href!}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}

// Usage examples:
// Homepage: Home
// City page: Home > Bangkok Visa Agencies
// Agency page: Home > Bangkok Visa Agencies > Siam Legal International
// Visa type: Home > Thai Visas > Retirement Visa Information
// Guide: Home > Visa Guides > Complete Guide to Thai Tourist Visas
```

## Accessibility & ARIA Implementation

### Core Accessibility Principles

```typescript
// components/agencies/AgencyCard.tsx - Accessible version
export function AgencyCard({ agency, isFeatured = false }: AgencyCardProps) {
  return (
    <motion.article
      whileHover={cardHover}
      className={`
        border rounded-lg p-6 bg-white transition-shadow
        ${isFeatured ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
      `}
      role="article"
      aria-labelledby={`agency-${agency.id}-name`}
      aria-describedby={`agency-${agency.id}-description`}
    >
      <header className="flex justify-between items-start mb-4">
        <div>
          <h3 
            id={`agency-${agency.id}-name`}
            className="text-xl font-semibold text-gray-900"
          >
            <Link 
              href={`/agencies/${agency.slug}`}
              className="hover:text-blue-600 focus:text-blue-600 focus:outline-none"
              aria-describedby={`agency-${agency.id}-location`}
            >
              {agency.name}
            </Link>
          </h3>
          <p 
            id={`agency-${agency.id}-location`}
            className="text-sm text-gray-600"
            aria-label={`Located in ${agency.locations[0].district}, ${agency.locations[0].city}`}
          >
            {agency.locations[0].district}, {agency.locations[0].city}
          </p>
        </div>
        
        {isFeatured && (
          <span 
            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            aria-label="Featured agency - sponsored listing"
          >
            Featured
          </span>
        )}
      </header>

      <div 
        id={`agency-${agency.id}-description`}
        className="text-gray-700 mb-4"
      >
        {agency.description}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {agency.services.thaiVisas.map((visa) => (
          <span 
            key={visa}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
            aria-label={`Offers ${visa} visa services`}
          >
            {visa}
          </span>
        ))}
      </div>

      <footer className="flex justify-between items-center">
        <VerificationBadge verification={agency.verification} />
        
        <div className="flex gap-3">
          <Link
            href={`tel:${agency.contact.phone[0]}`}
            className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
            aria-label={`Call ${agency.name} at ${agency.contact.phone[0]}`}
          >
            <PhoneIcon className="w-5 h-5" />
            <span className="sr-only">Call {agency.name}</span>
          </Link>
          
          <Link
            href={`/agencies/${agency.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-2 py-1"
            aria-label={`View detailed information about ${agency.name}`}
          >
            View {agency.name} Details
          </Link>
        </div>
      </footer>
    </motion.article>
  );
}
```

### ARIA Labels & Descriptions

```typescript
// Comprehensive ARIA implementation examples

// Search form
<form 
  role="search" 
  aria-label="Search for visa agencies"
  onSubmit={handleSearch}
>
  <label htmlFor="search-input" className="sr-only">
    Search agencies by name, location, or service type
  </label>
  <input
    id="search-input"
    type="search"
    placeholder="Search visa agencies..."
    aria-describedby="search-help"
    aria-expanded={showSuggestions}
    aria-activedescendant={activeSuggestionId}
  />
  <div id="search-help" className="sr-only">
    Search by agency name, city, or visa type. Use arrow keys to navigate suggestions.
  </div>
</form>

// Filter controls
<fieldset className="border border-gray-200 rounded p-4">
  <legend className="text-lg font-semibold px-2">Filter Agencies</legend>
  
  <div className="space-y-4">
    <div>
      <label htmlFor="city-filter" className="block text-sm font-medium">
        City
      </label>
      <select 
        id="city-filter"
        aria-describedby="city-filter-help"
        onChange={handleCityFilter}
      >
        <option value="">All cities</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <div id="city-filter-help" className="sr-only">
        Filter agencies by their primary city location
      </div>
    </div>
    
    <fieldset>
      <legend className="text-sm font-medium">Verification Status</legend>
      <div className="mt-2 space-y-2">
        <label className="flex items-center">
          <input 
            type="checkbox" 
            value="verified"
            aria-describedby="verified-help"
            onChange={handleVerificationFilter}
          />
          <span className="ml-2">Verified agencies only</span>
        </label>
        <div id="verified-help" className="sr-only">
          Show only agencies that have been verified through in-person visits and document checks
        </div>
      </div>
    </fieldset>
  </div>
</fieldset>

// Results announcement
<div 
  aria-live="polite" 
  aria-atomic="true"
  className="sr-only"
>
  {searchResults.length > 0 
    ? `Found ${searchResults.length} agencies matching your search`
    : "No agencies found matching your search criteria"
  }
</div>
```

### Screen Reader Optimizations

```typescript
// Skip links for keyboard navigation
export function SkipLinks() {
  return (
    <div className="sr-only focus:not-sr-only">
      <a 
        href="#main-content"
        className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <a 
        href="#search-form"
        className="absolute top-4 left-32 bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to search
      </a>
    </div>
  );
}

// Landmark regions
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    {/* Navigation content */}
  </nav>
</header>

<main id="main-content" role="main">
  <section aria-labelledby="page-title">
    <h1 id="page-title">Bangkok Visa Agencies</h1>
    {/* Page content */}
  </section>
</main>

<aside role="complementary" aria-label="Filter agencies">
  {/* Sidebar filters */}
</aside>

<footer role="contentinfo">
  {/* Footer content */}
</footer>
```

## Descriptive Link Guidelines

### Link Text Standards

```typescript
// ❌ Bad - Generic link text
<Link href="/agencies/siam-legal">Read more</Link>
<Link href="/guides/tourist-visa">Click here</Link>
<Link href="/thai-visas/retirement">See details</Link>

// ✅ Good - Descriptive link text
<Link href="/agencies/siam-legal">
  View Siam Legal International agency details
</Link>
<Link href="/guides/tourist-visa">
  Complete guide to Thai tourist visa requirements
</Link>
<Link href="/thai-visas/retirement">
  Thai retirement visa eligibility and application process
</Link>

// Agency links with context
<Link 
  href={`/agencies/${agency.slug}`}
  aria-label={`View ${agency.name} - ${agency.locations[0].city} visa services`}
>
  {agency.name} in {agency.locations[0].city}
</Link>

// Service-specific links
<Link href="/thai-visas/business">
  Thai business visa requirements and application guide
</Link>
<Link href="/foreign-visas/usa">
  US visa services for Thai citizens
</Link>

// Guide links with clear purpose
<Link href="/guides/visa-extension-process">
  Step-by-step visa extension process in Thailand
</Link>
<Link href="/guides/document-requirements">
  Required documents for Thai visa applications
</Link>

// Contact action links
<Link 
  href={`tel:${agency.contact.phone[0]}`}
  aria-label={`Call ${agency.name} at ${agency.contact.phone[0]}`}
>
  Call {agency.name}
</Link>
<Link 
  href={`mailto:${agency.contact.email}`}
  aria-label={`Email ${agency.name} for visa inquiries`}
>
  Email {agency.name}
</Link>
```

### Link Context in Lists

```typescript
// Agency listings with descriptive links
export function AgencyListing({ agencies }: { agencies: Agency[] }) {
  return (
    <div role="region" aria-label="Visa agency listings">
      {agencies.map((agency) => (
        <article key={agency.id} className="agency-card">
          <h3>
            <Link href={`/agencies/${agency.slug}`}>
              {agency.name} - Visa Services in {agency.locations[0].city}
            </Link>
          </h3>
          
          <p>{agency.description}</p>
          
          <div className="agency-actions">
            <Link 
              href={`/agencies/${agency.slug}`}
              className="btn-primary"
            >
              View {agency.name} services and contact information
            </Link>
            
            <Link 
              href={`/agencies/${agency.slug}#contact-form`}
              className="btn-secondary"
            >
              Send inquiry to {agency.name}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

// Breadcrumb with descriptive links
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { 
    label: "Bangkok visa agencies", 
    href: "/agencies/bangkok" 
  },
  { 
    label: `${agency.name} agency details`,
    current: true 
  }
];
```

## MDX Blog System

### Blog Setup & Configuration

```typescript
// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  frontMatter: {
    title: string;
    description: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
    image?: string;
    tags: string[];
    category: 'visa-guides' | 'agency-news' | 'immigration-updates' | 'tips';
    featured: boolean;
    locale: 'en' | 'th';
    seo: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
      canonicalUrl?: string;
    };
  };
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export async function getAllPosts(locale?: string): Promise<BlogPost[]> {
  const files = fs.readdirSync(contentDirectory);
  
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace('.mdx', '');
        const fullPath = path.join(contentDirectory, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          slug,
          frontMatter: data as BlogPost['frontMatter'],
          content,
          readingTime: readingTime(content),
        };
      })
  );

  return posts
    .filter((post) => !locale || post.frontMatter.locale === locale)
    .sort((a, b) => 
      new Date(b.frontMatter.publishedAt).getTime() - 
      new Date(a.frontMatter.publishedAt).getTime()
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      frontMatter: data as BlogPost['frontMatter'],
      content,
      readingTime: readingTime(content),
    };
  } catch {
    return null;
  }
}
```

### MDX Components

```typescript
// components/mdx/MDXComponents.tsx
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const MDXComponents = {
  h1: ({ children, ...props }: any) => (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-bold text-gray-900 mb-6"
      {...props}
    >
      {children}
    </motion.h1>
  ),
  
  h2: ({ children, ...props }: any) => (
    <h2 
      className="text-3xl font-semibold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2"
      {...props}
    >
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: any) => (
    <h3 
      className="text-2xl font-medium text-gray-900 mt-6 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),
  
  p: ({ children, ...props }: any) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props}>
      {children}
    </ol>
  ),
  
  blockquote: ({ children, ...props }: any) => (
    <blockquote 
      className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 italic text-gray-800"
      {...props}
    >
      {children}
    </blockquote>
  ),
  
  code: ({ children, ...props }: any) => (
    <code 
      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  
  pre: ({ children, ...props }: any) => (
    <pre 
      className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6"
      {...props}
    >
      {children}
    </pre>
  ),
  
  a: ({ href, children, ...props }: any) => (
    <Link 
      href={href}
      className="text-blue-600 hover:text-blue-800 underline"
      {...props}
    >
      {children}
    </Link>
  ),
  
  img: ({ src, alt, ...props }: any) => (
    <div className="my-6">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg shadow-lg"
        {...props}
      />
    </div>
  ),
  
  // Custom components for visa content
  VisaRequirement: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border border-green-200 bg-green-50 rounded-lg p-4 my-4">
      <h4 className="font-semibold text-green-800 mb-2">{title}</h4>
      <div className="text-green-700">{children}</div>
    </div>
  ),
  
  ImportantNote: ({ children }: { children: React.ReactNode }) => (
    <div className="border border-red-200 bg-red-50 rounded-lg p-4 my-4">
      <div className="flex items-start">
        <div className="text-red-600 mr-2">⚠️</div>
        <div className="text-red-700">{children}</div>
      </div>
    </div>
  ),
  
  ProcessStep: ({ step, children }: { step: number; children: React.ReactNode }) => (
    <div className="flex items-start mb-4">
      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
        {step}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  ),
};
```

### Example MDX Blog Post

```mdx
---
title: "Complete Guide to Thai Tourist Visa Requirements in 2024"
description: "Everything you need to know about applying for a Thai tourist visa in 2024, including requirements, processing times, and costs for different nationalities."
publishedAt: "2024-01-15"
updatedAt: "2024-01-20"
author: "Visa Services Thailand Team"
image: "/blog/thai-tourist-visa-2024.jpg"
tags: ["tourist-visa", "thailand", "visa-requirements", "2024"]
category: "visa-guides"
featured: true
locale: "en"
seo:
  metaTitle: "Thai Tourist Visa 2024: Complete Requirements Guide | Visa Services Thailand"
  metaDescription: "Get your Thai tourist visa approved in 2024. Complete guide covering requirements, application process, processing times, and costs for all nationalities."
  keywords: ["thai tourist visa 2024", "thailand visa requirements", "tourist visa application", "visa on arrival thailand", "thai visa for tourists"]
---

# Complete Guide to Thai Tourist Visa Requirements in 2024

Thailand remains one of the world's most popular tourist destinations, welcoming millions of visitors annually. Whether you're planning a short vacation or an extended stay, understanding the visa requirements is crucial for a smooth entry into the Kingdom.

## Types of Tourist Visas Available

### 1. Visa Exemption (No Visa Required)

Many nationalities can enter Thailand without a visa for tourism purposes:

<VisaRequirement title="Visa Exemption Requirements">
- Valid passport with at least 6 months validity
- Proof of onward travel within 30 days (60 days for select countries)
- Sufficient funds (10,000 THB per person, 20,000 THB per family)
</VisaRequirement>

### 2. Visa on Arrival (VOA)

Available for 19 specific nationalities at international airports and border crossings.

<ProcessStep step={1}>
**Prepare Required Documents**
- Passport valid for at least 6 months
- Recent passport-sized photograph
- Completed application form
- 2,000 THB fee (cash only)
</ProcessStep>

<ProcessStep step={2}>
**Submit Application at Airport**
- Go to Visa on Arrival counter
- Submit documents and payment
- Wait for processing (typically 15-30 minutes)
</ProcessStep>

<ImportantNote>
Visa on Arrival allows a maximum stay of 15 days and cannot be extended. Plan your trip accordingly.
</ImportantNote>

### 3. Tourist Visa (TR)

For longer stays or multiple entries, apply for a Tourist Visa at a Thai embassy or consulate.

**Single Entry Tourist Visa:**
- Validity: 3 months from issue date
- Stay: Up to 60 days
- Extension: Possible for 30 days
- Fee: Varies by country ($40-80 USD)

**Multiple Entry Tourist Visa:**
- Validity: 6 months from issue date
- Stay: Up to 60 days per entry
- Extension: 30 days per entry
- Fee: Varies by country ($150-200 USD)

## Required Documents for Tourist Visa Application

1. **Passport Requirements**
   - Original passport valid for at least 6 months
   - At least 2 blank visa pages
   - Copies of passport pages

2. **Application Form**
   - Completed visa application form
   - Recent passport-sized photograph (4x6 cm)
   - White background, taken within 6 months

3. **Financial Evidence**
   - Bank statements (last 3 months)
   - Minimum balance: 20,000 THB per person
   - Original bank letter (some consulates)

4. **Travel Documentation**
   - Flight itinerary or confirmed tickets
   - Hotel reservations or accommodation proof
   - Travel insurance (recommended)

5. **Additional Documents** (if applicable)
   - Employment letter or business registration
   - Marriage certificate (for spouses)
   - Invitation letter from Thai contacts

## Application Process Timeline

| Step | Timeline | Action Required |
|------|----------|----------------|
| Document Preparation | 1-2 weeks | Gather all required documents |
| Visa Application | 1 day | Submit to embassy/consulate |
| Processing Time | 2-5 business days | Wait for approval |
| Passport Collection | 1 day | Collect passport with visa |

## Processing Times by Location

- **Bangkok Embassy**: 2-3 business days
- **Consulates in Malaysia**: 1-2 business days  
- **Consulates in Cambodia**: 1 business day
- **European Embassies**: 3-5 business days
- **US Consulates**: 3-4 business days

## Visa Fees by Nationality

| Nationality | Single Entry | Multiple Entry |
|-------------|--------------|----------------|
| US Citizens | $40 USD | $200 USD |
| UK Citizens | £30 GBP | £150 GBP |
| EU Citizens | €35 EUR | €175 EUR |
| Australian Citizens | $45 AUD | $225 AUD |
| Canadian Citizens | $45 CAD | $225 CAD |

## Common Reasons for Visa Rejection

1. **Insufficient Financial Proof**
   - Bank balance below requirements
   - Irregular income patterns
   - Missing bank statements

2. **Incomplete Documentation**
   - Missing required forms
   - Invalid passport photos
   - Expired documents

3. **Previous Immigration Issues**
   - Overstay history in Thailand
   - Immigration violations
   - Insufficient explanation for frequent visits

## Tips for Successful Visa Application

<ProcessStep step={1}>
**Start Early**: Begin the application process at least 2-3 weeks before travel
</ProcessStep>

<ProcessStep step={2}>
**Double-Check Requirements**: Each consulate may have specific requirements
</ProcessStep>

<ProcessStep step={3}>
**Organize Documents**: Present documents in order and with clear copies
</ProcessStep>

<ProcessStep step={4}>
**Be Honest**: Provide accurate information and genuine travel plans
</ProcessStep>

## Visa Extension in Thailand

Tourist visas can be extended once for 30 days at any Immigration Office in Thailand:

- **Fee**: 1,900 THB
- **Required Documents**: Passport, TM.7 form, passport photo
- **Processing Time**: Same day
- **Location**: Any Immigration Office

## Frequently Asked Questions

**Q: Can I work on a tourist visa?**
A: No, tourist visas strictly prohibit employment or business activities.

**Q: How many tourist visas can I get per year?**
A: No official limit, but immigration officers may question frequent applications.

**Q: Can I convert a tourist visa to another visa type?**
A: Generally no, you must leave Thailand and apply for a different visa type.

## Professional Visa Services

If you need assistance with your tourist visa application, consider using professional visa services in Bangkok:

- **Siam Legal International** - Sukhumvit area specialists
- **Bangkok Visa Centre** - One-stop visa solutions  
- **Thailand Visa Express** - Fast-track processing

<ImportantNote>
Always verify current requirements with the nearest Thai embassy or consulate, as visa policies can change. This guide reflects requirements as of January 2024.
</ImportantNote>

---

*Need help with your Thai tourist visa application? Contact our recommended visa agencies for professional assistance and faster processing.*
```

## IndexNow Integration for SEO

### IndexNow Setup

```typescript
// lib/indexnow.ts
interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export class IndexNowService {
  private key: string;
  private host: string;
  
  constructor() {
    this.key = process.env.NEXT_PUBLIC_INDEXNOW_KEY!;
    this.host = 'visaservicesthailand.directory';
  }

  async submitUrls(urls: string[]): Promise<boolean> {
    try {
      const submission: IndexNowSubmission = {
        host: this.host,
        key: this.key,
        keyLocation: `https://${this.host}/${this.key}.txt`,
        urlList: urls.map(url => `https://${this.host}${url}`),
      };

      // Submit to IndexNow API
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      return response.ok;
    } catch (error) {
      console.error('IndexNow submission failed:', error);
      return false;
    }
  }

  async submitNewBlogPost(slug: string): Promise<void> {
    const urls = [
      `/blog/${slug}`,
      '/blog', // Blog listing page
      '/', // Homepage (if blog is featured)
    ];
    
    await this.submitUrls(urls);
  }

  async submitNewAgency(slug: string, city: string): Promise<void> {
    const urls = [
      `/agencies/${slug}`,
      `/agencies/${city}`,
      '/agencies',
      '/',
    ];
    
    await this.submitUrls(urls);
  }

  async submitSitemapUpdate(): Promise<void> {
    await this.submitUrls(['/sitemap.xml']);
  }
}

// Usage in API routes or build process
export const indexNow = new IndexNowService();
```

### Automatic IndexNow Triggers

```typescript
// lib/seo.ts - SEO utilities with IndexNow integration
import { indexNow } from './indexnow';

export async function publishBlogPost(slug: string) {
  // 1. Generate static page
  // 2. Update sitemap
  // 3. Submit to IndexNow
  await indexNow.submitNewBlogPost(slug);
  
  // 4. Update RSS feed
  await generateRSSFeed();
}

export async function addNewAgency(agency: Agency) {
  // 1. Add to database/files
  // 2. Generate agency page
  // 3. Submit to IndexNow
  await indexNow.submitNewAgency(agency.slug, agency.locations[0].city);
  
  // 4. Update structured data
  await updateAgencyStructuredData();
}
```

## Structured Data Implementation

### JSON-LD for Agencies

```typescript
// lib/seo.ts - Structured data generators
export function generateAgencyStructuredData(agency: Agency) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": agency.name,
    "alternateName": agency.nameTh,
    "description": agency.description,
    "url": `https://visaservicesthailand.directory/agencies/${agency.slug}`,
    "image": agency.image ? `https://visaservicesthailand.directory${agency.image}` : undefined,
    "telephone": agency.contact.phone[0],
    "email": agency.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": agency.locations[0].address,
      "addressLocality": agency.locations[0].district,
      "addressRegion": agency.locations[0].province,
      "addressCountry": "TH"
    },
    "geo": agency.locations[0].coordinates ? {
      "@type": "GeoCoordinates",
      "latitude": agency.locations[0].coordinates.lat,
      "longitude": agency.locations[0].coordinates.lng
    } : undefined,
    "aggregateRating": agency.reviewData ? {
      "@type": "AggregateRating",
      "ratingValue": agency.reviewData.rating,
      "reviewCount": agency.reviewData.totalReviews,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "serviceType": "Visa Services",
    "areaServed": {
      "@type": "Country",
      "name": "Thailand"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Visa Services",
      "itemListElement": [
        ...agency.services.thaiVisas.map(visa => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Thai ${visa} Visa Service`,
            "serviceType": "Visa Application Assistance"
          }
        })),
        ...agency.services.foreignVisas.map(visa => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${visa.toUpperCase()} Visa Service for Thai Citizens`,
            "serviceType": "Visa Application Assistance"
          }
        }))
      ]
    },
    "founder": agency.established ? {
      "@type": "Organization",
      "foundingDate": agency.established.toString()
    } : undefined,
    "sameAs": [
      agency.contact.website,
      `https://www.google.com/maps/place/?q=place_id:${agency.googlePlaceId}`
    ].filter(Boolean)
  };
}
```

### JSON-LD for Blog Articles

```typescript
export function generateArticleStructuredData(post: BlogPost, content: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.frontMatter.title,
    "description": post.frontMatter.description,
    "image": post.frontMatter.image ? 
      `https://visaservicesthailand.directory${post.frontMatter.image}` : 
      "https://visaservicesthailand.directory/images/default-blog.jpg",
    "author": {
      "@type": "Organization",
      "name": post.frontMatter.author,
      "url": "https://visaservicesthailand.directory"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Visa Services Thailand Directory",
      "logo": {
        "@type": "ImageObject",
        "url": "https://visaservicesthailand.directory/images/logo.png"
      }
    },
    "datePublished": post.frontMatter.publishedAt,
    "dateModified": post.frontMatter.updatedAt || post.frontMatter.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://visaservicesthailand.directory/blog/${post.slug}`
    },
    "articleSection": post.frontMatter.category,
    "keywords": post.frontMatter.seo.keywords.join(", "),
    "wordCount": post.readingTime.words,
    "timeRequired": `PT${Math.ceil(post.readingTime.minutes)}M`,
    "about": {
      "@type": "Thing",
      "name": "Thailand Visa Services"
    },
    "mentions": extractMentions(content), // Extract agency/location mentions
    "isPartOf": {
      "@type": "Blog",
      "name": "Visa Services Thailand Blog",
      "url": "https://visaservicesthailand.directory/blog"
    }
  };
}

function extractMentions(content: string) {
  // Extract agency names, cities, visa types mentioned in content
  const mentions = [];
  
  // This would be more sophisticated in practice
  const cities = ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya'];
  const visaTypes = ['Tourist Visa', 'Business Visa', 'Retirement Visa'];
  
  cities.forEach(city => {
    if (content.includes(city)) {
      mentions.push({
        "@type": "Place",
        "name": city
      });
    }
  });
  
  visaTypes.forEach(visa => {
    if (content.includes(visa)) {
      mentions.push({
        "@type": "Service",
        "name": visa
      });
    }
  });
  
  return mentions;
}
```

### Website-Level Structured Data

```typescript
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Visa Services Thailand Directory",
    "alternateName": "Thailand Visa Directory",
    "url": "https://visaservicesthailand.directory",
    "description": "Comprehensive directory of verified visa services in Thailand. Find trusted agencies for Thai visas, foreign visas, and immigration assistance.",
    "inLanguage": ["en", "th", "zh"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://visaservicesthailand.directory/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Visa Services Thailand Directory",
      "logo": {
        "@type": "ImageObject",
        "url": "https://visaservicesthailand.directory/images/logo.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@visaservicesthailand.directory"
      }
    }
  };
}
```

## SEO Best Practices Implementation

### Meta Tags & Open Graph

```typescript
// lib/seo.ts - SEO metadata generation
interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object;
}

export function generateSEOMetadata(type: 'agency' | 'blog' | 'page', data: any): SEOMetadata {
  switch (type) {
    case 'agency':
      return generateAgencySEO(data);
    case 'blog':
      return generateBlogSEO(data);
    case 'page':
      return generatePageSEO(data);
    default:
      return generateDefaultSEO();
  }
}

function generateAgencySEO(agency: Agency): SEOMetadata {
  const city = agency.locations[0].city;
  const district = agency.locations[0].district;
  const services = agency.services.thaiVisas.slice(0, 3).join(', ');
  
  return {
    title: `${agency.name} - ${city} Visa Services | Thailand Visa Directory`,
    description: `${agency.name} in ${district}, ${city} offers ${services} and more. ${agency.verification.status === 'verified' ? 'Verified agency' : 'Visa services'} with contact details and reviews.`,
    keywords: [
      `${agency.name.toLowerCase()}`,
      `visa services ${city.toLowerCase()}`,
      `${city.toLowerCase()} visa agency`,
      `thailand visa ${district.toLowerCase()}`,
      ...agency.services.thaiVisas.map(visa => `${visa} visa ${city.toLowerCase()}`),
      ...agency.services.foreignVisas.map(visa => `${visa} visa thailand`),
    ],
    canonicalUrl: `https://visaservicesthailand.directory/agencies/${agency.slug}`,
    ogImage: agency.image || `/images/og/agency-${city.toLowerCase()}.jpg`,
    structuredData: generateAgencyStructuredData(agency)
  };
}

function generateBlogSEO(post: BlogPost): SEOMetadata {
  return {
    title: post.frontMatter.seo.metaTitle,
    description: post.frontMatter.seo.metaDescription,
    keywords: post.frontMatter.seo.keywords,
    canonicalUrl: post.frontMatter.seo.canonicalUrl || 
                  `https://visaservicesthailand.directory/blog/${post.slug}`,
    ogImage: post.frontMatter.image || '/images/og/blog-default.jpg',
    structuredData: generateArticleStructuredData(post, post.content)
  };
}
```

### Long-tail Keyword Strategy

```typescript
// lib/keywords.ts - Long-tail keyword generation
export const keywordTemplates = {
  agencyLocation: [
    '{service} visa agency in {city}',
    '{city} {service} visa services',
    'best visa agency {district} {city}',
    '{service} visa application {city}',
    'visa services near {district}',
    '{city} immigration services {service}',
  ],
  
  visaGuides: [
    'how to apply for {visa} visa thailand {year}',
    '{visa} visa requirements thailand {year}',
    '{visa} visa application process {year}',
    '{visa} visa documents needed thailand',
    '{visa} visa cost thailand {year}',
    'thailand {visa} visa processing time',
  ],
  
  locationSpecific: [
    '{city} visa agencies directory',
    'visa services {province} thailand',
    '{city} immigration office location',
    'best visa agent {city} {year}',
    '{city} visa extension services',
  ],
  
  serviceSpecific: [
    '{nationality} visa for thailand',
    'thailand visa for {nationality} citizens',
    '{visa} visa extension thailand',
    '{visa} visa multiple entry thailand',
    'urgent {visa} visa thailand',
  ]
};

export function generateKeywords(template: string, variables: Record<string, string>): string {
  let result = template;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  return result;
}

export function generateAgencyKeywords(agency: Agency): string[] {
  const city = agency.locations[0].city;
  const district = agency.locations[0].district;
  const province = agency.locations[0].province;
  
  const keywords: string[] = [];
  
  // Generate location-based keywords
  keywordTemplates.agencyLocation.forEach(template => {
    agency.services.thaiVisas.forEach(service => {
      keywords.push(generateKeywords(template, { service, city, district }));
    });
  });
  
  // Add service-specific keywords
  keywordTemplates.serviceSpecific.forEach(template => {
    agency.languages.forEach(nationality => {
      agency.services.thaiVisas.forEach(visa => {
        keywords.push(generateKeywords(template, { nationality, visa }));
      });
    });
  });
  
  return keywords;
}
```

### Dynamic Meta Tag Component

```typescript
// components/seo/SEOHead.tsx
import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object;
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  noindex = false,
  structuredData
}: SEOHeadProps) {
  const router = useRouter();
  const { locale } = router;
  
  const fullTitle = `${title} | Visa Services Thailand Directory`;
  const currentUrl = canonicalUrl || `https://visaservicesthailand.directory${router.asPath}`;
  const defaultImage = 'https://visaservicesthailand.directory/images/og-default.jpg';
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale === 'th' ? 'th_TH' : locale === 'zh' ? 'zh_CN' : 'en_US'} />
      <meta property="og:site_name" content="Visa Services Thailand Directory" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      
      {/* Additional SEO */}
      <meta name="author" content="Visa Services Thailand Directory" />
      <meta name="publisher" content="Visa Services Thailand Directory" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Hreflang for multilingual */}
      <link rel="alternate" hrefLang="en" href={currentUrl.replace(/\/(th|zh)\//, '/en/')} />
      <link rel="alternate" hrefLang="th" href={currentUrl.replace(/\/(en|zh)\//, '/th/')} />
      <link rel="alternate" hrefLang="zh" href={currentUrl.replace(/\/(en|th)\//, '/zh/')} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl.replace(/\/(th|zh)\//, '/en/')} />
    </Head>
  );
}
```

## Core Features Implementation

### 1. Agency Verification System

```typescript
// components/agencies/VerificationBadge.tsx
export function VerificationBadge({
  verification,
}: {
  verification: Agency["verification"];
}) {
  if (verification.status !== "verified") return null;

  return (
    <div className="inline-flex items-center gap-1 text-sm text-green-600">
      <CheckCircleIcon className="w-4 h-4" />
      <span>Verified Agency</span>
    </div>
  );
}

// Verification process:
// 1. In-person visit to confirm physical office
// 2. Check business registration via https://ereg.dbd.go.th/
// 3. Verify licenses and certifications
// 4. Update agency data with verification status
```

### 2. Featured Listings (Paid)

```typescript
// components/agencies/AgencyList.tsx
export function AgencyList({ agencies }: { agencies: Agency[] }) {
  const featured = agencies.filter((a) => a.featured);
  const regular = agencies.filter((a) => !a.featured);

  return (
    <>
      {featured.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Featured Agencies</h2>
            <span className="text-sm text-gray-500">Sponsored</span>
          </div>
          <div className="space-y-4">
            {featured.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} isFeatured />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">All Agencies</h2>
        <div className="space-y-4">
          {regular.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      </div>
    </>
  );
}

// Featured agencies:
// - Display at top with "Sponsored" label
// - Enhanced styling (border, background)
// - Appear first in search results
// - Pricing: 2,000-3,000 THB/month
```

### 3. Sorting & Filtering

```typescript
// types/search.ts
type SortOption = "name" | "rating" | "verified" | "location" | "featured";

interface SearchFilters {
  city?: string;
  visaType?: string;
  language?: string;
  verified?: boolean;
}

// components/agencies/SearchFilters.tsx
export function SearchFilters() {
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [filters, setFilters] = useState<SearchFilters>({});

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className="border rounded px-3 py-2"
      >
        <option value="featured">Featured First</option>
        <option value="name">Name (A-Z)</option>
        <option value="rating">Highest Rated</option>
        <option value="verified">Verified First</option>
        <option value="location">By Location</option>
      </select>

      {/* Additional filter dropdowns */}
    </div>
  );
}

// Sorting logic
function sortAgencies(agencies: Agency[], sortBy: SortOption): Agency[] {
  return [...agencies].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return (b.reviewData?.rating || 0) - (a.reviewData?.rating || 0);
      case "verified":
        return (
          (b.verification.status === "verified" ? 1 : 0) -
          (a.verification.status === "verified" ? 1 : 0)
        );
      case "location":
        return a.locations[0].district.localeCompare(b.locations[0].district);
      default:
        return 0;
    }
  });
}
```

### 4. Contact Forms with reCAPTCHA

```typescript
// components/forms/ContactForm.tsx
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function ContactForm({ agencyId }: { agencyId: string }) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error("reCAPTCHA not ready");
      return;
    }

    const token = await executeRecaptcha("agency_inquiry");

    // Submit to Formspree with reCAPTCHA token
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("g-recaptcha-response", token);

    await fetch(process.env.NEXT_PUBLIC_FORMSPREE_AGENCY_INQUIRY!, {
      method: "POST",
      body: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="agency_id" value={agencyId} />
      {/* Form fields */}
      <button type="submit" className="btn-primary">
        Send Inquiry
      </button>
    </form>
  );
}
```

### 5. Google Reviews Integration

```typescript
// lib/reviews.ts
export async function getReviewData(
  agency: Agency
): Promise<ReviewData | null> {
  // Check for API key
  if (process.env.GOOGLE_PLACES_API_KEY && agency.googlePlaceId) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?` +
          `place_id=${agency.googlePlaceId}&fields=rating,user_ratings_total,url` +
          `&key=${process.env.GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();

      return {
        source: "google_api",
        lastUpdated: new Date(),
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
        reviewsUrl: data.result.url,
      };
    } catch (error) {
      console.error("Google API failed, falling back to manual data");
    }
  }

  // Return manual data
  return agency.reviewData || null;
}

// Display component shows data freshness
export function ReviewDisplay({ reviewData }: { reviewData: ReviewData }) {
  const daysSinceUpdate = Math.floor(
    (Date.now() - reviewData.lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="review-section">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 text-yellow-500" filled />
          <span className="font-semibold">{reviewData.rating.toFixed(1)}</span>
          <span className="text-gray-500">
            ({reviewData.totalReviews} reviews)
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {reviewData.source === "google_api"
            ? "Live data"
            : `Updated ${daysSinceUpdate}d ago`}
        </span>
      </div>
    </div>
  );
}
```

## Legal Protection

### Terms of Service (Key Points)

```text
This website is an informational directory only. We do not:
- Endorse or recommend any agency
- Guarantee the accuracy of information
- Accept liability for agency services
- Provide legal or immigration advice

All agency information is:
- Provided by agencies themselves or from public sources
- Subject to independent verification by users
- Not a substitute for professional advice

Featured Listings:
- Agencies marked as "Featured" or "Sponsored" have paid for premium placement
- Payment for featured status does not imply endorsement or recommendation
- All agencies are subject to the same listing standards

Users must conduct their own due diligence before engaging any agency.
```

### Privacy Policy (Key Points)

```text
Data Collection:
- We use Plausible Analytics (privacy-focused, no cookies)
- Contact forms are processed by Formspree
- reCAPTCHA is used for form protection
- We do not collect or store personal data
- No user accounts or tracking

Third-Party Services:
- Google Maps for location display
- Google Places API for review data (when enabled)
- Formspree for form processing
- Plausible for analytics
```

### Disclaimer

```text
This directory provides information only. We do not endorse, recommend, or guarantee
any agency's services. Verification badges indicate we have confirmed certain
business details but do not constitute a recommendation. Users should verify all
information independently and conduct their own research before engaging any visa service.

Featured or sponsored listings have paid for enhanced visibility but are not
endorsed by this directory.
```

## Launch Strategy

### Phase 1: MVP (Weeks 1-6)

**Goal:** Launch with 50-100 Bangkok agencies

**Tasks:**

1. Set up Next.js project with Cloudflare Pages
2. Implement trilingual support (en, th, zh)
3. Create agency data structure with verification system
4. Build search, filter, and sort functionality
5. Design responsive agency cards with featured styling
6. Add contact forms with Formspree and reCAPTCHA
7. Create 5 essential blog posts
8. Set up Plausible analytics
9. Create custom SVG icons

**Initial Content:**

- 50+ Bangkok agencies (mix of verified and unverified)
- 5 comprehensive visa guides
- Terms, Privacy, Disclaimer pages
- About page explaining the service

### Phase 2: Enhancement (Weeks 7-10)

**Goal:** Improve UX and add more agencies

**Tasks:**

1. Add comparison tool
2. Implement Google Reviews display with freshness indicators
3. Create city-specific landing pages
4. Add more agencies (target 100+)
5. Verify initial agencies (in-person visits)
6. Improve search with advanced filters
7. Add share functionality (including WeChat for Chinese users)
8. Create XML sitemap
9. Submit to search engines

### Phase 3: Expansion (Months 3-6)

**Goal:** Expand nationwide and monetize

**Cities to Add:**

- Phuket
- Chiang Mai
- Pattaya
- Koh Samui

**Monetization Introduction:**

- Featured listings (2,000-3,000 THB/month)
- Premium profiles (5,000 THB/month)
- Lead tracking dashboard (1,000 THB/month)

## Analytics Setup

```javascript
// Plausible custom events
plausible("Agency View", {
  props: {
    agency_id: agency.id,
    agency_name: agency.name,
    city: agency.locations[0].city,
    is_featured: agency.featured,
    is_verified: agency.verification.status === "verified",
    referrer: document.referrer,
  },
});

plausible("Contact Click", {
  props: {
    agency_id: agency.id,
    method: "phone" | "email" | "whatsapp" | "website",
    city: agency.locations[0].city,
    is_featured: agency.featured,
  },
});

plausible("Search", {
  props: {
    query: searchQuery,
    filters: JSON.stringify(filters),
    sort_by: sortBy,
    results_count: results.length,
    has_featured: results.some((a) => a.featured),
  },
});

plausible("Comparison", {
  props: {
    agencies: comparedAgencies.map((a) => a.id).join(","),
    count: comparedAgencies.length,
  },
});

// Core Web Vitals tracking
plausible("Core Web Vitals", {
  props: {
    lcp: largestContentfulPaint,
    fid: firstInputDelay,
    cls: cumulativeLayoutShift,
  },
});
```

## Marketing Checklist

### Pre-Launch

- [x] Register domain on Porkbun
- [ ] Create social media accounts (Facebook, LinkedIn)
- [ ] Prepare WeChat official account (for Chinese audience)
- [ ] Join relevant Facebook groups
- [ ] Prepare launch announcement
- [ ] Create agency outreach email template
- [ ] Set up Google My Business

### Launch Week

- [ ] Announce in expat Facebook groups
- [ ] Post on relevant subreddits (r/Thailand, r/Bangkok)
- [ ] Contact expat news sites
- [ ] Begin agency outreach campaign
- [ ] Share in WeChat groups

### Ongoing

- [ ] Weekly blog posts about visa news
- [ ] Monthly agency spotlights
- [ ] Respond to visa questions in forums
- [ ] Build backlinks through guides
- [ ] Monitor and update review data

## Initial Agency Outreach Template

```text
Subject: Free Listing - Visa Services Thailand Directory

Dear [Agency Name],

I'm launching visaservicesthailand.directory - a comprehensive trilingual (English/Thai/Chinese)
directory to help people find trusted visa services across Thailand.

We're offering free listings to established agencies, including:
• Full service descriptions in Thai and English
• Direct contact information and location details
• Google Reviews integration
• Direct inquiry forms with reCAPTCHA protection
• Verification badge for confirmed businesses

No cost, no catch - we're building the most useful visa services resource in Thailand.

To include your agency, simply reply with:
- Agency name (English/Thai)
- Services offered
- Location(s)
- Contact information
- Google Maps link (if available)
- Business registration number (for verification)

Note: In the future, we'll offer optional featured placements for extra visibility.

Best regards,
[Your name]
```

## Technical Deployment

### Cloudflare Pages Setup

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build && npm run export`
   - Build output directory: `out`
   - Node version: 18

### Git Workflow

```bash
# Branches
main - Production
develop - Development
feature/* - New features
hotfix/* - Urgent fixes

# Protected files in .gitignore
.env.local
.env.production
/data/internal-notes.ts
/scripts/admin-tools.ts
/verification-notes/
```

## Success Metrics

### Month 1

- 50+ agencies listed (20+ verified)
- 1,000+ unique visitors
- 50+ agency inquiries
- 5+ backlinks
- Core Web Vitals score > 90

### Month 3

- 150+ agencies listed (60+ verified)
- 5,000+ unique visitors
- 200+ agency inquiries
- 20+ backlinks
- First featured listing sold

### Month 6

- 300+ agencies listed (150+ verified)
- 15,000+ unique visitors
- 500+ agency inquiries
- 5-10 featured listings
- Expand to 3+ cities
- Positive cash flow

## Outstanding Decisions

1. **Verification Criteria**

   - Physical office visit required?
   - Minimum years in business?
   - Required documentation?

2. **Payment Processing**

   - Bank transfer only?
   - Add PayPal/Stripe later?
   - Invoice system needed?

3. **Chinese Market Strategy**

   - Focus markets (mainland/HK/Taiwan)?
   - WeChat mini-program later?
   - Simplified vs Traditional Chinese?

4. **Content Moderation**
   - Review new submissions before publishing?
   - Handle complaints/updates?
   - Accuracy verification process?

## Next Steps

1. **Set up development environment** with Next.js and dependencies
2. **Create initial agency dataset** (30-50 agencies to start)
3. **Build core features** focusing on search and agency profiles
4. **Set up multilingual support** with next-intl
5. **Deploy to Cloudflare Pages** for testing
6. **Begin verification visits** to establish credibility
7. **Soft launch** with select agencies for feedback
8. **Iterate based on user feedback**

Remember: Start simple, launch fast, iterate based on real user needs!
