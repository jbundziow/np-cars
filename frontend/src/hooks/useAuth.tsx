import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = (): any => {
    return useContext(AuthContext);
}

export default useAuth;