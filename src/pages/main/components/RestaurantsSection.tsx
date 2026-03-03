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
    data: restaurants = [],
    isLoading,
    error,
  } = useVendorUserControllerFindFilters<Vendor[]>(
    { limit: 10, page: 1 },
    {
      query: {
        select: (resp) => (resp.data?.data ?? []) as Vendor[],
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
      <div className="rounded-[28px] bg-white p-5 pr-0 mt-2 shadow-sm">
        <p className="text-md text-gray-500 font-semibold  opacity-80 -mt-2">
          Рестораны
        </p>
        <h2 className="text-2xl font-bold mb-6 tracking-tight">Рядом с вами</h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 pl-5 ">
            {restaurants.map((r) => (
              <CarouselItem
                key={r.id}
                className="pl-2 basis-[93.6%] sm:basis-[60%]"
              >
                <div className="relative rounded-[24px] h-51 bg-gray-300 overflow-hidden">
                  <img
                    src={r.image?.url}
                    className="w-full h-full object-cover"
                    alt={r.general_info?.name ?? "restaurant"}
                  />
                  {/* LOGO OVERLAY */}
                  <div className="absolute rounded-[20px] h-14 w-14 bottom-2 bg-white left-2 overflow-hidden">
                    <img
                      src={r.logo?.url}
                      alt="logo"
                      className="    w-full
      h-full
      object-cover
      scale-95"
                    />
                  </div>
                </div>

                <h3 className="text-base text-lg font-semibold mt-2 tracking-wider">
                  {r.general_info?.name}
                </h3>
                <div className="flex items-center gap-1 leading-none mt-1">
                  <Rating value={r.rating} />
                  <span className="text-gray-900 font-medium">{r.rating}</span>
                  <span className="ml-1 text-gray-400">
                    ({r.reviews?.length ?? 0})
                  </span>
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
