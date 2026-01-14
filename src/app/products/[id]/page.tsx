import Link from "next/link";
import { fetchProductById } from "@/lib/api";
import FavoriteButton from "@/components/FavoriteButton";

interface Props {
  params: { id: string };
}

export default async function ProductDetails({ params }: Props) {
  const { id } = params;

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
      <Link
        href="/"
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {product.category}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold mt-2 text-black dark:text-white">
            {product.title}
          </h1>

          <p className="text-2xl font-semibold text-blue-600 mt-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Buy Now
            </button>

            <div className="flex items-center gap-2">
              <FavoriteButton productId={product.id.toString()} />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Add to Favorites
              </span>
            </div>
          </div>

          <div className="mt-8 border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <h3 className="font-semibold mb-2 text-black dark:text-white">
              Product Information
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              <li>
                <strong>Price:</strong> ₹{product.price}
              </li>
              <li>
                <strong>Product ID:</strong> {product.id}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
