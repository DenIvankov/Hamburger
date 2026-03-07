import { hamburgerStore } from "@/app/hamburgerStore";
import { Navigate, Outlet } from "react-router";

function AuthRoute() {
  const token = hamburgerStore((state) => state.accessToken);
  const isComfirm = hamburgerStore((state) => state.isComfirm);

  // Если токен есть и подтверждён — редирект на /main
  if (token && isComfirm) {
    return <Navigate to="/main" replace />;
  }

  // Если токен есть, но не подтверждён — остаёмся на странице ввода кода (Outlet)
  // Если токена нет — остаёмся на странице ввода телефона (Outlet)
  return <Outlet />;
}

export default AuthRoute;
