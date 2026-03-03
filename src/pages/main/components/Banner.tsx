import { useAdsCustomerControllerGetBanners } from "@/api/generated";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
function Banner() {
  const { data, isLoading, error } = useAdsCustomerControllerGetBanners();
  const banners = Array.isArray(data?.data) ? data.data : [];
  if (isLoading) {
    return (
      <section>
        <div className="rounded-[28px] bg-white p-5 mt-3 shadow-sm">
          <div className="aspect-[16/9] w-full rounded-2xl bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <div className="rounded-[28px] bg-white p-6 mt-3 shadow-sm text-sm text-red-500">
          Не удалось загрузить баннеры
        </div>
      </section>
    );
  }
  if (!banners.length) {
    return null;
  }

  return (
    <section>
      <div className="rounded-[28px] bg-white pl-5 mt-3 shadow-sm">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 pl-5 ">
            {banners.map((r) => (
              <CarouselItem
                key={r.id}
                className="pl-2 basis-[100%] sm:basis-[60%]"
              >
                <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
                  <img
                    src={r.media?.url}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default Banner;
