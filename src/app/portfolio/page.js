"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Portfolio = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const portfolioItems = [
    {
      id: 1,
      images: [
        "/assets/ikmal.png",
        "/assets/hrms-2.png",
        "/assets/hrms-3.png",
        "/assets/hrms-4.png"
      ],
      category: "Web Development",
      title: "Human Resource Management System",
      description:
        "A comprehensive HR management platform with advanced employee tracking, performance management features, and intuitive user interface design.",
      client: "Saudian Client",
      alt: "Human Resource Management System Screenshots",
      projectLink: "https://www.ikmal.sa/",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express"],
      features: [
        "Employee Performance Tracking",
        "Advanced Reporting",
        "Role-Based Access Control",
        "Attendance Management"
      ]
    },
    {
      id: 2,
      images: [
        "/assets/marble.png",
        "/assets/ecommerce-2.png",
        "/assets/ecommerce-3.png",
        "/assets/ecommerce-4.png"
      ],
      category: "E-Commerce",
      title: "Modern E-Commerce Platform",
      description:
        "A full-featured online shopping experience with advanced product filtering, secure payment integration, and responsive design.",
      client: "Global Retail Solutions",
      alt: "E-Commerce Website Screenshots",
      projectLink: "https://www.marblestore.sa/",
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "GraphQL"],
      features: [
        "Product Filtering",
        "Secure Payments",
        "User Authentication",
        "Responsive Design"
      ]
    },
    {
      id: 3,
      images: [
        "/assets/zad-ksa.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Food Industry",
      description:
        "Powerful data visualization and business intelligence dashboard with real-time reporting, advanced charting, and interactive insights.",
      client: "Tech Innovations Inc.",
      alt: "Analytics Dashboard Screenshots",
      projectLink: "https://zad-ksa.com/",
      technologies: ["React", "Chart.js", "Firebase", "Material-UI", "Redux"],
      features: [
        "Real-Time Reporting",
        "Interactive Charts",
        "Data Filtering",
        "Performance Metrics"
      ]
    },
    {
      images: [
        "/assets/primred.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/bathleganza.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/drapfit.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/serniore.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/discoverlore.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/quranoneline.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/egrowly.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/iscs-uk.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/abadzone.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/virrgotech.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/lfmaudio.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      images: [
        "/assets/whitepinefunding.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const openItemDetails = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % (selectedItem?.images.length || 1)
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 
        ? (selectedItem?.images.length || 1) - 1 
        : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative pb-16">
      {/* Header Section (Previous implementation remains the same) */}
      <header className="relative text-center py-12 md:py-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              MY
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-yellow-500"
            >
              PROJECTS
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-2xl mx-auto text-gray-300 mt-2 md:mt-4 text-base md:text-lg px-4"
          >
            Innovative solutions and creative web experiences
          </motion.p>
        </motion.div>
      </header>

      {/* Portfolio Grid - Mobile Responsive */}
      <motion.div
        className="max-w-6xl mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          <AnimatePresence>
            {portfolioItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="overflow-hidden rounded-2xl group relative bg-gray-800 shadow-2xl border border-gray-700 hover:border-yellow-500 transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Mobile and Desktop Layout */}
                <div className="w-full md:w-2/3 bg-gray-700 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden relative">
                  {isClient && (
                    // <div className="relative w-full aspect-video">
                    //   <Image
                    //     src={item.images[0]}
                    //     alt={item.alt}
                    //     layout="fill"
                    //     objectFit="cover"
                    //     className="transition-transform duration-700 group-hover:scale-105"
                    //     placeholder="blur"
                    //     blurDataURL={item.images[0]}
                    //   />
                    //   {/* Hover Overlay - Same as before */}
                    // </div>
                    <div className="relative w-full h-100">
                  <Image 
                    src={item.images[0]} 
                    alt={item.alt}
                    width={1200} // Adjust as needed
                    height={1200} // Adjust as needed
                    objectFit="cover"
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL="/assets/ikmal.png"
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
                          <Link href={item.projectLink} target="_blank">
                            <motion.div 
                              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <i className="fas fa-link text-yellow-500 text-lg"></i>
                            </motion.div>
                          </Link>
                        </div>
                        <h4 className="text-white font-bold text-xl text-center">
                          {item.title}
                        </h4>
                      </motion.div>
                    </div>
                  </div>

                  )}
                </div>
                
                <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xl md:text-2xl mb-2">
                      {item.title}
                    </h4>
                    <p className="text-yellow-500 text-base md:text-lg mb-4">
                      {item.category}
                    </p>
                    <p className="text-gray-300 text-sm md:text-base mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <div className="mb-4">
                      <p className="text-gray-400 text-xs md:text-sm mb-2">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.slice(0,3).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-yellow-500 px-2 py-1 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                      <Link href={item.projectLink} target="_blank">
                        <motion.button
                          className="w-full md:w-auto px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Project
                        </motion.button>
                      </Link>
                      <motion.button
                        className="w-full md:w-auto px-4 py-2 border border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openItemDetails(item)}
                      >
                        Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Project Details Modal - Mobile Responsive */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeItemDetails}
          >
            <motion.div
              className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300 z-10"
                onClick={closeItemDetails}
              >
                <i className="fas fa-times text-white text-sm md:text-base"></i>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 relative">
                {/* Image Carousel */}
                <div className="relative h-64 md:h-[500px] overflow-hidden">
                  <Image
                    src={selectedItem.images[currentImageIndex]}
                    alt={`${selectedItem.alt} - Image ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-500"
                  />
                  {selectedItem.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 md:p-2 rounded-full hover:bg-yellow-500 transition-colors"
                      >
                        <i className="fas fa-chevron-left text-sm md:text-base"></i>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 md:p-2 rounded-full hover:bg-yellow-500 transition-colors"
                      >
                        <i className="fas fa-chevron-right text-sm md:text-base"></i>
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedItem.images.map((_, index) => (
                      <span
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex 
                            ? 'bg-yellow-500' 
                            : 'bg-gray-400'
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto max-h-[500px]">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                    {selectedItem.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-8">
                    {selectedItem.description}
                  </p>

                  <div className="border-t border-gray-700 pt-4 md:pt-6 mt-4 md:mt-6">
                    <div className="grid grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">Category</p>
                        <p className="text-white font-medium text-sm md:text-lg">
                          {selectedItem.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm">Client</p>
                        <p className="text-white font-medium text-sm md:text-lg">
                          {selectedItem.client}
                        </p>
                      </div>
                    </div>

                    {/* Technologies Used */}
                    <div className="mb-4 md:mb-8">
                      <p className="text-gray-400 text-xs md:text-sm mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-yellow-500 px-2 md:px-4 py-1 rounded-full text-xs md:text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-4 md:mb-8">
                      <p className="text-gray-400 text-xs md:text-sm mb-2">Key Features</p>
                      <ul className="list-disc list-inside text-white space-y-1 md:space-y-2 text-xs md:text-base">
                        {selectedItem.features.map((feature, index) => (
                          <li key={index} className="text-gray-300">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <Link href={selectedItem.projectLink} target="_blank">
                      <motion.button
                        className="w-full px-4 py-2 md:px-8 md:py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 text-sm md:text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Live Project
                      </motion.button>
                    </Link>
                    <motion.button
                      className="w-full px-4 py-2 md:px-8 md:py-4 border border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 text-sm md:text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeItemDetails}
                    >
                      Close
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