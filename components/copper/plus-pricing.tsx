import { CheckIcon, MinusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  type Plan,
} from "@/lib/copper/catalog";

const DESCRIPTIONS: Record<Plan["id"], string> = {
  free: "Included with every Copper device.",
  "copper-plus": "Longer memory, unlimited notes and Refined answers.",
};

// What a year costs compared with paying monthly, in dollars (0 if nothing).
export function annualSavings(plan: Plan): number {
  return Math.max(
    0,
    Math.round((plan.monthlyUsd * 12 - plan.annualUsd) * 100) / 100,
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const highlighted = plan.id === "copper-plus";
  const savings = annualSavings(plan);
  const rows = [
    { label: "Memory kept", value: formatMemory(plan.memoryDays) },
    {
      label: "Copper Notes recording",
      value: formatNotesHours(plan.notesHoursPerMonth),
    },
  ];

  return (
    <Card
      data-plan={plan.id}
      className={`gap-6 px-0 py-6 ${highlighted ? "ring-primary ring-2" : ""}`}
    >
      <CardHeader className="px-6">
        <div className="flex items-center justify-between gap-3">
          <CardTitle>
            <h3 className="text-2xl font-extrabold">{plan.name}</h3>
          </CardTitle>
          {highlighted && <Badge>Includes Refined</Badge>}
        </div>
        <CardDescription className="text-base">
          {DESCRIPTIONS[plan.id]}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-6">
        <div>
          <p className="font-heading text-4xl font-extrabold">
            <span className={highlighted ? "text-primary" : undefined}>
              {formatUsd(plan.monthlyUsd)}
            </span>
            <span className="text-muted-foreground text-base font-semibold">
              /month
            </span>
          </p>
          <p className="text-muted-foreground mt-1">
            {plan.monthlyUsd === 0 && plan.annualUsd === 0 ? (
              "No subscription needed"
            ) : (
              <>
                or {formatUsd(plan.annualUsd)}/year
                {savings > 0 && <> (save {formatUsd(savings)})</>}
              </>
            )}
          </p>
        </div>
        <dl className="divide-y border-y text-base">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-semibold">{row.value}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted-foreground">Refined answers</dt>
            <dd className="flex items-center gap-1.5 font-semibold">
              {plan.refinedAnswers ? (
                <>
                  <CheckIcon aria-hidden className="text-accent size-5" />
                  Included
                </>
              ) : (
                <>
                  <MinusIcon
                    aria-hidden
                    className="text-muted-foreground size-5"
                  />
                  Not included
                </>
              )}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

export function PlusPricing({ plans }: { plans: Plan[] }) {
  return (
    <section id="plus" data-testid="plus-pricing" className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Free or Copper Plus
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Every device works on Free. Copper Plus remembers more, records
            without limits and uses Refined for complex questions and planning.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
