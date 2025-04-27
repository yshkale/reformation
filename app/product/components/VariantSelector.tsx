import { Variant } from "../../types/product";

interface VariantSelectorProps {
  variants: Variant[];
}

export const VariantSelector = ({ variants }: VariantSelectorProps) => {
  return (
    <>
      {variants?.length > 0 &&
        variants.map((variant) => {
          return (
            <div key={variant.variantName} className="space-y-2">
              <div className="text-sm font-medium">{variant.variantName}</div>
              <div className="flex space-x-0">
                {variant.variantOptions?.length > 0 &&
                  variant.variantOptions.map((variantOption) => {
                    return (
                      <div
                        key={variantOption}
                        className="border border-neutral-200 flex p-3"
                      >
                        {variant.variantName === "COLOR" ? (
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: variantOption }}
                          ></div>
                        ) : (
                          <div className="text-sm">{variantOption}</div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </>
  );
};
