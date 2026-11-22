import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { formatBnNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CategoryProductList } from "@/components/category-product-list";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = (await getCategories()).find((item) => item.slug === slug);
  if (!category) notFound();
  return { title: `${category.nameBn} — বাজার দর` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.slug === slug);
  if (!currentCategory) notFound();
  const products = await getProductsByCategory(slug);

  // Empty state / invalid slug
  if (products.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center shadow-2xs">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-3xl mb-4 select-none">
          🔍
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          কোনো পণ্য খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য বা তথ্য পাওয়া যায়নি। অনুগ্রহ করে অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।
        </p>
        <Button asChild className="mt-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/">হোম পেজে ফিরে যান</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Header Card */}
      <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-2xs">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-muted/60 text-3xl select-none"
          aria-hidden="true"
        >
          {currentCategory.icon || "🛒"}
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {currentCategory.nameBn}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            {formatBnNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Category Products & Sort Filter */}
      <CategoryProductList initialProducts={products} />
    </div>
  );
}

