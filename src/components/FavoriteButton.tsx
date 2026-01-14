"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";

interface Props {
  productId: string;
}

export default function FavoriteButton({ productId }: Props) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

const isFavorite = favorites.includes(Number(productId));

  const handleToggle = () => {
    const updated = toggleFavorite(Number(productId));
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
