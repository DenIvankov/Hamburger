import "./App.css";
import { Client } from "./features/auth/Client";
import RestaurantPage from "./pages/restaurant/RestaurantPage";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
