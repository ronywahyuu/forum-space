import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(date: Date | string ) {
  const timeAgo = new Date(date);
  const seconds = Math.floor((new Date().getTime() - timeAgo.getTime()) / 1000);
  const intervals = [
    Math.floor(seconds / 31536000),
    Math.floor(seconds / 2592000),
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600),
    Math.floor(seconds / 60)
  ];
  const times = ['year', 'month', 'day', 'hour', 'minute'];
  let interval = 0;
  while (interval < intervals.length) {
    if (intervals[interval] > 1) {
      return `${intervals[interval]} ${times[interval]}
            ${interval === 0 ? 's' : ''} ago`;
    } else if (intervals[interval] === 1) {
      return `${intervals[interval]} ${times[interval]} ago`;
    }
    interval++;
  }

  return 'Just now'
}