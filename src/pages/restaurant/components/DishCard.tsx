import { type Product } from "@/api/generated";
import { IconPlus } from "@tabler/icons-react";

type DishCardProps = {
  product: Product;
  categoryName: string;
  onOpen: (product: Product) => void;
};

function DishCard({ product, onOpen }: DishCardProps) {
  const imageUrl = product.image?.url || "https://placehold.co/600x400";
  const price = product.listings?.[0]?.price ?? 0;
  const weight = `${product.weight}${product.weight_unit === 1 ? " г" : ""}`;

  return (
    <div className="w-full" onClick={() => onOpen(product)}>
      {/* картинка */}
      <div className="relative rounded-[28px] overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* кнопка + */}
        <button className="absolute bottom-3 right-2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-xl font-semibold active:scale-95 transition active:bg-gray-200">
          <IconPlus stroke={2} />
        </button>
      </div>

      {/* информация */}
      <div className="mt-1 pl-1">
        <p className="font-bold text-lg">{price} ₽</p>
        <p className="text-md leading-tight">{product.name}</p>
        <p className="text-md text-gray-500 ">{`${weight} г`}</p>
      </div>
    </div>
  );
}

export default DishCard;
