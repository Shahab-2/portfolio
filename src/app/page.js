'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Reusable animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

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

  // Theme Toggle Button
  const ThemeToggle = () => (
    <motion.button 
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-300"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </motion.button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} 
        min-h-screen transition-colors duration-300 overflow-x-hidden`}
    >
      <Head>
        <title>Shahab Gul - Web Designer & Front-end Developer</title>
        <meta name="description" content="Portfolio of Shahab Gul, Web Designer & Front-end Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Desktop Side Navigation */}
      <div className="hidden lg:flex fixed right-8 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-20">
        <ThemeToggle />
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
        <NavButton 
          href="/chat" 
          icon={NavIcons.chat} 
          className="bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
        />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 z-20 py-3">
        <div className="flex justify-around max-w-xl mx-auto">
          <NavButton 
            href="/" 
            icon={NavIcons.home} 
            className="bg-gray-800 text-white"
            activeClassName={darkMode ? 'bg-yellow-500 text-black' : ''}
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
          <NavButton 
            href="/chat" 
            icon={NavIcons.chat} 
            className="bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.main 
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 lg:px-8"
      >
        <AnimatePresence>
          {isMobile ? (
            <motion.div 
              variants={contentVariants}
              className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 pt-16 pb-24"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-500"
              >
                <Image 
                  src="/shahab.jpeg" 
                  alt="Shahab Gul" 
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
              
              <div 
                variants={contentVariants}
                className="space-y-3"
              >
                <motion.h1 
                  variants={contentVariants}
                  className="text-3xl font-bold text-yellow-500"
                >
                  Shahab Gul
                </motion.h1>
                <motion.h2 
                  variants={contentVariants}
                  className="text-2xl font-semibold"
                >
                  Web Designer & Developer
                </motion.h2>
                
                <motion.p 
                  variants={contentVariants}
                  className="text-gray-300 max-w-md mx-auto"
                >
                  A passionate web designer and front-end developer creating 
                  clean, user-friendly digital experiences that make a difference.
                </motion.p>
              </div>
              
              <motion.div variants={contentVariants}>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link 
                    href="/about" 
                    className="inline-flex items-center px-6 py-3 border-2 border-yellow-500 
                    text-yellow-500 hover:bg-yellow-500 hover:text-black 
                    rounded-full transition duration-300 group"
                  >
                    More About Me
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              variants={contentVariants}
              className="grid grid-cols-2 min-h-screen items-center gap-8 relative"
            >
              {/* Enhanced Yellow Background Section */}
              <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-yellow-500 z-10 
                transform skew-x-[-10deg] origin-top-left shadow-2xl"></div>
              
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 120, 
                  damping: 20 
                }}
                className="flex justify-center items-center"
              >
                <div className="relative w-96 h-96 rounded-full overflow-hidden 
                  shadow-2xl border-8 border-white transform hover:scale-105 transition-transform duration-300 z-11">
                  <Image 
                    src="/shahab.jpeg" 
                    alt="Shahab Gul" 
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 120, 
                  damping: 20 
                }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '3rem' }}
                    transition={{ duration: 0.8 }}
                    className="h-1 bg-yellow-500"
                  ></motion.div>
                  <h1 className="text-4xl font-bold text-yellow-500">Shahab Gul</h1>
                </div>
                
                <h2 className="text-5xl font-bold">Web Designer & Developer</h2>
                
                <p className="text-xl text-gray-300 max-w-xl">
                  A passionate web designer and front-end developer creating 
                  clean, user-friendly digital experiences that make a difference.
                </p>
                
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link 
                    href="/about" 
                    className="inline-flex items-center px-8 py-4 border-2 border-yellow-500 
                    text-yellow-500 hover:bg-yellow-500 hover:text-black 
                    rounded-full transition duration-300 group text-lg"
                  >
                    More About Me
                    <span className="ml-3 group-hover:translate-x-1 transition-transform text-xl">
                      →
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </motion.div>
  );
}