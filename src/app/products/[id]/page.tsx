import Link from "next/link";
import Image from "next/image";
import { fetchProductById } from "@/lib/api";
import FavoriteButton from "@/components/FavoriteButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params; // 👈 REQUIRED in Next 15

  let product;
  try {
    product = await fetchProductById(Number(id));
  } catch {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Failed to load product. Please refresh.
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-700">
        Product not found.
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-gray-500">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold mt-2">{product.title}</h1>

          <p className="text-2xl font-semibold text-blue-600 mt-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-4">{product.description}</p>

          <div className="flex items-center gap-4 mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Buy Now
            </button>

            <FavoriteButton productId={product.id.toString()} />
          </div>
        </div>
      </div>
    </main>
  );
}
