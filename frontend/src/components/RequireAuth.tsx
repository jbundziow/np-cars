import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


type RequireAuthProps = {
    allowedRole: string
}
const RequireAuth = (props: RequireAuthProps) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        (auth?.userRole === props.allowedRole)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/auth/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;