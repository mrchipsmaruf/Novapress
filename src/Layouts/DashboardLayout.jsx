import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import useRole from "../Hooks/useRole";
import { FaHome } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { MdAddToPhotos } from "react-icons/md";
import { MdOutlineSyncProblem } from "react-icons/md";
import { MdAssignmentLate } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdManageSearch } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const activeClass =
    "bg-black/50 text-white font-semibold rounded-lg";
const inactiveClass =
    "hover:bg-gray-100 rounded-lg";

const DashboardLayout = () => {
    const { signOutUser } = UseAuth();
    const { role } = useRole();

    const citizenMenu = (
        <>
            <li>
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                >
                    <ImStatsBars /> Statistics
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/add-issue"
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                >
                    <MdAddToPhotos /> Submit Issue
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/my-issues"
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                >
                    <MdOutlineSyncProblem /> My Issues
                </NavLink>
            </li>
        </>
    );

    const staffMenu = (
        <>
            <li>
                <NavLink
                    to="/dashboard/staff-dashboard"
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                >
                    <ImStatsBars /> Staff Statistics
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/assigned-issues"
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                >
                    <MdAssignmentLate /> Assigned Issues
                </NavLink>
            </li>
        </>
    );

    const adminMenu = (
        <>
            <li>
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                >
                    <ImStatsBars /> Admin Statistics
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                >
                    <FaUsers /> Manage Users
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/manage-issues"
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                >
                    <MdManageSearch /> Manage Issues
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
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-primary drawer-button lg:hidden"
                    >
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
                    <Link to="/" className="text-3xl logoText font-bold mb-6 pl-2">
                        NOVAPRESS
                    </Link>

                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? activeClass : inactiveClass
                            }
                        >
                            <FaHome /> Homepage
                        </NavLink>
                    </li>

                    {role === "admin" && adminMenu}
                    {role === "staff" && staffMenu}
                    {role === "citizen" && citizenMenu}

                    <li>
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) =>
                                isActive ? activeClass : inactiveClass
                            }
                        >
                            <FaUser /> Profile
                        </NavLink>
                    </li>

                    <li>
                        <button onClick={signOutUser} className="text-red-600">
                            <IoLogOut /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
