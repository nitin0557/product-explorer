"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";

export default function FavoriteButton({ productId }: { productId: string }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites().map(String));
  }, []);

  const isFavorite = favorites.includes(productId);

  const handleToggle = () => {
    const updated = toggleFavorite(Number(productId));
    setFavorites(updated.map(String));
  };

  return <button onClick={handleToggle}>{isFavorite ? "⭐" : "☆"}</button>;
}
