import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getRandomBoolean() {
  return Math.random() < 0.5 ? '-' : '+';
}

export function getRandomCardAngle(maxAnge: number = 8) {
  const minus = getRandomBoolean()

  return Number(`${minus}${Math.floor(Math.random() * maxAnge)}`);
}
