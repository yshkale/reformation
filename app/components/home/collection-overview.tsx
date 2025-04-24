import { ProductOverview } from "./product-overview";

interface CollectionOverviewProps {
  collectionId: string;
}

export const CollectionOverview = ({
  collectionId,
}: CollectionOverviewProps) => {
  const tempData = {
    collectionId,
    collectionName: "Dresses",
  };
  return (
    <section className="border-b border-neutral-300 pb-6">
      <p className="text-sm border-b border-neutral-600 inline">
        Shop {tempData.collectionName}
      </p>

      <ProductOverview productId="6574654" />
    </section>
  );
};
