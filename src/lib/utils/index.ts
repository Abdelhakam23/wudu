import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Standard Arabic text normalizer for search and comparison
 * Removes diacritics (Tashkeel), normalizes Alifs, Yaa/Alif Maqsura, Taa Marbuta
 */
export function normalizeArabicText(text: string): string {
  if (!text) return "";
  return text
    // Remove Arabic diacritics (Harakat / Tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // Remove Tatweel (Kashida)
    .replace(/\u0640/g, "")
    // Normalize Alif forms (أ, إ, آ, ٱ -> ا)
    .replace(/[إأآٱ]/g, "ا")
    // Normalize Alif Maqsura (ى -> ي)
    .replace(/ى/g, "ي")
    // Normalize Taa Marbuta (ة -> ه)
    .replace(/ة/g, "ه")
    // Normalize multiple spaces into single space
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Formats numbers into Arabic Eastern digits if desired
 */
export function toArabicDigits(num: number | string): string {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit, 10)]);
}
