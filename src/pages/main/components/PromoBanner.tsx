import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
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

/* ================= UTILS ================= */

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const isVideoType = (type?: string | null) => {
  const mediaType = type?.toLowerCase();
  return mediaType === "video" || mediaType === "mp4" || mediaType === "webm";
};

/* ================= FALLBACK ================= */

const BannerFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
    <div className="text-center text-gray-600">
      <div className="text-lg font-semibold">Реклама</div>
      <div className="text-sm opacity-70">Баннер временно недоступен</div>
    </div>
  </div>
);

/* ================= COMPONENT ================= */

export function PromoBanner() {
  const navigate = useNavigate();
  const { data, isLoading } = useAdsCustomerControllerGetHeroBanners();

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollProgress = useRef(0);
  const [, forceUpdate] = useState({});

  const [failedMedia, setFailedMedia] = useState<Record<number, boolean>>({});

  /* ================= SCROLL ENGINE ================= */

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const raw = clamp(window.scrollY / 420, 0, 1);
      scrollProgress.current = easeOutCubic(raw);
      forceUpdate({});
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= SCROLL EFFECT VALUES ================= */

  const blurValue = scrollProgress.current * 6;
  const scaleValue = 1 + scrollProgress.current * 0.08;
  const overlayOpacity = scrollProgress.current * 0.5;
  const vignetteOpacity = scrollProgress.current * 0.8;
  const contentTranslate = scrollProgress.current * -10;
  const headerTranslate = scrollProgress.current * -5;

  /* ================= DATA ================= */

  const banners = useMemo<AdsHeroBanner[]>(() => {
    const bannersData = data?.data as unknown;

    const normalized = Array.isArray(bannersData)
      ? bannersData
      : bannersData
        ? [bannersData]
        : [];

    return (normalized as AdsHeroBanner[]).filter(
      (banner) => banner.media?.url,
    );
  }, [data?.data]);

  /* ================= VIDEO CONTROL ================= */

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
      currentVideo.play().catch(() => {});
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

  /* ================= LOADING ================= */

  if (isLoading) {
    return <div className="h-72 bg-gray-200 rounded-lg" />;
  }

  if (banners.length === 0) {
    return (
      <div className="relative w-full h-[70vh] max-h-[460px] min-h-[360px] overflow-hidden">
        <BannerFallback />
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <Carousel
      className="relative w-full z-0"
      opts={{ align: "center", loop: true }}
      setApi={setApi}
    >
      {/* Убрали отступы */}
      <CarouselContent className="ml-0">
        {banners.map((banner, index) => {
          const isVideo = isVideoType(banner.media?.type);
          const hasError = failedMedia[index] || !banner.media?.url;

          return (
            <CarouselItem key={banner.id || index} className="pl-0 basis-full">
              <div className="relative h-[70vh] max-h-[460px] min-h-[360px] w-full overflow-hidden text-white">
                {/* MEDIA */}

                {hasError ? (
                  <BannerFallback />
                ) : isVideo ? (
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
                    onError={() =>
                      setFailedMedia((p) => ({ ...p, [index]: true }))
                    }
                    style={{
                      filter: `blur(${blurValue}px)`,
                      transform: `scale(${scaleValue})`,
                      transition:
                        "filter 0.25s cubic-bezier(.22,.61,.36,1), transform 0.25s cubic-bezier(.22,.61,.36,1)",
                      willChange: "transform, filter",
                    }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                ) : (
                  <img
                    src={banner.media.url}
                    alt={banner.title}
                    loading="lazy"
                    decoding="async"
                    onError={() =>
                      setFailedMedia((p) => ({ ...p, [index]: true }))
                    }
                    style={{
                      filter: `blur(${blurValue}px)`,
                      transform: `scale(${scaleValue})`,
                      transition:
                        "filter 0.25s cubic-bezier(.22,.61,.36,1), transform 0.25s cubic-bezier(.22,.61,.36,1)",
                      willChange: "transform, filter",
                    }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                )}

                {/* OVERLAY */}

                <div
                  className="absolute inset-0 bg-black pointer-events-none"
                  style={{
                    opacity: overlayOpacity,
                    transition: "opacity 0.25s ease-out",
                  }}
                />

                {/* VIGNETTE */}

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)",
                    opacity: vignetteOpacity,
                    transition: "opacity 0.3s ease-out",
                  }}
                />

                {/* HEADER */}

                <div
                  className="absolute inset-x-0 top-0 z-20"
                  style={{
                    transform: `translateY(${headerTranslate}px)`,
                    transition: "transform 0.25s ease-out",
                  }}
                >
                  <div className="backdrop-blur-md border-b border-white/20 pt-[env(safe-area-inset-top)] bg-white/5">
                    <div className="mx-auto flex max-w-[420px] items-center justify-between px-4">
                      <div className="px-4 py-3 text-sm text-white/90">
                        Южно-Сахалинск
                        <br />
                        проспект Гагарина, 12
                      </div>

                      <div className="flex items-center gap-3 py-2">
                        <button className="grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-md border border-white/80 active:scale-95 transition">
                          <IconBell
                            size={18}
                            stroke={1.6}
                            className="text-black"
                          />
                        </button>

                        <button
                          onClick={() => navigate("/profile")}
                          className="grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-md border border-white/80 active:scale-95 transition"
                        >
                          <IconUser
                            size={18}
                            stroke={1.6}
                            className="text-black"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}

                <div
                  className="relative z-10 h-full px-5 pb-8 pt-24"
                  style={{
                    transform: `translateY(${contentTranslate}px)`,
                    transition: "transform 0.25s ease-out",
                  }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/60 px-3 py-1 text-xs backdrop-blur-md bg-white/10">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/70 text-[10px]">
                      i
                    </span>
                    Реклама
                  </div>

                  <div className="absolute inset-x-5 bottom-14">
                    <h2 className="text-lg font-semibold leading-snug drop-shadow-md">
                      {banner.vendor?.general_info?.name}
                      <span className="ml-2">›</span>
                    </h2>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* DOTS */}

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-1">
        {banners.map((_, i) => {
          const active = i === currentIndex;
          return (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active ? "w-6 bg-white" : "w-2.5 bg-white/60"
              }`}
            />
          );
        })}
      </div>
    </Carousel>
  );
}
