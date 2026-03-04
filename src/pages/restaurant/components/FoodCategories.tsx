import { useEffect, useRef } from "react";

type FoodCategoriesProps = {
  categories?: {
    data?: {
      data: { id: number; name: string }[];
      total: number;
    };
    status: number;
  } | null;
  selectedCategoryId: number | null;
};

function FoodCategories({
  categories,
  selectedCategoryId,
}: FoodCategoriesProps) {
  const categoryList =
    (categories?.data?.data as { id: number; name: string }[]) ?? [];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const scrollToCategory = (id: number) => {
    const el = document.querySelector(`[data-category-id="${id}"]`);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // автоскролл активной категории
  useEffect(() => {
    if (!selectedCategoryId) return;

    const button = buttonRefs.current[selectedCategoryId];

    if (button) {
      button.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedCategoryId]);

  return (
    <div className="mt-4 pt-1 pb-2">
      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {categoryList.map((category) => (
          <button
            key={category.id}
            ref={(el) => {
              buttonRefs.current[category.id] = el;
            }}
            onClick={() => scrollToCategory(category.id)}
            style={{
              fontSize: "16px",
              padding: "6px 14px",
              letterSpacing: "0.2px",
              fontWeight: "700",
            }}
            className={`snap-start flex-shrink-0 rounded-full
              transition-all duration-300 ease-out
              ${
                selectedCategoryId === category.id
                  ? "bg-gray-700 !text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FoodCategories;
