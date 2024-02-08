import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


type RequireAuthProps = {
    allowedRoles: string[]
}
const RequireAuth = (props: RequireAuthProps) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        (props.allowedRoles.includes(auth?.userRole))
            ? <Outlet />
            : auth?.userID
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/auth/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;