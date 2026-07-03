import React, { useState, useRef, useEffect } from "react";

interface FilterBarProps {
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (materials: string[]) => void;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: (ranges: string[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedColors,
  setSelectedColors,
  selectedMaterials,
  setSelectedMaterials,
  selectedPriceRanges,
  setSelectedPriceRanges,
  sortBy,
  setSortBy,
  onClearAll,
  hasActiveFilters,
}) => {
  const [activeTab, setActiveTab] = useState<"color" | "material" | "price" | "sort" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTab = (tab: "color" | "material" | "price" | "sort") => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const togglePriceRange = (range: string) => {
    if (selectedPriceRanges.includes(range)) {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
  };

  const colorOptions = ["Black", "Brown", "Charcoal", "Mahogany"];
  const materialOptions = ["Leather", "Canvas"];
  const priceOptions = ["Under 300 €", "300 € - 500 €", "Over 500 €"];
  const sortOptions = [
    { label: "Best Matches", value: "best" },
    { label: "Price: Low to High", value: "low-high" },
    { label: "Price: High to Low", value: "high-low" },
  ];

  return (
    <div className="relative sticky top-16 bg-[#f9f9f9] dark:bg-[#1b1b1b] z-40 border-b border-[#E5E5E5] dark:border-[#cfc4c5]" ref={containerRef}>
      <nav className="overflow-x-auto hide-scrollbar flex items-center gap-3 px-4 h-14 w-full">
        {/* Color Filter */}
        <button
          onClick={() => toggleTab("color")}
          className={`flex items-center gap-1 border rounded-full px-4 py-1.5 whitespace-nowrap font-utility text-[12px] font-semibold cursor-pointer transition-colors ${
            selectedColors.length > 0
              ? "bg-[#000000] text-[#ffffff] border-[#000000]"
              : "border-[#E5E5E5] text-[#1a1c1c] hover:bg-[#eeeeee] dark:text-[#ffffff] dark:hover:bg-[#5d5f5f]/30"
          }`}
        >
          Color {selectedColors.length > 0 && `(${selectedColors.length})`}{" "}
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </button>

        {/* Material Filter */}
        <button
          onClick={() => toggleTab("material")}
          className={`flex items-center gap-1 border rounded-full px-4 py-1.5 whitespace-nowrap font-utility text-[12px] font-semibold cursor-pointer transition-colors ${
            selectedMaterials.length > 0
              ? "bg-[#000000] text-[#ffffff] border-[#000000]"
              : "border-[#E5E5E5] text-[#1a1c1c] hover:bg-[#eeeeee] dark:text-[#ffffff] dark:hover:bg-[#5d5f5f]/30"
          }`}
        >
          Material {selectedMaterials.length > 0 && `(${selectedMaterials.length})`}{" "}
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </button>

        {/* Price Filter */}
        <button
          onClick={() => toggleTab("price")}
          className={`flex items-center gap-1 border rounded-full px-4 py-1.5 whitespace-nowrap font-utility text-[12px] font-semibold cursor-pointer transition-colors ${
            selectedPriceRanges.length > 0
              ? "bg-[#000000] text-[#ffffff] border-[#000000]"
              : "border-[#E5E5E5] text-[#1a1c1c] hover:bg-[#eeeeee] dark:text-[#ffffff] dark:hover:bg-[#5d5f5f]/30"
          }`}
        >
          Price {selectedPriceRanges.length > 0 && `(${selectedPriceRanges.length})`}{" "}
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </button>

        {/* Sort option (on right) */}
        <div className="ml-auto flex items-center gap-1 whitespace-nowrap font-utility text-[12px] text-[#5d5f5f] dark:text-[#cfc4c5]">
          Sort by:{" "}
          <button
            onClick={() => toggleTab("sort")}
            className="font-bold text-[#1a1c1c] dark:text-[#ffffff] cursor-pointer inline-flex items-center gap-0.5"
          >
            {sortOptions.find((o) => o.value === sortBy)?.label || "Best Matches"}{" "}
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
      </nav>

      {/* Clear Filters Indicator */}
      {hasActiveFilters && (
        <div className="flex px-4 py-2 bg-[#f3f3f4] dark:bg-[#2f3131] border-b border-[#E5E5E5] dark:border-[#4c4546] justify-between items-center animate-fade-in">
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5]">Active:</span>
            {selectedColors.map((color) => (
              <span key={color} className="text-[11px] bg-[#000000] text-[#ffffff] px-2.5 py-0.5 font-medium flex items-center gap-1">
                {color}
                <button onClick={() => toggleColor(color)} className="hover:opacity-75 font-bold">×</button>
              </span>
            ))}
            {selectedMaterials.map((material) => (
              <span key={material} className="text-[11px] bg-[#000000] text-[#ffffff] px-2.5 py-0.5 font-medium flex items-center gap-1">
                {material}
                <button onClick={() => toggleMaterial(material)} className="hover:opacity-75 font-bold">×</button>
              </span>
            ))}
            {selectedPriceRanges.map((range) => (
              <span key={range} className="text-[11px] bg-[#000000] text-[#ffffff] px-2.5 py-0.5 font-medium flex items-center gap-1">
                {range}
                <button onClick={() => togglePriceRange(range)} className="hover:opacity-75 font-bold">×</button>
              </span>
            ))}
          </div>
          <button
            onClick={onClearAll}
            className="text-[11px] font-bold text-[#CC0000] hover:underline uppercase tracking-wider cursor-pointer pl-4"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Dropdown Panel Content */}
      {activeTab && (
        <div className="absolute top-full left-0 w-full bg-[#ffffff] dark:bg-[#1b1b1b] border-b border-[#E5E5E5] dark:border-[#4c4546] shadow-md z-50 p-5 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
          {activeTab === "color" && (
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] mb-2">Filter by Color</p>
              {colorOptions.map((color) => (
                <label key={color} className="flex items-center gap-3 py-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                    className="w-4 h-4 text-black border-[#cfc4c5] focus:ring-black rounded-[0px]"
                  />
                  <span className="text-[14px] font-medium text-[#1a1c1c] dark:text-[#ffffff]">{color}</span>
                </label>
              ))}
            </div>
          )}

          {activeTab === "material" && (
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] mb-2">Filter by Material</p>
              {materialOptions.map((material) => (
                <label key={material} className="flex items-center gap-3 py-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material)}
                    onChange={() => toggleMaterial(material)}
                    className="w-4 h-4 text-black border-[#cfc4c5] focus:ring-black rounded-[0px]"
                  />
                  <span className="text-[14px] font-medium text-[#1a1c1c] dark:text-[#ffffff]">{material}</span>
                </label>
              ))}
            </div>
          )}

          {activeTab === "price" && (
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] mb-2">Filter by Price Range</p>
              {priceOptions.map((range) => (
                <label key={range} className="flex items-center gap-3 py-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range)}
                    onChange={() => togglePriceRange(range)}
                    className="w-4 h-4 text-black border-[#cfc4c5] focus:ring-black rounded-[0px]"
                  />
                  <span className="text-[14px] font-medium text-[#1a1c1c] dark:text-[#ffffff]">{range}</span>
                </label>
              ))}
            </div>
          )}

          {activeTab === "sort" && (
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5d5f5f] dark:text-[#cfc4c5] mb-2">Sort Collection</p>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setActiveTab(null);
                  }}
                  className={`text-left py-2 px-3 hover:bg-[#f3f3f4] dark:hover:bg-[#2f3131] font-medium text-[14px] flex justify-between items-center ${
                    sortBy === option.value
                      ? "bg-[#eeeeee] dark:bg-[#2f3131] text-[#000000] dark:text-[#ffffff] font-bold"
                      : "text-[#1a1c1c] dark:text-[#cfc4c5]"
                  }`}
                >
                  {option.label}
                  {sortBy === option.value && (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="col-span-full border-t border-[#E5E5E5] dark:border-[#4c4546] pt-3 flex justify-end">
            <button
              onClick={() => setActiveTab(null)}
              className="bg-[#000000] text-[#ffffff] hover:opacity-90 font-label-caps text-[11px] uppercase tracking-wider px-6 py-2 cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
