import {
  type BadRequestException,
  type vendorUserControllerFindByIdResponse,
} from "@/api/generated";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BannerRestaurant from "./components/BannerRestaurant";
import type { ErrorType } from "@/api/mutator/custom-instance";
import { getRestaurantStatus } from "./functions/getRestaurantStatus";

import RestaurantInfo from "./components/RestaurantInfo";
import FoodCategories from "./components/FoodCategories";
import { useRestaurantMenu } from "@/api/hooks/useRestaurantMenu";
import Dishes from "./components/Dishes";

type ScheduleItem = {
  open_time: string;
  close_time: string;
  day_numbers: number[];
};

function RestaurantPage() {
  const { id } = useParams<{ id: string }>();

  const vendorId = id ? Number(id) : 0;

  const { vendor, categories, isLoading, error } = useRestaurantMenu<
    vendorUserControllerFindByIdResponse,
    ErrorType<BadRequestException>
  >(vendorId, {});

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const categoryList =
      (categories?.data?.data as { id: number; name: string }[]) ?? [];
    if (categoryList.length > 0 && selectedCategoryId === null) {
      setSelectedCategoryId(categoryList[0].id);
    }
  }, [categories]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading restaurant</div>;

  const response = vendor?.status === 200 ? vendor.data : undefined;

  if (!response) return <div>Нет данных</div>;

  const schedule = response.schedule as ScheduleItem[] | undefined;
  const { isOpen, text } = getRestaurantStatus(schedule);

  const imageUrl = response.image?.url;

  return (
    <div>
      <div className="sticky top-0 z-10">
        <BannerRestaurant img={imageUrl} isOpen={isOpen} statusText={text} />
      </div>
      <div className="-mt-6  relative  items-center gap-3 rounded-[28px] bg-white z-25 p-4 pr-0 shadow-xl">
        <RestaurantInfo vendorId={vendorId} />
        <div className="sticky top-0 bg-transparent backdrop-blur-xl z-20 rounded-bl-xl">
          <FoodCategories
            categories={categories?.status === 200 ? categories : null}
            selectedCategoryId={selectedCategoryId}
          />
        </div>
        <Dishes
          categories={categories?.status === 200 ? categories : null}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>
    </div>
  );
}

export default RestaurantPage;
