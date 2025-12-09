import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let links = <>
        <NavLink to={"/"} className={`${scrolled ? "text-white" : "text-black"} hover:text-yellow-400 transition`}>Home</NavLink>
        <NavLink to={"all-issues"} className={`${scrolled ? "text-white" : "text-black"} hover:text-yellow-400 transition`}>All Issues</NavLink>
        <NavLink to={"about"} className={`${scrolled ? "text-white" : "text-black"} hover:text-yellow-400 transition`}>Our Story</NavLink>
        <NavLink to={"contact"} className={`${scrolled ? "text-white" : "text-black"} hover:text-yellow-400 transition`}>Contact</NavLink>
    </>

    return (
        <nav
            className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-300
                ${scrolled ? "backdrop-blur-xl bg-black/30 shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center justify-between py-5 border-b border-black/30">

                    {/* Logo */}
                    <div className="text-yellow-400">
                        <Logo />
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8 text-black">
                        {links}
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AX..."
                                className="h-9 w-9 rounded-full border object-cover" />
                        </button>

                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg z-50">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="text-xs text-gray-500">Signed in as</p>
                                    <p className="text-sm font-semibold text-gray-800">User Name</p>
                                </div>

                                <NavLink
                                    to="/dashboard"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Dashboard
                                </NavLink>

                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            <span className="material-icons-outlined text-white text-3xl">menu</span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden w-full bg-transparent text-white shadow-xl px-6 py-4">
                    <div className="flex flex-col space-y-4">
                        {links}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
