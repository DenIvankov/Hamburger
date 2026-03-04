import burgerIcon from "@/assets/icons/categories/burger.webp";
import productsIcon from "@/assets/icons/categories/products.webp";
import adsIcon from "@/assets/icons/categories/ads.webp";
import cameraIcon from "@/assets/icons/categories/camera.webp";

import { Button } from "@/components/ui/button";

const items = [
  { id: "restaurants", name: "Рестораны", icon: burgerIcon },
  { id: "products", name: "Продукты", icon: productsIcon },
  { id: "ads", name: "Объявления", icon: adsIcon },
  { id: "cameras", name: "Камеры", icon: cameraIcon },
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
    <div className="mt-4 ">
      <div className="flex gap-3 justify-center">
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
              shrink-0
              rounded-2xl
              transition-all
              hover:bg-muted
              active:scale-95
            "
          >
            <div className="w-21 h-21 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={item.icon}
                alt={item.name}
                className="w-16 h-16 object-contain"
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
