import {
  useProductControllerFindOneAdditionalPerRestaurant,
  type Product,
} from "@/api/generated";
import { IconChevronRight, IconCircleArrowRight } from "@tabler/icons-react";
import { useState } from "react";

interface ProductWithVendor extends Product {
  vendor_name: string;
}

function PopularDishes() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { data, isLoading, error } =
    useProductControllerFindOneAdditionalPerRestaurant();

  const products = (data?.data as ProductWithVendor[]) ?? [];

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка</div>;
  console.log(products);
  return (
    <section>
      <div className="rounded-[28px] bg-white p-6 mt-3 shadow-sm">
        <p className="text-sm text-gray-400">Рестораны</p>

        <h2 className="text-2xl font-semibold mb-4">Популярные блюда</h2>

        {/* список */}
        <div className="flex flex-col gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`flex items-center gap-4 p-2 rounded-2xl cursor-pointer transition
    ${activeId === p.id ? " ring-2 ring-red-400" : "hover:bg-gray-50 shadow-sm"}
  `}
            >
              {/* IMAGE */}
              <img
                src={p?.image?.url ?? "/product.png"}
                alt={p?.name}
                className="w-20 h-20 rounded-2xl object-cover shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "/dish_placeholder.svg";
                }}
              />

              {/* TEXT BLOCK */}
              <div className="flex flex-col flex-1">
                <h3 className="font-semibold leading-tight">{p?.name}</h3>

                <p className="text-sm text-gray-400">{p?.vendor_name}</p>

                <div className="mt-2 font-semibold">
                  {p?.listings[0].price ?? "0"} ₽
                </div>
              </div>

              {/* ARROW */}
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <IconChevronRight
                  size={22}
                  stroke={2}
                  className="text-gray-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDishes;
