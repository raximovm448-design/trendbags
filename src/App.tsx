import { useState, useEffect } from "react";
import { PRODUCTS } from "./data";
import { Product, CartItem, ProductColor } from "./types";
import { TopAppBar } from "./components/TopAppBar";
import { NavigationDrawer } from "./components/NavigationDrawer";
import { FilterBar } from "./components/FilterBar";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { SearchOverlay } from "./components/SearchOverlay";

export default function App() {
  // General UI States
  const [currentTab, setCurrentTab] = useState<string>("shop");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart & Wishlist state with local persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("coach_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("coach_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Filter States
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("best");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Toast Notification state
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("coach_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("coach_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Timer
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => prev ? { ...prev, visible: false } : null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handlers
  const handleWishlistToggle = (productId: string) => {
    setWishlist((prev) => {
      const isAlready = prev.includes(productId);
      const updated = isAlready ? prev.filter((id) => id !== productId) : [...prev, productId];
      
      const product = PRODUCTS.find((p) => p.id === productId);
      if (product) {
        showToast(isAlready ? `Removed ${product.name} from Wishlist` : `Added ${product.name} to Wishlist`);
      }
      return updated;
    });
  };

  const handleAddToBag = (product: Product, selectedColor: ProductColor) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.hex === selectedColor.hex
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedColor, quantity: 1 }];
      }
    });

    showToast(`Added ${product.name} (${selectedColor.name}) to Bag`);
  };

  const handleUpdateQuantity = (productId: string, colorHex: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor.hex === colorHex) {
            const nextQuantity = item.quantity + delta;
            return { ...item, quantity: nextQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (productId: string, colorHex: string) => {
    const item = cartItems.find((i) => i.product.id === productId && i.selectedColor.hex === colorHex);
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedColor.hex === colorHex))
    );
    if (item) {
      showToast(`Removed ${item.product.name} from Bag`);
    }
  };

  const handleClearFilters = () => {
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSelectedPriceRanges([]);
    setSortBy("best");
    setSearchQuery("");
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    showToast("Thank you for your order. Order received!");
  };

  // Calculations & Filtering
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Color filter
    if (selectedColors.length > 0) {
      const hasColorMatch = product.colors.some((color) =>
        selectedColors.some((sc) => color.name.toLowerCase().includes(sc.toLowerCase()))
      );
      if (!hasColorMatch) return false;
    }

    // 2. Material filter
    if (selectedMaterials.length > 0) {
      if (!selectedMaterials.some((sm) => product.material.toLowerCase() === sm.toLowerCase())) {
        return false;
      }
    }

    // 3. Price filter
    if (selectedPriceRanges.length > 0) {
      const matchesPrice = selectedPriceRanges.some((range) => {
        if (range === "Under 300 €") return product.price < 300;
        if (range === "300 € - 500 €") return product.price >= 300 && product.price <= 500;
        if (range === "Over 500 €") return product.price > 500;
        return true;
      });
      if (!matchesPrice) return false;
    }

    // 4. Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        product.name.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      if (!matchesQuery) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "low-high") return a.price - b.price;
    if (sortBy === "high-low") return b.price - a.price;
    return 0;
  });

  const wishlistedItems = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const hasActiveFilters =
    selectedColors.length > 0 ||
    selectedMaterials.length > 0 ||
    selectedPriceRanges.length > 0 ||
    searchQuery !== "";

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-sans flex flex-col relative transition-colors selection:bg-[#000000] selection:text-[#ffffff]">
      
      {/* Top Header App Bar */}
      <TopAppBar
        onMenuClick={() => setIsDrawerOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Slide-out Left Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === "shop") {
            handleClearFilters();
          }
        }}
      />

      {/* Slide-out Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Slide-out Right Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Flow Full Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
      />

      {/* Premium Minimalist Toast Notification */}
      {toast?.visible && (
        <div className="fixed top-20 right-4 z-[200] bg-[#000000] text-[#ffffff] px-6 py-4 shadow-xl border border-white/20 flex items-center gap-3 animate-slide-left max-w-sm">
          <span className="material-symbols-outlined text-[18px] text-[#CC0000] fill-1">verified</span>
          <p className="text-[12px] font-semibold uppercase tracking-wider">{toast.message}</p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-28">
        
        {currentTab === "shop" && (
          <>
            {/* Collection Header */}
            <section className="px-4 pt-8 pb-4">
              <div className="flex items-baseline gap-2">
                <h1 className="font-headline-lg-mobile text-[24px] font-bold uppercase tracking-tight">
                  {searchQuery ? "Search Results" : "TRENDBAGS"}
                </h1>
                <span className="font-utility text-[12px] font-medium text-[#5d5f5f]">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
                </span>
              </div>
              {searchQuery && (
                <p className="text-[13px] text-[#5d5f5f] mt-1 font-medium">
                  Showing matches for "{searchQuery}"
                </p>
              )}
            </section>

            {/* Sticky Filter Bar */}
            <FilterBar
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedMaterials={selectedMaterials}
              setSelectedMaterials={setSelectedMaterials}
              selectedPriceRanges={selectedPriceRanges}
              setSelectedPriceRanges={setSelectedPriceRanges}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClearAll={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Product Grid Area */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 px-4 text-center">
                <span className="material-symbols-outlined text-4xl text-[#5d5f5f] mb-4">search_off</span>
                <p className="font-product-title text-[16px] font-bold text-[#1a1c1c] mb-1">
                  No Products Match Your Criteria
                </p>
                <p className="text-[13px] text-[#5d5f5f] max-w-xs mx-auto mb-6">
                  Try adjusting or clearing your filters to explore the rest of the Men's collection.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-[#000000] text-[#ffffff] font-label-caps text-[11px] uppercase tracking-wider font-bold cursor-pointer hover:bg-opacity-90"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <section className="grid grid-cols-2 gap-x-2 gap-y-10 mt-6 px-2 md:px-4 md:grid-cols-3 max-w-[1440px] mx-auto">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={(p) => setSelectedProduct(p)}
                    isWishlisted={wishlist.includes(product.id)}
                    onWishlistToggle={handleWishlistToggle}
                    onAddToBag={handleAddToBag}
                  />
                ))}
              </section>
            )}
          </>
        )}

        {currentTab === "wishlist" && (
          <>
            {/* Wishlist Header */}
            <section className="px-4 pt-8 pb-4">
              <div className="flex items-baseline gap-2">
                <h1 className="font-headline-lg-mobile text-[24px] font-bold uppercase tracking-tight">
                  My Wishlist
                </h1>
                <span className="font-utility text-[12px] font-medium text-[#5d5f5f]">
                  {wishlistedItems.length} {wishlistedItems.length === 1 ? "Item" : "Items"}
                </span>
              </div>
            </section>

            {/* Wishlist Grid Area */}
            {wishlistedItems.length === 0 ? (
              <div className="py-20 px-4 text-center">
                <span className="material-symbols-outlined text-4xl text-[#5d5f5f] mb-4">favorite</span>
                <p className="font-product-title text-[16px] font-bold text-[#1a1c1c] mb-1">
                  Your Wishlist is Empty
                </p>
                <p className="text-[13px] text-[#5d5f5f] max-w-xs mx-auto mb-6">
                  Save pieces you love to your personal wishlist by clicking the heart symbol on any product card.
                </p>
                <button
                  onClick={() => setCurrentTab("shop")}
                  className="px-6 py-3 bg-[#000000] text-[#ffffff] font-label-caps text-[11px] uppercase tracking-wider font-bold cursor-pointer hover:bg-opacity-90"
                >
                  Explore Men's Bags
                </button>
              </div>
            ) : (
              <section className="grid grid-cols-2 gap-x-2 gap-y-10 mt-6 px-2 md:px-4 md:grid-cols-3 max-w-[1440px] mx-auto">
                {wishlistedItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={(p) => setSelectedProduct(p)}
                    isWishlisted={true}
                    onWishlistToggle={handleWishlistToggle}
                    onAddToBag={handleAddToBag}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 bg-[#f9f9f9] dark:bg-[#1b1b1b] border-t border-[#E5E5E5] dark:border-[#cfc4c5] h-16 flex justify-around items-center px-2 pb-safe shadow-md transition-colors">
        
        {/* Shop Tab */}
        <button 
          onClick={() => {
            setCurrentTab("shop");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          className={`flex flex-col items-center justify-center transition-colors cursor-pointer select-none ${
            currentTab === "shop" 
              ? "text-[#000000] dark:text-[#ffffff] font-bold" 
              : "text-[#5d5f5f] dark:text-[#cfc4c5] hover:text-[#000000] dark:hover:text-[#ffffff]"
          }`}
        >
          <span className="material-symbols-outlined">storefront</span>
          <span className="font-label-caps text-[10px] uppercase mt-1 font-bold">Shop</span>
        </button>

        {/* Search Tab (opens Search overlay) */}
        <button 
          onClick={() => setIsSearchOpen(true)} 
          className="flex flex-col items-center justify-center text-[#5d5f5f] dark:text-[#cfc4c5] hover:text-[#000000] dark:hover:text-[#ffffff] transition-colors cursor-pointer select-none"
        >
          <span className="material-symbols-outlined">search</span>
          <span className="font-label-caps text-[10px] uppercase mt-1 font-bold">Search</span>
        </button>

        {/* Wishlist Tab */}
        <button 
          onClick={() => {
            setCurrentTab("wishlist");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          className={`flex flex-col items-center justify-center transition-colors cursor-pointer select-none ${
            currentTab === "wishlist" 
              ? "text-[#000000] dark:text-[#ffffff] font-bold" 
              : "text-[#5d5f5f] dark:text-[#cfc4c5] hover:text-[#000000] dark:hover:text-[#ffffff]"
          }`}
        >
          <span className="material-symbols-outlined">favorite</span>
          <span className="font-label-caps text-[10px] uppercase mt-1 font-bold">Wishlist</span>
        </button>

        {/* Bag (opens Cart Drawer directly) */}
        <button 
          onClick={() => setIsCartOpen(true)} 
          className="flex flex-col items-center justify-center text-[#5d5f5f] dark:text-[#cfc4c5] hover:text-[#000000] dark:hover:text-[#ffffff] transition-colors relative cursor-pointer select-none"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="font-label-caps text-[10px] uppercase mt-1 font-bold">Bag</span>
          <span className="absolute -top-1.5 right-1 bg-[#000000] dark:bg-[#ffffff] text-[#ffffff] dark:text-[#000000] text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
            {totalCartCount}
          </span>
        </button>
      </nav>
    </div>
  );
}
