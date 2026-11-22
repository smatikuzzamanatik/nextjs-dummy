import { NextRequest, NextResponse } from "next/server";
import { getCategories, getProductByIdOrSlug } from "@/lib/api";

export async function proxy(request: NextRequest) {
  const [, kind, slug, extra] = request.nextUrl.pathname.split("/");
  if (!slug || extra) return NextResponse.next();

  const exists = kind === "category"
    ? (await getCategories()).some((category) => category.slug === slug)
    : Boolean(await getProductByIdOrSlug(slug));

  if (exists) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export const config = {
  matcher: ["/category/:path*", "/product/:path*"],
};
