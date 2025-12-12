import { Navigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import { useEffect, useState } from "react";
import axiosSecure from "../Services/axiosSecure";

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/users/${user.email}`)
            .then(res => {
                setIsAdmin(res.data?.role === "admin");
            })
            .catch(() => {
                setIsAdmin(false);
            });

    }, [user]);

    if (loading || isAdmin === null) {
        return <div className="text-center text-xl">Checking permissions...</div>;
    }

    if (!isAdmin) return <Navigate to="/" />;

    return children;
};

export default AdminRoute;
