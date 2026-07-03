import React from "react";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onTabChange: (tab: string) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onTabChange,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        id="drawer-backdrop"
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside 
        id="navigation-drawer"
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-[#f9f9f9] dark:bg-[#e2e2e2] shadow-xl z-[70] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col py-8 h-full">
          {/* Header */}
          <div className="px-8 mb-10 flex justify-between items-center">
            <span className="font-headline-lg-mobile text-[24px] font-bold text-[#000000] dark:text-[#1a1c1c] tracking-tighter">
              COACH
            </span>
            <button 
              className="p-2 cursor-pointer text-[#000000] hover:opacity-75"
              onClick={onClose}
              aria-label="Close Drawer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => { onTabChange("shop"); onClose(); }}
              className="text-[#4c4546] pl-8 py-3 flex items-center gap-4 hover:bg-[#f3f3f4] transition-colors w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined">new_releases</span>
              <span className="font-headline-lg-mobile text-[18px] font-semibold tracking-tight">New Arrivals</span>
            </button>

            <button
              onClick={() => { onTabChange("shop"); onClose(); }}
              className="text-[#000000] font-bold border-l-4 border-[#000000] pl-7 py-3 flex items-center gap-4 hover:bg-[#f3f3f4] transition-colors w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined">male</span>
              <span className="font-headline-lg-mobile text-[18px] font-bold tracking-tight">Men's Bags</span>
            </button>

            <button
              onClick={() => { onTabChange("shop"); onClose(); }}
              className="text-[#4c4546] pl-8 py-3 flex items-center gap-4 hover:bg-[#f3f3f4] transition-colors w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined">female</span>
              <span className="font-headline-lg-mobile text-[18px] font-semibold tracking-tight">Women's Collection</span>
            </button>

            <button
              onClick={() => { onTabChange("shop"); onClose(); }}
              className="text-[#4c4546] pl-8 py-3 flex items-center gap-4 hover:bg-[#f3f3f4] transition-colors w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#CC0000]">sell</span>
              <span className="font-headline-lg-mobile text-[18px] font-semibold tracking-tight text-[#CC0000]">Sale Specials</span>
            </button>

            <button
              onClick={() => { onTabChange("shop"); onClose(); }}
              className="text-[#4c4546] pl-8 py-3 flex items-center gap-4 hover:bg-[#f3f3f4] transition-colors w-full text-left cursor-pointer"
            >
              <span className="material-symbols-outlined">storefront</span>
              <span className="font-headline-lg-mobile text-[18px] font-semibold tracking-tight">Find a Store</span>
            </button>
          </nav>

          {/* Bottom Info inside Drawer */}
          <div className="mt-auto px-8 pt-6 border-t border-[#E5E5E5]">
            <p className="text-[12px] text-[#5d5f5f] uppercase tracking-wider font-bold mb-1">Customer Care</p>
            <p className="text-[14px] text-[#1a1c1c] font-medium">+1 (888) 262-6224</p>
            <p className="text-[12px] text-[#5d5f5f] mt-4">© 2026 COACH IP HOLDINGS LLC.</p>
          </div>
        </div>
      </aside>
    </>
  );
};
