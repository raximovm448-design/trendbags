import React from "react";

interface TopAppBarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onMenuClick,
  onSearchClick,
  onCartClick,
  cartCount,
}) => {
  return (
    <header 
      id="top-app-bar"
      className="bg-[#f9f9f9] dark:bg-[#1b1b1b] top-0 sticky z-50 border-b border-[#E5E5E5] dark:border-[#cfc4c5] transition-colors"
    >
      <div className="flex justify-between items-center h-16 px-4 w-full">
        {/* Menu Button */}
        <button 
          onClick={onMenuClick}
          className="text-[#000000] dark:text-[#ffffff] hover:opacity-70 transition-opacity active:scale-95 duration-150 p-2 cursor-pointer"
          aria-label="Toggle Navigation Drawer"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Brand Logo */}
        <div className="font-headline-lg-mobile text-[24px] font-bold tracking-tighter text-[#000000] dark:text-[#ffffff] select-none">
          COACH
        </div>

        {/* Action Icons */}
        <div className="flex gap-2">
          <button 
            onClick={onSearchClick}
            className="text-[#000000] dark:text-[#ffffff] hover:opacity-70 transition-opacity p-2 cursor-pointer"
            aria-label="Open Search"
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
          
          <button 
            onClick={onCartClick}
            className="text-[#000000] dark:text-[#ffffff] hover:opacity-70 transition-opacity p-2 relative cursor-pointer"
            aria-label="View Cart"
          >
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#000000] dark:bg-[#ffffff] text-[#ffffff] dark:text-[#000000] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
