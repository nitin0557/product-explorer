import Link from "next/link";
import Image from "next/image";
import { fetchProductById } from "@/lib/api";
import FavoriteButton from "@/components/FavoriteButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;   // 🔥 MUST await

  const product = await fetchProductById(Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main>
      <h1>{product.title}</h1>
      <FavoriteButton productId={product.id.toString()} />
    </main>
  );
}
