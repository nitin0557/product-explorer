export async function fetchProductById(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}
