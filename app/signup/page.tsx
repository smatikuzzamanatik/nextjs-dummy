"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { GitBranch } from "lucide-react"
import { signIn, signUp } from "@/lib/auth-client"
import { getSafeCallbackUrl } from "@/lib/auth-callback-url"
import { toast } from "sonner"
import { AuthVisual } from "@/components/auth-visual"
import { Logo } from "@/components/logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"))
  const oauthError = searchParams.get("error")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
    null
  )

  useEffect(() => {
    if (oauthError) {
      toast.error("সোশ্যাল সাইন আপ সম্পন্ন হয়নি। আবার চেষ্টা করুন।")
    }
  }, [oauthError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন।")
      return
    }

    if (!email.trim()) {
      toast.error("অনুগ্রহ করে আপনার ইমেইল লিখুন।")
      return
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।")
      return
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি। পুনরায় চেক করুন।")
      return
    }

    setIsLoading(true)
    try {
      const res = await signUp.email({ name, email, password })

      if (res.error) {
        toast.error(
          res.error.message ||
            "রেজিস্ট্রেশন ব্যর্থ হয়েছে। এই ইমেইলটি হয়তো আগেই ব্যবহৃত হয়েছে।"
        )
      } else {
        toast.success(
          "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।"
        )
        router.push(
          `/signin${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`
        )
      }
    } catch {
      toast.error("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setSocialLoading(provider)
    try {
      const result = await signIn.social({
        provider,
        callbackURL: callbackUrl,
        errorCallbackURL: `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      })
      if (result.error) {
        toast.error(result.error.message || "সোশ্যাল সাইন আপ শুরু করা যায়নি।")
      }
    } catch {
      toast.error("সোশ্যাল সাইন আপ শুরু করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।")
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-foreground/5">
      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[760px] lg:px-14">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-lg font-bold tracking-tight text-foreground">
              বাজার দর
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary">
              আপনার বাজার, আপনার হিসাব
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignUp("google")}
                disabled={isLoading || socialLoading !== null}
                className="h-11 rounded-xl border-border bg-background px-3 font-medium hover:bg-muted"
              >
                <span
                  aria-hidden="true"
                  className="text-base font-bold text-red-500"
                >
                  G
                </span>
                {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignUp("github")}
                disabled={isLoading || socialLoading !== null}
                className="h-11 rounded-xl border-border bg-background px-3 font-medium hover:bg-muted"
              >
                <GitBranch aria-hidden="true" className="size-4" />
                {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub"}
              </Button>
            </div>

            <div className="my-7 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs whitespace-nowrap text-muted-foreground">
                অথবা ইমেইল দিয়ে
              </span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field>
                <FieldLabel htmlFor="name" className="text-sm font-medium">
                  নাম
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="যেমন: রহিম উদ্দিন"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 rounded-xl border-border bg-background px-3"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  ইমেইল
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-xl border-border bg-background px-3"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password" className="text-sm font-medium">
                  পাসওয়ার্ড
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-xl border-border bg-background px-3"
                />
              </Field>
              <Field>
                <FieldLabel
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  পাসওয়ার্ড নিশ্চিত করুন
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="আবার লিখুন"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11 rounded-xl border-border bg-background px-3"
                />
              </Field>
              <Button
                type="submit"
                disabled={isLoading || socialLoading !== null}
                className="mt-2 h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {isLoading
                  ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                  : "অ্যাকাউন্ট তৈরি করুন"}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              অ্যাকাউন্ট আছে?{" "}
              <Link
                href={`/signin${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
                className="font-semibold text-primary hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

        <AuthVisual />
      </div>
    </section>
  )
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          লোড হচ্ছে...
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  )
}
