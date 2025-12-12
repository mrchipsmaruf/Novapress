import React from "react";
import { Navigate } from "react-router-dom";
import useStaff from "../Hooks/useStaff";
import UseAuth from "../Hooks/UseAuth";

const StaffRoute = ({ children }) => {
    const { loading: authLoading } = UseAuth();
    const [isStaff, staffLoading] = useStaff();

    if (authLoading || staffLoading) {
        return <div className="text-center p-6 text-xl">Checking staff access...</div>;
    }

    if (!isStaff) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default StaffRoute;
