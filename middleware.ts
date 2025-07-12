import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "th", "zh"],

  // Used when no locale matches
  defaultLocale: "en",

  // Show the default locale in the URL
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(th|zh|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};