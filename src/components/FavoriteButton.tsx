"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";

interface Props {
  productId: string;
}

export default function FavoriteButton({ productId }: Props) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites()); // string[]
  }, []);

  const isFavorite = favorites.includes(productId);

  const handleToggle = () => {
    // ✅ pass string, not number
    const updated = toggleFavorite(productId);
    setFavorites(updated);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="text-2xl"
    >
      {isFavorite ? "⭐" : "☆"}
    </button>
  );
}
