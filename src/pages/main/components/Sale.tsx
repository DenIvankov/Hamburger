import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Heart, Plus } from "lucide-react";

import { useNearestVendoruseNearestVendor } from "@/api/hooks/useNearestVendor";
import type { Product } from "@/api/generated";

function Sale() {
  const { products, isLoading, error } = useNearestVendoruseNearestVendor();

  const sale = (products?.data?.data as Product[]) ?? [];

  const saleModified = [...sale, ...sale];

  if (isLoading) {
    return (
      <section id="products" className="mt-3">
        <div className="rounded-[28px] bg-green-600 p-6 text-white">
          <p className="text-md text-gray-500 font-semibold  opacity-80">
            Продукты
          </p>
          <h2 className="text-2xl font-bold mb-4">Распродажа</h2>
          <p>Загрузка...</p>
        </div>
      </section>
    );
  }

  if (error || !sale?.length) return null;

  return (
    <section className="mt-3">
      <div className="rounded-[28px] bg-green-600 p-5 pr-0 text-white">
        <p className="text-md opacity-80 -mt-2 mb-1">Продукты</p>
        <h2 className="text-2xl font-bold mb-5 tracking-normal">Распродажа</h2>

        <Carousel opts={{ align: "start", loop: true, dragFree: true }}>
          <CarouselContent className="-ml-2">
            {saleModified.map((product) => {
              const listing = product.listings?.[0];

              const price = listing?.discount_price ?? listing?.price;
              const oldPrice = listing?.discount_price ? listing.price : null;

              return (
                <CarouselItem key={product.id} className="pl-2 basis-[154px]">
                  <div className="bg-white rounded-4xl p-1 text-black h-[248px] flex flex-col">
                    {/* IMAGE */}
                    <div className="relative bg-gray-100 rounded-xl h-34 flex items-center justify-center p-1">
                      <img
                        src={product.image?.url ?? "/product.png"}
                        alt={product.name}
                        className="h-full object-contain "
                        onError={(e) => {
                          e.currentTarget.src = "/dish_placeholder.svg";
                        }}
                      />

                      <button className="absolute top-2 right-2 bg-taupe-300 rounded-full p-2 shadow">
                        <Heart className="text-white " size={14} />
                      </button>

                      <button className="absolute bottom-3 right-2 bg-white rounded-full p-2.5 shadow-lg">
                        <Plus size={22} />
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className="px-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">{price} ₽</span>

                        {oldPrice && (
                          <span className="text-sm text-gray-400 line-through decoration-red-500">
                            {oldPrice} ₽
                          </span>
                        )}
                      </div>

                      <p className="text-sm mt-1 leading-tight line-clamp-2">
                        {product.name}
                      </p>

                      {product.weight && (
                        <p className="text-md text-gray-400 mt-1">
                          {product.weight} г
                        </p>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default Sale;
