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
