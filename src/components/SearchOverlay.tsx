import React, { useEffect, useRef } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSuggestions = [
    "Backpack",
    "Messenger",
    "Duffle",
    "Crossbody",
    "Camera",
    "Leather",
    "Canvas",
  ];

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#1b1b1b] z-[120] flex flex-col p-6 animate-fade-in transition-colors">
      {/* Header inside search */}
      <div className="flex justify-between items-center mb-10">
        <span className="font-headline-lg-mobile text-[24px] font-bold text-black dark:text-white tracking-tighter">
          COACH SEARCH
        </span>
        <button
          onClick={onClose}
          className="p-2 cursor-pointer text-[#000000] dark:text-[#ffffff] hover:opacity-75"
          aria-label="Close search"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      {/* Main Search Input */}
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col justify-start">
        <div className="relative border-b-2 border-black dark:border-white pb-2 flex items-center">
          <span className="material-symbols-outlined text-3xl text-gray-400 mr-4 select-none">
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search bags by name, material, style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-[22px] font-bold text-black dark:text-white placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 cursor-pointer hover:opacity-75 text-gray-400 hover:text-black dark:hover:text-white"
              aria-label="Clear query"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="mt-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#5d5f5f] dark:text-[#cfc4c5] mb-4">
            Popular Suggestions
          </p>
          <div className="flex flex-wrap gap-2.5">
            {popularSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className={`px-4 py-2 border text-[13px] font-bold tracking-tight transition-all cursor-pointer ${
                  searchQuery.toLowerCase() === suggestion.toLowerCase()
                    ? "bg-[#000000] text-[#ffffff] border-[#000000]"
                    : "border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Search Promo */}
        <div className="mt-16 bg-[#f9f9f9] dark:bg-[#2f3131] border border-[#E5E5E5] dark:border-[#4c4546] p-6 max-w-md">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#CC0000] block mb-2">
            Complimentary Shipping
          </span>
          <h4 className="font-product-title text-[15px] font-bold text-black dark:text-white mb-1">
            Free Delivery on All Bags
          </h4>
          <p className="text-[13px] text-[#5d5f5f] dark:text-[#cfc4c5] leading-relaxed">
            All orders include elegant signature Coach packaging and free standard shipping. Easy returns within 30 days.
          </p>
        </div>

        {/* View Results Button */}
        <button
          onClick={onClose}
          className="mt-auto mb-10 py-4 bg-[#000000] dark:bg-[#ffffff] text-[#ffffff] dark:text-[#000000] font-label-caps text-[12px] uppercase tracking-widest font-bold hover:opacity-90 transition-opacity cursor-pointer text-center select-none"
        >
          View Results
        </button>
      </div>
    </div>
  );
};
