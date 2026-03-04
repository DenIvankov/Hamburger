import type { Product } from "@/api/generated";

function DishImage({ product }: { product: Product }) {
  const imageUrl = product.image?.url || "https://placehold.co/600x400";

  return (
    <div className="px-4">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-[240px] object-cover rounded-[20px]"
      />
    </div>
  );
}

export default DishImage;
