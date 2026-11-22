"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUser, useSession } from "@/lib/auth-client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function EditForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    setIsUpdating(true);
    try {
      const result = await updateUser({ name: name.trim() });
      if (result.error) {
        toast.error(result.error.message || "তথ্য আপডেট করা সম্ভব হয়নি।");
      } else {
        toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xs">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">তথ্য আপডেট করুন</h1>
      <p className="mt-2 text-sm text-muted-foreground">আপনার নতুন নাম লিখে সংরক্ষণ করুন।</p>
      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="profile-name">নাম</Label>
          <Input id="profile-name" type="text" autoComplete="name" value={name}
            onChange={(event) => setName(event.target.value)} required
            className="rounded-xl border-border bg-background" />
        </div>
        <Button type="submit" disabled={isUpdating}
          className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
          {isUpdating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </Button>
      </form>
      <Link href="/profile" className="mt-5 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </Card>
  );
}

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?callbackUrl=/profile/edit&reason=protected");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <Skeleton className="mx-auto my-6 h-80 w-full max-w-2xl rounded-3xl" />;
  }

  return <div className="mx-auto max-w-2xl py-6"><EditForm initialName={session.user.name || ""} /></div>;
}
