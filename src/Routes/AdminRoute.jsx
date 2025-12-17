import { Navigate } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading/Loading";

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) return <Loading />;

    if (user && role === "admin") {
        return children;
    }

    return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
