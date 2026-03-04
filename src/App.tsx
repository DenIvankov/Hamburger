import "./App.css";
import DishDetails from "./pages/dishe/DishDetails";
import MainPage from "./pages/main/MainPage";
import RestaurantPage from "./pages/restaurant/RestaurantPage";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
