import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBnDate } from "@/lib/utils";

export function HeroBanner() {
  const dateStr = formatBnDate();

  return (
    <section
      aria-label="ব্যানার"
      className="relative my-6 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8 md:p-10"
    >
      <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-12">
        {/* Left Column: Text & CTA */}
        <div className="flex flex-1 flex-col items-start text-left">
          {/* Eyebrow Badge */}
          <Badge
            variant="outline"
            className="mb-3 rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:text-sm"
          >
            <span suppressHydrationWarning>{dateStr}</span>
          </Badge>

          {/* Heading */}
          <h1 className="mb-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <a href="#সব-পণ্য" className="inline-flex items-center gap-2">
              <span>সব পণ্য দেখুন</span>
              <ArrowDown className="size-4" />
            </a>
          </Button>
        </div>

        {/* Right Column: Hero Illustration */}
        <div className="flex shrink-0 items-center justify-center">
          <Image
            src="/bazar-hero.png"
            alt="আজকের বাজারের দাম চিত্র"
            width={320}
            height={260}
            priority
            className="h-auto w-56 sm:w-64 md:w-80 object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}

