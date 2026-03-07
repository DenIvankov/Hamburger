import { hamburgerStore } from "@/app/hamburgerStore";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const token = hamburgerStore((state) => state.accessToken);
  const isComfirm = hamburgerStore((state) => state.isComfirm);

  if (token && isComfirm) {
    return <Outlet />;
  }

  return <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
