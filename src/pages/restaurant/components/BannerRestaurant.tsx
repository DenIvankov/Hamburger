import { Button } from "@/components/ui/button";
import {
  IconArrowNarrowLeft,
  IconDotsVertical,
  IconZoom,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

function BannerRestaurant({
  img,
  isOpen,
  statusText,
}: {
  img?: string;
  isOpen: boolean;
  statusText: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <img src={img} alt="Ресторан" className=" h-75  w-full object-cover" />
      <Button
        onClick={() => navigate("/")}
        className="absolute left-5 top-18 h-11 w-11  bg-stone-700  flex items-center justify-center rounded-full active:scale-95 transition"
      >
        <IconArrowNarrowLeft stroke={2} className="text-white size-11 " />
      </Button>
      <Button
        onClick={() => ""}
        className="absolute right-19 top-18 h-11 w-11  bg-stone-700  flex items-center justify-center rounded-full active:scale-95 transition"
      >
        <IconZoom stroke={2} className="text-white size-11 " />
      </Button>
      <Button
        onClick={() => ""}
        className="absolute right-5 top-18 h-11 w-11  bg-stone-700  flex items-center justify-center rounded-full active:scale-95 transition"
      >
        <IconDotsVertical stroke={2} className="text-white size-11 " />
      </Button>
      <div
        className={`absolute left-5 bottom-10 h-7 px-4 
   bg-stone-700/40
  backdrop-blur-sm flex items-center gap-2 
  rounded-full text-white shadow-xl`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isOpen ? "bg-green-400" : "bg-red-400"
          }`}
        />
        {statusText}
      </div>
    </div>
  );
}

export default BannerRestaurant;
