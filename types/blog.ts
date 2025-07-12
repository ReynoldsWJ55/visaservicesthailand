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
    category: "visa-guides" | "agency-news" | "immigration-updates" | "tips";
    featured: boolean;
    locale: "en" | "th";
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
