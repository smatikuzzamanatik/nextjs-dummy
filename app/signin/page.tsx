import { Suspense } from "react"
import Login from "@/components/login"

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          লোড হচ্ছে...
        </div>
      }
    >
      <Login />
    </Suspense>
  )
}
