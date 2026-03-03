import Banner from "./components/Banner";
import Cameras from "./components/Cameras";
import { Categories } from "./components/Categories";
import NavigationBar from "./components/NavigationBar";
import PopularDishes from "./components/PopularDishes";
import { PromoBanner } from "./components/PromoBanner";
import { RestaurantsSection } from "./components/RestaurantsSection";

import Sale from "./components/Sale";
import { SearchBlock } from "./components/SearchBlock";
import "tailwindcss";
function MainPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-[calc(100px+env(safe-area-inset-bottom))]">
      {/* HERO */}
      <div className="sticky top-0 z-10">
        <PromoBanner />
      </div>

      {/* CONTENT */}
      <div className="-mt-6 relative z-20">
        <div className="rounded-t-[28px] bg-gray-200">
          <div className="rounded-[28px] bg-white p-4 shadow-sm">
            <SearchBlock />
            <Categories />
          </div>

          <RestaurantsSection />
          <Banner />
          <Sale />
          <PopularDishes />
          <Cameras />
          <NavigationBar />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
