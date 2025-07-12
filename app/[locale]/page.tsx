"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { SearchForm } from "@/components/search/SearchForm";

export default function HomePage() {
  const t = useTranslations("nav");
  const th = useTranslations("homepage");
  const tft = useTranslations("homepage.features");

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {th("title")}
              </h1>
            </div>
            <div className="flex items-center space-x-8">
              <nav className="hidden space-x-8 md:flex">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  {t("agencies")}
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  {t("thaiVisas")}
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  {t("foreignVisas")}
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  {t("guides")}
                </a>
              </nav>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            {th("hero.heading")}
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            {th("hero.description")}
          </p>

          <SearchForm onSearch={handleSearch} />

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 p-6">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {tft("verified.title")}
              </h3>
              <p className="text-gray-600">{tft("verified.description")}</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 p-6">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {tft("multilingual.title")}
              </h3>
              <p className="text-gray-600">{tft("multilingual.description")}</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 p-6">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {tft("contact.title")}
              </h3>
              <p className="text-gray-600">{tft("contact.description")}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
