import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Known app routes that should NOT be redirected
const APP_ROUTES = new Set([
  "/",
  "/simulador",
  "/plantas",
  "/custos",
  "/metodos",
  "/como-funciona",
  "/blog",
  "/privacidade",
  "/termos",
  "/sobre-obrasnet",
  "/metodologia-construtiva",
  "/processo-construcao-lsf",
  "/preco-construcao-lsf-por-m2",
  "/quanto-custa-casa-lsf",
  "/casa-lsf-financiamento",
  "/empresa-construcao-lsf-portugal",
]);

// Old WordPress blog slugs → correct slugs (301 redirects)
// These old URLs still receive significant Google impressions
const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  "telhados-e-coberturas-preco-m2-portugal": "telhados-e-coberturas-precos",
  "casas-modulares-t3-portugal-precos": "casas-modulares-portugal-chave-na-mao",
  "manta-termica-telhado-preco-m2": "descubra-tudo-sobre-isolamento-termico-melhores-materiais-e-instalacao",
};

// Paths that should never be intercepted
const SKIP_PREFIXES = [
  "/_next",
  "/api",
  "/favicon",
  "/robots",
  "/sitemap",
  "/blog/",
  "/manifest",
  "/sw.",
  "/bg-",
  "/logo",
  "/images",
  "/icons",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old blog slugs before skipping /blog/ prefix
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    const newSlug = BLOG_SLUG_REDIRECTS[slug];
    if (newSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/blog/${newSlug}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // Skip static assets and known prefixes
  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Skip known app routes
  if (APP_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  // Skip file extensions (images, css, js, etc.)
  if (/\.\w{2,5}$/.test(pathname)) {
    return NextResponse.next();
  }

  // /portfolio/* → /plantas (these were house model pages)
  if (pathname.startsWith("/portfolio")) {
    const url = request.nextUrl.clone();
    url.pathname = "/plantas";
    return NextResponse.redirect(url, 301);
  }

  // /produto/* → /plantas (these were product/model pages)
  if (pathname.startsWith("/produto")) {
    const url = request.nextUrl.clone();
    url.pathname = "/plantas";
    return NextResponse.redirect(url, 301);
  }

  // /precos-m2 → /custos
  if (pathname === "/precos-m2" || pathname === "/precos-m2/") {
    const url = request.nextUrl.clone();
    url.pathname = "/custos";
    return NextResponse.redirect(url, 301);
  }

  // /sobre → /
  if (pathname === "/sobre" || pathname === "/sobre/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 301);
  }

  // /contacto or /contactos → /simulador
  if (pathname === "/contacto" || pathname === "/contactos" || pathname === "/contacto/" || pathname === "/contactos/") {
    const url = request.nextUrl.clone();
    url.pathname = "/simulador";
    return NextResponse.redirect(url, 301);
  }

  // All other root-level paths → redirect to /blog/{slug}
  // These are old WordPress post URLs (e.g., /pavilhoes-pre-fabricados-preco-m2)
  const slug = pathname.replace(/^\//, "").replace(/\/$/, "");
  if (slug && !slug.includes("/")) {
    const url = request.nextUrl.clone();
    // Use corrected slug if an old→new mapping exists, avoiding double 301
    const correctedSlug = BLOG_SLUG_REDIRECTS[slug] || slug;
    url.pathname = `/blog/${correctedSlug}`;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
