import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Logo } from "@/components/copper/logo";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";

vi.mock("next-themes", () => ({ useTheme: () => ({ setTheme: vi.fn() }) }));

describe("Brand components", () => {
  it("Logo renders light and dark versions with alt text", () => {
    render(<Logo />);
    const images = screen.getAllByAltText("Copper State Labs");
    expect(images.map((img) => img.getAttribute("src")).join(" ")).toMatch(
      /logo\.png.*logo-dark\.png/,
    );
  });

  it("SiteHeader links the logo home and has a theme toggle", () => {
    render(<SiteHeader />);
    expect(
      screen.getByRole("link", { name: "Copper State Labs home" }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("button", { name: "Change theme" }),
    ).toBeInTheDocument();
  });

  it("SiteHeader links to the products, Copper Plus and privacy sections", () => {
    render(<SiteHeader />);
    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const [name, href] of [
      ["Products", "#products"],
      ["Copper Plus", "#plus"],
      ["Privacy", "#privacy"],
    ]) {
      expect(within(nav).getByRole("link", { name })).toHaveAttribute(
        "href",
        href,
      );
    }
  });

  it("SiteFooter shows the fictional-use label", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Fictional — for educational use.",
    );
  });

  it("SiteFooter has its test id and the logo for dark backgrounds", () => {
    render(<SiteFooter />);
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    const logos = within(screen.getByRole("contentinfo")).getAllByAltText(
      "Copper State Labs",
    );
    expect(logos).toHaveLength(1);
    expect(logos[0].getAttribute("src")).toMatch(/logo-dark\.png/);
  });
});
