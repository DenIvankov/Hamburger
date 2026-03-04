import { type Product, type ProductCategory } from "@/api/generated";
import DishCard from "./DishCard";
import DishDrawer from "@/pages/disheDrower/DishDrawer";
import { useEffect, useRef, useState } from "react";

type DishesProps = {
  categories?: {
    data?: {
      data: ProductCategory[];
      total: number;
    };
    status: number;
  } | null;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number) => void;
};

function Dishes({
  categories,

  setSelectedCategoryId,
}: DishesProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const categoryList = categories?.data?.data ?? [];

  const categoryRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-category-id"));

          if (entry.isIntersecting) {
            setSelectedCategoryId(id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
      },
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [setSelectedCategoryId]);

  return (
    <div className="mt-2 space-y-10 pr-4">
      {categoryList.map((category) => (
        <div
          key={category.id}
          ref={(el) => {
            categoryRefs.current[category.id] = el;
          }}
          data-category-id={category.id}
        >
          <h3 className="text-2xl font-bold tracking-normal mb-3">
            {category.name}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {category.products?.map((product) => (
              <DishCard
                key={product.id}
                product={product}
                onOpen={(product) => {
                  setSelectedProduct(product);
                  setOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      ))}
      {selectedProduct && (
        <DishDrawer product={selectedProduct} open={open} setOpen={setOpen} />
      )}
    </div>
  );
}

export default Dishes;
