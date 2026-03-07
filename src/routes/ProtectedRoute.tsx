import { hamburgerStore } from "@/app/hamburgerStore";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const token = hamburgerStore((state) => state.accessToken);
  const isComfirm = hamburgerStore((state) => state.isComfirm);

  // Если токен есть и подтверждён — показываем защищённый маршрут
  if (token && isComfirm) {
    return <Outlet />;
  }

  // Иначе редирект на страницу аутентификации
  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
