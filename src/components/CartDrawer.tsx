import React from "react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, colorHex: string, delta: number) => void;
  onRemoveItem: (productId: string, colorHex: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Cart Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#ffffff] dark:bg-[#1b1b1b] shadow-2xl z-[100] flex flex-col justify-between transition-transform duration-300 ease-in-out border-l border-[#E5E5E5] dark:border-[#4c4546] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5E5E5] dark:border-[#4c4546] flex justify-between items-center bg-[#f9f9f9] dark:bg-[#1b1b1b]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            <span className="font-headline-lg-mobile text-[18px] font-bold tracking-tight text-[#1a1c1c] dark:text-[#ffffff]">
              Your Bag ({cartItems.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer text-[#000000] dark:text-[#ffffff] hover:opacity-75"
            aria-label="Close cart"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-5xl text-[#5d5f5f] dark:text-[#cfc4c5] mb-4">
                production_quantity_limits
              </span>
              <p className="font-product-title text-[16px] font-semibold text-[#1a1c1c] dark:text-[#ffffff] mb-1">
                Your Shopping Bag is Empty
              </p>
              <p className="text-[13px] text-[#5d5f5f] dark:text-[#cfc4c5] max-w-xs">
                Browse our Men's Bags collection and find high-end leather backpacks, messengers, and duffles.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-[#000000] dark:bg-[#ffffff] text-[#ffffff] dark:text-[#000000] font-label-caps text-[11px] uppercase tracking-wider font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Shop Men's Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor.hex}`}
                className="flex gap-4 border-b border-[#E5E5E5] dark:border-[#4c4546] pb-5 items-start"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-25 bg-[#f3f3f4] dark:bg-[#2f3131] shrink-0 overflow-hidden border border-[#E5E5E5] dark:border-[#4c4546]">
                  <img
                    className="w-full h-full object-cover"
                    src={item.product.image}
                    alt={item.product.altText}
                  />
                </div>

                {/* Details Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="font-product-title text-[14px] font-bold text-[#1a1c1c] dark:text-[#ffffff] truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedColor.hex)}
                      className="text-[#5d5f5f] dark:text-[#cfc4c5] hover:text-[#CC0000] p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  {/* Color Spec */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <div
                      className="w-3 h-3 rounded-full border border-[#E5E5E5]"
                      style={{ backgroundColor: item.selectedColor.hex }}
                    />
                    <span className="text-[12px] text-[#5d5f5f] dark:text-[#cfc4c5] font-medium">
                      {item.selectedColor.name}
                    </span>
                  </div>

                  {/* Price info */}
                  <p className="font-bold text-[14px] text-[#1a1c1c] dark:text-[#ffffff] mt-2">
                    {item.product.price} €
                  </p>

                  {/* Quantity Actions */}
                  <div className="flex items-center border border-[#E5E5E5] dark:border-[#4c4546] w-24 mt-3 bg-[#f9f9f9] dark:bg-[#2f3131]">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.hex, -1)}
                      className="w-8 h-8 flex items-center justify-center text-[#5d5f5f] dark:text-[#cfc4c5] hover:text-black dark:hover:text-white cursor-pointer font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-[#1a1c1c] dark:text-[#ffffff]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.hex, 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#5d5f5f] dark:text-[#cfc4c5] hover:text-black dark:hover:text-white cursor-pointer font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Sum & Action */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#E5E5E5] dark:border-[#4c4546] bg-[#f9f9f9] dark:bg-[#1b1b1b]">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#5d5f5f] dark:text-[#cfc4c5] font-medium">Subtotal</span>
                <span className="font-bold text-[#1a1c1c] dark:text-[#ffffff]">{subtotal} €</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#5d5f5f] dark:text-[#cfc4c5] font-medium">Standard Shipping</span>
                <span className="font-bold text-[#CC0000] uppercase tracking-wider text-[11px]">
                  Complimentary
                </span>
              </div>
              <hr className="border-[#E5E5E5] dark:border-[#4c4546] my-2" />
              <div className="flex justify-between text-[15px]">
                <span className="font-bold text-[#1a1c1c] dark:text-[#ffffff]">Total (VAT incl.)</span>
                <span className="font-bold text-[18px] text-[#000000] dark:text-[#ffffff]">
                  {subtotal} €
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 bg-[#000000] hover:bg-opacity-90 dark:bg-[#ffffff] dark:text-[#000000] text-[#ffffff] font-label-caps text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              Proceed to Checkout
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <p className="text-[10px] text-center text-[#5d5f5f] dark:text-[#cfc4c5] mt-3">
              Secure Checkout & Data Privacy Protection. Standard delivery in 3-5 business days.
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
