const FAVORITES_KEY = "favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

export function toggleFavorite(productId: string): string[] {
  const current = getFavorites();
  let updated: string[];
  if (current.includes(productId)) {
    updated = current.filter(id => id !== productId);
  } else {
    updated = [...current, productId];
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}
