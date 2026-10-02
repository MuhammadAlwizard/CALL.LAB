import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { works } from "@/content/works";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    ...works.map((work) => ({ url: `${site.url}/karya/${work.slug}/`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
