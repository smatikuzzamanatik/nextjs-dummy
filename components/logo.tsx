import Image from "next/image"

export function Logo() {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm shadow-primary/20">
      <Image
        src="/logo-icon.png"
        alt=""
        width={22}
        height={22}
        className="size-[22px] object-contain brightness-0 invert"
      />
    </span>
  )
}
