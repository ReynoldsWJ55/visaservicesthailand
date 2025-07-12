import { sampleAgencies } from "@/data/agencies";
import { Agency } from "@/types/agency";

// Get unique cities from agency data
export function getAvailableCities(): string[] {
  const cities = new Set<string>();

  sampleAgencies.forEach((agency) => {
    agency.locations.forEach((location) => {
      cities.add(location.city);
    });
  });

  return Array.from(cities).sort();
}

// Get all available services across agencies
export function getAvailableServices() {
  const services = new Set<string>();

  sampleAgencies.forEach((agency) => {
    // Thai visa services
    agency.services.thaiVisas.types.forEach((type) =>
      services.add(`thai-${type}`)
    );

    // Foreign visa services
    agency.services.foreignVisas.countries.forEach((country) =>
      services.add(`foreign-${country}`)
    );

    // Financial services
    if (agency.services.financialServices.bankAccount)
      services.add("bank-account");
    if (agency.services.financialServices.insurance) services.add("insurance");

    // Legal services
    if (agency.services.legalServices.companyRegistration)
      services.add("company-registration");
    if (agency.services.legalServices.workPermit) services.add("work-permit");
    if (agency.services.legalServices.marriageRegistration)
      services.add("marriage-registration");

    // Government services
    if (agency.services.governmentServices.driversLicense)
      services.add("drivers-license");
    if (agency.services.governmentServices.taxId) services.add("tax-id");
    if (agency.services.governmentServices.residenceCertificate)
      services.add("residence-certificate");

    // Business services
    if (agency.services.businessServices.accountingServices)
      services.add("accounting");
    if (agency.services.businessServices.taxFiling) services.add("tax-filing");

    // Personal services
    if (agency.services.personalServices.translation)
      services.add("translation");
    if (agency.services.personalServices.notarization)
      services.add("notarization");
  });

  return Array.from(services).sort();
}

// Categorize services for better UX
export function getServiceCategories() {
  return {
    thaiVisas: [
      { key: "thai-tourist", category: "thai-visa" },
      { key: "thai-business", category: "thai-visa" },
      { key: "thai-retirement", category: "thai-visa" },
      { key: "thai-education", category: "thai-visa" },
      { key: "thai-privilege", category: "thai-visa" },
      { key: "thai-dtv", category: "thai-visa" },
    ],
    foreignVisas: [
      { key: "foreign-usa", category: "foreign-visa" },
      { key: "foreign-uk", category: "foreign-visa" },
      { key: "foreign-schengen", category: "foreign-visa" },
      { key: "foreign-australia", category: "foreign-visa" },
      { key: "foreign-canada", category: "foreign-visa" },
      { key: "foreign-china", category: "foreign-visa" },
    ],
    governmentServices: [
      { key: "drivers-license", category: "government" },
      { key: "tax-id", category: "government" },
      { key: "residence-certificate", category: "government" },
      { key: "work-permit", category: "government" },
    ],
    financialServices: [
      { key: "bank-account", category: "financial" },
      { key: "insurance", category: "financial" },
    ],
    legalServices: [
      { key: "company-registration", category: "legal" },
      { key: "marriage-registration", category: "legal" },
      { key: "translation", category: "legal" },
      { key: "notarization", category: "legal" },
    ],
    businessServices: [
      { key: "accounting", category: "business" },
      { key: "tax-filing", category: "business" },
    ],
  };
}

// Filter agencies by service
export function getAgenciesByService(serviceKey: string): Agency[] {
  return sampleAgencies.filter((agency) => {
    // Check Thai visas
    if (serviceKey.startsWith("thai-")) {
      const visaType = serviceKey.replace("thai-", "");
      return agency.services.thaiVisas.types.includes(visaType);
    }

    // Check Foreign visas
    if (serviceKey.startsWith("foreign-")) {
      const country = serviceKey.replace("foreign-", "");
      return agency.services.foreignVisas.countries.includes(country);
    }

    // Check other services
    switch (serviceKey) {
      case "bank-account":
        return agency.services.financialServices.bankAccount;
      case "drivers-license":
        return agency.services.governmentServices.driversLicense;
      case "company-registration":
        return agency.services.legalServices.companyRegistration;
      case "work-permit":
        return agency.services.legalServices.workPermit;
      case "translation":
        return agency.services.personalServices.translation;
      default:
        return false;
    }
  });
}

// Filter agencies by city
export function getAgenciesByCity(city: string): Agency[] {
  return sampleAgencies.filter((agency) =>
    agency.locations.some((location) => location.city === city)
  );
}
