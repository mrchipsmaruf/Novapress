import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import UseAuth from "../../../Hooks/UseAuth";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { user, signOutUser } = UseAuth();

    useEffect(() => {
        setProfileDropdownOpen(false);
    }, [user]);

    const handleLogOut = () => {
        signOutUser()
            .then(() => console.log("Logged out successfully"))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = (
        <>
            <NavLink
                to="/"
                className={`${scrolled ? "text-black" : "text-white"} hover:text-yellow-400 transition`}>
                Home
            </NavLink>
            <NavLink
                to="all-issues"
                className={`${scrolled ? "text-black" : "text-white"} hover:text-yellow-400 transition`}>
                All Issues
            </NavLink>
            <NavLink
                to="about"
                className={`${scrolled ? "text-black" : "text-white"} hover:text-yellow-400 transition`}>
                Our Story
            </NavLink>
            <NavLink
                to="contact"
                className={`${scrolled ? "text-black" : "text-white"} hover:text-yellow-400 transition`}>
                Contact
            </NavLink>
        </>
    );

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/40 backdrop-blur-xl border-black" : "bg-transparent border-white"
                }`}>
            <div className="max-w-[1400px] mx-auto">
                <div
                    className={`flex items-center justify-between py-5 border-b ${scrolled ? "border-black/30" : "border-white/30"
                        }`}>
                    {/* Logo */}
                    <div className="text-yellow-400">
                        <Logo />
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8 text-black">{links}</div>

                    {/* Profile + Login/logout */}
                    <div className="flex items-center gap-5">
                        {user ? (
                            <div className="relative flex items-center gap-3">

                                {/* dashboard */}
                                <NavLink
                                    to="/dashboard"
                                    className={`btn transition-colors duration-300 btn-outline px-4 py-2 text-sm hover:text-black hover:bg-white ${scrolled ? "bg-white/40 text-black" : "bg-transparent text-white"}`}>
                                    Dashboard
                                </NavLink>


                                {/* Profile Image */}
                                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                                    <img
                                        src={user.photoURL || user.photo}
                                        className="h-9 w-9 rounded-full object-cover"
                                        alt="Profile" />
                                </button>

                                {/* Dropdown */}
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-40 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg z-50">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="text-sm font-semibold text-gray-800">
                                                {user.name || user.displayName}
                                            </p>
                                        </div>

                                        <NavLink
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Dashboard
                                        </NavLink>

                                        <button
                                            onClick={handleLogOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`btn btn-outline ${scrolled ? "text-black" : "text-white hover:text-black"}`}>
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                <span className="material-icons-outlined text-white text-3xl">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className={`lg:hidden w-full shadow-xl px-6 py-4 ${scrolled ? "bg-white text-black" : "bg-black/40 text-white"
                        }`}>
                    <div className="flex flex-col space-y-4">{links}</div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
