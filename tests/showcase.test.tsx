import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { lifestylePhoto } from "@/components/copper/product-images";
import { Showcase } from "@/components/copper/showcase";
import { getProducts } from "@/lib/copper/catalog";

describe("Showcase", () => {
  it("shows every lifestyle photo in the catalog with alt text and a caption", () => {
    const products = getProducts();
    render(<Showcase products={products} />);
    const showcase = screen.getByTestId("showcase");
    expect(showcase.id).toBe("showcase");
    const photos = products.flatMap((p) =>
      p.lifestyle.map((src) => lifestylePhoto(p, src)),
    );
    expect(photos.length).toBeGreaterThanOrEqual(products.length);
    for (const photo of photos) {
      const image = within(showcase).getByAltText(photo.alt);
      expect(image.getAttribute("src")).toContain(
        encodeURIComponent(photo.src),
      );
      expect(within(showcase).getByText(photo.caption)).toBeInTheDocument();
    }
  });

  it("still shows a photo the captions don't know about", () => {
    const products = getProducts().map((p) =>
      p.id === "copper-home"
        ? { ...p, lifestyle: ["/assets/lifestyle/copper-home-new.png"] }
        : p,
    );
    render(<Showcase products={products} />);
    expect(
      screen.getByAltText("Copper Home AI smart speaker at home in Arizona"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Copper Home, the AI smart speaker, at home in Arizona.",
      ),
    ).toBeInTheDocument();
  });
});
