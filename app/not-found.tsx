import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-muted/80 text-4xl mb-4 select-none shadow-2xs">
        🛒
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        ৪০৪ — পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        দুঃখিত! আপনি যে লিঙ্কটিতে প্রবেশ করার চেষ্টা করছেন তা হয়তো পরিবর্তিত হয়েছে অথবা পৃষ্ঠাটি আর বিদ্যমান নেই।
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
          <Link href="/">হোম পেজে ফিরে যান</Link>
        </Button>
      </div>
    </div>
  );
}

