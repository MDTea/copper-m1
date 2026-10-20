import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cutoutAlt } from "@/components/copper/product-images";
import { Products } from "@/components/copper/products";
import { formatUsd, getProducts } from "@/lib/copper/catalog";

const card = (id: string) => {
  const element = screen
    .getAllByTestId("product-card")
    .find((c) => c.dataset.product === id);
  expect(element, `product-card for ${id}`).toBeDefined();
  return element!;
};

describe("Products", () => {
  it("shows one card per product with its cutout, price and three features", () => {
    const products = getProducts();
    render(<Products products={products} />);
    expect(screen.getByTestId("products").id).toBe("products");
    expect(screen.getAllByTestId("product-card")).toHaveLength(products.length);
    for (const product of products) {
      const c = within(card(product.id));
      expect(c.getByAltText(cutoutAlt(product))).toBeInTheDocument();
      expect(c.getByText(formatUsd(product.priceUsd))).toBeInTheDocument();
      for (const feature of product.features) {
        expect(c.getByText(feature.name)).toBeInTheDocument();
      }
      for (const color of product.colors) {
        expect(c.getByText(color)).toBeInTheDocument();
      }
    }
  });

  it("shows the catalog's price, not a typed one", () => {
    const products = getProducts().map((p) => ({ ...p, priceUsd: 211 }));
    render(<Products products={products} />);
    expect(within(card("copper-home")).getByText("$211")).toBeInTheDocument();
  });

  it("shows an unknown color name with an outlined swatch", () => {
    const products = getProducts().map((p) => ({
      ...p,
      colors: ["Mystery Mauve"],
    }));
    render(<Products products={products} />);
    const item = within(card("copper-home")).getByText("Mystery Mauve");
    const swatch = item.querySelector('[data-slot="swatch"]');
    expect(swatch?.className).toContain("border");
    expect(swatch?.className).not.toMatch(/bg-(copper|patina|sand|night-sky)/);
  });
});
