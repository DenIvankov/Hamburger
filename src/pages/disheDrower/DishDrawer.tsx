import type { Product } from "@/api/generated";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import DishImage from "./components/DishImage";
import DishDetails from "./components/DishDetails";
import DishExtras from "./components/DishExtras";
import DishAddToCart from "./components/DishAddToCart";
import { useState } from "react";

type Props = {
  product: Product;
  open: boolean;
  setOpen: (v: boolean) => void;
  categoryName: string;
};

function DishDrawer({ categoryName, product, open, setOpen }: Props) {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="rounded-t-[28px] max-h-[90vh]">
        <DrawerTitle className="sr-only">{product.name}</DrawerTitle>
        <DrawerDescription className="sr-only">
          Информация о блюде {product.name}
        </DrawerDescription>
        {/* drag handle */}
        <div className="flex justify-center py-2">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <div className="overflow-y-auto pb-32">
          <DishImage product={product} />

          <div className="px-4">
            <DishDetails product={product} />
            <DishExtras
              categoryName={categoryName}
              selected={selectedExtras}
              setSelected={setSelectedExtras}
            />
          </div>
        </div>

        <DishAddToCart product={product} selectedExtras={selectedExtras} />
      </DrawerContent>
    </Drawer>
  );
}

export default DishDrawer;
