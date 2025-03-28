'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSubmitStatus('success');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
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

  const socialLinks = [
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/shahabgul22/', name: 'LinkedIn' },
    { icon: 'fab fa-github', url: 'https://github.com/Shahab-2', name: 'GitHub' },
    { icon: 'fab fa-behance', url: 'https://www.behance.net/shahabgul', name: 'Behance' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/shahabgul_/', name: 'Instagram' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative pb-20 md:pb-0">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Navigation Icons - Right Side (Desktop) */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <motion.div 
          className="flex flex-col space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.a 
            href="/"
            className="w-14 h-14 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-home text-xl text-gray-300 group-hover:text-white"></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Home</span>
          </motion.a>
          <motion.a 
            href="/about"
            className="w-14 h-14 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-user text-xl text-gray-300 group-hover:text-white"></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">About</span>
          </motion.a>
          <motion.a 
            href="/portfolio"
            className="w-14 h-14 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-briefcase text-xl text-gray-300 group-hover:text-white"></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Portfolio</span>
          </motion.a>
          {/* <motion.a 
            href="/resume"
            className="w-14 h-14 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-file-alt text-xl text-gray-300 group-hover:text-white"></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Resume</span>
          </motion.a> */}
          <motion.a 
            href="/contact"
            className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-envelope text-xl text-white"></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Contact</span>
          </motion.a>
          <motion.a 
            href="/blog"
            className="w-14 h-14 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-comment text-xl text-gray-300 group-hover:text-white"></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Blog</span>
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
            CONTACT
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
                <span className="text-white">GET IN</span> <span className="text-yellow-500">TOUCH</span>
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
            Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities.
          </motion.p>
        </motion.div>
      </header>

      {/* Contact Content */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-6xl mx-auto px-4 pb-20 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div 
            variants={fadeInUp}
            className="order-2 md:order-1 bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors duration-300 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-info-circle text-gray-900"></i>
              </span>
              DON'T BE SHY!
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions. Let's create something amazing together!
            </p>

            {/* Address */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-start mb-8 group"
            >
              <div className="w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-yellow-500 transition-colors duration-300">
                <i className="fas fa-map-marker-alt text-yellow-500 text-xl group-hover:text-gray-900 transition-colors duration-300"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-yellow-500 mb-2 uppercase tracking-wider">ADDRESS POINT</h4>
                <p className="text-gray-300">Islamabad, Pakistan</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-start mb-8 group"
            >
              <div className="w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-yellow-500 transition-colors duration-300">
                <i className="fas fa-envelope text-yellow-500 text-xl group-hover:text-gray-900 transition-colors duration-300"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-yellow-500 mb-2 uppercase tracking-wider">MAIL ME</h4>
                <p className="text-gray-300">shahabgul117@gmail.com</p>
                <p className="text-gray-300 mt-1">shahab.education1@gmail.com</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-start mb-10 group"
            >
              <div className="w-14 h-14 bg-gray-700 rounded-lg flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-yellow-500 transition-colors duration-300">
                <i className="fas fa-phone-alt text-yellow-500 text-xl group-hover:text-gray-900 transition-colors duration-300"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-yellow-500 mb-2 uppercase tracking-wider">CALL ME</h4>
                <p className="text-gray-300">+923155463297</p>
                {/* <p className="text-gray-300 mt-1">+1 800 555 3947</p> */}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              variants={fadeInUp}
              className="border-t border-gray-700 pt-8"
            >
              <h4 className="font-bold text-sm text-yellow-500 mb-4 uppercase tracking-wider">FIND ME ON</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300 group"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    variants={fadeInUp}
                  >
                    <i className={`${social.icon} text-yellow-500 group-hover:text-gray-900 transition-colors duration-300`}></i>
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div 
            variants={fadeInUp}
            className="order-1 md:order-2 bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors duration-300 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-paper-plane text-gray-900"></i>
              </span>
              SEND ME A MESSAGE
            </h3>
            
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
                exit={{ opacity: 0, y: -20 }}
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
                    id="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white peer"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-6 top-4 text-gray-400 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:bg-gray-700 peer-focus:px-1"
                  >
                    YOUR NAME
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white peer"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-6 top-4 text-gray-400 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:bg-gray-700 peer-focus:px-1"
                  >
                    YOUR EMAIL
                  </label>
                </div>
              </div>
              <div className="relative mb-5">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder=" "
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white peer"
                  required
                />
                <label 
                  htmlFor="subject" 
                  className="absolute left-6 top-4 text-gray-400 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:bg-gray-700 peer-focus:px-1"
                >
                  YOUR SUBJECT
                </label>
              </div>
              <div className="relative mb-6">
                <textarea
                  name="message"
                  id="message"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  rows="7"
                  className="w-full px-6 py-4 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white resize-none peer"
                  required
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-6 top-4 text-gray-400 transition-all duration-200 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-yellow-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:bg-gray-700 peer-focus:px-1"
                >
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
      </motion.section>

      {/* Map Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-6xl mx-auto px-4 pb-20 mt-8"
      >
        <div className="h-96 bg-gray-800 rounded-2xl overflow-hidden relative">
          {/* This would be replaced with an actual map component in production */}
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marker-alt text-gray-900 text-2xl"></i>
              </div>
              <p className="text-white text-lg font-medium mb-2">Islamabad, Pakistan</p>
              <p className="text-gray-400">Map would be displayed here</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mobile Navigation - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 z-50">
        <div className="flex justify-around py-3">
          <motion.a 
            href="/"
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300"
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-home text-white"></i>
          </motion.a>
          <motion.a 
            href="/about"
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300"
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-user text-white"></i>
          </motion.a>
          <motion.a 
            href="/portfolio"
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300"
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-briefcase text-white"></i>
          </motion.a>
          <motion.a 
            href="/resume"
            className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300"
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-file-alt text-white"></i>
          </motion.a>
          <motion.a 
            href="/contact"
            className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-envelope text-white"></i>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Contact;