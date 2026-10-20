import { ShieldCheckIcon } from "lucide-react";
import type { PrivacySummary as Privacy } from "@/lib/copper/catalog";

// The current privacy policy, word for word from the catalog. Older Copper
// documents disagree with it; the catalog is the source of truth.
export function PrivacySummary({ privacy }: { privacy: Privacy }) {
  return (
    <section
      id="privacy"
      data-testid="privacy-summary"
      className="bg-accent/10 border-accent/30 border-y"
    >
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-5 md:py-24">
        <div className="md:col-span-2">
          <p className="text-muted-foreground font-heading text-sm font-bold tracking-wide uppercase">
            {privacy.policy} privacy policy
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            How Copper handles your recordings
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Plain answers about what Copper hears after &ldquo;
            {privacy.wakeWord},&rdquo; what it keeps and how to delete it.
          </p>
        </div>
        <ul className="space-y-5 md:col-span-3">
          {privacy.points.map((point) => (
            <li key={point} className="flex gap-3 text-base">
              <ShieldCheckIcon
                aria-hidden
                className="text-accent mt-0.5 size-5 shrink-0"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
