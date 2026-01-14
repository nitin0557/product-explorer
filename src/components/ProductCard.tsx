import Link from "next/link";
import { Product } from "@/types/product";
import FavoriteButton from "./FavoriteButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <Link href={`/products/${product.id}`} aria-label={`View ${product.title}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-full object-contain mb-4"
        />
        <h3 className="text-black dark:text-white">{product.title}</h3>
      </Link>

      <div className="flex justify-between items-center mt-2">
        <span className="font-bold">₹{product.price}</span>
        <FavoriteButton productId={product.id} />
      </div>

      <p className="text-sm text-gray-500 mt-1">{product.category}</p>
    </div>
  );
}
