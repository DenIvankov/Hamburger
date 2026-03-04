type FoodCategoriesProps = {
  categories?: {
    data?: {
      data: { id: number; name: string }[];
      total: number;
    };
    status: number;
  } | null;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number) => void;
};

function FoodCategories({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: FoodCategoriesProps) {
  const categoryList =
    (categories?.data?.data as { id: number; name: string }[]) ?? [];

  return (
    <div className="">
      <div className="flex gap-2 mt-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {categoryList.map((category: { id: number; name: string }) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            style={{
              fontSize: "16px",
              padding: "6px 14px",
              letterSpacing: "0.2px",
              fontWeight: "700",
            }}
            className={`snap-start flex-shrink-0 rounded-full ${
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
