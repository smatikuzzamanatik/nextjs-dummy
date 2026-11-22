"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="space-y-6 py-6 max-w-2xl mx-auto">
        <Skeleton className="h-8 w-44 rounded-md" />
        <Skeleton className="h-28 w-full rounded-3xl" />
        <Skeleton className="h-44 w-full rounded-3xl" />
      </div>
    );
  }

  if (!session) {
    router.push("/signin?callbackUrl=/profile&reason=protected");
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  const userInitials = (session.user.name || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও আপডেট করুন।
        </p>
      </div>

      {/* Top User Summary Card */}
      <Card className="rounded-3xl border border-border bg-card p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 rounded-2xl border border-border/80">
              <AvatarImage
                src={session.user.image || "/logo-icon.png"}
                alt={session.user.name || "ইউজার"}
              />
              <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground text-lg font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {session.user.name}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleSignOut}
            className="rounded-xl border-destructive/40 text-destructive hover:bg-destructive/10 text-xs font-semibold shrink-0"
          >
            ↩️ সাইন আউট
          </Button>
        </div>
      </Card>

      {/* Bottom Update Information Card (Challenge C3) */}
      <Card className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xs">
        <h2 className="text-lg font-bold tracking-tight text-foreground">তথ্য</h2>
        <p className="mt-1 text-xs text-muted-foreground">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
        <Button asChild className="mt-5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
          <Link href="/profile/edit">তথ্য আপডেট করুন</Link>
        </Button>
      </Card>
    </div>
  );
}

