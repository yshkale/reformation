/* eslint-disable @typescript-eslint/no-explicit-any */
import { Variant } from "../../types/product";

export interface SelectedVariant {
  variantName: string;
  variantOption: string;
}

interface VariantSelectorProps {
  variants: Variant[];
  handleVariantClick: (variantName: string, variantOption: string) => void;
  selectedVariants: SelectedVariant[];
}

export const VariantSelector = ({
  variants,
  handleVariantClick,
  selectedVariants,
}: VariantSelectorProps) => {
  // Function to check if a variant option is selected
  const isSelected = (variantName: string, variantOption: string): boolean => {
    return selectedVariants?.some(
      (v) => v.variantName === variantName && v.variantOption === variantOption
    );
  };

  return (
    <>
      {variants?.length > 0 &&
        variants.map((variant) => {
          return (
            <div key={variant.variantName} className="space-y-2">
              <div className="text-sm font-medium">{variant.variantName}</div>
              <div className="flex space-x-2 flex-wrap">
                {variant.variantOptions?.length > 0 &&
                  variant.variantOptions.map((variantOption) => {
                    const selected = isSelected(
                      variant.variantName,
                      variantOption
                    );
                    return (
                      <div
                        key={variantOption}
                        className={`border ${
                          selected ? "border-black" : "border-neutral-200"
                        } 
                                  flex p-3 cursor-pointer mr-2 mb-2`}
                        onClick={() =>
                          handleVariantClick(variant.variantName, variantOption)
                        }
                      >
                        {variant.variantName === "COLOR" ? (
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: variantOption }}
                          ></div>
                        ) : (
                          <div className="text-sm min-w-4 h-4.5 text-center">
                            {variantOption}
                          </div>
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
