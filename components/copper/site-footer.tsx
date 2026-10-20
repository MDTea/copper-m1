import { Logo } from "@/components/copper/logo";

// Night Sky in both themes, so the logo always uses its Desert Sand version.
export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-night-sky text-sand border-t border-white/10"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo onDark className="w-40" />
        <p className="text-sm opacity-80">Fictional — for educational use.</p>
      </div>
    </footer>
  );
}
