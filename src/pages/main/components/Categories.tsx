import burgerIcon from "@/assets/icons/categories/burger.webp";
import productsIcon from "@/assets/icons/categories/products.webp";
import adsIcon from "@/assets/icons/categories/ads.webp";
import cameraIcon from "@/assets/icons/categories/camera.webp";
import soonIcon from "@/assets/icons/categories/soon.webp";
import { Button } from "@/components/ui/button";

const items = [
  { id: "restaurants", name: "Рестораны", icon: burgerIcon, size: "w-12 h-12" },
  { id: "products", name: "Продукты", icon: productsIcon, size: "w-14 h-14" },
  { id: "ads", name: "Объявления", icon: adsIcon, size: "w-13 h-13" },
  { id: "cameras", name: "Камеры", icon: cameraIcon, size: "w-10 h-10" },
  { id: "soon", name: "Скоро", icon: soonIcon, size: "w-14 h-14" },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const yOffset = -80; // компенсация sticky баннера
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

export function Categories() {
  return (
    <div className="mt-4">
      <div className="flex justify-between gap-0">
        {items.map((item) => (
          <Button
            onClick={() => scrollToSection(item.id)}
            variant="ghost"
            key={item.name}
            className="
              flex flex-col items-center gap-2
              h-auto
              px-0 py-3
              min-w-[72px]
              rounded-2xl
              transition-all
              hover:bg-muted
              active:scale-95
            "
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
          </Button>
        ))}
      </div>
    </div>
  );
}
