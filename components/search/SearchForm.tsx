"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getAvailableCities, getServiceCategories } from "@/lib/data";

interface SearchFormProps {
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  query: string;
  city: string;
  serviceCategory: string;
  specificService: string;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const locale = useLocale();
  const t = useTranslations("homepage");
  const ts = useTranslations("homepage.services");
  const te = useTranslations("homepage.explanations");
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    city: "",
    serviceCategory: "",
    specificService: "",
  });

  // Reset Thai visa selection if user switches to Thai language
  React.useEffect(() => {
    if (locale === "th" && filters.serviceCategory === "thaiVisas") {
      setFilters((prev) => ({
        ...prev,
        serviceCategory: "",
        specificService: "",
      }));
    }
  }, [locale, filters.serviceCategory]);

  const availableCities = getAvailableCities();
  const serviceCategories = getServiceCategories();

  const getAvailableCategories = () => {
    // Dynamic category configuration for easy expansion
    const allCategories = [
      { key: "thaiVisas", labelKey: "filters.categories.thaiVisas" },
      { key: "foreignVisas", labelKey: "filters.categories.foreignVisas" },
      { key: "government", labelKey: "filters.categories.governmentServices" },
      { key: "financial", labelKey: "filters.categories.financialServices" },
      { key: "legal", labelKey: "filters.categories.legalServices" },
      { key: "business", labelKey: "filters.categories.businessServices" },
      // Future visa/immigration-related categories can be easily added here:
      // { key: "documentation", labelKey: "filters.categories.documentationServices" },
      // { key: "immigration", labelKey: "filters.categories.immigrationServices" },
      // { key: "personal", labelKey: "filters.categories.personalServices" },
      // { key: "specialized", labelKey: "filters.categories.specializedServices" },
      // { key: "relocation", labelKey: "filters.categories.relocationServices" },
    ];

    // Filter out Thai visas for Thai language users (they don't need Thai visas)
    if (locale === "th") {
      return allCategories.filter((category) => category.key !== "thaiVisas");
    }

    return allCategories;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(filters);
  };

  const getServicesForCategory = (category: string) => {
    // Dynamic service mappings for future scalability
    const serviceConfig = {
      thaiVisas: [
        { key: "tourist", labelKey: "thaiVisas.tourist" },
        { key: "business", labelKey: "thaiVisas.business" },
        { key: "retirement", labelKey: "thaiVisas.retirement" },
        { key: "education", labelKey: "thaiVisas.education" },
        { key: "privilege", labelKey: "thaiVisas.privilege" },
        { key: "dtv", labelKey: "thaiVisas.dtv" },
        // Future Thai visa types can be added here:
        // { key: "investor", labelKey: "thaiVisas.investor" },
        // { key: "startup", labelKey: "thaiVisas.startup" },
        // { key: "talent", labelKey: "thaiVisas.talent" },
      ],
      foreignVisas: [
        { key: "usa", labelKey: "foreignVisas.usa" },
        { key: "uk", labelKey: "foreignVisas.uk" },
        { key: "schengen", labelKey: "foreignVisas.schengen" },
        { key: "australia", labelKey: "foreignVisas.australia" },
        { key: "canada", labelKey: "foreignVisas.canada" },
        { key: "china", labelKey: "foreignVisas.china" },
        // Future countries can be added here:
        // { key: "japan", labelKey: "foreignVisas.japan" },
        // { key: "korea", labelKey: "foreignVisas.korea" },
        // { key: "singapore", labelKey: "foreignVisas.singapore" },
        // { key: "newZealand", labelKey: "foreignVisas.newZealand" },
      ],
      government: [
        { key: "driversLicense", labelKey: "government.driversLicense" },
        { key: "taxId", labelKey: "government.taxId" },
        {
          key: "residenceCertificate",
          labelKey: "government.residenceCertificate",
        },
        { key: "workPermit", labelKey: "government.workPermit" },
        // Future government services:
        // { key: "socialSecurity", labelKey: "government.socialSecurity" },
        // { key: "healthCard", labelKey: "government.healthCard" },
        // { key: "militaryExemption", labelKey: "government.militaryExemption" },
      ],
      financial: [
        { key: "bankAccount", labelKey: "financial.bankAccount" },
        { key: "insurance", labelKey: "financial.insurance" },
        // Future financial services:
        // { key: "creditCard", labelKey: "financial.creditCard" },
        // { key: "loan", labelKey: "financial.loan" },
        // { key: "investment", labelKey: "financial.investment" },
        // { key: "mortgage", labelKey: "financial.mortgage" },
      ],
      legal: [
        { key: "companyRegistration", labelKey: "legal.companyRegistration" },
        { key: "marriageRegistration", labelKey: "legal.marriageRegistration" },
        { key: "translation", labelKey: "legal.translation" },
        { key: "notarization", labelKey: "legal.notarization" },
        // Future legal services:
        // { key: "divorce", labelKey: "legal.divorce" },
        // { key: "willsAndProbate", labelKey: "legal.willsAndProbate" },
        // { key: "intellectualProperty", labelKey: "legal.intellectualProperty" },
        // { key: "contractReview", labelKey: "legal.contractReview" },
      ],
      business: [
        { key: "accounting", labelKey: "business.accounting" },
        { key: "taxFiling", labelKey: "business.taxFiling" },
        // Future business services:
        // { key: "audit", labelKey: "business.audit" },
        // { key: "consulting", labelKey: "business.consulting" },
        // { key: "licensing", labelKey: "business.licensing" },
        // { key: "compliance", labelKey: "business.compliance" },
      ],
      // Future visa/immigration-related service categories:
      // documentation: [
      //   { key: "apostille", labelKey: "documentation.apostille" },
      //   { key: "embassyAttestation", labelKey: "documentation.embassyAttestation" },
      //   { key: "documentPreparation", labelKey: "documentation.documentPreparation" },
      // ],
      // immigration: [
      //   { key: "permanentResidency", labelKey: "immigration.permanentResidency" },
      //   { key: "citizenshipApplication", labelKey: "immigration.citizenshipApplication" },
      //   { key: "complexCases", labelKey: "immigration.complexCases" },
      // ],
      // specialized: [
      //   { key: "diplomaticVisa", labelKey: "specialized.diplomaticVisa" },
      //   { key: "transitVisa", labelKey: "specialized.transitVisa" },
      //   { key: "emergencyProcessing", labelKey: "specialized.emergencyProcessing" },
      // ]
    };

    const services = serviceConfig[category as keyof typeof serviceConfig];

    if (!services) {
      return [];
    }

    return services.map((service) => ({
      key: service.key,
      label: ts(service.labelKey),
    }));
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Query */}
        <div>
          <input
            type="search"
            placeholder={t("hero.searchPlaceholder")}
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* City Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("filters.allCities")}
            </label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t("filters.allCities")}</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Service Category Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("filters.serviceCategory")}
            </label>
            <select
              value={filters.serviceCategory}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  serviceCategory: e.target.value,
                  specificService: "", // Reset specific service when category changes
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t("filters.allServices")}</option>
              {getAvailableCategories().map((category) => (
                <option key={category.key} value={category.key}>
                  {t(category.labelKey)}
                </option>
              ))}
            </select>
          </div>

          {/* Specific Service Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {filters.serviceCategory
                ? t("filters.specificService") || "Specific Service"
                : t("filters.selectCategoryFirst") || "Select Category First"}
            </label>
            <select
              value={filters.specificService}
              onChange={(e) =>
                setFilters({ ...filters, specificService: e.target.value })
              }
              disabled={!filters.serviceCategory}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">
                {t("filters.allInCategory") || "All in Category"}
              </option>
              {getServicesForCategory(filters.serviceCategory).map(
                (service) => (
                  <option key={service.key} value={service.key}>
                    {service.label}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <button type="submit" className="btn-primary px-8 py-3 text-lg">
            {t("hero.searchButton")}
          </button>
        </div>
      </form>

      {/* Service Category Explanations */}
      {filters.serviceCategory && (
        <ServiceCategoryExplanation
          category={filters.serviceCategory}
          t={t}
          te={te}
        />
      )}
    </div>
  );
}

// Dynamic explanation component for future scalability
interface ServiceCategoryExplanationProps {
  category: string;
  t: (key: string) => string;
  te: (key: string) => string;
}

function ServiceCategoryExplanation({
  category,
  t,
  te,
}: ServiceCategoryExplanationProps) {
  // Mapping of service categories to their translation keys
  const categoryMappings = {
    thaiVisas: {
      categoryKey: "filters.categories.thaiVisas",
      explanationKey: "thaiVisas",
    },
    foreignVisas: {
      categoryKey: "filters.categories.foreignVisas",
      explanationKey: "foreignVisas",
    },
    government: {
      categoryKey: "filters.categories.governmentServices",
      explanationKey: "government",
    },
    financial: {
      categoryKey: "filters.categories.financialServices",
      explanationKey: "financial",
    },
    legal: {
      categoryKey: "filters.categories.legalServices",
      explanationKey: "legal",
    },
    business: {
      categoryKey: "filters.categories.businessServices",
      explanationKey: "business",
    },
    // Future visa/immigration-related categories can be easily added here:
    // documentation: {
    //   categoryKey: "filters.categories.documentationServices",
    //   explanationKey: "documentation"
    // },
    // immigration: {
    //   categoryKey: "filters.categories.immigrationServices",
    //   explanationKey: "immigration"
    // },
    // personal: {
    //   categoryKey: "filters.categories.personalServices",
    //   explanationKey: "personal"
    // },
    // specialized: {
    //   categoryKey: "filters.categories.specializedServices",
    //   explanationKey: "specialized"
    // },
    // relocation: {
    //   categoryKey: "filters.categories.relocationServices",
    //   explanationKey: "relocation"
    // }
  };

  const mapping = categoryMappings[category as keyof typeof categoryMappings];

  if (!mapping) {
    // Graceful fallback for new categories not yet mapped
    return null;
  }

  return (
    <div className="mt-6 rounded-lg bg-blue-50 p-4">
      <div className="text-sm text-blue-800">
        <div>
          <strong>{t(mapping.categoryKey)}:</strong>{" "}
          {te(mapping.explanationKey)}
        </div>
      </div>
    </div>
  );
}
