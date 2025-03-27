'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Image from 'next/image';

const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [isClient, setIsClient] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const portfolioItems = [
    {
      id: 1,
      image: '/images/paper-origami.jpg',
      category: 'GRAPHIC DESIGN',
      title: 'Paper Origami Design',
      description: 'Creative paper folding and design techniques',
      client: 'CreativeFold Inc.',
      alt: 'Paper origami design'
    },
    {
      id: 2,
      image: '/images/lucky-cat.jpg',
      category: 'MOCKUP',
      title: 'Lucky Cat Figurine',
      description: 'Product mockup for traditional Japanese figurine',
      client: 'Tokyo Gifts',
      alt: 'Lucky cat figurine'
    },
    {
      id: 3,
      image: '/images/tools.jpg',
      category: 'MOCKUP',
      title: 'Tool Collection',
      description: 'Professional product photography for tool catalog',
      client: 'Handyman Tools',
      alt: 'Tools and hardware'
    },
    {
      id: 4,
      image: '/images/fortune-cookies.jpg',
      category: 'MOCKUP',
      title: 'Fortune Cookies',
      description: 'Food photography and product design',
      client: 'Golden Dragon Restaurant',
      alt: 'Fortune cookies'
    },
    {
      id: 5,
      image: '/images/paper-butterfly.jpg',
      category: 'GRAPHIC DESIGN',
      title: 'Paper Butterfly',
      description: 'Delicate paper art for greeting card line',
      client: 'Paperie Boutique',
      alt: 'Paper butterfly'
    },
    {
      id: 6,
      image: '/images/pink-flower.jpg',
      category: 'GRAPHIC DESIGN',
      title: 'Pink Flower',
      description: 'Macro photography for beauty product branding',
      client: 'Natural Beauty Co.',
      alt: 'Pink flower'
    },
    {
      id: 7,
      image: '/images/paper-boat.jpg',
      category: 'LOGO',
      title: 'Paper Boat Logo',
      description: 'Minimalist logo design for travel agency',
      client: 'Ocean Voyages',
      alt: 'Orange paper boat'
    },
    {
      id: 8,
      image: '/images/paper-butterfly-blue.jpg',
      category: 'LOGO',
      title: 'Blue Butterfly',
      description: 'Logo design for mental health app',
      client: 'Tranquil Mind',
      alt: 'Blue paper butterfly'
    },
    {
      id: 9,
      image: '/images/pencil.jpg',
      category: 'VIDEO',
      title: 'Pencil Animation',
      description: 'Stop motion video for art supplies company',
      client: 'Creative Arts Supply',
      alt: 'Green pencil'
    }
  ];

  const filterCategories = ['ALL', 'LOGO', 'VIDEO', 'GRAPHIC DESIGN', 'MOCKUP'];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
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

  const filteredItems = selectedFilter === 'ALL' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedFilter);

  const openItemDetails = (item) => {
    setSelectedItem(item);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative pb-16">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      {/* Navigation Icons - Right Side */}
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
            className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-briefcase text-xl text-white"></i>
            <span className="absolute right-16 bg-gray-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Portfolio</span>
          </motion.a>
          <motion.a 
            href="/contact"
            className="w-14 h-14 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-envelope text-xl text-gray-300 group-hover:text-white"></i>
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
            WORKS
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
                <span className="text-white">MY</span> <span className="text-yellow-500">PORTFOLIO</span>
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
            Showcasing my creative work and design projects
          </motion.p>
        </motion.div>
      </header>

      {/* Filter Menu */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-4 mb-16 flex flex-wrap justify-center"
      >
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-6 relative pb-2">
          <LayoutGroup id="filters">
            {filterCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedFilter(category)}
                className={`px-3 md:px-6 py-2 font-medium text-sm md:text-base transition-all duration-300 ${
                  selectedFilter === category 
                    ? 'text-yellow-500' 
                    : 'text-white hover:text-yellow-300'
                }`}
              >
                {category}
                {selectedFilter === category && (
                  <motion.div 
                    layoutId="filterUnderline"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-500"
                    style={{ 
                      width: '100%',
                      left: 0,
                      bottom: 0,
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </LayoutGroup>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700"></div>
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="overflow-hidden rounded-xl group relative bg-gray-800 shadow-xl"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-700 rounded-t-xl overflow-hidden">
                  {isClient && (
                    <div className="relative w-full h-60 md:h-64">
                      <Image 
                        src={`/api/placeholder/800/600`} 
                        alt={item.alt}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-yellow-500 bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          <div className="flex space-x-4 mb-4">
                            <motion.button 
                              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openItemDetails(item)}
                            >
                              <i className="fas fa-search text-yellow-500 text-lg"></i>
                            </motion.button>
                            <motion.a 
                              href="#" 
                              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <i className="fas fa-link text-yellow-500 text-lg"></i>
                            </motion.a>
                          </div>
                          <h4 className="text-white font-bold text-lg text-center">
                            {item.title}
                          </h4>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-700">
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-yellow-500 text-sm">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeItemDetails}
          >
            <motion.div 
              className="bg-gray-800 rounded-xl max-w-4xl w-full overflow-hidden relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300 z-10"
                onClick={closeItemDetails}
              >
                <i className="fas fa-times text-white"></i>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image 
                    src={`/api/placeholder/800/800`} 
                    alt={selectedItem.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedItem.title}</h3>
                  <p className="text-gray-300 mb-6">{selectedItem.description}</p>
                  
                  <div className="border-t border-gray-700 pt-6 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="text-white font-medium">{selectedItem.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Client</p>
                        <p className="text-white font-medium">{selectedItem.client}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <motion.button 
                      className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;