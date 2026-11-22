import { HeroBanner } from "@/components/hero-banner";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/api";
import { formatBnNumber } from "@/lib/utils";

export default async function HomePage() {
  const products = await getProducts();

  // Risers: dir === "up", sorted by pct desc, top 6
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  // Fallers: dir === "down", sorted by pct desc, top 6
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Section A: আজ দাম বেড়েছে */}
      {risers.length > 0 && (
        <section aria-labelledby="risers-heading" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-success font-bold text-base" aria-hidden="true">
              ▲
            </span>
            <h2
              id="risers-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
            >
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section B: আজ দাম কমেছে */}
      {fallers.length > 0 && (
        <section aria-labelledby="fallers-heading" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-destructive font-bold text-base" aria-hidden="true">
              ▼
            </span>
            <h2
              id="fallers-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
            >
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section C: সব পণ্য */}
      <section id="সব-পণ্য" aria-labelledby="all-products-heading" className="space-y-4">
        <div>
          <h2
            id="all-products-heading"
            className="text-lg sm:text-xl font-bold tracking-tight text-foreground"
          >
            সব পণ্য
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            মোট {formatBnNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            <p className="text-base font-medium">পণ্যের তথ্য লোড করা সম্ভব হয়নি।</p>
            <p className="text-xs mt-1">অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।</p>
          </div>
        )}
      </section>
    </div>
  );
}
