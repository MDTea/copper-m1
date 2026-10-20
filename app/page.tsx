import { Hero } from "@/components/copper/hero";
import { PlusPricing } from "@/components/copper/plus-pricing";
import { Products } from "@/components/copper/products";
import { Showcase } from "@/components/copper/showcase";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { getPlans, getProducts } from "@/lib/copper/catalog";

export default function Home() {
  const products = getProducts();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero products={products} />
        <Products products={products} />
        <Showcase products={products} />
        <PlusPricing plans={getPlans()} />
      </main>
      <SiteFooter />
    </>
  );
}
