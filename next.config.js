const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const withNextIntl = require("next-intl/plugin")("./next-intl.config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = withMDX(
  withNextIntl({
    // Remove output: 'export' for development, add it back for production build
    images: { unoptimized: true },
    trailingSlash: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    experimental: {
      mdxRs: false,
    },
  })
);

module.exports = nextConfig;
