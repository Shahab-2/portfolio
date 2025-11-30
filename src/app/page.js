'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [downloadAnimation, setDownloadAnimation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacitySection = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  // Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };

    checkMobile();
    window.addEventListener('resize', debouncedResize);
    if (window.innerWidth >= 1024) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimer);
    };
  }, [cursorX, cursorY]);

  // Active section tracking
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    }
  };

  const enterButton = () => setCursorVariant("button");
  const enterLink = () => setCursorVariant("link");
  const leaveHover = () => setCursorVariant("default");

  // Download CV handler
  const handleDownloadCV = () => {
    setDownloadAnimation(true);
    const link = document.createElement('a');
    link.href = '/assets/ShahabGul-SofwareDeveloper-Resume.pdf';
    link.download = 'ShahabGul-SofwareDeveloper-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadAnimation(false), 2000);
  };

  // Handle video play/pause on hover
  const handleImageHoverEnter = () => {
    setIsHoveringImage(true);
    // Play video after a short delay to allow transition
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.log('Video play error:', err));
      }
      if (mobileVideoRef.current) {
        mobileVideoRef.current.play().catch(err => console.log('Video play error:', err));
      }
    }, 100);
  };

  const handleImageHoverLeave = () => {
    setIsHoveringImage(false);
    // Pause and reset video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.pause();
      mobileVideoRef.current.currentTime = 0;
    }
  };

  // Contact form handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    download: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    )
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.15, ease: "easeOut" } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  // Portfolio items
  const portfolioItems = [
    {
      id: 1,
      images: ["/assets/ikmal.png", "/assets/hrm2.png", "/assets/hrms3.png", "/assets/hrm4.png"],
      category: "HRM System",
      title: "Human Resource Management System",
      description: "A comprehensive HR management platform with advanced employee tracking, performance management features, and intuitive user interface design.",
      projectLink: "https://www.ikmal.sa/",
      technologies: ["React.js", "Next.js", "MySQL", "Bootstrap", "Node.js", "Express.js"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      images: ["/assets/primred.png"],
      category: "Lead Generation",
      title: "Prime Referral",
      description: "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics and smart lead filtering.",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      images: ["/assets/drapfit.png"],
      category: "E-commerce",
      title: "Drap Fit",
      description: "A modern e-commerce platform designed to provide a seamless shopping experience with product browsing, smart filtering, and secure checkout.",
      projectLink: "https://www.drapefit.com/",
      technologies: ["React.js", "Next.js", "MySQL", "Tailwind CSS", "Redux Toolkit", "Node.js"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      images: ["/assets/discoverlore.png"],
      category: "Tourism Platform",
      title: "Discover Local Lore",
      description: "An immersive tourism platform that helps users explore hidden gems, local attractions, and cultural experiences with interactive maps.",
      projectLink: "https://discoverlocallore.com/",
      technologies: ["Next.js", "React.js", "MUI Material UI", "Tailwind CSS", "MongoDB", "Node.js"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      images: ["/assets/quranoneline.png"],
      category: "Education",
      title: "Quran Online",
      description: "An online platform designed to provide high-quality Quran tutoring with personalized lessons, live sessions, and interactive learning tools.",
      projectLink: "https://quranoneline.com/",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      gradient: "from-teal-500 to-blue-500"
    },
    {
      id: 6,
      images: ["/assets/egrowly.png"],
      category: "Social Platform",
      title: "Egrowly",
      description: "A social platform for community-driven discussions, similar to Reddit. Users can post, comment, vote, and engage in discussions across various topics.",
      projectLink: "https://egrowly.com/",
      technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js"],
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  const socialLinks = [
    { name: 'github', url: 'https://github.com/Shahab-2' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/shahabgul22/' },
    { name: 'behance', url: 'https://www.behance.net/shahabgul' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="text-white font-sans min-h-screen transition-colors duration-300 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      ref={containerRef}
    >
      <Head>
        <title>Shahab Gul - Full Stack Developer & UI/UX Designer</title>
        <meta name="description" content="Portfolio of Shahab Gul, Full Stack Developer & UI/UX Designer" />
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
      <div className="hidden lg:flex fixed right-10 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-50">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1, delayChildren: 0.3 }}
          className="space-y-6"
        >
          {[
            { id: 'hero', icon: NavIcons.home, label: 'Home' },
            { id: 'about', icon: NavIcons.about, label: 'About' },
            { id: 'portfolio', icon: NavIcons.portfolio, label: 'Projects' },
            { id: 'contact', icon: NavIcons.contact, label: 'Contact' }
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.div key={item.id} className="group relative">
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveHover}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-sm ${
                    isActive 
                      ? 'bg-yellow-500 text-black scale-110 shadow-lg shadow-yellow-500/50' 
                      : 'bg-gray-800/70 text-white hover:bg-yellow-500 hover:text-black'
                  }`}
                  style={!isActive ? {
                    background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)'
                  } : {}}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                  >
                    {item.icon}
                  </motion.div>
                </motion.button>
                <div className={`absolute right-16 top-1/2 transform -translate-y-1/2 ${
                  isActive ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
                } px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                  {item.label}
                  <div className={`absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 ${
                    isActive ? 'border-l-yellow-500' : 'border-l-gray-800'
                  } border-l-4 border-t-4 border-t-transparent border-b-4 border-b-transparent`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 backdrop-blur-lg z-50 py-3 px-4 safe-bottom"
        style={{ background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)' }}>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex justify-around items-center max-w-xl mx-auto"
        >
          {[
            { id: 'hero', icon: NavIcons.home, label: 'Home' },
            { id: 'about', icon: NavIcons.about, label: 'About' },
            { id: 'portfolio', icon: NavIcons.portfolio, label: 'Projects' },
            { id: 'contact', icon: NavIcons.contact, label: 'Contact' }
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'text-yellow-500' 
                    : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30' 
                      : 'bg-gray-800/70'
                  }`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {item.icon}
                </motion.div>
                <span className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? 'text-yellow-500' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section id="hero" className="container mx-auto px-4 lg:px-8 max-w-6xl min-h-screen flex items-center">
        <AnimatePresence mode="wait">
          {isMobile ? (
            <motion.div
              key="mobile-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 py-16 pb-32 w-full"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg border-2 border-white bg-white cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={handleImageHoverEnter}
                onMouseLeave={handleImageHoverLeave}
                onTouchStart={handleImageHoverEnter}
              >
                <AnimatePresence mode="wait">
                  {isHoveringImage ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full"
                    >
                      <video
                        ref={mobileVideoRef}
                        className="w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        preload="auto"
                        style={{ willChange: 'transform' }}
                      >
                        <source src="/portfolio.mp4" type="video/mp4" />
                      </video>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src="/shahabprofile.png"
                        alt="Shahab Gul"
                        fill
                        priority
                        className="object-cover"
                        quality={90}
                        sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="space-y-3 sm:space-y-4 px-4">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold"
                >
                  <span className="text-yellow-500 font-extrabold">Shahab</span> <span className="tracking-wide">Gul</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <h2 className="text-xs sm:text-sm md:text-base font-semibold tracking-wide text-gray-200">Full Stack Web Developer</h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-300 max-w-md mx-auto text-xs sm:text-sm leading-relaxed font-medium"
                >
                  A passionate full-stack developer and UI/UX designer crafting
                  innovative digital solutions that combine functionality with stunning design.
                </motion.p>
              </div>

              <motion.button
                onClick={handleDownloadCV}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 text-black font-medium shadow-lg rounded-full transition duration-300 text-xs sm:text-sm"
                style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
              >
                <span className="mr-2">{NavIcons.download}</span>
                Download CV
              </motion.button>

              <motion.div
                className="flex space-x-4 sm:space-x-5 mt-4 sm:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.8) 100%)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.9 + (index * 0.1) } }}
                  >
                    <i className={`fab fa-${social.name} text-sm sm:text-base`} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="desktop-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 min-h-screen items-center gap-16 relative px-8 w-full"
            >
              {/* Decorative Background */}
              <motion.div
                className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Left Column - Profile Image */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center items-center relative z-20"
              >
                <motion.div className="relative" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
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

                  <motion.div
                    className="relative p-2 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      onMouseEnter={handleImageHoverEnter}
                      onMouseLeave={handleImageHoverLeave}
                    >
                      <div className="absolute inset-0 rounded-2xl p-[3px]"
                        style={{
                          background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #ec4899, #8b5cf6)',
                          backgroundSize: '400% 400%',
                          animation: 'gradient 15s ease infinite'
                        }}
                      >
                        <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
                          <AnimatePresence mode="wait">
                            {isHoveringImage ? (
                              <motion.div
                                key="video"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="relative w-full h-full"
                              >
                                <video
                                  ref={videoRef}
                                  className="w-full h-full object-cover"
                                  loop
                                  muted
                                  playsInline
                                  preload="auto"
                                  style={{ willChange: 'transform' }}
                                >
                                  <source src="/portfolio.mp4" type="video/mp4" />
                                </video>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="profile"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="relative w-full h-full"
                              >
                                <Image
                                  src="/shahabprofile.png"
                                  alt="Shahab Gul"
                                  fill
                                  priority
                                  className="object-cover"
                                  quality={90}
                                  sizes="320px"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>

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

              {/* Right Column - Content */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
                className="space-y-8 z-20"
              >
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.span
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    💻 Full Stack
                  </motion.span>
                  <motion.span
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    🎨 UI/UX Designer
                  </motion.span>
                  <motion.span
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    🚀 React Expert
                  </motion.span>
                </motion.div>

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
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {NavIcons.download}
                      Download CV
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => scrollToSection('portfolio')}
                    className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl backdrop-blur-sm hover:border-yellow-500 hover:bg-white/5 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Projects →
                  </motion.button>
                </motion.div>

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
                    >
                      <i className={`fab fa-${social.name} text-lg`} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 sm:py-32 pb-32 sm:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              About Me
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 px-4">
              <span className="text-white">Know Me </span>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
                Better
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-20 px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                Full Stack Engineer
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                With over <span className="text-yellow-400 font-semibold">3+ years of experience</span>, I specialize in building modern web applications using cutting-edge technologies like React, Next.js, Node.js, and cloud services.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                I'm passionate about creating <span className="text-yellow-400 font-semibold">scalable solutions</span> that deliver exceptional user experiences. My expertise spans both frontend and backend development, with a strong focus on performance optimization and clean code architecture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {[
                { number: '3+', label: 'Years\nExperience', gradient: 'from-blue-500 to-cyan-500' },
                { number: '15+', label: 'Completed\nProjects', gradient: 'from-purple-500 to-pink-500' },
                { number: '12+', label: 'Happy\nCustomers', gradient: 'from-orange-500 to-red-500' },
                { number: '3+', label: 'Awards\nWon', gradient: 'from-green-500 to-emerald-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 text-center shadow-2xl"
                  whileHover={{ y: -10, boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h2
                    className={`text-5xl font-black bg-gradient-to-br ${stat.gradient} text-transparent bg-clip-text`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {stat.number}
                  </motion.h2>
                  <p className="text-sm text-gray-300 text-center font-bold tracking-wider uppercase whitespace-pre-line mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-8 text-center">
              <span className="text-white">Technical </span>
              <span className="text-yellow-500">Skills</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'React.js', level: 88 },
                { name: 'Next.js', level: 90 },
                { name: 'Node.js', level: 88 },
                { name: 'TypeScript', level: 85 },
                { name: 'JavaScript', level: 90 },
                { name: 'MongoDB', level: 82 },
                { name: 'PostgreSQL', level: 80 },
                { name: 'Tailwind CSS', level: 92 }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-700 stroke-current"
                        strokeWidth="8"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <motion.circle
                        className="stroke-current text-yellow-500"
                        strokeWidth="8"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
                        whileInView={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - skill.level/100)}` }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{skill.level}%</span>
                    </div>
                  </div>
                  <span className="text-white text-sm font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-20 sm:py-32 pb-32 sm:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'linear-gradient(135deg, #ec4899, #f59e0b)' }}
            animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Portfolio Showcase
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 px-4">
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
                whileHover={{ y: -15 }}
              >
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 blur-xl`}></div>

                  <div className="relative h-56 overflow-hidden">
                    <motion.div
                      className={`absolute top-4 left-4 z-20 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm`}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {project.category}
                    </motion.div>

                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
                    
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <motion.a
                        href={project.projectLink}
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

                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

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
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 sm:py-32 pb-40 sm:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              Get In Touch
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 px-4">
              <span className="text-white">Let's Work </span>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
                Together
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 px-4">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center">
                <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-info-circle text-gray-900"></i>
                </span>
                CONTACT INFO
              </h3>

              <div className="space-y-6">
                <motion.div className="flex items-start group" whileHover={{ x: 5 }}>
                  <div className="w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-yellow-500 transition-colors duration-300">
                    <i className="fas fa-map-marker-alt text-yellow-500 text-xl group-hover:text-gray-900 transition-colors duration-300"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-yellow-500 mb-2 uppercase tracking-wider">ADDRESS</h4>
                    <p className="text-gray-300">Islamabad, Pakistan</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start group" whileHover={{ x: 5 }}>
                  <div className="w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-yellow-500 transition-colors duration-300">
                    <i className="fas fa-envelope text-yellow-500 text-xl group-hover:text-gray-900 transition-colors duration-300"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-yellow-500 mb-2 uppercase tracking-wider">EMAIL</h4>
                    <p className="text-gray-300 break-all">shahabgul117@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start group" whileHover={{ x: 5 }}>
                  <div className="w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-yellow-500 transition-colors duration-300">
                    <i className="fas fa-phone-alt text-yellow-500 text-xl group-hover:text-gray-900 transition-colors duration-300"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-yellow-500 mb-2 uppercase tracking-wider">PHONE</h4>
                    <p className="text-gray-300">+923155463297</p>
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-white/10 pt-8 mt-8">
                <h4 className="font-bold text-sm text-yellow-500 mb-4 uppercase tracking-wider">FIND ME ON</h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/shahabgul22/', name: 'LinkedIn' },
                    { icon: 'fab fa-github', url: 'https://github.com/Shahab-2', name: 'GitHub' },
                    { icon: 'fab fa-behance', url: 'https://www.behance.net/shahabgul', name: 'Behance' },
                    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/shahabgul_/', name: 'Instagram' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300 group"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className={`${social.icon} text-yellow-500 group-hover:text-gray-900 transition-colors duration-300`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center">
                <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-paper-plane text-gray-900"></i>
                </span>
                SEND MESSAGE
              </h3>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 flex items-center"
                >
                  <i className="fas fa-check-circle mr-3 text-xl"></i>
                  <p>Message sent successfully! I'll get back to you soon.</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 flex items-center"
                >
                  <i className="fas fa-exclamation-circle mr-3 text-xl"></i>
                  <p>Something went wrong. Please try again later.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-6 py-4 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white peer"
                      required
                    />
                    <label className="absolute left-6 top-4 text-gray-400 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:bg-gray-700 peer-focus:px-1">
                      YOUR NAME
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-6 py-4 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white peer"
                      required
                    />
                    <label className="absolute left-6 top-4 text-gray-400 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:bg-gray-700 peer-focus:px-1">
                      YOUR EMAIL
                    </label>
                  </div>
                </div>
                <div className="relative mb-5">
                  <input
                    type="text"
                    name="subject"
                    placeholder=" "
                    value={formData.subject}
                    onChange={handleFormChange}
                    className="w-full px-6 py-4 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white peer"
                    required
                  />
                  <label className="absolute left-6 top-4 text-gray-400 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:bg-gray-700 peer-focus:px-1">
                    YOUR SUBJECT
                  </label>
                </div>
                <div className="relative mb-6">
                  <textarea
                    name="message"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleFormChange}
                    rows="7"
                    className="w-full px-6 py-4 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white resize-none peer"
                    required
                  ></textarea>
                  <label className="absolute left-6 top-4 text-gray-400 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:bg-gray-700 peer-focus:px-1">
                    YOUR MESSAGE
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-gray-900 font-bold shadow-lg flex items-center transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-yellow-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <span className="ml-4 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                        <i className="fas fa-paper-plane text-yellow-500 text-sm"></i>
                      </span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 text-center text-gray-400 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            {[
              { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/shahabgul22/' },
              { icon: 'fab fa-github', url: 'https://github.com/Shahab-2' },
              { icon: 'fab fa-behance', url: 'https://www.behance.net/shahabgul' },
              { icon: 'fab fa-instagram', url: 'https://www.instagram.com/shahabgul_/' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Shahab Gul. All rights reserved.</p>
          <p className="text-xs mt-2 text-gray-500">Full Stack Developer & UI/UX Designer</p>
        </div>
      </footer>
    </motion.div>
  );
}
