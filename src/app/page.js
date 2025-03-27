'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import MobileNavigation from '../components/MobileView';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Refs for parallax elements
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // For parallax scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // For smooth scroll progress
  const smoothScrollProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // Transform values for parallax elements
  const imageY = useTransform(smoothScrollProgress, [0, 1], [0, -100]);
  const opacitySection = useTransform(smoothScrollProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0]);
  const scale = useTransform(smoothScrollProgress, [0, 0.5], [1, 0.9]);

  // Smooth cursor following
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      cursorX.set(clientX - 16); // Adjust cursor position
      cursorY.set(clientY - 16);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  // Cursor animations
  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 204, 0, 0.2)",
      border: "2px solid rgba(255, 204, 0, 0.5)",
      x: cursorXSpring,
      y: cursorYSpring
    },
    button: {
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 204, 0, 0.2)",
      border: "2px solid rgba(255, 204, 0, 0.8)",
      x: cursorXSpring,
      y: cursorYSpring
    },
    link: {
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 204, 0, 0.3)",
      border: "2px solid rgba(255, 204, 0, 0.6)",
      x: cursorXSpring,
      y: cursorYSpring
    }
  };

  const enterButton = () => setCursorVariant("button");
  const enterLink = () => setCursorVariant("link");
  const leaveHover = () => setCursorVariant("default");

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
        duration: 0.3
      }
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
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Updated navigation icons with more modern design
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

  // Enhanced Navigation Button
  const NavButton = ({ href, icon, className = '', activeClassName = '' }) => (
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
            damping: 15 
          }}
        >
          {icon}
        </motion.div>
      </Link>
    </motion.div>
  );

  // Enhanced Theme Toggle Button
  const ThemeToggle = () => (
    <motion.button 
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={enterButton}
      onMouseLeave={leaveHover}
      className="w-14 h-14 bg-gray-800/70 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all duration-500 backdrop-blur-sm"
      onClick={() => setDarkMode(!darkMode)}
    >
      <motion.div
        animate={{ rotate: darkMode ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </motion.div>
    </motion.button>
  );

  // Animated gradient background
  const gradientColors = darkMode ? 
    "from-gray-900 via-gray-800 to-black" : 
    "from-white via-gray-100 to-gray-200";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`${darkMode ? 'text-white' : 'text-gray-900'} 
        min-h-screen transition-colors duration-700 overflow-hidden bg-gradient-to-br ${gradientColors}`}
      ref={containerRef}
    >
      <Head>
        <title>Shahab Gul - Web Designer & Front-end Developer</title>
        <meta name="description" content="Portfolio of Shahab Gul, Web Designer & Front-end Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Custom cursor (desktop only) */}
      {!isMobile && (
        <motion.div
          className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50"
          variants={variants}
          animate={cursorVariant}
        />
      )}

      {/* Floating background elements */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-yellow-300/5 blur-3xl"
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 20,
              ease: "easeInOut"
            }}
            style={{ top: '10%', right: '15%' }}
          />
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-yellow-500/5 blur-3xl"
            animate={{ 
              x: [0, -70, 0], 
              y: [0, 90, 0],
              scale: [1, 1.3, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 15,
              ease: "easeInOut"
            }}
            style={{ bottom: '15%', left: '10%' }}
          />
        </>
      )}

      {/* Enhanced Desktop Side Navigation */}
      <div className="hidden lg:flex fixed right-10 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-20">
        <ThemeToggle />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2,
            staggerChildren: 0.1,
            delayChildren: 0.3
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
          <NavButton 
            href="/chat" 
            icon={NavIcons.chat} 
            className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
          />
        </motion.div>
      </div>

      {/* Enhanced Mobile Bottom Navigation */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-lg z-20 py-4">
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
            activeClassName={darkMode ? 'bg-yellow-500 text-black' : ''}
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
      </div> */}
      <MobileNavigation/>

      {/* Enhanced Main Content */}
      <motion.main 
        initial="hidden"
        animate="visible"
        style={{ opacity: opacitySection, scale }}
        className="container mx-auto px-4 lg:px-8"
      >
        <AnimatePresence mode="wait">
          {isMobile ? (
            <motion.div 
              key="mobile-content"
              variants={contentVariants}
              className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 pt-16 pb-24"
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div 
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2
                }}
                className="relative w-52 h-52 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)",
                  transform: "perspective(1000px) rotateX(10deg) rotateY(-10deg)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 to-yellow-300 opacity-30 z-10" />
                <Image 
                  src="/shahab.jpeg" 
                  alt="Shahab Gul" 
                  fill
                  priority
                  className="object-cover"
                />
                <motion.div 
                  className="absolute inset-0 border-4 border-yellow-400 z-20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </motion.div>
              
              <div className="space-y-4">
                <motion.h1 
                  variants={childVariants}
                  className="text-4xl font-bold"
                >
                  <span className="text-yellow-500">Shahab</span> Gul
                </motion.h1>
                
                <motion.div
                  variants={childVariants}
                  className="flex items-center justify-center space-x-2"
                >
                  <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
                  <h2 className="text-xl font-medium tracking-wide">Web Designer & Developer</h2>
                  <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
                </motion.div>
                
                <motion.p 
                  variants={childVariants}
                  className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md mx-auto text-lg leading-relaxed`}
                >
                  A passionate web designer and front-end developer creating 
                  clean, user-friendly digital experiences that make a difference.
                </motion.p>
              </div>
              
              <motion.div variants={childVariants}>
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveHover}
                >
                  <Link 
                    href="/about" 
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400
                    text-black font-medium shadow-xl hover:shadow-2xl hover:from-yellow-400 hover:to-yellow-500
                    rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 group"
                  >
                    More About Me
                    <motion.span 
                      className="ml-2 text-xl"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "loop", 
                        duration: 1.5,
                        repeatDelay: 1
                      }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Social Media Icons for Mobile */}
              <motion.div 
                variants={childVariants}
                className="flex space-x-4 mt-6"
              >
                {['facebook', 'twitter', 'instagram', 'github'].map((social, index) => (
                  <motion.a
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.5 + (index * 0.1) }
                    }}
                  >
                    <i className={`fab fa-${social}`}></i>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="desktop-content"
              variants={contentVariants}
              className="grid grid-cols-2 min-h-screen items-center gap-12 relative"
              exit={{ opacity: 0, x: -100 }}
            >
              {/* Enhanced Yellow Background Section */}
              <motion.div 
                className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-yellow-400 to-yellow-600 z-10 
                  shadow-2xl overflow-hidden"
                initial={{ skewX: 0 }}
                animate={{ skewX: -10 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut"
                }}
                style={{ originX: 0, originY: 1 }}
              >
                {/* Decorative elements */}
                <motion.div 
                  className="absolute w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-black opacity-20" />
                  <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border-8 border-black opacity-15" />
                  <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full border-2 border-black opacity-10" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20,
                  delay: 0.3
                }}
                className="flex justify-center items-center relative z-20"
                ref={imageRef}
                style={{ y: imageY }}
              >
                <motion.div
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.6
                  }}
                  className="relative w-96 h-96 rounded-2xl overflow-hidden 
                    shadow-2xl border-8 border-white z-20"
                  style={{ 
                    transform: "perspective(1000px) rotateY(-15deg)",
                    boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.3)"
                  }}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                >
                  <Image 
                    src="/shahab.jpeg" 
                    alt="Shahab Gul" 
                    fill
                    priority
                    className="object-cover"
                  />
                  
                  {/* Image overlay gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-500/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </motion.div>
                
                {/* Decorative elements around image */}
                <motion.div 
                  className="absolute -bottom-10 -left-10 w-24 h-24 bg-yellow-400 rounded-lg z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                />
                <motion.div 
                  className="absolute -top-5 -right-5 w-16 h-16 bg-yellow-500 rounded-full z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                />
              </motion.div>
              
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20,
                  delay: 0.5
                }}
                className="space-y-8 z-20"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '3rem' }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="h-1 bg-yellow-500 rounded-full"
                    ></motion.div>
                    <motion.h1 
                      className="text-5xl font-bold text-yellow-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 1.2, 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      Shahab Gul
                    </motion.h1>
                  </div>
                </motion.div>
                
                <motion.h2 
                  className="text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  Web Designer & <span className="text-yellow-500">Developer</span>
                </motion.h2>
                
                <motion.p 
                  className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-xl leading-relaxed`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  A passionate web designer and front-end developer creating 
                  clean, user-friendly digital experiences that make a difference.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                >
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveHover}
                  >
                    <Link 
                      href="/about" 
                      className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-yellow-500 
                      text-yellow-500 hover:bg-yellow-500 hover:text-black 
                      rounded-full transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl group text-lg"
                    >
                      More About Me
                      <motion.span 
                        className="ml-3 text-xl"
                        animate={{ 
                          x: [0, 5, 0] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "loop", 
                          duration: 1.5,
                          repeatDelay: 1
                        }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Desktop Social Media Icons */}
                <motion.div 
                  className="flex space-x-5 mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.6 }}
                >
                  {['facebook', 'twitter', 'instagram', 'github'].map((social, index) => (
                    <motion.a
                      key={social}
                      href={`#${social}`}
                      className="w-12 h-12 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={enterLink}
                      onMouseLeave={leaveHover}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { delay: 2.1 + (index * 0.1) }
                      }}
                    >
                      <i className={`fab fa-${social} text-lg`}></i>
                    </motion.a>
                  ))}
                </motion.div>

                {/* Experience Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-6 mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                >
                  {[
                    { number: '5+', label: 'Years Experience' },
                    { number: '100+', label: 'Projects Completed' },
                    { number: '50+', label: 'Happy Clients' }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-800/50 transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: 2.5 + (index * 0.1) }
                      }}
                    >
                      <span className="text-3xl font-bold text-yellow-500">{stat.number}</span>
                      <span className="text-sm text-gray-400">{stat.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Floating tech icons - desktop only */}
      {!isMobile && (
        <div className="hidden lg:block">
          {['html5', 'css3-alt', 'js', 'react', 'node', 'git'].map((tech, index) => (
            <motion.div
              key={tech}
              className="absolute text-gray-800/20"
              style={{ 
                fontSize: `${Math.floor(Math.random() * 20) + 35}px`,
                left: `${Math.floor(Math.random() * 80) + 10}%`,
                top: `${Math.floor(Math.random() * 70) + 10}%`,
                zIndex: 5
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.2, 0.1],
                y: [0, -15, 0],
                rotate: Math.random() * 20 - 10
              }}
              transition={{
                delay: 2.5 + (index * 0.2),
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <i className={`fab fa-${tech}`}></i>
            </motion.div>
          ))}
        </div>
      )}

      {/* Particle effect overlay */}
      {!isMobile && darkMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 rounded-full bg-yellow-500/30"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
                y: [0, -100, -200]
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
                repeatDelay: Math.random() * 3
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}






// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// export default function Home() {
//   const [darkMode, setDarkMode] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [cursorVariant, setCursorVariant] = useState("default");

//   // Refs for parallax elements
//   const containerRef = useRef(null);
//   const imageRef = useRef(null);

//   // For parallax scrolling
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"]
//   });

//   // For smooth scroll progress
//   const smoothScrollProgress = useSpring(scrollYProgress, { 
//     stiffness: 100, 
//     damping: 30, 
//     restDelta: 0.001 
//   });

//   // Transform values for parallax elements
//   const imageY = useTransform(smoothScrollProgress, [0, 1], [0, -100]);
//   const opacitySection = useTransform(smoothScrollProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0]);
//   const scale = useTransform(smoothScrollProgress, [0, 0.5], [1, 0.9]);

//   // Smooth cursor following
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
  
//   const springConfig = { damping: 25, stiffness: 700 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
    
//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e;
//       setMousePosition({ x: clientX, y: clientY });
//       cursorX.set(clientX - 16); // Adjust cursor position
//       cursorY.set(clientY - 16);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     window.addEventListener('mousemove', handleMouseMove);
    
//     return () => {
//       window.removeEventListener('resize', checkMobile);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [cursorX, cursorY]);

//   // Cursor animations
//   const variants = {
//     default: {
//       height: 32,
//       width: 32,
//       backgroundColor: "rgba(255, 204, 0, 0.2)",
//       border: "2px solid rgba(255, 204, 0, 0.5)",
//       x: cursorXSpring,
//       y: cursorYSpring
//     },
//     button: {
//       height: 80,
//       width: 80,
//       backgroundColor: "rgba(255, 204, 0, 0.2)",
//       border: "2px solid rgba(255, 204, 0, 0.8)",
//       x: cursorXSpring,
//       y: cursorYSpring
//     },
//     link: {
//       height: 48,
//       width: 48,
//       backgroundColor: "rgba(255, 204, 0, 0.3)",
//       border: "2px solid rgba(255, 204, 0, 0.6)",
//       x: cursorXSpring,
//       y: cursorYSpring
//     }
//   };

//   const enterButton = () => setCursorVariant("button");
//   const enterLink = () => setCursorVariant("link");
//   const leaveHover = () => setCursorVariant("default");

//   // Enhanced animation variants
//   const buttonVariants = {
//     initial: { scale: 1, opacity: 0.8 },
//     hover: { 
//       scale: 1.05,
//       opacity: 1,
//       boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)",
//       transition: { 
//         type: "spring", 
//         stiffness: 400, 
//         damping: 10,
//         duration: 0.3
//       }
//     },
//     tap: { 
//       scale: 0.95,
//       transition: { duration: 0.2 }
//     }
//   };

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.8,
//         ease: [0.6, 0.05, 0.01, 0.9]
//       } 
//     }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   // Navigation Component
//   const Navigation = () => {
//     const navItems = [
//       { href: '/', icon: 'fa-home', label: 'Home', active: true },
//       { href: '/about', icon: 'fa-user', label: 'About' },
//       { href: '/portfolio', icon: 'fa-briefcase', label: 'Portfolio' },
//       { href: '/resume', icon: 'fa-file-alt', label: 'Resume' },
//       { href: '/contact', icon: 'fa-envelope', label: 'Contact' },
//       { href: '/blog', icon: 'fa-comment', label: 'Blog' }
//     ];

//     return (
//       <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
//         <motion.div 
//           className="flex flex-col space-y-6"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           <motion.button 
//             className="w-14 h-14 bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-300 group"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setDarkMode(!darkMode)}
//             onMouseEnter={enterButton}
//             onMouseLeave={leaveHover}
//           >
//             <motion.div
//               animate={{ rotate: darkMode ? 0 : 180 }}
//               transition={{ duration: 0.5 }}
//             >
//               {darkMode ? (
//                 <i className="fas fa-sun text-xl text-yellow-500"></i>
//               ) : (
//                 <i className="fas fa-moon text-xl text-gray-300"></i>
//               )}
//             </motion.div>
//             <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//               {darkMode ? 'Light Mode' : 'Dark Mode'}
//             </span>
//           </motion.button>

//           {navItems.map((item, index) => (
//             <motion.a 
//               key={item.href}
//               href={item.href}
//               className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 group
//                 ${item.active 
//                   ? 'bg-yellow-500' 
//                   : 'bg-gray-800 bg-opacity-40 backdrop-blur-sm hover:bg-yellow-500'}`}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onMouseEnter={enterButton}
//               onMouseLeave={leaveHover}
//             >
//               <i className={`fas ${item.icon} text-xl ${item.active ? 'text-gray-900' : 'text-gray-300 group-hover:text-gray-900'}`}></i>
//               <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                 {item.label}
//               </span>
//             </motion.a>
//           ))}
//         </motion.div>
//       </div>
//     );
// }
//   };

//   // Mobile Navigation
//   const MobileNavigation = () => {
//     const navItems = [
//       { href: '/', icon: 'fa-home', active: true },
//       { href: '/about', icon: 'fa-user' },
//       { href: '/portfolio', icon: 'fa-briefcase' },
//       { href: '/resume', icon: 'fa-file-alt' },
//       { href: '/contact', icon: 'fa-envelope' },
//       { href: '/blog', icon: 'fa-comment' }
//     ];

//     return (
//       <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 bg-opacity-80 backdrop-blur-lg z-50 py-3">
//         <motion.div 
//           initial={{ y: 100 }}
//           animate={{ y: 0 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           className="flex justify-around max-w-xl mx-auto"
//         >
//           {navItems.map((item) => (
//             <motion.a 
//               key={item.href}
//               href={item.href}
//               className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
//                 ${item.active 
//                   ? 'bg-yellow-500' 
//                   : 'bg-gray-700 bg-opacity-70 hover:bg-gray-600'}`}
//               whileTap={{ scale: 0.9 }}
//             >
//               <i className={`fas ${item.icon} ${item.active ? 'text-gray-900' : 'text-white'}`}></i>
//             </motion.a>
//           ))}
//         </motion.div>
//       </div>
//     );
//   };

//   // Social Media Component
//   const SocialMedia = ({ className, iconClassName, animate = true }) => {
//     const socialLinks = [
//       { platform: 'linkedin-in', url: '#', label: 'LinkedIn' },
//       { platform: 'github', url: '#', label: 'GitHub' },
//       { platform: 'twitter', url: '#', label: 'Twitter' },
//       { platform: 'dribbble', url: '#', label: 'Dribbble' }
//     ];

//     return (
//       <div className={`flex space-x-4 ${className}`}>
//         {socialLinks.map((social, index) => (
//           <motion.a
//             key={social.platform}
//             href={social.url}
//             className={`w-12 h-12 rounded-full bg-gray-800 bg-opacity-40 backdrop-blur-sm flex items-center justify-center group
//               hover:bg-yellow-500 transition-colors duration-300 ${iconClassName}`}
//             whileHover={{ scale: 1.1, y: -5 }}
//             whileTap={{ scale: 0.95 }}
//             onMouseEnter={enterLink}
//             onMouseLeave={leaveHover}
//             initial={animate ? { opacity: 0, y: 20 } : {}}
//             animate={animate ? { 
//               opacity: 1, 
//               y: 0,
//               transition: { delay: 1.5 + (index * 0.1) }
//             } : {}}
//           >
//             <i className={`fab fa-${social.platform} text-gray-300 group-hover:text-gray-900 transition-colors`}></i>
//             <span className="sr-only">{social.label}</span>
//           </motion.a>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className={`${darkMode ? 'text-white bg-gradient-to-br from-gray-900 to-gray-800' : 'text-gray-900 bg-gradient-to-br from-gray-100 to-white'} 
//         min-h-screen transition-colors duration-700 overflow-hidden`}
//       ref={containerRef}
//     >
//       <Head>
//         <title>Shahab Gul - Web Designer & Front-end Developer</title>
//         <meta name="description" content="Portfolio of Shahab Gul, Web Designer & Front-end Developer" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {/* Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className={`absolute top-20 left-10 w-64 h-64 rounded-full 
//           ${darkMode ? 'bg-yellow-500 opacity-5' : 'bg-yellow-500 opacity-10'} blur-3xl`}></div>
//         <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full 
//           ${darkMode ? 'bg-blue-500 opacity-5' : 'bg-blue-400 opacity-10'} blur-3xl`}></div>
//         <div className={`absolute top-1/3 right-1/4 w-48 h-48 rounded-full 
//           ${darkMode ? 'bg-purple-500 opacity-5' : 'bg-purple-400 opacity-10'} blur-3xl`}></div>
//       </div>

//       {/* Custom cursor (desktop only) */}
//       {!isMobile && (
//         <motion.div
//           className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50"
//           variants={variants}
//           animate={cursorVariant}
//         />
//       )}

//       {/* Navigation */}
//       <Navigation />
//       <MobileNavigation />

//       {/* Main Content */}
//       <motion.main 
//         initial="hidden"
//         animate="visible"
//         variants={staggerContainer}
//         style={{ opacity: opacitySection, scale }}
//         className="container mx-auto px-4 lg:px-8 relative z-10"
//       >
//         <AnimatePresence mode="wait">
//           {isMobile ? (
//             // Mobile Layout
//             <motion.div 
//               key="mobile-content"
//               variants={fadeInUp}
//               className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 pt-16 pb-24"
//               exit={{ opacity: 0, y: -20 }}
//             >
//               {/* Profile Image */}
//               <motion.div 
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ 
//                   type: "spring", 
//                   stiffness: 260, 
//                   damping: 20,
//                   delay: 0.2
//                 }}
//                 className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl"
//                 style={{
//                   boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)"
//                 }}
//               >
//                 <Image 
//                   src="/api/placeholder/300/300" 
//                   alt="Shahab Gul" 
//                   fill
//                   priority
//                   className="object-cover"
//                 />
//                 <motion.div 
//                   className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-500/30 z-10"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.5, duration: 0.5 }}
//                 />
//               </motion.div>
              
//               <motion.div 
//                 variants={fadeInUp}
//                 className="space-y-4"
//               >
//                 <motion.h1 
//                   className="text-4xl font-bold"
//                 >
//                   <span className="text-yellow-500">Shahab</span> Gul
//                 </motion.h1>
                
//                 <motion.div
//                   className="flex items-center justify-center space-x-2"
//                 >
//                   <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
//                   <h2 className="text-xl font-medium tracking-wide">Web Designer & Developer</h2>
//                   <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
//                 </motion.div>
                
//                 <motion.p 
//                   className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md mx-auto text-lg leading-relaxed`}
//                 >
//                   A passionate web designer and front-end developer creating 
//                   clean, user-friendly digital experiences that make a difference.
//                 </motion.p>
//               </motion.div>
              
//               <motion.div variants={fadeInUp}>
//                 <motion.div
//                   variants={buttonVariants}
//                   initial="initial"
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   <Link 
//                     href="/about" 
//                     className="inline-flex items-center px-8 py-4 bg-yellow-500
//                     text-gray-900 font-medium shadow-xl rounded-full transition duration-500 
//                     ease-in-out transform hover:-translate-y-1 group"
//                   >
//                     More About Me
//                     <motion.span 
//                       className="ml-2 text-xl"
//                       animate={{ x: [0, 5, 0] }}
//                       transition={{ 
//                         repeat: Infinity, 
//                         repeatType: "loop", 
//                         duration: 1.5,
//                         repeatDelay: 1
//                       }}
//                     >
//                       →
//                     </motion.span>
//                   </Link>
//                 </motion.div>
//               </motion.div>

//               {/* Social Media Icons for Mobile */}
//               <SocialMedia className="mt-6" />
              
//               {/* Stats Cards */}
//               <motion.div 
//                 variants={fadeInUp}
//                 className="grid grid-cols-3 gap-3 w-full max-w-md mt-4"
//               >
//                 {[
//                   { number: '5+', label: 'Years Experience' },
//                   { number: '100+', label: 'Projects' },
//                   { number: '50+', label: 'Clients' }
//                 ].map((stat, index) => (
//                   <motion.div 
//                     key={index}
//                     className={`rounded-xl p-3 flex flex-col items-center justify-center
//                       ${darkMode ? 'bg-gray-800 bg-opacity-40' : 'bg-white bg-opacity-70'} 
//                       backdrop-blur-sm shadow-lg transition-all duration-300`}
//                     whileHover={{ y: -5 }}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ 
//                       opacity: 1, 
//                       y: 0,
//                       transition: { delay: 1 + (index * 0.1) }
//                     }}
//                   >
//                     <span className="text-2xl font-bold text-yellow-500">{stat.number}</span>
//                     <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</span>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </motion.div>
//           ) : (
//             // Desktop Layout
//             <motion.div 
//               key="desktop-content"
//               variants={fadeInUp}
//               className="grid grid-cols-2 min-h-screen items-center gap-12 relative"
//               exit={{ opacity: 0, x: -100 }}
//             >
//               {/* Left Column with Image */}
//               <motion.div 
//                 className="flex flex-col items-center justify-center relative z-20"
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//                 ref={imageRef}
//                 style={{ y: imageY }}
//               >
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 200,
//                     damping: 20,
//                     delay: 0.4
//                   }}
//                   className="relative w-80 h-80 rounded-full overflow-hidden z-20 border-8 border-yellow-500 shadow-2xl"
//                   style={{
//                     boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.3)"
//                   }}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <Image 
//                     src="/api/placeholder/400/400" 
//                     alt="Shahab Gul" 
//                     fill
//                     priority
//                     className="object-cover"
//                   />
//                   <motion.div 
//                     className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-500/30 z-10"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.8, duration: 0.8 }}
//                   />
//                 </motion.div>
                
//                 {/* Decorative elements around image */}
//                 <motion.div 
//                   className="absolute w-20 h-20 bg-yellow-500 rounded-full z-10 -bottom-5 -left-10"
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 0.3, scale: 1 }}
//                   transition={{ delay: 0.9, duration: 0.5 }}
//                 />
//                 <motion.div 
//                   className="absolute w-12 h-12 bg-yellow-400 rounded-full z-10 -top-8 right-10"
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 0.4, scale: 1 }}
//                   transition={{ delay: 1.2, duration: 0.5 }}
//                 />
                
//                 {/* Stats Cards */}
//                 <motion.div 
//                   className="grid grid-cols-3 gap-5 mt-12 w-full max-w-md"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.2, duration: 0.6 }}
//                 >
//                   {[
//                     { number: '5+', label: 'Years Experience' },
//                     { number: '100+', label: 'Projects' },
//                     { number: '50+', label: 'Clients' }
//                   ].map((stat, index) => (
//                     <motion.div 
//                       key={index}
//                       className={`rounded-xl p-4 flex flex-col items-center justify-center
//                         ${darkMode ? 'bg-gray-800 bg-opacity-40' : 'bg-white bg-opacity-70'} 
//                         backdrop-blur-sm shadow-lg transition-all duration-300`}
//                       whileHover={{ y: -8, scale: 1.05 }}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ 
//                         opacity: 1, 
//                         y: 0,
//                         transition: { delay: 1.3 + (index * 0.1) }
//                       }}
//                     >
//                       <span className="text-3xl font-bold text-yellow-500">{stat.number}</span>
//                       <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</span>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </motion.div>
              
//               {/* Right Column with Text */}
//               <motion.div 
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.5 }}
//                 className="space-y-8 z-20"
//               >
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8, duration: 0.8 }}
//                 >
//                   <div className="flex items-center space-x-4 mb-2">
//                     <motion.div 
//                       initial={{ width: 0 }}
//                       animate={{ width: '3rem' }}
//                       transition={{ duration: 0.8, delay: 0.9 }}
//                       className="h-1 bg-yellow-500 rounded-full"
//                     ></motion.div>
//                     <motion.p 
//                       className={`uppercase tracking-widest text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 1, duration: 0.5 }}
//                     >
//                       Web Developer
//                     </motion.p>
//                   </div>
//                   <motion.h1 
//                     className="text-6xl font-bold"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1.1, duration: 0.5 }}
//                   >
//                     <span className="text-yellow-500">Shahab</span> Gul
//                   </motion.h1>
//                 </motion.div>
                
//                 <motion.h2 
//                   className="text-4xl font-bold leading-tight"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.2, duration: 0.6 }}
//                 >
//                   I Create <span className="text-yellow-500">Digital Experiences</span> That Matter
//                 </motion.h2>
                
//                 <motion.p 
//                   className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-xl leading-relaxed`}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.3, duration: 0.6 }}
//                 >
//                   A passionate web designer and front-end developer based in New York, specializing in
//                   creating clean, user-friendly digital experiences that connect brands with their audiences.
//                 </motion.p>
                
//                 <motion.div
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.4, duration: 0.6 }}
//                   className="pt-4"
//                 >
//                   <motion.div
//                     variants={buttonVariants}
//                     initial="initial"
//                     whileHover="hover"
//                     whileTap="tap"
//                     onMouseEnter={enterButton}
//                     onMouseLeave={leaveHover}
//                   >
//                     <Link 
//                       href="/about" 
//                       className={`inline-flex items-center px-10 py-5 bg-yellow-500
//                       text-gray-900 font-medium rounded-full transition-all duration-500 
//                       ease-in-out transform hover:-translate-y-1 hover:shadow-xl text-lg`}
//                     >
//                       More About Me
//                       <motion.span 
//                         className="ml-3 text-xl"
//                         animate={{ x: [0, 5, 0] }}
//                         transition={{ 
//                           repeat: Infinity, 
//                           repeatType: "loop", 
//                           duration: 1.5,
//                           repeatDelay: 1
//                         }}
//                       >
//                         →
//                       </motion.span>
//                     </Link>
//                   </motion.div>
//                 </motion.div>

//                 {/* Desktop Social Media Icons */}
//                 <motion.div 
//                   className="flex space-x-5 mt-8"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.6, duration: 0.6 }}
//                 >
//                   <SocialMedia />
//                 </motion.div>

//                 {/* Technologies */}
//                 <motion.div 
//                   className="pt-6"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.8, duration: 0.6 }}
//                 >
//                   <h3 className={`text-sm uppercase tracking-wider font-semibold mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     Technologies
//                   </h3>
//                   <div className="flex flex-wrap gap-3">
//                     {['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Tailwind'].map((tech, index) => (
//                       <motion.div 
//                         key={tech}
//                         className={`px-4 py-2 rounded-full text-sm
//                           ${darkMode ? 
//                             'bg-gray-800 bg-opacity-40 text-gray-300' : 
//                             'bg-white bg-opacity-70 text-gray-700'} 
//                           shadow-md backdrop-blur-sm`}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ 
//                           opacity: 1, 
//                           y: 0,
//                           transition: { delay: 1.9 + (index * 0.05) }
//                         }}
//                         whileHover={{ 
//                           y: -5, 
//                           backgroundColor: '#f59e0b',
//                           color: '#111827' 
//                         }}
//                       >
//                         {tech}
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.main>

//       {/* Floating tech icons - desktop only */}
//       {!isMobile && darkMode && (
//         <div className="hidden lg:block">
//           {['html5', 'css3-alt', 'js', 'react', 'node-js', 'git'].map((tech, index) => (
//             <motion.div
//               key={tech}
//               className="absolute text-yellow-500/10"
//               style={{ 
//                 fontSize: `${Math.floor(Math.random() * 20) + 35}px`,
//                 left: `${Math.floor(Math.random() * 80) + 10}%`,
//                 top: `${Math.floor(Math.random() * 70) + 10}%`,
//                 zIndex: 5
//               }}
//               initial={{ opacity: 0 }}
//               animate={{ 
//                 opacity: [0, 0.5, 0.3],
//                 y: [0, -15, 0],
//                 rotate: Math.random() * 20 - 10
//               }}
//               transition={{
//                 delay: 2.5 + (index * 0.2),
//                 duration: 5 + Math.random() * 3,
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }}
//             >
//               <i className={`fab fa-${tech}`}></i>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Particle effect overlay */}
//       {!isMobile && (
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {[...Array(20)].map((_, index) => (
//             <motion.div
//               key={index}
//               className={`absolute w-2 h-2 rounded-full ${darkMode ? 'bg-yellow-500/30' : 'bg-yellow-500/20'}`}
//               style={{ 
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ 
//                 opacity: [0, 0.5, 0],
//                 scale: [0, 1, 0],
//                 y: [0, -100, -200]
//               }}
//               transition={{
//                 duration: 4 + Math.random() * 6,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//                 repeatDelay: Math.random() * 3
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </motion.div>
//   );