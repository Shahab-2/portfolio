import React from 'react'
'use client';
import Link from 'next/link';
import { motion} from 'framer-motion';

export const Sidebar = () => {

  // Navigation Icons Component
  const NavIcons = {
    home: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    about: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    portfolio: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    contact: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    chat: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  };
      // Reusable Navigation Button
  const NavButton = ({ href, icon, className = '', activeClassName = '' }) => (
    <motion.div 
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Link 
        href={href} 
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group ${className} ${activeClassName}`}
      >
        {icon}
      </Link>
    </motion.div>
  );

  return (
<>
    <div className="hidden lg:flex fixed right-8 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-20">
      <NavButton 
        href="/" 
        icon={NavIcons.home} 
        className="bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
      />
      <NavButton 
        href="/about" 
        icon={NavIcons.about} 
        className="bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
      />
      <NavButton 
        href="/portfolio" 
        icon={NavIcons.portfolio} 
        className="bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
      />
      <NavButton 
        href="/contact" 
        icon={NavIcons.contact} 
        className="bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
      />
    </div>
    </>
  )
}
