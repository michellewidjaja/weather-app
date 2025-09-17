import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fixedNumber(num: number) {
  return Number(num).toFixed(0)
}

export function createURLSearchParams(params: any) {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return queryString;
  
}

export function getLocationLabel(address: any): string {
  if (!address || typeof address !== "object") {
    return "Unknown";
  }
  
  const place =
    address.city ||
    address.town ||
    address.village ||
    address.hamlet ||
    address.county ||
    address.state;

  const country = address.country;

  return place && country ? `${place}, ${country}` : country || "Unknown";
}