import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import Loading from "../Components/Loading/Loading";
import useRole from "../Hooks/useRole";

import {
    Home,
    FilePlus,
    ListTodo,
    User,
    LogOut,
    BarChart3,
    Users,
    ClipboardList,
} from "lucide-react";

const DashboardLayout = () => {
    const { signOutUser } = UseAuth();
    const [role, roleLoading] = useRole();
    const [loading, setLoading] = useState(true);

    // fake loading animation (you already had this)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (loading || roleLoading) {
        return <Loading />;
    }

    // ------- SIDEBAR MENUS BY ROLE -------
    const userMenu = (
        <>
            <li>
                <NavLink to="/dashboard/add-issue">
                    <FilePlus size={18} /> Submit Issue
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-issues">
                    <ListTodo size={18} /> My Issues
                </NavLink>
            </li>
        </>
    );

    const staffMenu = (
        <>
            <li>
                <NavLink to="/dashboard/staff-dashboard">
                    <Home size={18} /> Staff Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/assigned-issues">
                    <ClipboardList size={18} /> Assigned Issues
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/staff-stats">
                    <BarChart3 size={18} /> My Stats
                </NavLink>
            </li>
        </>
    );

    const adminMenu = (
        <>
            <li>
                <NavLink to="/dashboard/admin-dashboard">
                    <Home size={18} /> Admin Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-users">
                    <Users size={18} /> Manage Users
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-issues">
                    <ClipboardList size={18} /> Manage Issues
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/admin-statistics">
                    <BarChart3 size={18} /> Admin Statistics
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="drawer lg:drawer-open bg-base-300">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Page content */}
            <div className="drawer-content p-3">
                <nav className="navbar w-full">
                    <div className="px-4 text-2xl font-semibold">
                        {role === "admin"
                            ? "Admin Dashboard"
                            : role === "staff"
                                ? "Staff Dashboard"
                                : "Citizen Dashboard"}
                    </div>

                    {/* Mobile button */}
                    <label
                        htmlFor="my-drawer-4"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
                        Menu
                    </label>
                </nav>

                <div className="p-4 bg-white rounded-[7px]">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side p-3">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <ul className="menu text-lg p-4 w-72 rounded-[7px] bg-white min-h-full">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex justify-start pl-4 logoText text-3xl mb-6 font-bold"
                    >
                        NOVAPRESS
                    </Link>

                    {/* Common to all */}
                    <li>
                        <NavLink to="/">
                            <Home size={18} /> Homepage
                        </NavLink>
                    </li>

                    {/* ROLE-BASED MENUS */}
                    {role === "admin" && adminMenu}
                    {role === "staff" && staffMenu}
                    {role === "user" && userMenu}

                    {/* Statistics (optional) */}
                    <li>
                        <NavLink to="/dashboard/statistics">
                            <BarChart3 size={18} /> Statistics
                        </NavLink>
                    </li>

                    {/* Profile */}
                    <li>
                        <NavLink to="/dashboard/profile">
                            <User size={18} /> Profile
                        </NavLink>
                    </li>

                    {/* Logout */}
                    <li>
                        <button onClick={signOutUser} className="text-red-600">
                            <LogOut size={18} /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
