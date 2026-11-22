import Image from "next/image"

export function AuthVisual() {
  return (
    <aside className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-[linear-gradient(145deg,#0d7546_0%,#0a5437_48%,#083d2e_100%)] p-10 text-white lg:flex">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-28 size-[420px] rounded-full border border-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 size-[300px] rounded-full border border-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 size-[420px] rounded-full bg-white/5 blur-2xl"
      />
      <div className="relative z-10 w-fit rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-sm">
        বাজারের খবর এখন হাতের মুঠোয়
      </div>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative flex size-64 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-2xl shadow-black/10">
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-full border border-dashed border-white/20"
          />
          <Image
            src="/bazar-hero.png"
            alt=""
            width={220}
            height={220}
            className="relative z-10 h-52 w-52 object-contain drop-shadow-2xl"
          />
        </div>
        <h2 className="mt-9 max-w-sm text-3xl leading-tight font-bold tracking-tight">
          সঠিক দামে, নিশ্চিন্ত বাজার
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-7 text-white/80">
          চাল, ডাল, তেল থেকে মাছ-মাংস—প্রয়োজনীয় পণ্যের দাম ও পরিবর্তন দেখুন এক
          জায়গায়।
        </p>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs text-white/70">আজকের বাজার</p>
          <p className="mt-1 text-sm font-semibold">দাম এক নজরে</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs text-white/70">সহজ তুলনা</p>
          <p className="mt-1 text-sm font-semibold">বাজার বুঝে কিনুন</p>
        </div>
      </div>
    </aside>
  )
}
