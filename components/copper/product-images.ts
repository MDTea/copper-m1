import type { Product, ProductId } from "@/lib/copper/catalog";

// The cutouts are square PNGs on transparent backgrounds.
export const CUTOUT_SIZE = 1254;

// What each cutout photo shows, added to the product name for its alt text.
const CUTOUT_DETAILS: Record<ProductId, string> = {
  "copper-home": "with copper fabric and a clock display",
  "copper-notes": "in brushed copper with a glowing ring",
};

export function cutoutAlt(product: Product): string {
  return `${product.name} ${product.type} ${CUTOUT_DETAILS[product.id]}`;
}

export type LifestylePhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

// What each lifestyle photo shows, keyed by its catalog path.
const LIFESTYLE: Record<string, Omit<LifestylePhoto, "src">> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    width: 1672,
    height: 941,
    alt: "Copper Home smart speaker on a stone counter, with a sunset over saguaros and mountains through the window",
    caption:
      "Copper Home keeps time, weather and your whole house in one glance.",
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    width: 1672,
    height: 941,
    alt: "Copper Notes recorder standing on a stone counter beside its round copper charger, with desert light through the window",
    caption: "Copper Notes waits on its charger, ready for your next meeting.",
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    width: 1536,
    height: 1024,
    alt: "A person at a café table writing in a notebook, with Copper Notes clipped to their shirt pocket and its amber ring lit",
    caption:
      "Clip it on and take notes by hand. The amber ring shows when it's recording.",
  },
};

// A photo the catalog adds later still shows, with text built from the product.
export function lifestylePhoto(product: Product, src: string): LifestylePhoto {
  return {
    src,
    ...(LIFESTYLE[src] ?? {
      width: 1600,
      height: 900,
      alt: `${product.name} ${product.type} at home in Arizona`,
      caption: `${product.name}, the ${product.type}, at home in Arizona.`,
    }),
  };
}
