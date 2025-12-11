import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UseAuth from '../Hooks/UseAuth';
import Logo from '../Components/Logo/Logo';
import Loading from '../Components/Loading/Loading';

const DashboardLayout = () => {
    const { signOutUser } = UseAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className="drawer lg:drawer-open bg-base-300">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Main content */}
            <div className="drawer-content p-3">

                {/* Navbar */}
                <nav className="navbar w-full">
                    <div className="px-4 font-semibold">Citizen Dashboard</div>
                </nav>

                {/* Main page content */}
                <div className="p-4 bg-white rounded-[7px]">
                    <Outlet />
                </div>

            </div>

            {/* Sidebar */}
            <div className="drawer-side p-3 ">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu p-4 w-44 rounded-[7px] bg-white min-h-full">

                    {/* Website Logo + Name */}
                    <div className="flex items-center gap-3 mb-6">
                        <Logo />
                    </div>

                    <li>
                        <NavLink to="/">
                            Homepage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/add-issue">
                            Submit Issue
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/my-issues">
                            My Issues
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/profile">
                            Profile
                        </NavLink>
                    </li>

                    <li>
                        <button onClick={signOutUser} className="text-red-600">
                            Logout
                        </button>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default DashboardLayout;
