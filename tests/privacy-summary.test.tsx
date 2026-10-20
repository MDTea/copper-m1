import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PrivacySummary } from "@/components/copper/privacy-summary";
import { getPrivacySummary } from "@/lib/copper/catalog";

describe("PrivacySummary", () => {
  it("shows every point of the current policy from the catalog", () => {
    const privacy = getPrivacySummary();
    render(<PrivacySummary privacy={privacy} />);
    const section = screen.getByTestId("privacy-summary");
    expect(section.id).toBe("privacy");
    expect(section).toHaveTextContent(`${privacy.policy} privacy policy`);
    for (const point of privacy.points) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }
  });

  it("never claims Copper doesn't record", () => {
    render(<PrivacySummary privacy={getPrivacySummary()} />);
    expect(screen.getByTestId("privacy-summary").textContent).not.toMatch(
      /never\s+record/i,
    );
  });
});
