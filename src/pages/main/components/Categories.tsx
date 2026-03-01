import burgerIcon from "@/assets/icons/categories/burger.webp";
import productsIcon from "@/assets/icons/categories/products.webp";
import adsIcon from "@/assets/icons/categories/ads.webp";
import cameraIcon from "@/assets/icons/categories/camera.webp";
import soonIcon from "@/assets/icons/categories/soon.webp";

const items = [
  { name: "Рестораны", icon: burgerIcon, size: "w-12 h-12" },
  { name: "Продукты", icon: productsIcon, size: "w-14 h-14" },
  { name: "Объявления", icon: adsIcon, size: "w-13 h-13" },
  { name: "Камеры", icon: cameraIcon, size: "w-10 h-10" },
  { name: "Скоро", icon: soonIcon, size: "w-14 h-14" },
];

export function Categories() {
  return (
    <div className="mt-4">
      <div className="flex justify-between gap-2">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center gap-2 min-w-[64px]"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={item.icon}
                alt={item.name}
                className={`
          ${item.size}
          object-contain
        `}
                loading="lazy"
              />
            </div>

            <span className="text-xs text-center whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
