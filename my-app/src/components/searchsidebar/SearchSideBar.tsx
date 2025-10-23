"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import debounce from 'lodash.debounce';
import Link from "next/link";

import { Product } from "@/interfaces";

interface SearchSideBarProps {
  onCloseMenu?: () => void;
};

export default function SearchSideBar({ onCloseMenu }: SearchSideBarProps) {
  const [results, setResults] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async (val: string) => {
    if (!val) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  const debouncedSearch = useMemo(() => {
    return debounce(fetchProducts, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    debouncedSearch(val);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    debouncedSearch(query);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className="relative w-full">
      <input
        spellCheck={false}  // Desactiva el autocorrector ortografico
        autoCorrect="off"
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
        <ul className="z-20 p-2 cardcolor rounded shadow mt-1 overflow-auto">
          {results.map((p) => (
            <li key={p.slug}>
              <Link className= "text-decoration-none" href={`/product/${p.slug}`} onClick={onCloseMenu}>
                <div className="flex text items-center text-left text-sm hover">
                  {p.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
