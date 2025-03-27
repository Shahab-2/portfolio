'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Resume = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Add smooth scrolling for anchor links
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skills = [
    { name: 'HTML', level: 95, color: '#E44D26' },
    { name: 'JavaScript', level: 89, color: '#F7DF1E' },
    { name: 'CSS', level: 88, color: '#264DE4' },
    { name: 'PHP', level: 78, color: '#777BB3' },
    { name: 'WordPress', level: 95, color: '#21759B' },
    { name: 'jQuery', level: 80, color: '#0769AD' },
    { name: 'Angular', level: 75, color: '#DD0031' },
    { name: 'React', level: 85, color: '#61DAFB' },
  ];

  const experiences = [
    {
      period: '2021 - PRESENT',
      title: 'SENIOR DEVELOPER',
      company: 'ENVATO',
      description: 'Led cross-functional teams in developing responsive web applications. Implemented CI/CD pipelines and mentored junior developers on best practices.'
    },
    {
      period: '2018 - 2021',
      title: 'FULL-STACK DEVELOPER',
      company: 'THEMEFOREST',
      description: 'Developed and maintained multiple high-traffic website themes. Collaborated with UX designers to implement accessible and responsive interfaces.'
    },
    {
      period: '2015 - 2018',
      title: 'UI/UX CONSULTANT',
      company: 'VIDEOHIVE',
      description: 'Created wireframes and prototypes for client projects. Conducted usability testing and implemented feedback-driven improvements to user interfaces.'
    }
  ];

  const education = [
    {
      year: '2019',
      degree: 'ADVANCED CERTIFICATION',
      school: 'OXFORD UNIVERSITY',
      description: 'Advanced Web Development Program focusing on modern JavaScript frameworks, API design, and enterprise architecture patterns.'
    },
    {
      year: '2015',
      degree: 'MASTER\'S DEGREE',
      school: 'KIEV UNIVERSITY',
      description: 'Master of Science in Computer Science with specialization in Human-Computer Interaction and User Experience Design.'
    },
    {
      year: '2013',
      degree: 'BACHELOR DEGREE',
      school: 'TUNIS HIGH SCHOOL',
      description: 'Bachelor of Science in Information Technology with minor in Graphic Design. Graduated with honors and dean\'s list recognition.'
    }
  ];

  const SkillCircle = ({ name, level, color, index }) => {
    return (
      <motion.div 
        className="flex flex-col items-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <div className="relative w-32 h-32 mb-3 group">
          <svg className="w-full h-full transform transition-transform duration-500 group-hover:scale-105" viewBox="0 0 100 100">
            <circle 
              className="text-gray-700 stroke-current" 
              strokeWidth="8" 
              cx="50" 
              cy="50" 
              r="40" 
              fill="transparent"
            />
            {isClient && (
              <motion.circle 
                className="stroke-current" 
                style={{ color }}
                strokeWidth="8" 
                strokeLinecap="round" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
                animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - level/100)}` }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.1 }}
                transform="rotate(-90 50 50)"
              />
            )}
            <motion.text 
              x="50" 
              y="50" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="fill-white text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {level}%
            </motion.text>
          </svg>
          <motion.div 
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center bg-gray-900 border-2 border-white group-hover:bg-gray-800 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-xs font-semibold" style={{ color }}>+{Math.floor(level/10)}</span>
          </motion.div>
        </div>
        <span className="mt-1 text-white text-sm uppercase tracking-wider font-medium">{name}</span>
        <div className="w-10 h-1 mt-1 rounded-full" style={{ backgroundColor: color }}></div>
      </motion.div>
    );
  };

  const TimelineItem = ({ period, title, company, description, isEducation = false, index }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, x: isEducation ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2, duration: 0.6 }}
        className="relative pl-8 pb-10 ml-6 border-l-2 border-yellow-500 last:border-l-0 last:pb-0 group"
      >
        <motion.div 
          className="absolute -left-8 top-0 w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          whileHover={{ scale: 1.2, rotate: 5 }}
        >
          <i className={`fas ${isEducation ? 'fa-graduation-cap' : 'fa-briefcase'} text-gray-900 text-xl`}></i>
        </motion.div>
        <div className="mb-1 text-sm text-gray-400 font-medium tracking-wider">{period}</div>
        <h4 className="text-white text-lg font-bold flex items-center flex-wrap">
          <span className="mr-2 text-white">{title}</span> 
          <span className="mx-2 text-yellow-500">—</span> 
          <span className="text-gray-300">{company}</span>
        </h4>
        <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-lg">{description}</p>
        <motion.div 
          className="absolute bottom-3 left-8 w-2 h-2 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        ></motion.div>
      </motion.div>
    );
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <motion.button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center transition-colors duration-300 focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-white`}></i>
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-64 bg-gray-800 bg-opacity-95 backdrop-blur-sm shadow-xl md:hidden"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="mb-8 pb-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Steve <span className="text-yellow-500">Milner</span></h2>
                <p className="text-gray-400 text-sm">Web Developer</p>
              </div>
              <nav className="flex-1">
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => scrollToSection('about')}
                      className={`flex items-center text-left w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'about' ? 'bg-yellow-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <i className="fas fa-user mr-3"></i> About
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('skills')}
                      className={`flex items-center text-left w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'skills' ? 'bg-yellow-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <i className="fas fa-code mr-3"></i> Skills
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('experience')}
                      className={`flex items-center text-left w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'experience' ? 'bg-yellow-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <i className="fas fa-briefcase mr-3"></i> Experience
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className={`flex items-center text-left w-full px-4 py-2 rounded-lg transition-colors ${activeSection === 'contact' ? 'bg-yellow-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <i className="fas fa-envelope mr-3"></i> Contact
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="pt-4 border-t border-gray-700 flex space-x-3">
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                  <i className="fab fa-dribbble"></i>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation Icons */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <motion.div 
          className="flex flex-col space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.button 
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 group ${activeSection === 'about' ? 'bg-yellow-500' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => scrollToSection('about')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas fa-user text-xl ${activeSection === 'about' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">About Me</span>
          </motion.button>
          <motion.button 
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 group ${activeSection === 'skills' ? 'bg-yellow-500' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => scrollToSection('skills')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas fa-code text-xl ${activeSection === 'skills' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">My Skills</span>
          </motion.button>
          <motion.button 
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 group ${activeSection === 'experience' ? 'bg-yellow-500' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => scrollToSection('experience')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas fa-briefcase text-xl ${activeSection === 'experience' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Experience</span>
          </motion.button>
          <motion.button 
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 group ${activeSection === 'contact' ? 'bg-yellow-500' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas fa-envelope text-xl ${activeSection === 'contact' ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Contact</span>
          </motion.button>
          <div className="h-px w-8 bg-gray-700 mx-auto"></div>
          <motion.a 
            href="#" 
            className="w-14 h-14 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-download text-xl text-gray-300 group-hover:text-white"></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Download CV</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Header */}
      <header className="relative text-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center opacity-10">
          <motion.h1 
            className="text-9xl md:text-[20rem] font-black text-white tracking-widest"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 0.05, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            RESUME
          </motion.h1>
        </div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10"
        >
          <motion.div 
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <h2 className="text-5xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">
                <span className="text-white">MY</span> <span className="text-yellow-500">RESUME</span>
              </span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-500 opacity-20 rounded-sm"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
              ></motion.span>
            </h2>
          </motion.div>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-300 mt-4 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Web developer with extensive experience creating elegant, responsive solutions
          </motion.p>
        </motion.div>
      </header>

      {/* Personal Information */}
      <motion.section 
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-4 pb-32 pt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors duration-300 shadow-xl"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-user text-gray-900"></i>
              </span>
              PERSONAL INFOS
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">First Name:</p>
                <p className="font-medium text-lg">Steve</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Last Name:</p>
                <p className="font-medium text-lg">Milner</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Age:</p>
                <p className="font-medium text-lg">27 Years</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Nationality:</p>
                <p className="font-medium text-lg">Tunisian</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Freelance:</p>
                <p className="font-medium text-lg text-green-500">Available</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Address:</p>
                <p className="font-medium text-lg">Tunis</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Phone:</p>
                <p className="font-medium text-lg">+21621184010</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Email:</p>
                <p className="font-medium text-lg">you@mail.com</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Skype:</p>
                <p className="font-medium text-lg">steve.milner</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Languages:</p>
                <p className="font-medium text-lg">French, English</p>
              </div>
            </div>
            <motion.button 
              className="mt-8 px-8 py-4 bg-gray-900 hover:bg-yellow-500 transition-colors duration-300 rounded-xl flex items-center font-medium text-sm uppercase tracking-wider group shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>DOWNLOAD CV</span> 
              <span className="relative ml-2 w-6 h-6 flex items-center justify-center overflow-hidden rounded-full bg-yellow-500 group-hover:bg-white transition-colors">
                <i className="fas fa-download text-gray-900 text-xs"></i>
              </span>
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 auto-rows-fr">
            <motion.div 
              className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-700 hover:border-gray-600 transition-colors shadow-lg overflow-hidden relative group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <motion.h2 
                className="text-5xl font-bold text-yellow-500 relative z-10"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                6<sup>+</sup>
              </motion.h2>
              <div className="w-12 h-1 bg-yellow-500 my-3 rounded-full"></div>
              <p className="text-sm text-gray-300 text-center font-medium tracking-wider uppercase">YEARS OF<br />EXPERIENCE</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-700 hover:border-gray-600 transition-colors shadow-lg overflow-hidden relative group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <motion.h2 
                className="text-5xl font-bold text-yellow-500 relative z-10"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
              >
                97<sup>+</sup>
              </motion.h2>
              <div className="w-12 h-1 bg-yellow-500 my-3 rounded-full"></div>
              <p className="text-sm text-gray-300 text-center font-medium tracking-wider uppercase">COMPLETED<br />PROJECTS</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-700 hover:border-gray-600 transition-colors shadow-lg overflow-hidden relative group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <motion.h2 
                className="text-5xl font-bold text-yellow-500 relative z-10"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 }}
              >
                81<sup>+</sup>
              </motion.h2>
              <div className="w-12 h-1 bg-yellow-500 my-3 rounded-full"></div>
              <p className="text-sm text-gray-300 text-center font-medium tracking-wider uppercase">HAPPY<br />CUSTOMERS</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-700 hover:border-gray-600 transition-colors shadow-lg overflow-hidden relative group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <motion.h2 
                className="text-5xl font-bold text-yellow-500 relative z-10"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
              >
                53<sup>+</sup>
              </motion.h2>
              <div className="w-12 h-1 bg-yellow-500 my-3 rounded-full"></div>
              <p className="text-sm text-gray-300 text-center font-medium tracking-wider uppercase">AWARDS<br />WON</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Experience & Education */}
      <motion.section 
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-4 py-20 pt-10"
      >
        <div className="text-center mb-16">
          <motion.div
            className="inline-block"
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-bold relative inline-block">
              <span className="relative z-10">
                <span className="text-white">EXPERIENCE</span> <span className="text-yellow-500">&</span> <span className="text-white">EDUCATION</span>
              </span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-500 opacity-20 rounded-sm"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              ></motion.span>
            </h3>
          </motion.div>
          <motion.p 
            variants={fadeInUp}
            className="max-w-xl mx-auto text-gray-400 mt-4"
          >
            Professional journey and academic background
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <motion.div 
            variants={staggerContainer}
            className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 transition-colors duration-300 shadow-xl"
          >
            <h4 className="text-xl font-bold mb-10 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-briefcase text-gray-900 text-sm"></i>
              </span>
              WORK EXPERIENCE
            </h4>
            <div className="ml-2">
              {experiences.map((exp, index) => (
                <TimelineItem 
                  key={index}
                  period={exp.period}
                  title={exp.title}
                  company={exp.company}
                  description={exp.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 transition-colors duration-300 shadow-xl"
          >
            <h4 className="text-xl font-bold mb-10 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-graduation-cap text-gray-900 text-sm"></i>
              </span>
              EDUCATION
            </h4>
            <div className="ml-2">
              {education.map((edu, index) => (
                <TimelineItem 
                  key={index}
                  period={edu.year}
                  title={edu.degree}
                  company={edu.school}
                  description={edu.description}
                  isEducation={true}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section 
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto px-4 py-20 pt-10"
      >
        <div className="text-center mb-16">
          <motion.div
            variants={fadeInUp}
            className="inline-block"
          >
            <h3 className="text-3xl font-bold relative inline-block">
              <span className="relative z-10">
                <span className="text-white">MY</span> <span className="text-yellow-500">SKILLS</span>
              </span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-500 opacity-20 rounded-sm"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              ></motion.span>
            </h3>
          </motion.div>
          <motion.p 
            variants={fadeInUp}
            className="max-w-xl mx-auto text-gray-400 mt-4"
          >
            Expertise in modern web technologies and development practices
          </motion.p>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCircle 
              key={index} 
              name={skill.name} 
              level={skill.level} 
              color={skill.color}
              index={index}
            />
          ))}
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          className="mt-16 bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors duration-300 shadow-xl"
        >
          <h4 className="text-xl font-bold mb-6 flex items-center">
            <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
              <i className="fas fa-tools text-gray-900 text-sm"></i>
            </span>
            ADDITIONAL TOOLS & TECHNOLOGIES
          </h4>
          <div className="flex flex-wrap gap-3">
            {["Git", "Docker", "AWS", "Firebase", "MongoDB", "GraphQL", "TypeScript", "Next.js", "TailwindCSS", "Node.js", "Express", "Vue.js"].map((tool, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-gray-700 bg-opacity-50 rounded-full text-sm font-medium hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 cursor-default"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
            {/* Footer */}
            <footer className="py-8 px-4 text-center text-gray-400 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-4 mb-4">
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300"
              whileHover={{ y: -3 }}
            >
              <i className="fab fa-linkedin-in"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300"
              whileHover={{ y: -3 }}
            >
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300"
              whileHover={{ y: -3 }}
            >
              <i className="fab fa-twitter"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300"
              whileHover={{ y: -3 }}
            >
              <i className="fab fa-dribbble"></i>
            </motion.a>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Steve Milner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default Resume;