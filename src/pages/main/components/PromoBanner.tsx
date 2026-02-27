import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useAdsCustomerControllerGetHeroBanners,
  type AdsHeroBanner,
} from "../../../api/generated";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { IconBell, IconUser } from "@tabler/icons-react";

const isVideoType = (type?: string | null) => {
  const mediaType = type?.toLowerCase();
  return mediaType === "video" || mediaType === "mp4" || mediaType === "webm";
};

export function PromoBanner() {
  const { data, isLoading } = useAdsCustomerControllerGetHeroBanners();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = useMemo<AdsHeroBanner[]>(() => {
    const bannersData = data?.data as unknown;
    if (Array.isArray(bannersData)) return bannersData as AdsHeroBanner[];
    return bannersData ? [bannersData as AdsHeroBanner] : [];
  }, [data?.data]);

  const playVideo = useCallback(() => {
    if (!api) return;
    const nextIndex = api.selectedScrollSnap();
    setCurrentIndex(nextIndex);
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    const currentVideo = videoRefs.current[nextIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch((err) => {
        console.warn("Video play error:", err);
      });
    }
  }, [api]);

  useEffect(() => {
    if (!api || banners.length === 0) return;
    playVideo();
    api.on("select", playVideo);
    api.on("reInit", playVideo);
    return () => {
      api.off("select", playVideo);
      api.off("reInit", playVideo);
    };
  }, [api, banners.length, playVideo]);

  if (isLoading) {
    return <div className="h-72 bg-gray-200 animate-pulse rounded-lg" />;
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <Carousel
      className="relative w-full z-0"
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {banners.map((banner, index) => {
          const isVideo = isVideoType(banner.media.type);

          return (
            <CarouselItem key={banner.id || index}>
              <div className="relative h-[70vh] max-h-[460px] min-h-[360px] w-full overflow-hidden text-white">
                {isVideo ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={banner.media.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={banner.media.url}
                    alt={banner.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

                <div
                  className="relative z-10 h-full px-5 pb-8"
                  style={{ paddingTop: "env(safe-area-inset-top)" }}
                >
                  <div className="flex items-start justify-between pt-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm leading-snug opacity-95">
                        Южно-Гомельск
                        <br />
                        проспект Андрея, 8
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/60 px-3 py-1 text-xs backdrop-blur">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/70 text-[10px]">
                          i
                        </span>
                        Реклама
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-black">
                      <button
                        onClick={() => console.log("rger")}
                        className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full p-0 bg-white/95 shadow-sm border border-white/90 text-black transition active:bg-white/85 active:shadow-inner transform-gpu origin-center active:scale-95"
                        aria-label="Notifications"
                      >
                        <IconBell size={18} stroke={1.6} />
                      </button>
                      <button
                        className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-white/70 transition active:bg-white/70 active:shadow-inner transform-gpu origin-center active:scale-95"
                        aria-label="Profile"
                      >
                        <IconUser size={18} stroke={1.6} />
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-x-5 bottom-14">
                    <h2 className="text-lg font-semibold leading-snug">
                      {banner.vendor?.general_info.name}
                      <span className="ml-2">›</span>
                    </h2>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-1">
        {banners.map((_, i) => {
          const isActive = i === currentIndex;
          return (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                isActive ? "w-5 bg-white" : "w-2.5 bg-white/60"
              }`}
            />
          );
        })}
      </div>
    </Carousel>
  );
}
