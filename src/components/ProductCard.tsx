import React, { useState } from "react";
import { Product, ProductColor } from "../types";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  isWishlisted: boolean;
  onWishlistToggle: (productId: string) => void;
  onAddToBag: (product: Product, selectedColor: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  isWishlisted,
  onWishlistToggle,
  onAddToBag,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  return (
    <div className="flex flex-col group animate-fade-in">
      {/* Image container */}
      <div 
        onClick={() => onProductClick(product)}
        className="relative aspect-[4/5] bg-[#f3f3f4] dark:bg-[#2f3131] overflow-hidden cursor-pointer"
      >
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={product.image} 
          alt={product.altText} 
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(product.id);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full bg-white/60 dark:bg-black/40 hover:bg-white/90 dark:hover:bg-black/70 backdrop-blur-xs transition-colors cursor-pointer ${
            isWishlisted ? "text-[#CC0000]" : "text-[#000000] dark:text-[#ffffff]"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <span 
            className="material-symbols-outlined select-none"
            style={{ "--fill": isWishlisted ? "1" : "0" } as React.CSSProperties}
          >
            favorite
          </span>
        </button>

        {/* Tag (e.g., Almost Gone) */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-white/80 dark:bg-black/80 px-2 py-0.5 font-label-caps text-[10px] uppercase tracking-widest text-[#000000] dark:text-[#ffffff] font-bold select-none border border-[#E5E5E5]/20">
            {product.tag}
          </span>
        )}
      </div>

      {/* Info Container */}
      <div className="px-2 pt-3 text-center">
        {/* Title */}
        <h3 
          onClick={() => onProductClick(product)}
          className="font-product-title text-[15px] font-semibold text-[#1a1c1c] dark:text-[#ffffff] truncate mb-1 hover:underline cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Color Swatches */}
        <div className="flex justify-center gap-1.5 mb-2 h-5 items-center">
          {product.colors.map((color, idx) => (
            <button
              key={color.hex}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColorIndex(idx);
              }}
              style={{ backgroundColor: color.hex }}
              className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                selectedColorIndex === idx
                  ? "border-[#000000] dark:border-[#ffffff] scale-125 ring-1 ring-[#000000] dark:ring-[#ffffff]"
                  : "border-[#E5E5E5] hover:scale-110"
              }`}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>

        {/* Prices */}
        {product.originalPrice ? (
          <div className="flex justify-center items-center gap-2 mb-3">
            <span className="font-price-main text-[14px] font-bold text-[#CC0000]">
              {product.price} €
            </span>
            <span className="font-price-strike text-[12px] line-through text-[#5d5f5f] dark:text-[#cfc4c5]">
              {product.originalPrice} €
            </span>
          </div>
        ) : (
          <div className="font-price-main text-[14px] font-bold text-[#1a1c1c] dark:text-[#ffffff] mb-3">
            {product.price} €
          </div>
        )}

        {/* Add to Bag CTA */}
        <button 
          onClick={() => onAddToBag(product, activeColor)}
          className="w-full py-3 border border-[#000000] dark:border-[#ffffff] font-label-caps text-[11px] uppercase tracking-widest hover:bg-[#000000] hover:text-[#ffffff] dark:hover:bg-[#ffffff] dark:hover:text-[#000000] transition-colors flex items-center justify-center gap-2 cursor-pointer font-bold select-none h-11"
        >
          <span className="material-symbols-outlined text-[16px]">shopping_bag</span> 
          Add to Bag
        </button>
      </div>
    </div>
  );
};
