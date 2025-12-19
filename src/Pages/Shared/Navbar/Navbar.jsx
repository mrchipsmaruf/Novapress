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
        setMobileMenuOpen(false);
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

    const navClass = ({ isActive }) =>
        `${scrolled ? "text-black" : "text-black"} hover:text-black/50 transition 
         ${isActive ? "text-black/50" : ""}`;

    const links = (
        <>
            <NavLink to="/" className={navClass} onClick={() => setMobileMenuOpen(false)}>
                Home
            </NavLink>

            <NavLink to="all-issues" className={navClass} onClick={() => setMobileMenuOpen(false)}>
                All Issues
            </NavLink>

            <NavLink to="about" className={navClass} onClick={() => setMobileMenuOpen(false)}>
                Our Story
            </NavLink>

            <NavLink to="contact" className={navClass} onClick={() => setMobileMenuOpen(false)}>
                Contact
            </NavLink>
        </>
    );

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/40 backdrop-blur-xl border-black"
                    : "bg-[#EBEBEB] border-white"
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-4 md:px-0">
                <div
                    className={`flex items-center justify-between py-3 border-b ${
                        scrolled ? "border-black/30" : "border-white/30"
                    }`}
                >
                    {/* Logo */}
                    <div className="text-black">
                        <Logo />
                    </div>

                    {/* Desktop + Tablet Links */}
                    <div className="hidden md:flex items-center gap-8 text-black">
                        {links}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative flex items-center gap-3">
                                {/* Dashboard */}
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `rounded-sm transition-colors duration-300 px-4 py-2 text-sm ${
                                            isActive
                                                ? "bg-black text-white"
                                                : scrolled
                                                ? "bg-black text-white"
                                                : "text-black bg-white hover:bg-black hover:text-white"
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>

                                {/* Profile */}
                                <button
                                    onClick={() =>
                                        setProfileDropdownOpen(!profileDropdownOpen)
                                    }
                                >
                                    <img
                                        src={user.photoURL || user.photo}
                                        className="h-9 w-9 rounded-full object-cover"
                                        alt="Profile"
                                    />
                                </button>

                                {/* Dropdown */}
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 top-14 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg z-50">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="text-sm font-semibold text-gray-800">
                                                {user.name || user.displayName}
                                            </p>
                                        </div>

                                        <NavLink
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </NavLink>

                                        <button
                                            onClick={handleLogOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`rounded-sm transition-colors duration-300 px-4 py-2 text-sm ${
                                    scrolled
                                        ? "bg-black text-white hover:bg-white hover:text-black"
                                        : "text-black bg-white hover:bg-black hover:text-white"
                                }`}
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="material-icons-outlined text-black text-3xl">
                                menu
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className={`md:hidden w-full shadow-xl px-6 py-6 ${
                        scrolled ? "bg-white text-black" : "bg-white text-black"
                    }`}
                >
                    <div className="flex flex-col space-y-4 text-lg">
                        {links}

                        {user ? (
                            <>
                                <NavLink
                                    to="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </NavLink>
                                <button
                                    onClick={handleLogOut}
                                    className="text-left text-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
