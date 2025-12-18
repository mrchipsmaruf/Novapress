import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full relative z-0 bg-white dark:bg-background-dark text-text-light dark:text-text-dark pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Left Navigation */}
          <div className="md:col-span-3 flex flex-col space-y-2 md:border-r border-gray-200 dark:border-gray-800 pr-8">
            <nav className="flex flex-col space-y-6">
              <Link className="text-2xl md:text-3xl font-bold hover:text-gray-600 dark:hover:text-gray-400 transition-colors block" to={"/"}>
                Home
              </Link>
              <Link className="text-2xl md:text-3xl font-bold hover:text-gray-600 dark:hover:text-gray-400 transition-colors block" to={"all-issues"}>
                All Issues
              </Link>
              <Link className="text-2xl md:text-3xl font-bold hover:text-gray-600 dark:hover:text-gray-400 transition-colors block" to={"about"}>
                Our Story
              </Link>
              <Link className="text-2xl md:text-3xl font-bold hover:text-gray-600 dark:hover:text-gray-400 transition-colors block" to={"contact"}>
                Contact
              </Link>
            </nav>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          {/* Middle & Right Sections */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">

            {/* Middle Section */}
            <div className="space-y-10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark mb-4">
                  Email
                </h4>
                <ul className="flex flex-col space-y-2">
                  <li>
                    <a className="text-lg decoration-1 underline-offset-4" href="#">
                      info@novapress.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark mb-4">
                  Office
                </h4>
                <address className="not-italic text-lg leading-relaxed">
                  <span className="font-medium">NovaPress HQ</span>
                  <br />
                  123 Infrastructure Road
                  <br />
                  Dhaka, Bangladesh
                </address>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark mb-4">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <a
                    className="text-lg decoration-1 underline-offset-4"
                    href="mailto:info@monolithestates.com">
                    Linked In
                  </a>
                  <a
                    className="text-lg  decoration-1 underline-offset-4"
                    href="mailto:info@monolithestates.com">
                    Instagram
                  </a>
                  <a
                    className="text-lg  decoration-1 underline-offset-4"
                    href="mailto:info@monolithestates.com">
                    Facebook
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="w-full dark:border-gray-700 flex items-center justify-center overflow-hidden py-0">
          <h1 className="logoText font-bold text-[245px] text-black dark:text-white text-center leading-none py-0">
            NOVAPRESS
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-light dark:text-muted-dark pt-6 border-t border-gray-300 dark:border-gray-800 mt-2">
          <p className="mb-2 md:mb-0">© 2025 Novapress All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
