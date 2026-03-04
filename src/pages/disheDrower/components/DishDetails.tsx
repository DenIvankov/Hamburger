import type { Product } from "@/api/generated";
import { Rating } from "@/components/ui/rating";

function DishDetails({ product }: { product: Product }) {
  const price = product.listings?.[0]?.price ?? 0;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <Rating value={4.5} />
        <span className="text-sm font-medium">4.5</span>
      </div>

      <h2 className="text-xl font-bold mt-1">{product.name}</h2>

      <p className="text-gray-500 text-sm mt-2 leading-snug">
        {product.description ||
          "Сочное куриное филе, приготовленное на мангале, свежие овощи и фирменный соус."}
      </p>

      <p className="mt-3 font-bold text-lg">{price} ₽</p>
    </div>
  );
}

export default DishDetails;
