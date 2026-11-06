import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, Building2 } from 'lucide-react';
import { QUICK_SEARCH_CHIPS } from '../data/insuranceData';

interface SearchBarProps {
  currentQuery: string;
  onSearch: (query: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentQuery,
  onSearch,
  inputRef,
}) => {
  const [inputValue, setInputValue] = useState(currentQuery);
  const internalRef = useRef<HTMLInputElement>(null);
  const resolvedRef = inputRef || internalRef;

  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleChipClick = (chipQuery: string) => {
    setInputValue(chipQuery);
    onSearch(chipQuery);
  };

  const handleClear = () => {
    setInputValue('');
    resolvedRef.current?.focus();
  };

  return (
    <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/80 shadow-xl py-3 sm:py-4 px-4 transition-all">
      <div className="max-w-5xl mx-auto">
        {/* Label for accessibility and farmer clarity */}
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Search Insurance Company / పాలసీ కంపెనీ శోధించండి</span>
          </div>
          <span className="text-slate-400 text-xs hidden sm:inline">
            Type company name & click <b>Search</b>
          </span>
        </div>

        {/* Big Search Box Form */}
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
            </div>

            <input
              ref={resolvedRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search Insurance Company - LIC, HDFC, ICICI, Star Health, Bike Insurance..."
              className="w-full pl-11 sm:pl-14 pr-10 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-slate-900 bg-white border-2 border-emerald-500 rounded-xl sm:rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all placeholder:text-slate-400 placeholder:text-sm sm:placeholder:text-base"
            />

            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label="Clear search input"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-5 sm:px-8 py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 shrink-0 hover:shadow-emerald-600/30 active:scale-95 cursor-pointer"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            <span className="hidden xs:inline">Search</span>
          </button>
        </form>

        {/* Quick Search Chips */}
        <div className="mt-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 text-xs sm:text-sm">
          <span className="text-slate-400 flex items-center gap-1 shrink-0 font-medium text-xs pr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick:
          </span>
          {QUICK_SEARCH_CHIPS.map((chip) => {
            const isActive =
              currentQuery.toLowerCase() === chip.query.toLowerCase() ||
              (chip.query === 'LIC' && currentQuery.toLowerCase().includes('lic')) ||
              (chip.query === 'Star Health' && currentQuery.toLowerCase().includes('star')) ||
              (chip.query === 'Bike' && currentQuery.toLowerCase().includes('bike')) ||
              (chip.query === 'PM Fasal' && currentQuery.toLowerCase().includes('fasal'));

            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleChipClick(chip.query)}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-all flex items-center gap-1.5 border text-xs sm:text-sm cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750 hover:border-slate-600 hover:text-white'
                }`}
              >
                <span>{chip.label}</span>
                {chip.popular && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
