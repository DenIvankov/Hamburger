import {
  type BadRequestException,
  type vendorUserControllerFindByIdResponse,
} from "@/api/generated";
import { useRestaurantMenu } from "@/api/hooks/useRestaurantMenu";
import type { ErrorType } from "@/api/mutator/custom-instance";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { getReviewWord } from "@/pages/restaurant/functions/getReviewWord";
import { IconHeart } from "@tabler/icons-react";

function RestaurantInfo({ vendorId }: { vendorId: number }) {
  const { vendor, isLoading, error } = useRestaurantMenu<
    vendorUserControllerFindByIdResponse,
    ErrorType<BadRequestException>
  >(vendorId, {});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading restaurant</div>;

  const response = vendor?.status === 200 ? vendor.data : undefined;

  if (!response) return <div>Нет данных</div>;
  const logoUrl = response.logo?.url;
  const rating = response.rating ?? 0;
  const reviewsCount = response.reviews?.length ?? 0;
  const restaurantName = response.general_info?.name;

  return (
    <div className="h-full w-full rounded-[28px] bg-white z-25 pr-5">
      <div className="flex flex-row items-center gap-2">
        <div>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              className="h-14 w-14 rounded-[20px] shadow-md"
            />
          ) : (
            <div className="h-15 w-15 rounded-[20px] bg-stone-200 flex items-center justify-center">
              <span className="text-xl text-stone-400">🍔</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold tracking-wide">{restaurantName}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Rating value={rating} />
            <span className="text-gray-900 font-medium">{rating}</span>
            <span className="mx-1">·</span>
            <span className=" text-gray-400">
              {`${reviewsCount} ${getReviewWord(reviewsCount)}`}
            </span>
          </div>
        </div>
        <div className="flex flex justify-end">
          <Button
            onClick={() => ""}
            className="h-12 w-12 bg-gray-100 flex items-center justify-center rounded-full active:scale-95 transition active:bg-gray-200"
          >
            <IconHeart stroke={2} className="text-black size-12" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantInfo;
