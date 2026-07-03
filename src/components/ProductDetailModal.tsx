import React, { useState } from "react";
import { Product, ProductColor } from "../types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (product: Product, selectedColor: ProductColor) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToBag,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  if (!product) return null;

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  return (
    <div className="fixed inset-0 bg-black/60 z-[80] flex justify-center items-center p-4 overflow-y-auto backdrop-blur-xs animate-fade-in">
      {/* Outer container to click outside and close */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative bg-[#ffffff] dark:bg-[#1b1b1b] w-full max-w-4xl shadow-2xl z-10 flex flex-col md:flex-row border border-[#E5E5E5] dark:border-[#4c4546] animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#000000] dark:text-[#ffffff] hover:opacity-70 p-2 z-20 cursor-pointer bg-white/80 dark:bg-black/50 rounded-full"
          aria-label="Close details"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Product Image Panel */}
        <div className="w-full md:w-1/2 bg-[#f3f3f4] dark:bg-[#2f3131] aspect-[4/5] md:aspect-auto flex items-center justify-center relative">
          <img 
            className="w-full h-full object-cover max-h-[60vh] md:max-h-full"
            src={product.image} 
            alt={product.altText} 
          />
          {product.tag && (
            <span className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 px-3 py-1 font-label-caps text-[11px] uppercase tracking-wider text-[#000000] dark:text-[#ffffff] font-bold">
              {product.tag}
            </span>
          )}
        </div>

        {/* Details Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category / Label */}
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] mb-2">
              Men's {product.category} Collection
            </p>

            {/* Title */}
            <h2 className="font-headline-lg text-[26px] font-bold text-[#1a1c1c] dark:text-[#ffffff] tracking-tight leading-tight mb-3">
              {product.name}
            </h2>

            {/* Prices */}
            <div className="flex items-center gap-3 mb-6">
              {product.originalPrice ? (
                <>
                  <span className="text-[20px] font-bold text-[#CC0000]">
                    {product.price} €
                  </span>
                  <span className="text-[16px] line-through text-[#5d5f5f] dark:text-[#cfc4c5]">
                    {product.originalPrice} €
                  </span>
                  <span className="text-[12px] bg-[#CC0000] text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-[20px] font-bold text-[#1a1c1c] dark:text-[#ffffff]">
                  {product.price} €
                </span>
              )}
            </div>

            {/* Divider */}
            <hr className="border-[#E5E5E5] dark:border-[#4c4546] mb-5" />

            {/* Description Paragraph */}
            <div className="mb-6">
              <p className="text-[14px] text-[#5d5f5f] dark:text-[#cfc4c5] leading-relaxed mb-4">
                This premium Coach {product.category.toLowerCase()} is designed for modern professionals who value structural precision, architectural durability, and high-end aesthetics. Meticulously engineered from selected {product.material.toLowerCase()}, the piece showcases beautiful textures and a versatile design.
              </p>
              <div className="bg-[#f9f9f9] dark:bg-[#2f3131] p-4 border border-[#E5E5E5] dark:border-[#4c4546] space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#5d5f5f] dark:text-[#cfc4c5]">Primary Material:</span>
                  <span className="font-bold text-[#1a1c1c] dark:text-[#ffffff]">{product.material}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#5d5f5f] dark:text-[#cfc4c5]">Structure Language:</span>
                  <span className="font-bold text-[#1a1c1c] dark:text-[#ffffff]">Sharp Minimalist (0px)</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#5d5f5f] dark:text-[#cfc4c5]">Authenticity Status:</span>
                  <span className="font-bold text-[#CC0000] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] fill-1">verified</span> 100% Guaranteed Original
                  </span>
                </div>
              </div>
            </div>

            {/* Color Swatch Selection */}
            <div className="mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] block mb-3">
                Selected Color: <span className="text-[#000000] dark:text-[#ffffff] font-bold normal-case ml-1">{activeColor.name}</span>
              </span>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColorIndex(idx)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-8 h-8 rounded-full border transition-all cursor-pointer ${
                      selectedColorIndex === idx
                        ? "border-[#000000] dark:border-[#ffffff] scale-110 ring-2 ring-[#000000] dark:ring-[#ffffff] ring-offset-2"
                        : "border-[#cfc4c5] hover:scale-105"
                    }`}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA Block */}
          <div>
            <button 
              onClick={() => {
                onAddToBag(product, activeColor);
                onClose();
              }}
              className="w-full py-4 bg-[#000000] hover:bg-opacity-90 dark:bg-[#ffffff] dark:text-[#000000] text-[#ffffff] font-label-caps text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-colors cursor-pointer select-none"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Add to Bag — {product.price} €
            </button>
            <p className="text-[11px] text-center text-[#5d5f5f] dark:text-[#cfc4c5] mt-2 tracking-wide font-medium select-none">
              Complimentary standard shipping & returns on all luxury items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
