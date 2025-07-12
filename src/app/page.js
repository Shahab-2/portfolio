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

  // Import fonts in useEffect to ensure they're loaded
  useEffect(() => {
    // Add font-display: swap to improve text rendering during font loading
    const fontStylesElement = document.createElement('style');
    fontStylesElement.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
      
      body {
        font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
    `;
    document.head.appendChild(fontStylesElement);

    // Set loaded state after fonts are loaded
    const timer = setTimeout(() => setIsLoaded(true), 500);

    return () => {
      document.head.removeChild(fontStylesElement);
      clearTimeout(timer);
    };
  }, []);

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

  // Added rotation for 3D effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateXSpring = useSpring(rotateX, { stiffness: 500, damping: 50 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 500, damping: 50 });



  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      cursorX.set(clientX - 16); // Adjust cursor position
      cursorY.set(clientY - 16);

      // Update rotation based on mouse position for 3D effect
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotX = (clientY - centerY) / 30;
        const rotY = (clientX - centerX) / 30;

        rotateX.set(rotX);
        rotateY.set(-rotY);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY, rotateX, rotateY]);

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

  // Simplified animation variants
  const buttonVariants = {
    initial: { scale: 1, opacity: 0.9 },
    hover: {
      scale: 1.02,
      opacity: 1,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  // Download button animation
  const downloadButtonVariants = {
    initial: { scale: 1, opacity: 0.9 },
    hover: {
      scale: 1.03,
      opacity: 1,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };



  // Download CV handler with improved user feedback
  const handleDownloadCV = () => {
    // Add loading state
    setDownloadAnimation(true);
    
    const link = document.createElement('a');
    link.href = '/assets/ShahabGul-SoftwareDeveloper.pdf';
    link.download = 'ShahabGul-SoftwareDeveloper.pdf';
    
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



  // Animated gradient background
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
      transition={{ duration: 0.8 }}
      className={`${textPrimary} font-sans
        min-h-screen transition-colors duration-700 overflow-hidden bg-gradient-to-br ${gradientColors}`}
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
        </motion.div>
      </div>

      {/* Enhanced Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        style={{ opacity: opacitySection, scale }}
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
                  className="inline-flex items-center px-6 py-3 bg-yellow-500 text-black font-medium shadow-lg rounded-full transition duration-300 text-sm"
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
                    className="w-12 h-12 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={enterLink}
                    onMouseLeave={leaveHover}
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
              className="grid grid-cols-2 min-h-screen items-center gap-12 relative"
              exit={{ opacity: 0, x: -100 }}
            >
              {/* Enhanced Yellow Background Section with interactive particles */}
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



              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3
                }}
                className="flex justify-center items-center relative z-20"
                ref={imageRef}
                style={{ y: imageY }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6
                  }}
                  className="relative w-70 h-70 rounded-full overflow-hidden 
                    shadow-lg border-4 border-white bg-white z-20"
                  style={{
                    boxShadow: "0 15px 40px -10px rgba(0, 0, 0, 0.2)"
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Profile image with interactive overlay effects */}
                  <Image
                    src="/shahabprofile.png"
                    alt="Shahab Gul"
                    fill
                    priority
                    className="object-cover"
                  />






                </motion.div>


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
                className="space-y-8 z-20 "
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className='mb-2 ml-3'
                >
                  <div className="flex items-center space-x-4 ">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '3rem' }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="h-1 bg-yellow-500 rounded-full"
                    ></motion.div>
                                    <motion.h1
                  className="text-4xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.2,
                    duration: 0.5
                  }}
                >
                  <span className={`${textAccent} font-extrabold ml-[10px]`}>Shahab</span> <span className="tracking-wide">Gul</span>
                </motion.h1>
                  </div>
                </motion.div>

                <motion.h2
                  className={`text-4xl font-bold leading-tight ml-[79px] ${textPrimary} my-4`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  Full Stack Web Developer
                </motion.h2>

                <motion.p
                  className={`text-xl ${textTertiary} max-w-xl leading-relaxed font-medium ml-[80px]`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  A passionate full-stack developer and UI/UX designer crafting
                  innovative digital solutions that combine functionality with stunning design.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                >
                  <motion.button
                    onClick={handleDownloadCV}
                    variants={downloadButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onMouseEnter={enterDownload}
                    onMouseLeave={leaveHover}
                    className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-yellow-500 
                    text-white hover:bg-yellow-500 hover:text-black 
                    rounded-full transition-all duration-300 text-lg ml-[80px]"
                  >
                    <span className="mr-3 text-xl">
                      {NavIcons.download}
                    </span>
                    Download CV
                  </motion.button>
                </motion.div>

                {/* Desktop Social Media Icons with staggered animation */}
                {/* <motion.div 
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
                      whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={enterLink}
                      onMouseLeave={leaveHover}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          delay: 2.1 + (index * 0.1) 
                        }
                      }}
                    >
                      <motion.i 
                        className={`fab fa-${social} text-lg`}
                        whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                      />
                    </motion.a>
                  ))}
                </motion.div> */}
                <motion.div
                  className="flex space-x-5 mt-6 ml-[80px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.4 }}
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
                      className="w-14 h-14 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={enterLink}
                      onMouseLeave={leaveHover}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 1.9 + (index * 0.1) }
                      }}
                    >
                      <i className={`fab fa-${social.name} text-base`} />
                    </motion.a>
                  ))}
                </motion.div>


              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Projects Section */}
      <section className="py-20 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${textPrimary}`}>
              Featured <span className={textAccent}>Projects</span>
            </h2>
            <p className={`text-lg ${textTertiary} max-w-2xl mx-auto`}>
              Explore my latest work showcasing innovative web solutions and creative designs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Human Resource Management System",
                category: "HRM System Website",
                description: "A comprehensive HR management platform with advanced employee tracking, performance management features, and intuitive user interface design.",
                image: "/assets/ikmal.png",
                link: "https://www.ikmal.sa/",
                technologies: ["React.js", "Next.js", "MySQL", "Bootstrap", "Node.js", "Express.js"]
              },
              {
                title: "Prime Referral",
                category: "Lead Generation Website",
                description: "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics and smart lead filtering.",
                image: "/assets/primred.png",
                link: "https://primereferral.us/",
                technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"]
              },
              {
                title: "Drap Fit",
                category: "E-commerce Website",
                description: "A modern e-commerce platform designed to provide a seamless shopping experience with product browsing, smart filtering, and secure checkout.",
                image: "/assets/drapfit.png",
                link: "https://www.drapefit.com/",
                technologies: ["React.js", "Next.js", "MySQL", "Tailwind CSS", "Redux Toolkit", "Node.js"]
              },
              {
                title: "Discover Local Lore",
                category: "Tourism Web Application",
                description: "An immersive tourism platform that helps users explore hidden gems, local attractions, and cultural experiences with interactive maps.",
                image: "/assets/discoverlore.png",
                link: "https://discoverlocallore.com/",
                technologies: ["Next.js", "React.js", "MUI Material UI", "Tailwind CSS", "MongoDB", "Node.js"]
              },
              {
                title: "Quran Online",
                category: "Web Application",
                description: "An online platform designed to provide high-quality Quran tutoring with personalized lessons, live sessions, and interactive learning tools.",
                image: "/assets/quranoneline.png",
                link: "https://quranoneline.com/",
                technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"]
              },
              {
                title: "Egrowly",
                category: "Web Application",
                description: "A social platform for community-driven discussions, similar to Reddit. Users can post, comment, vote, and engage in discussions across various topics.",
                image: "/assets/egrowly.png",
                link: "https://egrowly.com/",
                technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js"]
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-500 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-400 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project
                    </motion.a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-yellow-500 text-sm font-medium">{project.category}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${textPrimary} group-hover:text-yellow-500 transition-colors duration-300`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm ${textTertiary} mb-4 line-clamp-3`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-yellow-500 text-black font-medium rounded-full hover:bg-yellow-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}