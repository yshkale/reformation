import { Product } from "../../types/product";
import { ProductOverview } from "./product-overview";

interface CollectionOverviewProps {
  products: Product[];
}

export const CollectionOverview = ({ products }: CollectionOverviewProps) => {
  return (
    <section className="border-b border-neutral-300 pb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 mt-4 gap-2">
        {products?.length > 0 &&
          products?.map((product: Product) => {
            return (
              <ProductOverview
                key={product._id ? product._id.toString() : undefined}
                thumbnail={product.thumbnail}
                name={product.name}
                price={product.price}
                comparePrice={product.comparePrice}
                rating={product.rating}
                slug={product.slug}
              />
            );
          })}
      </div>
    </section>
  );
};
