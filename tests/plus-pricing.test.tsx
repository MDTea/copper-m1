import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { annualSavings, PlusPricing } from "@/components/copper/plus-pricing";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
} from "@/lib/copper/catalog";

const planCard = (id: string) => {
  const card = screen
    .getByTestId("plus-pricing")
    .querySelector<HTMLElement>(`[data-plan="${id}"]`);
  expect(card, `card for ${id}`).not.toBeNull();
  return within(card!);
};

describe("PlusPricing", () => {
  it("shows each plan's prices, memory, Notes hours and Refined answers", () => {
    const plans = getPlans();
    render(<PlusPricing plans={plans} />);
    expect(screen.getByTestId("plus-pricing").id).toBe("plus");
    for (const plan of plans) {
      const card = planCard(plan.id);
      expect(card.getByText(formatUsd(plan.monthlyUsd))).toBeInTheDocument();
      expect(
        card.getByText(
          plan.annualUsd === 0
            ? "No subscription needed"
            : new RegExp(`\\${formatUsd(plan.annualUsd)}/year`),
        ),
      ).toBeInTheDocument();
      expect(card.getByText(formatMemory(plan.memoryDays))).toBeInTheDocument();
      expect(
        card.getByText(formatNotesHours(plan.notesHoursPerMonth)),
      ).toBeInTheDocument();
      expect(
        card.getByText(plan.refinedAnswers ? "Included" : "Not included"),
      ).toBeInTheDocument();
    }
  });

  it("follows the catalog when prices change", () => {
    const plans = getPlans().map((p) =>
      p.id === "copper-plus" ? { ...p, monthlyUsd: 9.49, annualUsd: 95 } : p,
    );
    render(<PlusPricing plans={plans} />);
    const plus = planCard("copper-plus");
    expect(plus.getByText("$9.49")).toBeInTheDocument();
    expect(plus.getByText(/\$95\/year \(save \$18\.88\)/)).toBeInTheDocument();
  });

  it("only shows savings when a year costs less than 12 months", () => {
    const [free, plus] = getPlans();
    expect(annualSavings(free)).toBe(0);
    expect(annualSavings(plus)).toBe(16.88);
    expect(annualSavings({ ...plus, annualUsd: 200 })).toBe(0);
  });
});
