"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, type FormEvent } from "react"
import { GitBranch } from "lucide-react"
import { toast } from "sonner"
import { signIn } from "@/lib/auth-client"
import { getSafeCallbackUrl } from "@/lib/auth-callback-url"
import { AuthVisual } from "@/components/auth-visual"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"))
  const reason = searchParams.get("reason")
  const oauthError = searchParams.get("error")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
    null
  )

  useEffect(() => {
    if (reason === "protected") {
      toast.info(
        "বিস্তারিত দাম ও বাজারভিত্তিক তুলনা দেখতে প্রথমে সাইন ইন করুন।"
      )
    }
    if (oauthError) {
      toast.error("সোশ্যাল সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।")
    }
  }, [reason, oauthError])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email || !password) {
      toast.error("অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন।")
      return
    }

    setIsLoading(true)
    try {
      const res = await signIn.email({ email, password })
      if (res.error) {
        toast.error(res.error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।")
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!")
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setSocialLoading(provider)
    try {
      const result = await signIn.social({
        provider,
        callbackURL: callbackUrl,
        errorCallbackURL: `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      })
      if (result.error) {
        toast.error(result.error.message || "সোশ্যাল সাইন ইন শুরু করা যায়নি।")
      }
    } catch {
      toast.error("সোশ্যাল সাইন ইন শুরু করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।")
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-foreground/5">
      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[650px] lg:px-14">
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
              আবার স্বাগতম
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে সাইন ইন
              করুন।
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignIn("google")}
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
                onClick={() => handleSocialSignIn("github")}
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
                <FieldLabel htmlFor="email" className="text-sm font-medium">
                  ইমেইল
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                  autoComplete="current-password"
                  placeholder="আপনার পাসওয়ার্ড"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="h-11 rounded-xl border-border bg-background px-3"
                />
              </Field>
              <Button
                type="submit"
                disabled={isLoading || socialLoading !== null}
                className="mt-2 h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href={`/signup${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
                className="font-semibold text-primary hover:underline"
              >
                সাইন আপ করুন
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
