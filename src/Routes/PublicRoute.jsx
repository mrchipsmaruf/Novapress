import { Navigate } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const PublicRoute = ({ children }) => {
    const { user } = UseAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
