import Banner from "./components/Banner";
import { Categories } from "./components/Categories";
import PopularDishes from "./components/PopularDishes";
import { PromoBanner } from "./components/PromoBanner";
import { RestaurantsSection } from "./components/RestaurantsSection";
import { RestaurantsSectioncopy } from "./components/RestaurantsSectioncopy";
import Sale from "./components/Sale";
import { SearchBlock } from "./components/SearchBlock";
import "tailwindcss";
function MainPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full">
        <PromoBanner />
        <div className="-mt-6 px-0 relative z-20">
          <div className="rounded-[28px] bg-white p-4 shadow-sm">
            <SearchBlock />
            <Categories />
          </div>
        </div>

        <RestaurantsSection />
        <Banner />
        <Sale />
        <PopularDishes />
        <RestaurantsSectioncopy />
      </div>
    </div>
  );
}

export default MainPage;
