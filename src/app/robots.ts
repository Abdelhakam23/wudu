import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/wudu", "/salah", "/hadiths", "/search"],
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
