import "./App.css";
import { Client } from "./features/auth/Client";
import RestaurantPage from "./pages/restaurant/RestaurantPage";
import { BrowserRouter, Route, Routes } from "react-router";

import ProtectedRoute from "./routes/ProtectedRoute";
import MainPage from "./pages/main/MainPage";
import AuthRoute from "./routes/AuthRoute";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Маршруты для неавторизованных или с неподтверждённым токеном */}
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Client />} />
        </Route>

        {/* Защищённые маршруты — только для авторизованных с подтверждённым токеном */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/main" element={<MainPage />} />

        <Route path="/restaurant/:id" element={<RestaurantPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
