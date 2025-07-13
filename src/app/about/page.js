'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Resume = () => {
  const [isClient, setIsClient] = useState(false);
  const [downloadAnimation, setDownloadAnimation] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    { name: 'CSS', level: 92, color: '#1572B6' },
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'React.js', level: 88, color: '#61DAFB' },
    { name: 'Next.js', level: 90, color: '#000000' },
    { name: 'Node.js', level: 88, color: '#339933' },
    { name: 'Express.js', level: 85, color: '#000000' },
    { name: 'MongoDB', level: 82, color: '#47A248' },
    { name: 'PostgreSQL', level: 80, color: '#336791' },
    { name: 'Git', level: 88, color: '#F05032' },
    { name: 'Docker', level: 75, color: '#2496ED' },
  ];

  const experiences = [
    {
      period: 'APRIL 2025 - PRESENT',
      title: 'FULL STACK ENGINEER',
      company: 'DROPPGROUP',
      description: 'Leading development of cutting-edge AI-powered applications and Web 3.0 solutions. Specializing in blockchain integration, smart contracts, and decentralized applications (DApps). Implementing advanced AI algorithms and machine learning models for predictive analytics and automation. Collaborating with cross-functional teams to architect scalable solutions using modern technologies like React, Node.js, and blockchain frameworks.'
    },
    {
      period: '2023 - 2025',
      title: 'SOFTWARE DEVELOPER',
      company: 'CODE ENTERPRISE PVT LTD.',
      description: 'Developed and maintained multiple SaaS products serving diverse client needs. Led end-to-end development of enterprise web applications using React.js, Node.js, and cloud technologies. Implemented CI/CD pipelines, automated testing, and deployment strategies. Mentored junior developers and established coding standards. Specialized in building scalable microservices architecture and RESTful APIs.'
    },
    {
      period: '2022 - 2023',
      title: 'FRONT END DEVELOPER',
      company: 'SURG ENGINE MEDIA PVT LTD.',
      description: 'Built responsive and interactive user interfaces for web applications using modern JavaScript frameworks. Collaborated with design teams to implement pixel-perfect designs and ensure optimal user experience. Optimized application performance, implemented responsive design principles, and ensured cross-browser compatibility. Worked on multiple client projects delivering high-quality frontend solutions.'
    }
  ];

  const education = [
    {
      year: '2020 - 2024',
      degree: 'BACHELORS IN COMPUTER SCIENCE',
      school: 'FEDERAL URDU UNIVERSITY OF ARTS SCIENCE AND TECHNOLOGY ISLAMABAD',
      description: 'Advanced Web Development Program focusing on modern JavaScript frameworks, API design, and enterprise architecture patterns.'
    },
    {
      year: '2019',
      degree: 'FSC PRE ENGENEERING',
      school: 'ISLAMABAD MODEL COLLEGE FOR BOYS ISLAMABAD G-9/4',
      description: 'Advanced Web Development Program focusing on modern JavaScript frameworks, API design, and enterprise architecture patterns.'
    },


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



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>



      {/* Back to Home Button */}
      <div className="fixed top-8 left-8 z-50">
        <motion.a 
          href="/"
          className="w-14 h-14 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group border border-gray-700 hover:border-yellow-500 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <i className="fas fa-arrow-left text-xl text-gray-300 group-hover:text-white"></i>
          <span className="absolute left-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Back to Home</span>
        </motion.a>
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
                <p className="font-medium text-lg">Shahab</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Last Name:</p>
                <p className="font-medium text-lg">Gul</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Age:</p>
                <p className="font-medium text-lg">25 Years</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Nationality:</p>
                <p className="font-medium text-lg">Pakistani</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Freelance:</p>
                <p className="font-medium text-lg text-green-500">Available</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Address:</p>
                <p className="font-medium text-lg">Islamabad</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Phone:</p>
                <p className="font-medium text-lg break-all">+923155463297</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Email:</p>
                <p className="font-medium text-lg break-all">shahabgul117@gmail.com</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Skype:</p>
                <p className="font-medium text-lg break-all">live:.cid.9ec40613bfef8a5e</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">Languages:</p>
                <p className="font-medium text-lg">English, Urdu, Pashto, Punjabi</p>
              </div>
            </div>
            <motion.button 
              onClick={handleDownloadCV}
              className="mt-8 px-8 py-4 bg-gray-900 hover:bg-yellow-500 transition-colors duration-300 rounded-xl flex items-center font-medium text-sm uppercase tracking-wider group shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={downloadAnimation ? 'animate-pulse' : ''}>DOWNLOAD CV</span>
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
                3<sup>+</sup>
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
                15<sup>+</sup>
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
                12<sup>+</sup>
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
                3<sup>+</sup>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "AWS", category: "Cloud" },
              { name: "Vercel", category: "Deployment" },
              { name: "Netlify", category: "Deployment" },
              { name: "TailwindCSS", category: "Styling" },
              { name: "Bootstrap", category: "Styling" },
              { name: "Material UI", category: "UI Library" },
              { name: "GraphQL", category: "API" },
              { name: "REST APIs", category: "API" },
              { name: "Jest", category: "Testing" },
              { name: "Cypress", category: "Testing" },
              { name: "Webpack", category: "Build Tools" },
              { name: "Vite", category: "Build Tools" }
            ].map((tool, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-3 bg-gray-700 bg-opacity-50 rounded-lg text-sm font-medium hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 cursor-default group"
              >
                <div className="font-semibold">{tool.name}</div>
                <div className="text-xs text-gray-400 group-hover:text-gray-700">{tool.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-4 py-20 pt-10"
      >
        <div className="text-center mb-16">
          <motion.div
            variants={fadeInUp}
            className="inline-block"
          >
            <h3 className="text-3xl font-bold relative inline-block">
              <span className="relative z-10">
                <span className="text-white">GET IN</span> <span className="text-yellow-500">TOUCH</span>
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
            Let's discuss your next project and bring your ideas to life
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            variants={fadeInUp}
            className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors duration-300 shadow-xl"
          >
            <h4 className="text-xl font-bold mb-8 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-envelope text-gray-900 text-sm"></i>
              </span>
              CONTACT INFORMATION
            </h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-gray-900"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium break-all">shahabgul117@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-phone text-gray-900"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium break-all">+923155463297</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-gray-900"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">Islamabad, Pakistan</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i className="fab fa-skype text-gray-900"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Skype</p>
                  <p className="text-white font-medium">live:.cid.9ec40613bfef8a5e</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors duration-300 shadow-xl"
          >
            <h4 className="text-xl font-bold mb-8 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-share-alt text-gray-900 text-sm"></i>
              </span>
              SOCIAL LINKS
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <motion.a 
                href="#" 
                className="flex items-center space-x-3 p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 group"
                whileHover={{ y: -2 }}
              >
                <i className="fab fa-linkedin-in text-xl"></i>
                <span className="font-medium">LinkedIn</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="flex items-center space-x-3 p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 group"
                whileHover={{ y: -2 }}
              >
                <i className="fab fa-github text-xl"></i>
                <span className="font-medium">GitHub</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="flex items-center space-x-3 p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 group"
                whileHover={{ y: -2 }}
              >
                <i className="fab fa-twitter text-xl"></i>
                <span className="font-medium">Twitter</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="flex items-center space-x-3 p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 group"
                whileHover={{ y: -2 }}
              >
                <i className="fab fa-dribbble text-xl"></i>
                <span className="font-medium">Dribbble</span>
              </motion.a>
            </div>
            <motion.button 
              onClick={handleDownloadCV}
              className="mt-8 w-full px-8 py-4 bg-yellow-500 hover:bg-yellow-400 transition-colors duration-300 rounded-xl flex items-center justify-center font-medium text-gray-900 text-sm uppercase tracking-wider group shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={downloadAnimation ? 'animate-pulse' : ''}>DOWNLOAD RESUME</span>
              <i className="fas fa-download ml-2"></i>
            </motion.button>
          </motion.div>
        </div>
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
          <p className="text-sm">© {new Date().getFullYear()} Shahab Gul. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default Resume;