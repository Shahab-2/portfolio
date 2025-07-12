'use client';
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link"; // Changed to Next.js Link
import { LucideLink } from "lucide-react"; // If you need the Lucide Link icon specifically

export const SidebarMenu = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [cursorVariant, setCursorVariant] = useState("default"); // Added missing state
  const [downloadAnimation, setDownloadAnimation] = useState(false); // Added missing state
  
  const leaveHover = () => {
    setCursorVariant("default");
    setDownloadAnimation(false);
  };

  const enterButton = () => setCursorVariant("button");
  
  // Enhanced animation variants
  const buttonVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: {
      scale: 1.05,
      opacity: 1,
      boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };
  

  
  // Enhanced Navigation Button with hover animation
  const NavButton = ({ href, icon, className = "", activeClassName = "" }) => (
    <motion.div
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={enterButton}
      onMouseLeave={leaveHover}
    >
      <Link
        href={href}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-sm group ${className} ${activeClassName}`}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
        </motion.div>
      </Link>
    </motion.div>
  );
  
  // Updated navigation icons with more modern design
  const NavIcons = {
    home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    about: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    portfolio: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    ),
    contact: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    chat: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ),
    download: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    ),
  };
  
  return (
    <>
      <div className="hidden lg:flex fixed right-10 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            staggerChildren: 0.1,
            delayChildren: 0.3,
          }}
          className="space-y-6"
        >
          <NavButton
            href="/"
            icon={NavIcons.home}
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
          <NavButton
            href="/about"
            icon={NavIcons.about}
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
          <NavButton
            href="/portfolio"
            icon={NavIcons.portfolio}
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
          <NavButton
            href="/contact"
            icon={NavIcons.contact}
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
        </motion.div>
      </div>
      
      {/* Enhanced Mobile Bottom Navigation with bounce animation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg z-20 py-4">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex justify-around max-w-xl mx-auto"
        >
          <NavButton
            href="/"
            icon={NavIcons.home}
            className="bg-gray-800/70 text-white"
            activeClassName="bg-yellow-500 text-black"
          />
          <NavButton
            href="/about"
            icon={NavIcons.about}
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
          <NavButton
            href="/portfolio"
            icon={NavIcons.portfolio}
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
          <NavButton
            href="/contact"
            icon={NavIcons.contact}
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
          <NavButton
            href="/chat"
            icon={NavIcons.chat}
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
        </motion.div>
      </div>
    </>
  );
};