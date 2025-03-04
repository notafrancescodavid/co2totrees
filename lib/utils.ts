import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeRandomObjects<T>(arr: T[], numberOfObjectsToBeRemoved: number)  {
  // If N is greater than or equal to array length, return an empty array.
  if (numberOfObjectsToBeRemoved >= arr.length) return []; 

  // Create an array of indexes and shuffle them
  const indexes = arr.map((_, i) => i).sort(() => Math.random() - 0.5);

  // Get the first N indexes
  const indexesToRemove = new Set(indexes.slice(0, numberOfObjectsToBeRemoved));

  // Filter out the elements at the selected indexes
  return arr.filter((_, i) => !indexesToRemove.has(i));
}

export const kgToTons = (kg: number) => kg / 1000;
export const tonsToKg = (tons: number) => tons * 1000;