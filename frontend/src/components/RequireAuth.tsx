import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";

type RequireAuthProps = {
    allowedRoles: string[]
}
const RequireAuth = (props: RequireAuthProps) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    //JWT token expired
    if(!Cookies.get('userID') || !Cookies.get('userRole')) {
        setAuth({})
    }

    

    return (
        (props.allowedRoles.includes(auth?.userRole))
            ? <Outlet />
            : auth?.userID
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/auth/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;