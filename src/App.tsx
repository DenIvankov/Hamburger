import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { Client } from "./features/auth/Client";
import MainPage from "./pages/main/MainPage";
import ProfilePage from "./pages/profile/ProfilePage";
import RestaurantPage from "./pages/restaurant/RestaurantPage";
import AuthRoute from "./routes/AuthRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />

        <Route element={<AuthRoute />}>
          <Route path="/auth" element={<Client />} />
        </Route>

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
