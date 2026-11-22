import Link from "next/link";
import { Product } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatBnNumber, formatUnit } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct ?? 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-4 ring-0 transition-all duration-200 hover:border-primary/40 hover:shadow-md">
        {/* Top row */}
        <div className="flex items-center gap-3">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted/60 text-2xl select-none transition-transform group-hover:scale-105"
            aria-hidden="true"
          >
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
              {product.nameBn}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <span className="mb-0.5 block text-[11px] font-normal text-muted-foreground">
              আজকের দাম
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              {formatBnNumber(product.today)} টাকা
            </span>
          </div>

          <div>
            {isUp ? (
              <Badge
                className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-semibold text-success"
              >
                <span className="sr-only">দাম বেড়েছে </span>▲ {formatBnNumber(pct)}%
              </Badge>
            ) : isDown ? (
              <Badge variant="destructive" className="rounded-full px-2 py-0.5 text-xs font-semibold">
                <span className="sr-only">দাম কমেছে </span>▼ {formatBnNumber(pct)}%
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="rounded-full border-border bg-muted/50 px-2 py-0.5 text-xs font-semibold text-muted-foreground"
              >
                <span className="sr-only">দাম অপরিবর্তিত </span>— ০.০%
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
