import Image from "next/image";
import { CUTOUT_SIZE, cutoutAlt } from "@/components/copper/product-images";
import { Button } from "@/components/ui/button";
import type { Product, ProductId } from "@/lib/copper/catalog";

function findProduct(products: Product[], id: ProductId): Product {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`The catalog has no product "${id}".`);
  return product;
}

export function Hero({ products }: { products: Product[] }) {
  const home = findProduct(products, "copper-home");
  const notes = findProduct(products, "copper-notes");

  return (
    <section
      id="top"
      data-testid="hero"
      className="bg-secondary text-secondary-foreground"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-start gap-5">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Smart help for Arizona homes and busy days
          </h1>
          <p className="font-heading text-xl font-semibold">
            From raw ideas to refined answers.
          </p>
          <p className="text-muted-foreground max-w-md text-lg">
            {home.name}, the {home.type}, and {notes.name}, the {notes.type}.
          </p>
          <Button asChild size="lg" className="mt-2 h-11 px-6 text-base">
            <a href="#products">See products</a>
          </Button>
        </div>

        {/* Copper Home large in back, Copper Notes smaller and overlapping in front. */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Image
            src={home.cutout}
            alt={cutoutAlt(home)}
            width={CUTOUT_SIZE}
            height={CUTOUT_SIZE}
            sizes="(min-width: 768px) 380px, 85vw"
            preload
            className="absolute top-0 left-0 h-auto w-[85%] drop-shadow-xl"
          />
          <Image
            src={notes.cutout}
            alt={cutoutAlt(notes)}
            width={CUTOUT_SIZE}
            height={CUTOUT_SIZE}
            sizes="(min-width: 768px) 230px, 50vw"
            preload
            className="absolute right-0 bottom-0 h-auto w-[50%] drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
