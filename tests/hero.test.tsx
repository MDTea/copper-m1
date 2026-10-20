import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/copper/hero";
import { cutoutAlt } from "@/components/copper/product-images";
import { getProducts } from "@/lib/copper/catalog";

describe("Hero", () => {
  it("has the headline, the exact tagline and a See products link", () => {
    render(<Hero products={getProducts()} />);
    const hero = screen.getByTestId("hero");
    expect(hero.id).toBe("top");
    expect(within(hero).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(hero).toHaveTextContent("From raw ideas to refined answers.");
    expect(
      within(hero).getByRole("link", { name: "See products" }),
    ).toHaveAttribute("href", "#products");
  });

  it("shows each product's cutout from the catalog with descriptive alt text", () => {
    const products = getProducts();
    render(<Hero products={products} />);
    for (const product of products) {
      const image = screen.getByAltText(cutoutAlt(product));
      expect(image.getAttribute("src")).toContain(
        encodeURIComponent(product.cutout),
      );
      expect(cutoutAlt(product)).toContain(product.name);
    }
  });

  it("names a missing product instead of rendering half a hero", () => {
    const onlyHome = getProducts().filter((p) => p.id === "copper-home");
    expect(() => render(<Hero products={onlyHome} />)).toThrow(
      'The catalog has no product "copper-notes".',
    );
  });
});
