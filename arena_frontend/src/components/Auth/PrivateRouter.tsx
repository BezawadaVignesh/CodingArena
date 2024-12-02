import Axios from "axios";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AlertContext } from "../common/AlertProvider";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const { token } = useAuth()!;
  const loc = useLocation();
  const alert = useContext(AlertContext);

  if (!token) {
    alert?.showAlert("You need to be loged in to view the page", "error");
    return <Navigate to={`/login?next=${loc.pathname}`} />;
  }
  Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return <Outlet />;
};

export default PrivateRoute;
