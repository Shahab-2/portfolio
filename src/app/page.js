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

    return () => {
      document.head.removeChild(fontStylesElement);
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

  // Tech icons with improved configuration for animations
  const techIcons = [
    { name: 'react', color: '#61DAFB', size: 28, position: { left: '15%', top: '20%' }, delay: 0 },
    { name: 'node-js', color: '#339933', size: 32, position: { left: '75%', top: '15%' }, delay: 0.5 },
    { name: 'js', color: '#F7DF1E', size: 26, position: { left: '25%', top: '75%' }, delay: 1 },
    { name: 'html5', color: '#E34F26', size: 30, position: { left: '65%', top: '65%' }, delay: 1.5 },
    { name: 'css3-alt', color: '#1572B6', size: 28, position: { left: '85%', top: '40%' }, delay: 2 },
    { name: 'git-alt', color: '#F05032', size: 24, position: { left: '10%', top: '45%' }, delay: 2.5 },
    { name: 'sass', color: '#CC6699', size: 28, position: { left: '40%', top: '10%' }, delay: 3 },
    { name: 'vuejs', color: '#4FC08D', size: 22, position: { left: '35%', top: '85%' }, delay: 3.5 },
    { name: 'npm', color: '#CB3837', size: 26, position: { left: '15%', top: '60%' }, delay: 4 },
  ];

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

  // Download button animation
  const downloadButtonVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: {
      scale: 1.08,
      opacity: 1,
      boxShadow: "0 20px 35px -10px rgba(245, 158, 11, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        duration: 0.3
      }
    },
    tap: {
      scale: 0.92,
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

  // Tech icon animations
  const techIconVariants = {
    initial: { opacity: 0, scale: 0, rotate: -10 },
    animate: (custom) => ({
      opacity: [0.15, 0.3, 0.15],
      scale: [1, 1.1, 1],
      rotate: [-2, 2, -2],
      filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
      transition: {
        duration: 8,
        delay: custom.delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }
    }),
    hover: {
      opacity: 0.6,
      scale: 1.2,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0.3 }
    }
  };

  // Mobile tech icon variants 
  const mobileTechIconVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (custom) => ({
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1, 0.8],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        delay: custom.delay % 3,
        repeat: Infinity,
        repeatType: "mirror",
      }
    })
  };

  // Download CV handler
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/ShahabGul-SoftwareDeveloper.pdf'; // Correct path from public folder
    link.download = 'ShahabGul-SoftwareDeveloper.pdf'; // Desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`${textPrimary} font-sans
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

      {/* Floating background elements - Enhanced with more variations */}
      {!isMobile && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`float-${i}`}
              className={`absolute rounded-full blur-3xl opacity-20 ${i % 3 === 0 ? 'bg-yellow-300/10' :
                  i % 3 === 1 ? 'bg-yellow-500/10' : 'bg-blue-500/5'
                }`}
              style={{
                width: `${100 + (i * 30)}px`,
                height: `${100 + (i * 30)}px`,
                top: `${15 + (i * 20)}%`,
                left: `${10 + (i * 15)}%`,
                zIndex: 1
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
                rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                transition: {
                  duration: 5 + (i * 0.5),
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          ))}
        </>
      )}

      {/* Enhanced Tech Icons - Desktop Version */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {techIcons.map((icon, index) => (
            <motion.div
              key={`tech-${icon.name}`}
              className="absolute"
              style={{
                ...icon.position,
                fontSize: `${icon.size}px`,
                color: darkMode ? `${icon.color}20` : `${icon.color}15`,
                zIndex: 0,
              }}
              variants={techIconVariants}
              custom={{ delay: icon.delay }}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <i className={`fab fa-${icon.name}`}></i>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mobile Tech Icons - Simplified and fewer */}
      {isMobile && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {techIcons.slice(0, 5).map((icon, index) => (
            <motion.div
              key={`mobile-tech-${icon.name}`}
              className="absolute"
              style={{
                left: `${10 + (index * 20)}%`,
                top: `${10 + ((index % 3) * 25)}%`,
                fontSize: `${icon.size * 0.7}px`,
                color: darkMode ? `${icon.color}25` : `${icon.color}15`,
              }}
              variants={mobileTechIconVariants}
              custom={{ delay: index }}
              initial="initial"
              animate="animate"
            >
              <i className={`fab fa-${icon.name}`}></i>
            </motion.div>
          ))}
        </div>
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
            href="#"
            icon={NavIcons.chat}
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
                whileHover={{ scale: 1.05, rotateX: 0, rotateY: 0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 to-yellow-300 opacity-30 z-10" />
                <Image
                  src="/shahab.jpeg"
                  alt="Shahab Gul"
                  fill
                  priority
                  className="object-cover"
                />
                {/* Animated frame around image */}
                <motion.div
                  className="absolute inset-0 border-4 border-yellow-400 z-20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {/* Corner decorations */}
                  {[
                    "top-0 left-0 origin-top-left",
                    "top-0 right-0 origin-top-right",
                    "bottom-0 left-0 origin-bottom-left",
                    "bottom-0 right-0 origin-bottom-right"
                  ].map((position, i) => (
                    <motion.div
                      key={`corner-${i}`}
                      className={`absolute w-8 h-8 ${position}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + (i * 0.1), duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 w-2 h-8 bg-yellow-400 rounded-full"
                        animate={{ rotate: 0 }}
                        initial={{ rotate: i % 2 === 0 ? -90 : 0 }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 w-8 h-2 bg-yellow-400 rounded-full"
                        animate={{ rotate: 0 }}
                        initial={{ rotate: i % 2 === 0 ? 0 : 90 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  variants={childVariants}
                  className="text-4xl font-bold"
                >
                  <motion.span
                    className={`${textAccent} inline-block font-extrabold`}
                    animate={{
                      textShadow: ["0px 0px 0px rgba(245, 158, 11, 0)", "0px 0px 10px rgba(245, 158, 11, 0.5)", "0px 0px 0px rgba(245, 158, 11, 0)"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    Shahab
                  </motion.span> <span className="tracking-wide">Gul</span>
                </motion.h1>

                <motion.div
                  variants={childVariants}
                  className="flex items-center justify-center space-x-2"
                >
                  <motion.span
                    className="w-8 h-1 bg-yellow-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "2rem" }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                  <h2 className={`text-base font-semibold tracking-wide ${textSecondary}`}>Web Designer & Developer</h2>
                  <motion.span
                    className="w-8 h-1 bg-yellow-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "2rem" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  />
                </motion.div>

                <motion.p
                  variants={childVariants}
                  className={`${textTertiary} max-w-md mx-auto text-sm leading-relaxed font-medium ${letterSpacing}`}
                >
                  A passionate web designer and front-end developer creating
                  clean, user-friendly digital experiences that make a difference.
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
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400
                  text-black font-medium shadow-xl rounded-full transition duration-500 ease-in-out transform group"
                >
                  <motion.span
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5
                    }}
                    className="mr-2"
                  >
                    {NavIcons.download}
                  </motion.span>
                  Download CV
                  <motion.span
                    className="ml-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5
                    }}
                  >
                    ✓
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Social Media Icons for Mobile with staggered bounce animation */}
              <motion.div
                className="flex space-x-5 mt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                {[
                  { name: 'github', url: 'https://github.com/yourusername' },
                  { name: 'linkedin', url: 'https://linkedin.com/in/yourusername' },
                  { name: 'behance', url: 'https://behance.net/yourusername' }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
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
                      className={`fab fa-${social.name} text-lg`}
                      whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                    />
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
                {/* Interactive particles on yellow background */}
                <div className="absolute w-full h-full">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-2 h-2 rounded-full bg-black/20"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        x: [0, (Math.random() * 50) - 25, 0],
                        y: [0, (Math.random() * 50) - 25, 0],
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, Math.random() + 1, 1],
                      }}
                      transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Moving geometric shapes */}
                <motion.div
                  className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border-8 border-black/10"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                    rotate: [0, 45, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 15,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute top-20 right-10 w-40 h-40 rounded-3xl border-4 border-black/10 rotate-12"
                  animate={{
                    scale: [1, 0.8, 1],
                    rotate: [12, -10, 12]
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 12,
                    ease: "easeInOut"
                  }}
                />
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
                  className="relative w-70 h-70 rounded-2xl overflow-hidden 
                    shadow-2xl border-8 border-white z-20"
                  style={{
                    transform: "perspective(1000px) rotateY(-15deg)",
                    boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.3)"
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Profile image with interactive overlay effects */}
                  <Image
                    src="/shahab.jpeg"
                    alt="Shahab Gul"
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Animated overlay effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-500/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                  />

                  {/* Interactive scan line effect */}
                  <motion.div
                    className="absolute left-0 w-full h-10 bg-yellow-500/20 backdrop-blur-sm"
                    initial={{ top: "-10%", opacity: 0 }}
                    animate={{
                      top: ["0%", "100%"],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Animated frame */}
                  <motion.div
                    className="absolute inset-0 border-4 border-yellow-400/50 rounded-lg z-10"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    {/* Corner decorations */}
                    {[
                      "top-0 left-0 origin-top-left",
                      "top-0 right-0 origin-top-right",
                      "bottom-0 left-0 origin-bottom-left",
                      "bottom-0 right-0 origin-bottom-right"
                    ].map((position, i) => (
                      <motion.div
                        key={`corner-${i}`}
                        className={`absolute w-10 h-10 ${position}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.7 + (i * 0.1), duration: 0.5 }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 w-2 h-10 bg-yellow-400 rounded-full"
                          animate={{ rotate: 0 }}
                          initial={{ rotate: i % 2 === 0 ? -90 : 0 }}
                        />
                        <motion.div
                          className="absolute top-0 left-0 w-10 h-2 bg-yellow-400 rounded-full"
                          animate={{ rotate: 0 }}
                          initial={{ rotate: i % 2 === 0 ? 0 : 90 }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Decorative elements around image with enhanced animations */}
                <motion.div
                  className="absolute -bottom-10 -left-10 w-24 h-24 bg-yellow-400 rounded-lg z-10"
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                />
                <motion.div
                  className="absolute -top-5 -right-5 w-16 h-16 bg-yellow-500 rounded-full z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 }
                  }}
                />

                {/* Additional decorative element with animation */}
                <motion.div
                  className="absolute top-1/4 -right-20 w-20 h-20 rounded-md bg-yellow-300/30 backdrop-blur-sm z-5"
                  initial={{ opacity: 0, x: 20, rotate: 45 }}
                  animate={{ opacity: 0.8, x: 0, rotate: 25 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.1,
                    transition: { duration: 0.3 }
                  }}
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
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <motion.span
                        className={`${textAccent} font-extrabold drop-shadow-sm ml-[10px]`}
                        animate={{
                          textShadow: ["0px 0px 0px rgba(245, 158, 11, 0)", "0px 0px 15px rgba(245, 158, 11, 0.7)", "0px 0px 0px rgba(245, 158, 11, 0)"]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        Shahab
                      </motion.span> <span className="tracking-wide">Gul</span>
                    </motion.h1>
                  </div>
                </motion.div>

                <motion.h2
                  className={`text-4xl font-bold leading-tight ml-[79px] ${textPrimary} drop-shadow-sm my-4`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  J. Full Stack Developer
                  <motion.span
                    className={`${textAccent} ml-2 inline-block font-extrabold`}
                    animate={{
                      rotateX: [0, 10, 0],
                      rotateY: [0, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                     & Designer
                  </motion.span>
                </motion.h2>

                <motion.p
                  className={`text-xl ${textTertiary} max-w-xl leading-relaxed font-medium ml-[80px]`}
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
                  <motion.button
                    onClick={handleDownloadCV}
                    variants={downloadButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onMouseEnter={enterDownload}
                    onMouseLeave={leaveHover}
                    className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-yellow-500 
                    text-white-500 hover:bg-yellow-500 hover:text-white 
                    rounded-full transition-all duration-500 ease-in-out transform hover:shadow-xl text-lg ml-[80px]"
                  >
                    <motion.span
                      className="mr-3 text-xl"
                      animate={{
                        y: [0, -4, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5
                      }}
                    >
                      {NavIcons.download}
                    </motion.span>
                    Download CV
                    <motion.span
                      className="ml-2 opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2
                      }}
                    >
                      ✓
                    </motion.span>
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.6 }}
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
                      className="w-20 h-20 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-300 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
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
                        className={`fab fa-${social.name} text-lg`}
                        whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                      />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Experience Stats with enhanced 3D hover effect */}
                <motion.div
                  className="grid grid-cols-3 gap-6 mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                >
                  {[
                    { number: '2+', label: 'Years Experience' },
                    { number: '10+', label: 'Projects Completed' },
                    { number: '10+', label: 'Happy Clients' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-300"
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)",
                        background: "rgba(30, 30, 30, 0.4)",
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 2.5 + (index * 0.1) }
                      }}
                    >
                      <motion.span
                        className={`text-3xl font-extrabold ${textAccent}`}
                        animate={{
                          scale: [1, 1.1, 1],
                          textShadow: ["0px 0px 0px rgba(245, 158, 11, 0)", "0px 0px 10px rgba(245, 158, 11, 0.5)", "0px 0px 0px rgba(245, 158, 11, 0)"]
                        }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 3,
                          delay: index * 0.5
                        }}
                      >
                        {stat.number}
                      </motion.span>
                      <span className={`text-xs font-medium ${textSecondary} mt-1`}>{stat.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* Typing cursor effect on dark theme only */}
      {darkMode && !isMobile && (
        <motion.div
          className="fixed bottom-5 left-5 w-4 h-10 bg-yellow-500/70"
          animate={{
            opacity: [1, 0, 1],
            scaleY: [1, 0.9, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
}