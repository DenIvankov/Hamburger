import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/* ================= DATA ================= */

const cams = [
  {
    id: "panda",
    title: "🐼 Panda Live Cam",
    type: "youtube",
    url: "https://www.youtube.com/embed/yfSyjwY6zSQ",
    thumbnail: "https://img.youtube.com/vi/yfSyjwY6zSQ/hqdefault.jpg",
  },
  {
    id: "gorilla",
    title: "🦍 Gorilla Live Cam",
    type: "youtube",
    url: "https://www.youtube.com/embed/3szkFHfr6sA",
    thumbnail: "https://img.youtube.com/vi/3szkFHfr6sA/hqdefault.jpg",
  },
  {
    id: "namibia",
    title: "🦓 Namibia Desert Live",
    type: "youtube",
    url: "https://www.youtube.com/embed/ydYDqZQpim8",
    thumbnail: "https://img.youtube.com/vi/ydYDqZQpim8/hqdefault.jpg",
  },
];

/* ================= COMPONENT ================= */

export default function Cameras() {
  const [activeCam, setActiveCam] = useState<(typeof cams)[0] | null>(null);

  return (
    <section>
      <div className="rounded-[28px] bg-white p-4 mt-3 shadow-sm">
        <p className="text-md text-gray-500 font-semibold opacity-80">Камеры</p>
        <h2 className="text-2xl font-bold mb-4">Live Wildlife</h2>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4">
            {cams.map((cam) => (
              <button
                key={cam.id}
                onClick={() => setActiveCam(cam)}
                className="min-w-[260px] text-left"
              >
                <div className="rounded-2xl bg-gray-200 h-[150px] overflow-hidden">
                  <img
                    src={cam.thumbnail}
                    className="w-full h-full object-cover"
                    alt={cam.title}
                  />
                </div>
                <p className="mt-2 font-semibold">{cam.title}</p>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {activeCam && (
        <>
          <div
            onClick={() => setActiveCam(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-xl">
              <div className="bg-black w-full h-[250px] sm:h-[500px]">
                {activeCam.type === "youtube" && (
                  <iframe
                    src={`${activeCam.url}?autoplay=1&mute=1`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="p-4 flex justify-between bg-black items-center">
                <h3 className="font-bold text-lg text-white">
                  {activeCam.title}
                </h3>
                <button
                  onClick={() => setActiveCam(null)}
                  className="px-6 py-2 bg-black !text-white rounded-xl"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
