"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useSession, signOut } from "@/lib/auth-client";
import { formatBnDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@/types";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

interface NavbarProps {
  categories?: Category[];
}

export function Navbar({ categories = DEFAULT_CATEGORIES }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট করা হয়েছে");
            router.push("/");
            router.refresh();
          },
          onError: () => {
            toast.error("সাইন আউট ব্যর্থ হয়েছে");
          },
        },
      });
    } catch {
      toast.error("সাইন আউট করার সময় একটি ত্রুটি ঘটেছে");
    }
  };

  const isCategoryActive = (catSlug: string) => {
    if (pathname === `/category/${catSlug}`) return true;
    if (
      (catSlug === "dim-dui" || catSlug === "dim-dudh") &&
      (pathname === "/category/dim-dui" || pathname === "/category/dim-dudh")
    ) {
      return true;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-xs">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top Row */}
        <div className="flex h-16 items-center justify-between gap-4 border-b border-border/60">
          {/* Left: Logo & Bengali Date */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-xs">
              <Image
                src="/logo-icon.png"
                alt=""
                width={20}
                height={20}
                className="size-5 object-contain brightness-0 invert"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight tracking-tight text-foreground">
                বাজার দর
              </span>
              <span
                suppressHydrationWarning
                className="text-[11px] font-normal leading-tight text-muted-foreground"
              >
                {formatBnDate()}
              </span>
            </div>
          </Link>

          {/* Right: Auth State */}
          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-16 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex h-9 items-center gap-2 rounded-full px-2 py-1.5 hover:bg-muted"
                  >
                    <Avatar size="sm" className="size-7">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                        {session.user.name?.charAt(0).toUpperCase() || "ব"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-[120px] truncate text-sm font-semibold text-foreground sm:max-w-[160px]">
                      {session.user.name}
                    </span>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl border border-border bg-popover p-1.5 shadow-lg"
                >
                  <div className="px-2.5 py-2">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {session.user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 py-1.5 text-sm"
                    >
                      <span aria-hidden="true">👤</span>
                      <span>আমার প্রোফাইল</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleSignOut}
                    className="cursor-pointer flex items-center gap-2 py-1.5 text-sm text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <span aria-hidden="true">↩️</span>
                    <span>সাইন আউট</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  asChild
                  className="font-medium text-foreground hover:text-primary"
                >
                  <Link href="/signin">সাইন ইন</Link>
                </Button>
                <Button
                  variant="default"
                  asChild
                  className="rounded-lg bg-primary px-4 font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
                >
                  <Link href="/signup">সাইন আপ</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Category Pills */}
        <nav
          aria-label="বিভাগসমূহ"
          className="no-scrollbar flex items-center gap-1.5 overflow-x-auto py-2.5 sm:gap-2"
        >
          {categories.map((cat) => {
            const active = isCategoryActive(cat.slug);
            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                aria-current={active ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="text-base leading-none select-none" aria-hidden="true">
                  {cat.icon}
                </span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

