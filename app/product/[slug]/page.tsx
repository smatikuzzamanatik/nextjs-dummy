import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getProductByIdOrSlug } from "@/lib/api";
import { formatBnNumber, formatUnit } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);
  if (!product) notFound();
  return { title: `${product.nameBn} — বাজার দর` };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);
  if (!product) notFound();

  // 1. Route Protection: verify authenticated session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackUrl=/product/${slug}&reason=protected`);
  }

  // 2. Price differences and stats calculation
  const diff = product.today - (product.yesterday || product.today);
  const isDiffPositive = diff > 0;
  const isDiffNegative = diff < 0;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct ?? 0;

  const markets = product.markets || [];

  const minMarketPrice =
    markets.length > 0
      ? Math.min(...markets.map((m) => m.min))
      : product.today;

  const maxMarketPrice =
    markets.length > 0
      ? Math.max(...markets.map((m) => m.max))
      : product.today;

  const avgMarketPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
        )
      : product.today;

  const unitShort = formatUnit(product.unit).replace("প্রতি ", "");

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">হোম</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/category/${product.category}`}>
                {product.categoryNameBn || product.category}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.nameBn}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Top Product Overview Card */}
      <Card className="rounded-3xl border border-border bg-card p-6 shadow-2xs">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Info */}
          <div className="flex items-center gap-4">
            <div
              className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-muted/60 text-3xl select-none"
              aria-hidden="true"
            >
              {product.image || product.categoryIcon || "🛒"}
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {product.nameBn}
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                {formatUnit(product.unit)} · {product.categoryNameBn || "সাধারণ"}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {isDiffPositive ? (
                  <span>
                    গতকালের তুলনায় আজ দাম{" "}
                    <strong className="text-success font-semibold">বেড়েছে</strong> ·{" "}
                    {formatBnNumber(diff)} টাকা
                  </span>
                ) : isDiffNegative ? (
                  <span>
                    গতকালের তুলনায় আজ দাম{" "}
                    <strong className="text-destructive font-semibold">কমেছে</strong> ·{" "}
                    {formatBnNumber(Math.abs(diff))} টাকা
                  </span>
                ) : (
                  <span>গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে</span>
                )}
              </p>
            </div>
          </div>

          {/* Right Price Display Box */}
          <div className="flex shrink-0 flex-col items-start sm:items-end justify-center rounded-2xl bg-muted/40 p-4 border border-border/60">
            <span className="text-xs text-muted-foreground">আজকের দাম</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-extrabold text-foreground">
                {formatBnNumber(product.today)}
              </span>
              <span className="text-xs text-muted-foreground">টাকা / {unitShort}</span>
            </div>
            <div className="mt-2">
              {isUp ? (
                <Badge className="rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                  <span className="sr-only">দাম বেড়েছে </span>▲ {formatBnNumber(pct)}%
                </Badge>
              ) : isDown ? (
                <Badge variant="destructive" className="rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  <span className="sr-only">দাম কমেছে </span>▼ {formatBnNumber(pct)}%
                </Badge>
              ) : (
                <Badge variant="outline" className="rounded-full border-border bg-muted/50 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  <span className="sr-only">দাম অপরিবর্তিত </span>— ০.০%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Price Summary & Market Breakdown Container */}
      <Card className="space-y-8 rounded-3xl border border-border bg-card p-6 shadow-2xs">
        {/* Section: দামের সারসংক্ষেপ */}
        <div className="space-y-4">
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Min Price Card */}
            <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
              <span className="text-xs text-muted-foreground">সর্বনিম্ন দাম</span>
              <div className="mt-1 text-xl font-bold text-success">
                {formatBnNumber(minMarketPrice)} টাকা
              </div>
              <span className="mt-1 block text-xs text-muted-foreground">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            {/* Max Price Card */}
            <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
              <span className="text-xs text-muted-foreground">সর্বাধিক দাম</span>
              <div className="mt-1 text-xl font-bold text-destructive">
                {formatBnNumber(maxMarketPrice)} টাকা
              </div>
              <span className="mt-1 block text-xs text-muted-foreground">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            {/* Avg Price Card */}
            <div className="rounded-2xl border border-border/80 bg-background/60 p-4">
              <span className="text-xs text-muted-foreground">গড় দাম</span>
              <div className="mt-1 text-xl font-bold text-foreground">
                {formatBnNumber(avgMarketPrice)} টাকা
              </div>
              <span className="mt-1 block text-xs text-muted-foreground">
                প্রতি {unitShort}-এর হিসাবে
              </span>
            </div>
          </div>
        </div>

        {/* Section: বাজারভিত্তিক আজকের দাম */}
        <div className="space-y-4">
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold text-foreground">বাজার</TableHead>
                    <TableHead className="font-semibold text-foreground">বিভাগ</TableHead>
                    <TableHead className="font-semibold text-foreground">সর্বনিম্ন</TableHead>
                    <TableHead className="font-semibold text-foreground">সর্বাধিক</TableHead>
                    <TableHead className="font-semibold text-foreground">গড়</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {markets.map((m, idx) => {
                    const avg = Math.round((m.min + m.max) / 2);
                    return (
                      <TableRow key={`${m.market}-${idx}`}>
                        <TableCell className="font-medium text-foreground">
                          {m.market}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {m.division}
                        </TableCell>
                        <TableCell className="text-foreground">
                          {formatBnNumber(m.min)} টাকা
                        </TableCell>
                        <TableCell className="text-foreground">
                          {formatBnNumber(m.max)} টাকা
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">
                          {formatBnNumber(avg)} টাকা
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              এই পণ্যের জন্য আলাদা বাজারভিত্তিক তালিকা পাওয়া যায়নি।
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

