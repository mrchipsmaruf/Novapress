import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black py-12 border-t border-gray-200 dark:border-white/10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center">

        {/* Logo */}
        <div className="mb-4 md:mb-0">
          <span className="text-gray-900 dark:text-white font-display font-bold text-xl tracking-tighter logoText">
            NOVAPRESS
          </span>
          <p className="text-gray-500 text-sm mt-1">
            © 2025 Novapress Inc. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <a className="text-gray-500 hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-gray-500 hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-gray-500 hover:text-primary transition-colors" href="#">
            Support
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
