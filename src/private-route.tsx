import { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticationService from "./services/authentication-service";

const PrivateRoute: FunctionComponent = () => {
  return AuthenticationService.isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;