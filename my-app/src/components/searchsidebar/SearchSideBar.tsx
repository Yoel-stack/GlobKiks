"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import Link from "next/link";
import { initialData, Product } from "@/seed";

interface SearchAutocompleteProps {
  onCloseMenu?: () => void;
}

export default function SearchSideBar({ onCloseMenu }: SearchAutocompleteProps) {
  const products = initialData.products as Product[];

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["title", "description", "tags"],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 1,
    });
  }, [products]);

  const [results, setResults] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const performSearch = (val: string) => {
    if (!val) {
      setResults(products.slice(0, 0));
    } else {
      const found = fuse.search(val, { limit: 4 }).map(r => r.item);
      setResults(found);
    }
  };

  const debounced = useMemo(
    () => debounce((val: string) => performSearch(val), 250),
    [fuse]
  );

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    debounced(val);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    performSearch("");
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder="Buscar modelos"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="flex text-center w-full text-gray-600 rounded border-b-2 text-xl border-gray-500 focus:outline-none focus:border-blue-500"
      />     
      {showDropdown && results.length > 0 && (
        <ul className="z-20 px-2 py-2 border rounded shadow mt-1 overflow-auto">
          {results.map((p) => (
            <li key={p.slug} >
              <Link
                className="text-decoration-none"
                href={`/product/${p.slug}`}
              >
                <main onClick={onCloseMenu}>
                  <div className="flex items-center">
                    <div className="text-left text-sm hover text">
                      {p.title}
                    </div>
                  </div>
                </main>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
