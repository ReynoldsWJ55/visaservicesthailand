# Visa Services Thailand Directory

> **A comprehensive multilingual directory connecting foreigners with verified visa and immigration services throughout Thailand.**

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌐 Live Site

**[visaservicesthailand.directory](https://visaservicesthailand.directory)**

## 🎯 Project Overview

Visa Services Thailand Directory is a modern, accessible web platform designed to help foreigners and Thai citizens find reliable visa and immigration services. The platform serves as a bridge between service seekers and verified agencies, offering comprehensive information in English, Thai, and Chinese.

### Key Features

- **🔍 Multi-Service Search**: Find agencies offering visa services, bank account opening, driver's licenses, company registration, and more
- **🌍 Trilingual Support**: Full localization in English, Thai, and Chinese
- **✅ Agency Verification**: In-person verification system with transparent badges
- **📱 Responsive Design**: Optimized for all devices with minimal animations
- **♿ Accessibility First**: WCAG compliant with comprehensive ARIA implementation
- **📝 MDX Blog System**: SEO-optimized guides and visa information
- **🚀 Static Export**: Fast, globally distributed on Cloudflare Pages

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animation**: Framer Motion (minimal)
- **Content**: MDX with custom visa-specific components
- **Search**: Client-side with Fuse.js
- **i18n**: next-intl for multilingual support
- **Forms**: React Hook Form + Zod validation + reCAPTCHA
- **SEO**: IndexNow integration + structured data (JSON-LD)
- **Hosting**: Cloudflare Pages (static export)
- **Analytics**: Plausible (privacy-focused)

### Project Structure

```
visa-services-thailand/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── agencies/             # Agency listings and details
│   │   ├── services/             # Service-specific pages
│   │   ├── blog/                 # MDX blog system
│   │   └── guides/               # Visa guides
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── icons/                    # Custom SVG icons
│   ├── layout/                   # Header, Footer, Breadcrumbs
│   ├── agencies/                 # Agency-specific components
│   ├── mdx/                      # MDX custom components
│   └── seo/                      # SEO optimization components
├── content/                      # MDX content
│   └── blog/                     # Blog posts with frontmatter
├── data/                         # Static data files
│   ├── agencies.ts               # Agency database
│   └── cities.ts                 # Location data
├── lib/                          # Utility functions
│   ├── seo.ts                    # SEO utilities
│   ├── indexnow.ts               # Search engine indexing
│   ├── mdx.ts                    # MDX processing
│   └── keywords.ts               # Keyword generation
├── messages/                     # i18n translations
│   ├── en.json                   # English
│   ├── th.json                   # Thai
│   └── zh.json                   # Chinese
└── public/                       # Static assets
    └── agencies/                 # Agency images
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:ReynoldsWJ55/visaservicesthailand.git
   cd visaservicesthailand
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` file:
   ```env
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://visaservicesthailand.directory
   
   # Google APIs
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY=your_maps_embed_key
   
   # Form Handling
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret
   
   # SEO & Indexing
   NEXT_PUBLIC_INDEXNOW_KEY=your_indexnow_key
   
   # Analytics
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=visaservicesthailand.directory
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Development

### Available Scripts

```bash
# Development
npm run dev                # Start development server
npm run build             # Build for production
npm run start             # Start production server

# Code Quality
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint errors
npm run type-check        # TypeScript type checking
npm run format            # Format code with Prettier
npm run format:check      # Check code formatting
npm run check-all         # Run all quality checks

# Testing
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage
npm run test:e2e          # Run end-to-end tests

# Build & Deploy
npm run build:export      # Build and export static site
npm run build:analyze     # Analyze bundle size
```

### Content Management

#### Adding Agencies

Agencies are stored in `data/agencies.ts`. Each agency supports comprehensive service offerings:

```typescript
{
  id: "agency-unique-id",
  name: "Agency Name",
  nameTh: "ชื่อเอเจนซี่",
  services: {
    // Visa services
    thaiVisas: {
      types: ["retirement", "business", "tourist"],
      expertise: "expert"
    },
    // Additional services
    financialServices: {
      bankAccount: true,
      insurance: true
    },
    legalServices: {
      companyRegistration: true,
      workPermit: true
    },
    // ... more service categories
    primaryCategory: "full-service",
    serviceCategories: ["visas", "banking", "legal"]
  },
  verification: {
    status: "verified",
    date: "2024-01-15"
  }
}
```

#### Writing Blog Posts

Blog posts use MDX with comprehensive frontmatter:

```mdx
---
title: "Complete Guide to Thai Tourist Visa 2024"
description: "Everything you need to know about applying for a Thai tourist visa"
category: "visa-guides"
tags: ["tourist-visa", "thailand", "2024"]
seo:
  metaTitle: "Thai Tourist Visa 2024: Complete Guide"
  keywords: ["thai tourist visa", "visa requirements", "thailand visa"]
author:
  name: "Visa Expert Team"
---

# Your content here

Use custom components:
<VisaRequirement title="Required Documents">
- Valid passport
- Proof of funds
</VisaRequirement>

<ImportantNote>
Always verify current requirements with embassies.
</ImportantNote>
```

### Internationalization

The site supports three languages with different content strategies:

- **English**: Full content and agency listings
- **Thai**: Full content and agency listings  
- **Chinese**: UI/navigation only, agency listings in English

Add translations in `messages/{locale}.json`:

```json
{
  "nav": {
    "agencies": "Find Agencies",
    "blog": "Guides & News"
  },
  "search": {
    "placeholder": "Search visa services..."
  }
}
```

### SEO Optimization

The platform includes comprehensive SEO features:

- **Structured Data**: JSON-LD for agencies and articles
- **IndexNow Integration**: Automatic search engine notifications
- **Dynamic Meta Tags**: Location and service-specific optimization
- **Long-tail Keywords**: Template-based keyword generation
- **Sitemap Generation**: Automatic XML sitemap creation

## 🎨 Design System

### Colors

```css
:root {
  --primary: #1e40af;        /* Professional blue */
  --secondary: #10b981;      /* Success green */
  --text-primary: #111827;   /* Almost black */
  --text-secondary: #6b7280; /* Gray */
  --background: #ffffff;     /* White */
  --border: #e5e7eb;         /* Light gray */
}
```

### Typography

- **Font Family**: Inter, system fonts
- **Headings**: Font weights 600-700
- **Body Text**: Font weight 400
- **Reading Level**: Grade 9 target

### Components

- **Custom SVG Icons**: No emoji usage
- **Accessible Forms**: ARIA labels and descriptions
- **Responsive Cards**: Mobile-first design
- **Minimal Animations**: Subtle hover effects and page transitions

## 📊 Analytics & Monitoring

### Privacy-Focused Analytics

- **Plausible**: Cookie-free analytics
- **Custom Events**: Agency views, contact clicks, searches
- **Core Web Vitals**: Performance monitoring
- **No Personal Data**: GDPR compliant by design

### SEO Tracking

- **Search Rankings**: Manual monitoring
- **IndexNow Submissions**: Automatic notifications
- **Sitemap Updates**: Real-time generation
- **Keyword Performance**: Google Search Console integration

## 🚀 Deployment

### Cloudflare Pages

The site deploys automatically to Cloudflare Pages:

1. **Build Command**: `npm run build:export`
2. **Output Directory**: `out`
3. **Node Version**: 18
4. **Environment Variables**: Configure in Cloudflare dashboard

### Performance Optimizations

- **Static Export**: No server required
- **Image Optimization**: Next.js Image component with unoptimized flag
- **Bundle Analysis**: `npm run build:analyze`
- **Lighthouse Scores**: Target 90+ across all metrics

## 🛡️ Security & Legal

### Data Protection

- **No User Accounts**: No personal data collection
- **Privacy-First**: Plausible analytics, no tracking cookies
- **reCAPTCHA**: Form protection against spam
- **HTTPS Only**: Secure connection enforced

### Legal Compliance

- **Terms of Service**: Directory information only
- **Privacy Policy**: Transparent data practices
- **Disclaimers**: Clear agency verification limitations
- **Content Review**: Regular accuracy verification

## 🔮 Future Roadmap

### Phase 1: Core Platform (Weeks 1-6)
- [x] Next.js setup with Cloudflare Pages
- [x] Trilingual support implementation
- [x] Agency verification system
- [x] Search and filtering functionality
- [x] Contact forms with reCAPTCHA
- [x] Blog system with MDX
- [x] SEO optimization
- [ ] 50+ Bangkok agencies
- [ ] Launch preparation

### Phase 2: Enhancement (Weeks 7-10)
- [ ] Google Reviews integration
- [ ] City-specific landing pages
- [ ] Advanced search filters
- [ ] Agency comparison tool
- [ ] Social sharing features
- [ ] 100+ agencies across Thailand

### Phase 3: Expansion (Months 3-6)
- [ ] Nationwide coverage (Phuket, Chiang Mai, Pattaya)
- [ ] Featured listing monetization
- [ ] Agency dashboard
- [ ] Lead tracking system
- [ ] Mobile app consideration

### Future Features
- [ ] **Authentication**: NextAuth.js for agency accounts
- [ ] **Payments**: Stripe integration for featured listings
- [ ] **Real-time**: Live chat and notifications
- [ ] **Advanced Search**: Elasticsearch or Algolia
- [ ] **Mobile App**: React Native implementation
- [ ] **API**: Public API for third-party integrations

## 🤝 Contributing

We welcome contributions to improve the Visa Services Thailand Directory:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Run** quality checks (`npm run check-all`)
5. **Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **Push** to the branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### Contribution Guidelines

- **Code Quality**: Follow ESLint and Prettier configurations
- **Testing**: Add tests for new features
- **Accessibility**: Maintain WCAG compliance
- **Documentation**: Update relevant documentation
- **Internationalization**: Consider all three languages

### Areas for Contribution

- **Agency Data**: Verify and add new agencies
- **Translations**: Improve Thai and Chinese content
- **SEO**: Enhance keyword targeting and content
- **Accessibility**: Improve screen reader support
- **Performance**: Optimize loading and Core Web Vitals

## 📞 Support & Contact

### For Users
- **Website**: [visaservicesthailand.directory](https://visaservicesthailand.directory)
- **Issues**: Report problems via [GitHub Issues](https://github.com/ReynoldsWJ55/visaservicesthailand/issues)

### For Agencies
- **Agency Listings**: Free verification and listing
- **Featured Placement**: Contact for premium options
- **Updates**: Submit changes via contact form

### For Developers
- **Documentation**: See [CLAUDE.md](CLAUDE.md) for detailed technical guidance
- **GitHub**: [ReynoldsWJ55/visaservicesthailand](https://github.com/ReynoldsWJ55/visaservicesthailand)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Cloudflare**: For free hosting and global CDN
- **Plausible**: For privacy-focused analytics
- **Thai Government**: For transparency in business registration
- **Expat Community**: For feedback and agency recommendations

---

**Built with ❤️ for the Thailand expat community**

*Helping people navigate visa services with confidence and transparency*