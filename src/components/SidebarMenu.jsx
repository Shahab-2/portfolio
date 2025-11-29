'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarMenu = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Modern animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };
  
  
  // Modern Navigation Button with glassmorphism
  const NavButton = ({ href, icon, label, gradient }) => {
    const isActive = pathname === href;
    
    return (
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="relative group"
        onMouseEnter={() => setHoveredItem(label)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <Link href={href}>
          <motion.div
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all duration-300 ${
              isActive 
                ? `bg-gradient-to-br ${gradient} border-transparent shadow-lg shadow-${gradient.split('-')[1]}-500/50` 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Icon */}
            <motion.div
              className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>

            {/* Glow effect on hover */}
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
            />
          </motion.div>
        </Link>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: hoveredItem === label ? 1 : 0,
            x: hoveredItem === label ? 0 : -10
          }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl text-white text-sm font-medium whitespace-nowrap pointer-events-none shadow-2xl"
        >
          {label}
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900/95"></div>
        </motion.div>
      </motion.div>
    );
  };
  
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
  
  const menuItems = [
    { href: "/", icon: NavIcons.home, label: "Home", gradient: "from-blue-500 to-cyan-500" },
    { href: "/about", icon: NavIcons.about, label: "About", gradient: "from-purple-500 to-pink-500" },
    { href: "/portfolio", icon: NavIcons.portfolio, label: "Portfolio", gradient: "from-orange-500 to-red-500" },
    { href: "/contact", icon: NavIcons.contact, label: "Contact", gradient: "from-green-500 to-emerald-500" },
  ];

  return (
    <>
      {/* Desktop Sidebar - Modern Glassmorphism */}
      <motion.div 
        className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Glassmorphic Container */}
        <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-4 shadow-2xl">
          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-purple-500/10 rounded-3xl blur-xl opacity-50"></div>
          
          {/* Navigation Items */}
          <div className="relative space-y-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <NavButton {...item} />
              </motion.div>
            ))}
          </div>

          {/* Decorative Dots */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-yellow-500/50"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Mobile Bottom Navigation - Modern Glassmorphism */}
      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Glassmorphic Container */}
        <div className="relative backdrop-blur-2xl bg-gray-900/80 border-t border-white/10">
          {/* Decorative Top Glow */}
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
          
          <div className="flex justify-around items-center max-w-xl mx-auto px-4 py-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavButton {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};