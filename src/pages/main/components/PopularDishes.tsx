import {
  useProductControllerFindOneAdditionalPerRestaurant,
  type Product,
} from "@/api/generated";
import { IconChevronRight } from "@tabler/icons-react";

interface ProductWithVendor extends Product {
  vendor_name: string;
}

function PopularDishes() {
  const { data, isLoading, error } =
    useProductControllerFindOneAdditionalPerRestaurant();

  const products = (data?.data as ProductWithVendor[]) ?? [];

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка</div>;
  return (
    <section>
      <div className="rounded-[28px] bg-white p-5 pt-2 mt-3 shadow-sm">
        <p className="text-md text-gray-500 font-semibold  opacity-80">
          Рестораны
        </p>

        <h2 className="text-2xl font-bold mb-4 tracking-tight">
          Популярные блюда
        </h2>

        {/* список */}
        <div className="flex flex-col gap-4 mt-8 ">
          {products.map((p) => (
            <div
              key={p.id}
              className={`flex items-start gap-4 p-0 rounded-2xl cursor-pointer transition
   hover:bg-gray-50 shadow-sm
  `}
            >
              {/* IMAGE */}
              <img
                src={p?.image?.url ?? "/product.png"}
                alt={p?.name}
                className="w-32 h-32 rounded-2xl object-cover shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "/dish_placeholder.svg";
                }}
              />

              {/* TEXT BLOCK */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-semibold leading-tight">{p?.name}</h3>

                <p className="text-sm text-gray-400">{p?.vendor_name}</p>

                <div className="mt-8 text-xl font-semibold">
                  {p?.listings[0].price ?? "0"} ₽{" "}
                  <span className="text-sm text-gray-400 line-through decoration-red-500">
                    {p?.listings[0]?.discount_price
                      ? `${p.listings[0].discount_price}₽`
                      : ""}
                  </span>
                </div>
              </div>

              {/* ARROW */}
              <div className="w-12 h-12 self-end rounded-full bg-gray-100 flex items-center justify-center shrink-0">
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
