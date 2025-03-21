import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import localFont from "next/font/local";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const gilroyBold = localFont({
  src: [
    {
      path: "../../public/font/gilroy_bold.ttf",
      weight: "700",
    },
  ],
});

export const HOUSES = [
  {
    id: 1,
    image: "/images/1.jpeg",
    title: "Modern Family Home",
    price: 450000,
    location: "San Francisco, CA",
  },
  {
    id: 2,
    image: "/images/2.jpeg",
    title: "Luxury Villa",
    price: 850000,
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    image: "/images/5.jpeg",
    title: "City Apartment",
    price: 320000,
    location: "New York, NY",
  },
  {
    id: 4,
    image: "/images/3.jpeg",
    title: "Beachfront Paradise",
    price: 720000,
    location: "Miami, FL",
  },
  {
    id: 5,
    image: "/images/4.jpeg",
    title: "Cozy Country Cottage",
    price: 280000,
    location: "Austin, TX",
  },
  {
    id: 6,
    image: "/images/5.jpeg",
    title: "Elegant Mansion",
    price: 1_200_000,
    location: "Beverly Hills, CA",
  },
];
