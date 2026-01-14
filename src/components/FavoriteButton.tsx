"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";

interface Props {
  productId: number;
}

export default function FavoriteButton({ productId }: Props) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const isFavorite = favorites.includes(productId);

  const handleToggle = () => {
    const updated = toggleFavorite(productId);
    setFavorites(updated);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle Favorite"
      className="text-2xl"
    >
      {isFavorite ? "⭐" : "☆"}
    </button>
  );
}
