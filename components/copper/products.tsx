import Image from "next/image";
import { CUTOUT_SIZE, cutoutAlt } from "@/components/copper/product-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatUsd, type Product } from "@/lib/copper/catalog";

// Catalog color names → fixed brand colors (they stay the same in dark mode,
// like the real device). Unknown names get an outlined dot, not a wrong color.
const SWATCHES: Record<string, string> = {
  "Polished Copper": "bg-copper",
  "Brushed Copper": "bg-copper",
  "Patina Teal": "bg-patina",
  "Desert Sand": "bg-sand",
  "Night Sky": "bg-night-sky",
};

function ColorSwatches({ product }: { product: Product }) {
  return (
    <ul
      aria-label={`${product.name} colors`}
      className="flex flex-wrap justify-center gap-x-4 gap-y-2"
    >
      {product.colors.map((color) => (
        <li key={color} className="flex items-center gap-1.5 text-xs">
          <span
            aria-hidden
            data-slot="swatch"
            className={`ring-foreground/40 size-4 rounded-full ring-1 ${SWATCHES[color] ?? "border-foreground/40 border"}`}
          />
          {color}
        </li>
      ))}
    </ul>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      data-testid="product-card"
      data-product={product.id}
      className="gap-6 pt-0 pb-6"
    >
      <div className="bg-secondary flex flex-col items-center gap-5 px-6 pt-8 pb-5">
        <Image
          src={product.cutout}
          alt={cutoutAlt(product)}
          width={CUTOUT_SIZE}
          height={CUTOUT_SIZE}
          sizes="224px"
          className="h-auto w-56 drop-shadow-lg"
        />
        <ColorSwatches product={product} />
      </div>
      <CardHeader className="grid-cols-[1fr_auto] items-end px-6">
        <div>
          <CardTitle>
            <h3 className="text-2xl font-extrabold">{product.name}</h3>
          </CardTitle>
          <CardDescription className="text-base">{product.type}</CardDescription>
        </div>
        <p className="font-heading text-primary text-3xl font-extrabold">
          {formatUsd(product.priceUsd)}
        </p>
      </CardHeader>
      <CardContent className="px-6">
        <ul className="space-y-3 text-base">
          {product.features.map((feature) => (
            <li key={feature.name}>
              <p className="font-semibold">{feature.name}</p>
              <p className="text-muted-foreground">{feature.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function Products({ products }: { products: Product[] }) {
  return (
    <section id="products" data-testid="products" className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Meet the Copper family
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Two devices made for Arizona life: one runs your home, one keeps
            your notes.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
