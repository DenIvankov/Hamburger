import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Heart, Plus } from "lucide-react";
import {
  useProductControllerFindAdditionalbyVendor,
  type Product,
} from "@/api/generated";

function Sale() {
  const vendorId = 1;

  const { data, isLoading, error } = useProductControllerFindAdditionalbyVendor(
    vendorId,
    { page: 1, limit: 20 },
  );

  const sale = (data?.data?.data as Product[]) ?? [];

  if (isLoading) {
    return (
      <section className="mt-3">
        <div className="rounded-[28px] bg-green-600 p-6 text-white">
          <p className="text-sm opacity-80">Продукты</p>
          <h2 className="text-2xl font-semibold mb-4">Распродажа</h2>
          <p>Загрузка...</p>
        </div>
      </section>
    );
  }

  if (error || !sale?.length) return null;

  return (
    <section className="mt-3">
      <div className="rounded-[28px] bg-green-600 p-6 text-white">
        <p className="text-sm opacity-80">Продукты</p>
        <h2 className="text-2xl font-semibold mb-4">Распродажа</h2>

        <Carousel opts={{ align: "start", dragFree: true }}>
          <CarouselContent className="-ml-3">
            {sale.map((product) => {
              const listing = product.listings?.[0];

              const price = listing?.discount_price ?? listing?.price;
              const oldPrice = listing?.discount_price ? listing.price : null;

              return (
                <CarouselItem key={product.id} className="pl-3 basis-[160px]">
                  <div className="bg-white rounded-2xl p-3 text-black h-[230px] flex flex-col">
                    {/* IMAGE */}
                    <div className="relative bg-gray-100 rounded-xl h-28 flex items-center justify-center">
                      <img
                        src={product.image?.url ?? "/product.png"}
                        alt={product.name}
                        className="h-full object-contain"
                      />

                      <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                        <Heart size={14} />
                      </button>

                      <button className="absolute bottom-2 right-2 bg-gray-100 rounded-full p-2 shadow">
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{price} ₽</span>

                        {oldPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {oldPrice} ₽
                          </span>
                        )}
                      </div>

                      <p className="text-sm mt-1 leading-tight line-clamp-2">
                        {product.name}
                      </p>

                      {product.weight && (
                        <p className="text-xs text-gray-400 mt-1">
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
