import { type ProductCategory } from "@/api/generated";
import DishCard from "./DishCard";

type DishesProps = {
  categories?: {
    data?: {
      data: ProductCategory[];
      total: number;
    };
    status: number;
  } | null;
  selectedCategoryId: number | null;
};

function Dishes({ categories, selectedCategoryId }: DishesProps) {
  const categoryList = categories?.data?.data ?? [];

  const selectedCategory = categoryList.find(
    (cat) => cat.id === selectedCategoryId,
  );
  const products = selectedCategory?.products ?? [];

  return (
    <div className="mt-4">
      <h3 className="text-2xl font-bold tracking-normal">
        {selectedCategory?.name || "Популярное"}
      </h3>
      <div className="grid grid-cols-2 gap-2 mt-3 pl-0 pr-4">
        {products.map((product) => (
          <DishCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Dishes;
