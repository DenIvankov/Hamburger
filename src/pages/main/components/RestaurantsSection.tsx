import {
  type Vendor,
  type VendorUserControllerFindFiltersQueryResult,
  useVendorUserControllerFindFilters,
} from "@/api/generated";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Rating } from "@/components/ui/rating";

export function RestaurantsSection() {
  /* ========= RESTAURANTS ========= */
  const {
    data: restaurants = [] as Vendor[],
    isLoading,
    error,
  } = useVendorUserControllerFindFilters(
    { limit: 10, page: 1 },
    {
      query: {
        select: (resp: VendorUserControllerFindFiltersQueryResult) =>
          resp?.data?.data ?? [],
      },
    },
  );

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки ресторанов</div>;
  }

  return (
    <section>
      <div className="rounded-[28px] bg-white p-6 mt-3 shadow-sm">
        <p className="text-sm opacity-80">Рестораны</p>
        <h2 className="text-2xl font-semibold mb-4">Рядом с вами</h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="pl-4">
            {restaurants.map((r) => (
              <CarouselItem key={r.id} className="basis-[85%] sm:basis-[60%]">
                <div className="rounded-[24px] h-48 bg-gray-300 overflow-hidden">
                  <img
                    src={r.image?.url}
                    className="w-full h-full object-cover"
                    alt={r.general_info?.name ?? "restaurant"}
                  />
                </div>

                <h3 className="text-base font-semibold mt-1">
                  {r.general_info?.name}
                </h3>
                <div className="flex items-center gap-1 leading-none">
                  <Rating value={r.rating} />
                  <span className="text-gray-900 font-medium">{r.rating}</span>
                  <span className="ml-1">({r.reviews?.length ?? 0})</span>
                  <span className="mx-1">·</span>
                  {r.general_info?.address}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
