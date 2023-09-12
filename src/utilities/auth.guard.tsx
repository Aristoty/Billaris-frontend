import { Outlet, Navigate } from "react-router-dom";
import { AuthService } from "../components/Auth/auth.service";


const authService = new AuthService()


const AuthGuard = () => {
    const isAuthenticated = authService.isAuthenticated();
  
    return isAuthenticated ? <Outlet /> : <Navigate to={'/loginAlert'} />
}

export default AuthGuard