import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const contactInfo = {
  email: "netaa.1801@gmail.com",
  whatsapp: "https://wa.me/972546848175",
  instagram: "https://www.instagram.com/netart_photo?igsh=dzdlczRjMGtoc2Ux",
  facebook: "https://www.facebook.com/share/16xco5ruqe/",
  phone: "054-684-8175",
};

export const services = [
  {
    id: "pregnancy",
    title: "צילומי הריון",
    description: "תיעוד רגעי ההריון המיוחדים שלך באווירה אינטימית וחמה",
    slug: "pregnancy",
  },
  {
    id: "family",
    title: "צילומי משפחה",
    description: "צילומי משפחה בסגנון טבעי ואותנטי, בטבע או בסטודיו",
    slug: "family",
  },
  {
    id: "events",
    title: "צילומי אירועים",
    description: "תיעוד מקצועי של האירועים החשובים בחייכם",
    slug: "events",
  },
  {
    id: "bar-mitzvah",
    title: "צילומי בוק בר/בת מצווה",
    description: "בוק מקצועי ומרגש לציון הרגע הגדול",
    slug: "bar-mitzvah",
  },
  {
    id: "business",
    title: "צילומי תדמית לעסק",
    description: "תדמית מקצועית שתשדרג את העסק שלך",
    slug: "business",
  },
  {
    id: "proposal",
    title: "הצעת נישואין",
    description: "תיעוד הרגע המרגש בו אתם מתארסים",
    slug: "proposal",
  },
];


