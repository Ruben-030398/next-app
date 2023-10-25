import { twMerge as twMergeOrig } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

export const twMerge = (...args: ClassValue[]) => {
  return twMergeOrig(clsx(args))
}