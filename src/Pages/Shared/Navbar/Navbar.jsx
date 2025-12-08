import { useState } from "react";
import { NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";

const Navbar = () => {

    let links = <>
        <NavLink>Home</NavLink>
        <NavLink>All Issues</NavLink>
        <NavLink>About</NavLink>
        <NavLink>Contact</NavLink>
    </>

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const isLoggedIn = true; // you can replace with auth state

    return (
        <nav className="w-full max-w-[1400px] px-6 lg:px-12 relative z-50 mx-auto">
            <div className="flex items-center justify-between py-5 border-b border-border-light dark:border-border-dark">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Logo></Logo>
                </div>

                {/* Desktop Menu */}
                <div>
                    {links}
                </div>
                {/* Right Buttons */}


                {/* Profile */}
                <div className="relative">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center focus:outline-none">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8vXh-Hlo0LWJA050oHOVtBD5vbpu5IW2gwfTW8WR9WnvLPDo15cjuuvXAWEH35iMg-sc0utEslBEsCpzLWeVCFkvSJSpJXxGuOTrUSLPARwwBu_kbcMZmU467kx6hjbCAkfJl1Gc9Rxxuvf_DJ5lH6--cNsiWj3aiXsKW_rkc60nNGHwOo6AX0Q2886HsYCtVa6-YKOYLo2acodb278_7QySTH6eg1a348k-ZP3an89REaP-qnOPEDKtdpUE3y49Z6J9pwDahTw"
                                    alt="User profile"
                                    className="h-9 w-9 rounded-full object-cover border hover:opacity-90 transition-opacity" />
                            </button>

                            {profileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1">
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Tom Cook</p>
                                        </div>

                                        <a className="block px-4 py-2 text-sm flex items-center hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
                                            <span className="material-icons-outlined text-sm mr-2">dashboard</span>
                                            Dashboard
                                        </a>

                                        <a className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center" href="#">
                                            <span className="material-icons-outlined text-sm mr-2">logout</span>
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <a
                            href="#"
                            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-5 py-2.5 rounded uppercase tracking-wider">
                            Buy Template
                        </a>
                    )}
                </div>

                {/* Mobile Burger */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-text-light dark:text-text-dark hover:text-gray-600 dark:hover:text-gray-300">
                        <span className="material-icons-outlined text-2xl">menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 z-40 px-6 py-4">
                    <div className="flex flex-col space-y-4">
                        {links}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
