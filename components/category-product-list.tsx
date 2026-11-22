"use client";

import { useState } from "react";
import { Product, SortOption } from "@/types";
import { ProductCard } from "@/components/product-card";
import { sortProducts, formatBnNumber } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryProductListProps {
  initialProducts: Product[];
}

export function CategoryProductList({ initialProducts }: CategoryProductListProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = sortProducts(initialProducts, sortOption);

  return (
    <div className="space-y-6">
      {/* Sort Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-4 shadow-2xs">
        <div className="text-sm text-muted-foreground">
          মোট{" "}
          <span className="font-semibold text-foreground">
            {formatBnNumber(sortedProducts.length)}
          </span>
          টি পণ্য দেখানো হচ্ছে
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm font-medium text-muted-foreground shrink-0">
            সাজান:
          </label>
          <Select
            value={sortOption}
            onValueChange={(val) => setSortOption(val as SortOption)}
          >
            <SelectTrigger id="sort-select" className="w-[180px] rounded-xl border-border bg-background">
              <SelectValue placeholder="ডিফল্ট" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="default">ডিফল্ট</SelectItem>
              <SelectItem value="price_asc">দাম: কম থেকে বেশি</SelectItem>
              <SelectItem value="price_desc">দাম: বেশি থেকে কম</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

