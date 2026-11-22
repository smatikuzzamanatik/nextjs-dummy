import { Product, SortOption } from "@/types";

export { cn } from "cn";

export function formatBnNumber(num: number | string | null | undefined): string {
  if (num === null || num === undefined || isNaN(Number(num))) return "০";
  return Number(num).toLocaleString("bn-BD");
}

export function formatUnit(unit?: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return unit ? `প্রতি ${unit}` : "";
  }
}

export function formatBnDate(date: Date = new Date()): string {
  const bnDays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const bnMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const dayName = bnDays[date.getDay()];
  const day = formatBnNumber(date.getDate());
  const monthName = bnMonths[date.getMonth()];
  const year = formatBnNumber(date.getFullYear());

  return `${dayName}, ${day} ${monthName}, ${year}`;
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  if (sort === "price_asc") {
    return copy.sort((a, b) => a.today - b.today);
  }
  if (sort === "price_desc") {
    return copy.sort((a, b) => b.today - a.today);
  }
  return copy;
}
