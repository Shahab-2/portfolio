'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MobileView({ darkMode, setDarkMode }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`${darkMode ? 'bg-black' : 'bg-gray-50'} w-full flex flex-col items-center pt-16 pb-32 px-6 min-h-screen`}
    >
      {/* Profile Image with animation */}
      <motion.div 
        variants={itemVariants}
        className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-yellow-500 shadow-lg"
      >
        <Image 
          src="/steve-milner.jpg" 
          alt="Steve Milner" 
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) 160px, 160px"
        />
      </motion.div>
      
      {/* Name with animation */}
      <motion.h1 
        variants={itemVariants}
        className="text-yellow-500 text-3xl font-bold text-center mb-1"
      >
        I'M STEVE MILNER.
      </motion.h1>
      
      {/* Title with animation */}
      <motion.h2 
        variants={itemVariants}
        className={`${darkMode ? 'text-white' : 'text-gray-800'} text-2xl font-bold text-center mb-6`}
      >
        WEB DESIGNER
      </motion.h2>
      
      {/* Description with animation */}
      <motion.p 
        variants={itemVariants}
        className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center text-base mb-8 max-w-md leading-relaxed`}
      >
        I'm a Tunisian based web designer & front-end developer focused on 
        crafting clean & user-friendly experiences. Passionate about building 
        excellent software that improves lives.
      </motion.p>
      
      {/* Button with animation */}
      <motion.div
        variants={itemVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link 
          href="/about" 
          className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-yellow-500 
          text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-full 
          transition-all duration-300 group font-medium"
        >
          <span className="mr-2">MORE ABOUT ME</span>
          <span className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center 
            group-hover:bg-black group-hover:text-yellow-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </Link>
      </motion.div>

      {/* Theme toggle for mobile (optional) */}
      <motion.button 
        variants={itemVariants}
        whileTap={{ scale: 0.9 }}
        className={`fixed top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center 
          ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} shadow-md`}
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
}