import { fetchProductById } from "@/lib/api";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function ProductDetails({ params }: Props) {
  const product = await fetchProductById(params.id);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <Link href="/" className="text-blue-600">← Back</Link>

      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <img src={product.image} className="h-60 object-contain" />
      <p className="mt-2">{product.description}</p>

      <FavoriteButton productId={params.id} />
    </main>
  );
}
