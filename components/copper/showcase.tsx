import Image from "next/image";
import { lifestylePhoto } from "@/components/copper/product-images";
import type { Product } from "@/lib/copper/catalog";

// One row per lifestyle photo, in catalog order. From md up the photo
// switches sides each row; on phones it sits above its caption.
export function Showcase({ products }: { products: Product[] }) {
  const rows = products.flatMap((product) =>
    product.lifestyle.map((src) => ({
      product,
      photo: lifestylePhoto(product, src),
    })),
  );

  return (
    <section
      id="showcase"
      data-testid="showcase"
      className="bg-secondary text-secondary-foreground"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Made for life in the Sonoran Desert
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            From sunrise on the counter to golden hour at the café.
          </p>
        </div>
        <ul className="mt-12 space-y-12 md:space-y-16">
          {rows.map(({ product, photo }, index) => (
            <li
              key={photo.src}
              className="grid items-center gap-6 md:grid-cols-5 md:gap-10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 576px, (min-width: 768px) 60vw, 100vw"
                className={`h-auto w-full rounded-2xl shadow-md md:col-span-3 ${index % 2 === 1 ? "md:order-last" : ""}`}
              />
              <div className="md:col-span-2">
                <p className="text-muted-foreground font-heading text-sm font-bold tracking-wide uppercase">
                  {product.name}
                </p>
                <p className="font-heading mt-2 text-xl font-semibold sm:text-2xl">
                  {photo.caption}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
