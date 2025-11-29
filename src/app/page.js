'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [downloadAnimation, setDownloadAnimation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Refs for parallax elements
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Optimized parallax scrolling - Simplified for better performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values for parallax elements - Reduced transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Reduced movement
  const opacitySection = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]); // Simplified

  // Smooth cursor following - Optimized spring config
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 }; // Reduced for better performance
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);



  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX - 16);
      cursorY.set(clientY - 16);
    };

    // Debounce resize handler for better performance
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };

    checkMobile();
    window.addEventListener('resize', debouncedResize);
    
    // Only add mousemove on desktop for performance
    if (window.innerWidth >= 1024) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimer);
    };
  }, [cursorX, cursorY]);

  // Cursor animations
  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(245, 158, 11, 0.2)",
      border: "2px solid rgba(245, 158, 11, 0.5)",
      x: cursorXSpring,
      y: cursorYSpring
    },
    button: {
      height: 80,
      width: 80,
      backgroundColor: "rgba(245, 158, 11, 0.2)",
      border: "2px solid rgba(245, 158, 11, 0.8)",
      x: cursorXSpring,
      y: cursorYSpring
    },
    link: {
      height: 48,
      width: 48,
      backgroundColor: "rgba(245, 158, 11, 0.3)",
      border: "2px solid rgba(245, 158, 11, 0.6)",
      x: cursorXSpring,
      y: cursorYSpring
    },
    download: {
      height: 100,
      width: 100,
      backgroundColor: "rgba(245, 158, 11, 0.3)",
      border: "2px solid rgba(245, 158, 11, 0.8)",
      x: cursorXSpring,
      y: cursorYSpring,
      borderRadius: "50%",
      opacity: downloadAnimation ? [0.3, 0.6, 0.3] : 0.3,
      scale: downloadAnimation ? [1, 1.2, 1] : 1,
      transition: {
        opacity: { duration: 1, repeat: Infinity },
        scale: { duration: 1, repeat: Infinity }
      }
    }
  };

  const enterButton = () => setCursorVariant("button");
  const enterLink = () => setCursorVariant("link");
  const enterDownload = () => {
    setCursorVariant("download");
    setDownloadAnimation(true);
  };
  const leaveHover = () => {
    setCursorVariant("default");
    setDownloadAnimation(false);
  };

  // Optimized animation variants - Reduced complexity
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.15, ease: "easeOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  // Download button animation
  const downloadButtonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { duration: 0.15, ease: "easeOut" }
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.08
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };



  // Download CV handler with improved user feedback
  const handleDownloadCV = () => {
    // Add loading state
    setDownloadAnimation(true);
    
    const link = document.createElement('a');
    link.href = '/assets/ShahabGul-SofwareDeveloper-Resume.pdf';
    link.download = 'ShahabGul-SofwareDeveloper-Resume.pdf';
    
    // Add success feedback
    link.onload = () => {
      setTimeout(() => setDownloadAnimation(false), 2000);
    };
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset animation after a delay
    setTimeout(() => setDownloadAnimation(false), 2000);
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
    ),
    download: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    )
  };

  // Enhanced Navigation Button with hover animation
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
        style={{
          background: className.includes('bg-gray-800/70') 
            ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)'
            : className.includes('bg-yellow-500')
            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            : 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)'
        }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
          whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
        >
          {icon}
        </motion.div>
      </Link>
    </motion.div>
  );



  // Animated gradient background with linear gradients
  const gradientColors = darkMode ?
    "from-gray-900 via-gray-800 to-black" :
    "from-white via-gray-100 to-gray-200";

  // Typography classes based on theme
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-200" : "text-gray-800";
  const textTertiary = darkMode ? "text-gray-300" : "text-gray-600";
  const textAccent = "text-yellow-500";

  // Letter spacing for better readability
  const letterSpacing = "tracking-normal";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`${textPrimary} font-sans
        min-h-screen transition-colors duration-300 overflow-hidden bg-gradient-to-br ${gradientColors}`}
      style={{
        background: darkMode 
          ? 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #000000 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)'
      }}
      ref={containerRef}
    >
      <Head>
        <title>Shahab Gul - Full Stack Developer & UI/UX Designer</title>
        <meta name="description" content="Portfolio of Shahab Gul, Full Stack Developer & UI/UX Designer specializing in modern web applications and user experience design" />
        <meta name="keywords" content="Full Stack Developer, UI/UX Designer, React, Node.js, JavaScript, Portfolio" />
        <meta name="author" content="Shahab Gul" />
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





      

      {/* Enhanced Desktop Side Navigation */}
      <div className="hidden lg:flex fixed right-10 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-20">
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
          {/* Home */}
          <motion.div className="group relative">
            <NavButton
              href="/"
              icon={NavIcons.home}
              className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
            />
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Home
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </motion.div>

          {/* About */}
          <motion.div className="group relative">
            <NavButton
              href="/about"
              icon={NavIcons.about}
              className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
            />
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              About
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div className="group relative">
            <NavButton
              href="/portfolio"
              icon={NavIcons.portfolio}
              className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
            />
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Projects
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </motion.div>

          {/* Contact Us */}
          <motion.div className="group relative">
            <NavButton
              href="/contact"
              icon={NavIcons.contact}
              className="bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black"
            />
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Contact Us
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Mobile Bottom Navigation with bounce animation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 backdrop-blur-lg z-20 py-4"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%)'
        }}>
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
        </motion.div>
      </div>

      {/* Enhanced Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        style={{ opacity: opacitySection }}
        className="container mx-auto px-4 lg:px-8 max-w-6xl"
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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2
                }}
                className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg border-2 border-white bg-white"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)"
                }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/shahabprofile.png"
                  alt="Shahab Gul"
                  fill
                  priority
                  className="object-cover"
                  quality={90}
                  sizes="256px"
                />

              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  variants={childVariants}
                  className="text-3xl font-bold"
                >
                  <span className={`${textAccent} font-extrabold`}>Shahab</span> <span className="tracking-wide">Gul</span>
                </motion.h1>

                <motion.div
                  variants={childVariants}
                  className="flex items-center justify-center"
                >
                  <h2 className={`text-sm font-semibold tracking-wide ${textSecondary}`}>Full Stack Web Developer</h2>
                </motion.div>

                <motion.p
                  variants={childVariants}
                  className={`${textTertiary} max-w-md mx-auto text-xs leading-relaxed font-medium ${letterSpacing}`}
                >
                  A passionate full-stack developer and UI/UX designer crafting
                  innovative digital solutions that combine functionality with stunning design.
                </motion.p>
              </div>

              <motion.div variants={childVariants}>
                <motion.button
                  onClick={handleDownloadCV}
                  variants={downloadButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onMouseEnter={enterDownload}
                  onMouseLeave={leaveHover}
                  className="inline-flex items-center px-6 py-3 text-black font-medium shadow-lg rounded-full transition duration-300 text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  }}
                >
                  <span className="mr-2">
                    {NavIcons.download}
                  </span>
                  Download CV
                </motion.button>
              </motion.div>

                            {/* Social Media Icons for Mobile */}
              <motion.div
                className="flex space-x-5 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.4 }}
              >
                {[
                  { name: 'github', url: 'https://github.com/Shahab-2' },
                  { name: 'linkedin', url: 'https://www.linkedin.com/in/shahabgul22/' },
                  { name: 'behance', url: 'https://www.behance.net/shahabgul' }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
                      enterLink();
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)';
                      leaveHover();
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 1.6 + (index * 0.1) }
                    }}
                  >
                    <i className={`fab fa-${social.name} text-base`} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="desktop-content"
              variants={contentVariants}
              className="grid grid-cols-2 min-h-screen items-center gap-16 relative px-8"
              exit={{ opacity: 0, x: -100 }}
            >
              {/* Modern Geometric Background Decorations */}
              <motion.div
                className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
                style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Left Column - Profile Image with Modern Card */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center items-center relative z-20"
              >
                {/* Glassmorphism Card Container */}
                <motion.div
                  className="relative"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 z-30 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Available
                    </div>
                  </motion.div>

                  {/* Profile Image Card */}
                  <motion.div
                    className="relative p-2 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Animated Border Gradient */}
                      <div className="absolute inset-0 rounded-2xl p-[3px]"
                        style={{
                          background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #ec4899, #8b5cf6)',
                          backgroundSize: '400% 400%',
                          animation: 'gradient 15s ease infinite'
                        }}
                      >
                        <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
                          <Image
                            src="/shahabprofile.png"
                            alt="Shahab Gul"
                            fill
                            priority
                            className="object-cover"
                            quality={90}
                            sizes="320px"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Stats Cards */}
                    <motion.div
                      className="absolute -bottom-6 -left-6 bg-gradient-to-br from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-sm"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <div className="text-3xl font-bold">3+</div>
                      <div className="text-xs uppercase tracking-wider">Years Exp</div>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-sm"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className="text-3xl font-bold">15+</div>
                      <div className="text-xs uppercase tracking-wider">Projects</div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Column - Content with Modern Typography */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
                className="space-y-8 z-20"
              >
                {/* Modern Badge Pills */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.span
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium backdrop-blur-sm"
                    whileHover={{ scale: 1.05, borderColor: 'rgb(245, 158, 11)' }}
                  >
                    💻 Full Stack
                  </motion.span>
                  <motion.span
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium backdrop-blur-sm"
                    whileHover={{ scale: 1.05, borderColor: 'rgb(168, 85, 247)' }}
                  >
                    🎨 UI/UX Designer
                  </motion.span>
                  <motion.span
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm"
                    whileHover={{ scale: 1.05, borderColor: 'rgb(59, 130, 246)' }}
                  >
                    🚀 React Expert
                  </motion.span>
                </motion.div>

                {/* Hero Title with Modern Style */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.h1
                    className="text-6xl md:text-7xl font-black leading-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <span className="text-white">Hi, I'm </span>
                    <br />
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
                      Shahab Gul
                    </span>
                  </motion.h1>

                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <motion.div
                      className="h-1 w-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: 64 }}
                      transition={{ delay: 1.3, duration: 0.8 }}
                    />
                    <h2 className="text-2xl font-semibold text-gray-300">
                      Full Stack Web Developer
                    </h2>
                  </motion.div>
                </motion.div>

                {/* Description with Glassmorphism Card */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      A passionate full-stack developer and UI/UX designer crafting{' '}
                      <span className="text-yellow-400 font-semibold">innovative digital solutions</span>{' '}
                      that combine functionality with stunning design.
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">3+</div>
                        <div className="text-xs text-gray-400 uppercase">Years</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">15+</div>
                        <div className="text-xs text-gray-400 uppercase">Projects</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">12+</div>
                        <div className="text-xs text-gray-400 uppercase">Clients</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Buttons - Modern Style */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <motion.button
                    onClick={handleDownloadCV}
                    className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={enterDownload}
                    onMouseLeave={leaveHover}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {NavIcons.download}
                      Download CV
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>

                  <motion.a
                    href="/portfolio"
                    className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl backdrop-blur-sm hover:border-yellow-500 hover:bg-white/5 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Projects →
                  </motion.a>
                </motion.div>

                {/* Social Media - Modern Grid */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  {[
                    { name: 'github', url: 'https://github.com/Shahab-2', color: 'from-gray-700 to-gray-900' },
                    { name: 'linkedin', url: 'https://www.linkedin.com/in/shahabgul22/', color: 'from-blue-600 to-blue-800' },
                    { name: 'behance', url: 'https://www.behance.net/shahabgul', color: 'from-blue-500 to-purple-600' }
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.9 + (index * 0.1) }}
                      onMouseEnter={enterLink}
                      onMouseLeave={leaveHover}
                    >
                      <i className={`fab fa-${social.name} text-lg`} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Modern Projects Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'linear-gradient(135deg, #ec4899, #f59e0b)' }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          {/* Modern Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            {/* Badge Pill */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium backdrop-blur-sm mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Portfolio Showcase
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-white">Featured </span>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
                Projects
              </span>
            </h2>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <p className="text-xl text-gray-300 max-w-3xl">
                Innovative web solutions and creative designs that make an impact
              </p>
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Stats Bar */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                <span className="text-2xl font-bold text-yellow-400">15+</span>
                <span className="text-sm text-gray-400 ml-2">Projects Delivered</span>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                <span className="text-2xl font-bold text-purple-400">12+</span>
                <span className="text-sm text-gray-400 ml-2">Happy Clients</span>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                <span className="text-2xl font-bold text-green-400">100%</span>
                <span className="text-sm text-gray-400 ml-2">Success Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Modern Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Human Resource Management System",
                category: "HRM System",
                description: "A comprehensive HR management platform with advanced employee tracking, performance management features, and intuitive user interface design.",
                image: "/assets/ikmal.png",
                link: "https://www.ikmal.sa/",
                technologies: ["React.js", "Next.js", "MySQL", "Bootstrap", "Node.js", "Express.js"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Prime Referral",
                category: "Lead Generation",
                description: "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics and smart lead filtering.",
                image: "/assets/primred.png",
                link: "https://primereferral.us/",
                technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Drap Fit",
                category: "E-commerce",
                description: "A modern e-commerce platform designed to provide a seamless shopping experience with product browsing, smart filtering, and secure checkout.",
                image: "/assets/drapfit.png",
                link: "https://www.drapefit.com/",
                technologies: ["React.js", "Next.js", "MySQL", "Tailwind CSS", "Redux Toolkit", "Node.js"],
                gradient: "from-orange-500 to-red-500"
              },
              {
                title: "Discover Local Lore",
                category: "Tourism Platform",
                description: "An immersive tourism platform that helps users explore hidden gems, local attractions, and cultural experiences with interactive maps.",
                image: "/assets/discoverlore.png",
                link: "https://discoverlocallore.com/",
                technologies: ["Next.js", "React.js", "MUI Material UI", "Tailwind CSS", "MongoDB", "Node.js"],
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "Quran Online",
                category: "Education",
                description: "An online platform designed to provide high-quality Quran tutoring with personalized lessons, live sessions, and interactive learning tools.",
                image: "/assets/quranoneline.png",
                link: "https://quranoneline.com/",
                technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
                gradient: "from-teal-500 to-blue-500"
              },
              {
                title: "Egrowly",
                category: "Social Platform",
                description: "A social platform for community-driven discussions, similar to Reddit. Users can post, comment, vote, and engage in discussions across various topics.",
                image: "/assets/egrowly.png",
                link: "https://egrowly.com/",
                technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js"],
                gradient: "from-violet-500 to-purple-500"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
                whileHover={{ y: -15 }}
              >
                {/* Glassmorphic Card Container */}
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
                  
                  {/* Animated Gradient Border on Hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, transparent, transparent)`,
                      padding: '2px'
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 blur-xl`}></div>
                  </div>

                  {/* Project Image with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    {/* Category Badge */}
                    <motion.div
                      className={`absolute top-4 left-4 z-20 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm`}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {project.category}
                    </motion.div>

                    {/* Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 3 ? "eager" : "lazy"}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
                    
                    {/* Hover View Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-8 py-3 bg-gradient-to-r ${project.gradient} text-white font-bold rounded-full shadow-2xl backdrop-blur-sm flex items-center gap-2`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Live
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="text-xs bg-white/10 backdrop-blur-sm text-gray-300 px-3 py-1.5 rounded-full border border-white/20 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-500/30">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Bottom Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">View Details</span>
                      <motion.div
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300"
                        whileHover={{ rotate: 45, scale: 1.1 }}
                      >
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modern CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.a
              href="/portfolio"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white font-bold rounded-2xl overflow-hidden shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Background Shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10 flex items-center gap-3">
                <span>View All Projects</span>
                <motion.div
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </span>
            </motion.a>

            {/* Supporting Text */}
            <motion.p
              className="text-gray-400 text-sm mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              Explore 15+ more amazing projects →
            </motion.p>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}