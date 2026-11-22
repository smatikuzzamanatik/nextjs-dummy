import { Category, Product } from "@/types";

const API_ENDPOINTS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchFromBazarAPI<T>(path: string): Promise<T | null> {
  for (const base of API_ENDPOINTS) {
    try {
      const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
      const res = await fetch(url, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        return data as T;
      }
    } catch {
      // Continue to next endpoint fallback
    }
  }
  return null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromBazarAPI<Category[]>("/categories");
  return data || [];
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchFromBazarAPI<Product[]>("/products");
  return data || [];
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const data = await fetchFromBazarAPI<Product[]>(`/products?category=${encodeURIComponent(categorySlug)}`);
  if (data && Array.isArray(data)) {
    return data;
  }
  // Fallback: fetch all and filter
  const all = await getProducts();
  return all.filter((p) => p.category === categorySlug);
}

export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  const idStr = String(idOrSlug);
  // Try direct fetch if numeric id
  if (/^\d+$/.test(idStr)) {
    const single = await fetchFromBazarAPI<Product>(`/products/${idStr}`);
    if (single && single.id) return single;
  }

  // Fallback or slug matching from all products
  const all = await getProducts();
  return all.find((p) => String(p.id) === idStr || p.slug === idStr) || null;
}
