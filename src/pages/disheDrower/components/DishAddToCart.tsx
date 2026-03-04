import type { Product } from "@/api/generated";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const extrasPrices: Record<string, number> = {
  cheese: 20,
  mushrooms: 30,
};

type Props = {
  product: Product;
  selectedExtras: string[];
};

function DishAddToCart({ product, selectedExtras }: Props) {
  const basePrice = product.listings?.[0]?.price ?? 0;

  const [count, setCount] = useState(1);

  const extrasTotal = selectedExtras.reduce(
    (sum, id) => sum + extrasPrices[id],
    0,
  );

  const total = (Number(basePrice) + Number(extrasTotal)) * count;
  console.log(product.listings?.[0]?.price);
  console.log(extrasTotal);
  console.log(count);
  console.log(total);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 items-center">
      <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 gap-4">
        <button onClick={() => setCount(Math.max(1, count - 1))}>−</button>

        <span className="font-semibold">{count}</span>

        <button onClick={() => setCount(count + 1)}>+</button>
      </div>

      <Button className="flex-1 h-12 rounded-full text-lg font-semibold !text-white">
        В корзину {total} ₽
      </Button>
    </div>
  );
}

export default DishAddToCart;
