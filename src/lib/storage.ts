export const FAVORITES_KEY = "favorite_products";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleFavorite(id: number): number[] {
  const favorites = getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter(fid => fid !== id)
    : [...favorites, id];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}
