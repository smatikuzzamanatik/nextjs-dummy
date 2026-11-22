import Link from "next/link";
import { Product } from "@/types";
import { formatBnNumber } from "@/lib/utils";
import { getProducts } from "@/lib/api";
import { TickerMotion } from "@/components/ticker-motion";

const DEFAULT_TICKER_ITEMS: Product[] = [
  {
    id: 1,
    slug: "sorno-machi-chal",
    nameBn: "স্বর্ণমাছি চাল",
    category: "chal",
    categoryNameBn: "চাল",
    categoryIcon: "🍚",
    unit: "kg",
    image: "🍚",
    today: 148,
    yesterday: 145,
    lastWeek: 142,
    lastMonth: 138,
    change: { dir: "up", pct: 2.1 },
    markets: [],
  },
  {
    id: 2,
    slug: "miniket-chal",
    nameBn: "মিনিকেট চাল",
    category: "chal",
    categoryNameBn: "চাল",
    categoryIcon: "🍚",
    unit: "kg",
    image: "🍚",
    today: 99,
    yesterday: 102,
    lastWeek: 100,
    lastMonth: 105,
    change: { dir: "down", pct: 2.9 },
    markets: [],
  },
  {
    id: 3,
    slug: "batam-size-chal",
    nameBn: "বাটাম সাইজ চাল",
    category: "chal",
    categoryNameBn: "চাল",
    categoryIcon: "🍚",
    unit: "kg",
    image: "🍚",
    today: 66,
    yesterday: 64,
    lastWeek: 63,
    lastMonth: 60,
    change: { dir: "up", pct: 3.1 },
    markets: [],
  },
  {
    id: 4,
    slug: "moshur-dal",
    nameBn: "মসুর ডাল",
    category: "dal",
    categoryNameBn: "ডাল",
    categoryIcon: "🫘",
    unit: "kg",
    image: "🫘",
    today: 142,
    yesterday: 138,
    lastWeek: 135,
    lastMonth: 130,
    change: { dir: "up", pct: 2.9 },
    markets: [],
  },
  {
    id: 5,
    slug: "chola",
    nameBn: "ছোলা",
    category: "dal",
    categoryNameBn: "ডাল",
    categoryIcon: "🫘",
    unit: "kg",
    image: "🫘",
    today: 120,
    yesterday: 123,
    lastWeek: 125,
    lastMonth: 122,
    change: { dir: "down", pct: 2.4 },
    markets: [],
  },
  {
    id: 6,
    slug: "amon-dal",
    nameBn: "আমন ডাল (খোসাছাড়া)",
    category: "dal",
    categoryNameBn: "ডাল",
    categoryIcon: "🫘",
    unit: "kg",
    image: "🫘",
    today: 145,
    yesterday: 141,
    lastWeek: 140,
    lastMonth: 135,
    change: { dir: "up", pct: 2.8 },
    markets: [],
  },
];

function getUnitShort(unit?: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "কেজি";
    case "litre":
    case "liter":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "পিস";
    default:
      return unit || "কেজি";
  }
}

interface PriceTickerProps {
  products?: Product[];
}

export async function PriceTicker({ products }: PriceTickerProps) {
  let items = products;
  if (!items || items.length === 0) {
    try {
      const fetched = await getProducts();
      items = fetched && fetched.length > 0 ? fetched : DEFAULT_TICKER_ITEMS;
    } catch {
      items = DEFAULT_TICKER_ITEMS;
    }
  }

  const renderTickerItem = (product: Product, index: number, isDuplicate = false) => {
    const isUp = product.change?.dir === "up";
    const isDown = product.change?.dir === "down";
    const pct = product.change?.pct ?? 0;
    const unitText = getUnitShort(product.unit);

    return (
      <Link
        key={`${isDuplicate ? "dup" : "orig"}-${product.id}-${index}`}
        href={`/product/${product.slug}`}
        tabIndex={isDuplicate ? -1 : 0}
        aria-hidden={isDuplicate ? "true" : undefined}
        className="inline-flex shrink-0 items-center gap-1.5 border-r border-border/80 px-4 py-2 text-xs font-medium text-foreground transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span className="text-sm select-none" aria-hidden="true">
          {product.image || product.categoryIcon || "🛒"}
        </span>
        <span className="font-medium text-foreground">{product.nameBn}</span>
        <span className="text-muted-foreground">
          {formatBnNumber(product.today)} টাকা/{unitText}
        </span>
        {isUp ? (
          <span className="inline-flex items-center gap-0.5 font-bold text-success">
            <span className="sr-only">দাম বেড়েছে </span>▲ {formatBnNumber(pct)}%
          </span>
        ) : isDown ? (
          <span className="inline-flex items-center gap-0.5 font-bold text-destructive">
            <span className="sr-only">দাম কমেছে </span>▼ {formatBnNumber(pct)}%
          </span>
        ) : (
          <span className="inline-flex items-center gap-0.5 font-medium text-muted-foreground">
            <span className="sr-only">দাম অপরিবর্তিত </span>— ০.০%
          </span>
        )}
      </Link>
    );
  };

  return (
    <TickerMotion duplicate={items.map((p, i) => renderTickerItem(p, i, true))}>
      {items.map((p, i) => renderTickerItem(p, i, false))}
    </TickerMotion>
  );
}
