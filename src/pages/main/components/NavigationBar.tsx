import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconHome,
  IconTruckDelivery,
  IconHeart,
  IconShoppingCart,
} from "@tabler/icons-react";

const tabs = [
  { id: "home", label: "Главная", icon: IconHome },
  { id: "delivery", label: "Доставка", icon: IconTruckDelivery },
  { id: "favorites", label: "Избранное", icon: IconHeart },
  { id: "cart", label: "Корзина", icon: IconShoppingCart },
];

export default function NavigationBar() {
  const [active, setActive] = useState("home");

  return (
    <div className="fixed left-0 right-0 bottom-[calc(16px+env(safe-area-inset-bottom))]  flex justify-center z-50">
      <div className="relative bg-white shadow-lg rounded-full px-1 py-1   flex gap-0 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex flex-col px-3 py-2  items-center justify-center text-xs font-medium
             ${isActive ? "bg-gray-100 rounded-[30px]" : "bg-transparent"}
              focus:outline-none `}
            >
              {isActive && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 -z-10 bg-gray-100 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <Icon
                size={22}
                stroke={1.8}
                className={`transition-colors ${
                  isActive ? "text-black " : "text-gray-400"
                }`}
              />

              <span
                className={`mt-1 text-sm ${isActive ? "text-black font-semibold" : "text-gray-400"}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
