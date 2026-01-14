"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { getFavorites } from "@/lib/storage";
import { useDebounce } from "@/lib/useDebounce";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [category, setCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 8;

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, showFavorites]);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const favorites = getFavorites();

  const filtered = products.filter(p => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesFavorite = !showFavorites || favorites.includes(p.id.toString());
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-red-500">Failed to load products.</p>;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* Header with Theme Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Explorer</h1>
        <ThemeToggle />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <SearchBar value={search} onChange={setSearch} />

        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="px-4 py-2 border rounded dark:border-gray-700"
        >
          {showFavorites ? "Showing Favorites" : "Show Favorites"}
        </button>
      </div>

      {search !== debouncedSearch && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Searching...
        </p>
      )}

      <CategoryFilter
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <div className="mt-6">
        <ProductGrid products={paginated} />
      </div>

      {filtered.length > PAGE_SIZE && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-700"
            disabled={page === 1}
          >
            Prev
          </button>

          <span className="text-sm">Page {page}</span>

          <button
            onClick={() =>
              setPage(p =>
                p * PAGE_SIZE < filtered.length ? p + 1 : p
              )
            }
            className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-700"
            disabled={page * PAGE_SIZE >= filtered.length}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
