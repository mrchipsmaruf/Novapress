import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
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
    const { role } = useRole();

    const citizenMenu = (
        <>
            <li>
                <NavLink to="/dashboard">
                    <BarChart3 size={18} /> Statistics
                </NavLink>
            </li>
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
                    <BarChart3 size={18} /> Staff Statistics
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/assigned-issues">
                    <ClipboardList size={18} /> Assigned Issues
                </NavLink>
            </li>
        </>
    );

    const adminMenu = (
        <>
            <li>
                <NavLink to="/dashboard">
                    <BarChart3 size={18} /> Admin Statistics
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
        </>
    );

    return (
        <div className="drawer lg:drawer-open bg-base-300">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* CONTENT */}
            <div className="drawer-content p-3">
                <nav className="navbar bg-white rounded-lg mb-3">
                    <div className="flex-1 px-4 text-2xl font-semibold">
                        {role === "admin"
                            ? "Admin Dashboard"
                            : role === "staff"
                                ? "Staff Dashboard"
                                : "Citizen Dashboard"}
                    </div>
                    <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">
                        Menu
                    </label>
                </nav>

                <div className="p-4 bg-white rounded-lg min-h-[80vh]">
                    <Outlet />
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side p-3">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <ul className="menu p-4 w-72 bg-white rounded-lg min-h-full text-lg">
                    <Link to="/" className="text-3xl font-bold mb-6 pl-2">
                        NOVAPRESS
                    </Link>

                    <li>
                        <NavLink to="/">
                            <Home size={18} /> Homepage
                        </NavLink>
                    </li>

                    {role === "admin" && adminMenu}
                    {role === "staff" && staffMenu}
                    {role === "citizen" && citizenMenu}

                    <li>
                        <NavLink to="/dashboard/profile">
                            <User size={18} /> Profile
                        </NavLink>
                    </li>

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
