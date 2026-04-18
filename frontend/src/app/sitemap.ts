import type { MetadataRoute } from "next";
import { PORTFOLIO_ENTRIES } from "@/data/portfolio-map";

const SITE_URL = "https://casaslsf.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const TIPOLOGIAS = ["t1", "t2", "t3", "t4"];

interface PlantaSitemapItem {
  tipologia: string;
  slug: string;
  url: string;
  created_at: string | null;
}

async function getPlantasPublicas(): Promise<PlantaSitemapItem[]> {
  try {
    const res = await fetch(`${API_URL}/api/plantas-publicas?limit=500`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

interface SlugItem {
  slug: string;
  published_at: string | null;
}

async function getSlugs(): Promise<SlugItem[]> {
  try {
    const res = await fetch(`${API_URL}/api/artigos/slugs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getSlugs();
  const plantasPublicas = await getPlantasPublicas();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/simulador`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/plantas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/custos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/metodos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/como-funciona`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre-obrasnet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/metodologia-construtiva`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/processo-construcao-lsf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/preco-construcao-lsf-por-m2`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/quanto-custa-casa-lsf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/casa-lsf-financiamento`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/empresa-construcao-lsf-portugal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pladur-preco`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/termos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const artigoPages: MetadataRoute.Sitemap = slugs.map((item) => ({
    url: `${SITE_URL}/blog/${item.slug}`,
    lastModified: item.published_at ? new Date(item.published_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const portfolioPages: MetadataRoute.Sitemap = PORTFOLIO_ENTRIES.map((e) => ({
    url: `${SITE_URL}/portfolio/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tipologiaPages: MetadataRoute.Sitemap = TIPOLOGIAS.map((t) => ({
    url: `${SITE_URL}/plantas/tipologia/${t}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const plantaDetailPages: MetadataRoute.Sitemap = plantasPublicas.map((p) => ({
    url: `${SITE_URL}${p.url}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...portfolioPages,
    ...tipologiaPages,
    ...plantaDetailPages,
    ...artigoPages,
  ];
}
