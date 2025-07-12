'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Navigation Icons
const NavIcons = {
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  about: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  portfolio: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  ),
  contact: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  chat: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  )
};

// Button Variants for Animations
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
      duration: 0.3
    }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

// Navigation Button Component
const NavButton = ({ 
  href, 
  icon, 
  className = '', 
  activeClassName = '', 
  label 
}) => (
  <motion.div 
    variants={buttonVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
  >
    <Link 
      href={href} 
      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-sm group ${className} ${activeClassName}`}
      aria-label={label}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }}
      >
        {icon}
      </motion.div>
    </Link>
  </motion.div>
);

// Mobile Navigation Component
export default function MobileNavigation({ 
  darkMode = true, 
  activePage = '/' 
}) {
  return (
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
          label="Home"
          className="bg-gray-800/70 text-white"
          activeClassName={activePage === '/' ? (darkMode ? 'bg-yellow-500 text-black' : 'bg-yellow-500') : ''}
        />
        <NavButton 
          href="/about" 
          icon={NavIcons.about} 
          label="About"
          className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          activeClassName={activePage === '/about' ? (darkMode ? 'bg-yellow-500 text-black' : 'bg-yellow-500') : ''}
        />
        <NavButton 
          href="/portfolio" 
          icon={NavIcons.portfolio} 
          label="Portfolio"
          className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          activeClassName={activePage === '/portfolio' ? (darkMode ? 'bg-yellow-500 text-black' : 'bg-yellow-500') : ''}
        />
        <NavButton 
          href="/contact" 
          icon={NavIcons.contact} 
          label="Contact"
          className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          activeClassName={activePage === '/contact' ? (darkMode ? 'bg-yellow-500 text-black' : 'bg-yellow-500') : ''}
        />
      </motion.div>
    </div>
  );
}
// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export default function MobileView({ darkMode, setDarkMode }) {
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const buttonVariants = {
//     hover: { scale: 1.05 },
//     tap: { scale: 0.95 }
//   };

//   return (
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className={`${darkMode ? 'bg-black' : 'bg-gray-50'} w-full flex flex-col items-center pt-16 pb-32 px-6 min-h-screen`}
//     >
//       {/* Profile Image with animation */}
//       <motion.div 
//         variants={itemVariants}
//         className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-yellow-500 shadow-lg"
//       >
//         <Image 
//           src="/steve-milner.jpg" 
//           alt="Steve Milner" 
//           fill
//           priority
//           className="object-cover"
//           sizes="(max-width: 640px) 160px, 160px"
//         />
//       </motion.div>
      
//       {/* Name with animation */}
//       <motion.h1 
//         variants={itemVariants}
//         className="text-yellow-500 text-3xl font-bold text-center mb-1"
//       >
//         I'M STEVE MILNER.
//       </motion.h1>
      
//       {/* Title with animation */}
//       <motion.h2 
//         variants={itemVariants}
//         className={`${darkMode ? 'text-white' : 'text-gray-800'} text-2xl font-bold text-center mb-6`}
//       >
//         WEB DESIGNER
//       </motion.h2>
      
//       {/* Description with animation */}
//       <motion.p 
//         variants={itemVariants}
//         className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center text-base mb-8 max-w-md leading-relaxed`}
//       >
//         I'm a Tunisian based web designer & front-end developer focused on 
//         crafting clean & user-friendly experiences. Passionate about building 
//         excellent software that improves lives.
//       </motion.p>
      
//       {/* Button with animation */}
//       <motion.div
//         variants={itemVariants}
//         whileHover="hover"
//         whileTap="tap"
//       >
//         <Link 
//           href="/about" 
//           className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-yellow-500 
//           text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-full 
//           transition-all duration-300 group font-medium"
//         >
//           <span className="mr-2">MORE ABOUT ME</span>
//           <span className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center 
//             group-hover:bg-black group-hover:text-yellow-500 transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </span>
//         </Link>
//       </motion.div>

//       {/* Theme toggle for mobile (optional) */}
//       <motion.button 
//         variants={itemVariants}
//         whileTap={{ scale: 0.9 }}
//         className={`fixed top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center 
//           ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} shadow-md`}
//         onClick={() => setDarkMode(!darkMode)}
//         aria-label="Toggle theme"
//       >
//         {darkMode ? (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//           </svg>
//         ) : (
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//           </svg>
//         )}
//       </motion.button>
//     </motion.div>
//   );
// }