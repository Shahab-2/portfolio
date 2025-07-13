"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


const Portfolio = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const portfolioItems = [
    {
      id: 1,
      images: [
        "/assets/ikmal.png",
        "/assets/hrm2.png",
        "/assets/hrms3.png",
        "/assets/hrm4.png"
      ],
      category: "HRM System Website",
      title: "Human Resource Management System",
      description:
        "A comprehensive HR management platform with advanced employee tracking, performance management features, and intuitive user interface design.",
      client: "Saudian Client",
      alt: "Human Resource Management System Screenshots",
      projectLink: "https://www.ikmal.sa/",
      technologies: ["React.js", "Next.js", "Mysql", "Bootstrap", "Node.js", "Express.js"],
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
        "/assets/primred.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Lead Generation Website",
      title: "Prime Referral",
      description:
        "A cutting-edge lead generation platform designed to connect businesses with high-quality prospects. Features real-time analytics, smart lead filtering, and detailed performance tracking.",
      client: "Prime Referral",
      alt: "Prime Referral Dashboard Screenshots",
      projectLink: "https://primereferral.us/",
      technologies: ["Next.js", "serverless", "Typescript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Lead Generation Services",
        "Smart Lead Filtering",
        "Real-Time Analytics",
        "Performance Tracking",
        "Client Dashboard"
      ]
    },
    {
      id: 3,
      images: [
        "/assets/drapfit.png",
        "/assets/shop-product.png",
        "/assets/shop-cart.png",
        "/assets/shop-checkout.png"
      ],
      category: "E-commerce Website",
      title: "Drap Fit",
      description:
        "A modern e-commerce platform designed to provide a seamless shopping experience. It features product browsing, smart filtering, a secure checkout process, and responsive design for all devices.",
      client: "ShopEase Online",
      alt: "ShopEase E-commerce Website Screenshots",
      projectLink: "https://www.drapefit.com/",
      technologies: ["React.js", "Next.js", "MySQL", "Tailwind CSS", "Redux Toolkit", "Node.js", "Express.js"],
      features: [
        "Product Listing and Search",
        "Smart Filtering by Category & Price",
        "User Authentication & Dashboard",
        "Shopping Cart & Wishlist",
        "Secure Checkout with Order Tracking"
      ]
    },
    {
      id: 4,
      images: [
        "/assets/discoverlore.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Tourism Web Application",
      title: "Discover Local Lore",
      description:
        "An immersive tourism platform that helps users explore hidden gems, local attractions, and cultural experiences. Includes interactive maps, itinerary planning, and user-submitted stories to enrich travel experiences.",
      client: "Discover Local Lore",
      alt: "Discover Local Lore Dashboard Screenshots",
      projectLink: "https://discoverlocallore.com/",
      technologies: ["Next.js", "React.js", "MUI Material UI", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Tourist Attraction Listings",
        "Interactive Maps & Itinerary Planner",
        "User Reviews & Ratings",
        "Cultural Stories and Local Insights",
        "Responsive Design for All Devices"
      ]
    },
    {
      id: 5,
      images: [
        "/assets/quranoneline.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Quran Online",
      description:
        "An online platform designed to provide high-quality Quran tutoring with personalized lessons, live sessions, and interactive learning tools. Features include progress tracking, Quranic studies resources, and teacher-student communication.",
      client: "Quran Online",
      alt: "Quran Online Tutoring Platform Screenshots",
      projectLink: "https://quranoneline.com/",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Personalized Quran Lessons",
        "Live One-on-One Sessions",
        "Progress Tracking & Certificates",
        "Teacher-Student Communication",
        "Quranic Resources & Study Materials"
      ]
    },
    {
      id: 6,
      images: [
        "/assets/egrowly.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Egrowly",
      description:
        "A social platform for community-driven discussions, similar to Reddit. Users can post, comment, vote, and engage in discussions across various topics. Includes subreddits, trending posts, and user profiles.",
      client: "Egrowly",
      alt: "Egrowly Community Dashboard Screenshots",
      projectLink: "https://egrowly.com/",
      technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js", "Redux"],
      features: [
        "Community Forums (Subreddits)",
        "Post Creation & Commenting",
        "Upvoting & Downvoting",
        "Trending Posts & Topics",
        "User Profiles & Engagement"
      ]
    },
    {
      id: 7,
      images: [
        "/assets/iscs-uk.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "ISCS Supply Chain Management",
      description:
        "A robust supply chain management platform designed to streamline operations, track inventory, manage suppliers, and optimize logistics. Features real-time data tracking, order management, and detailed analytics for better decision-making.",
      client: "ISCS Supply Chain Solutions",
      alt: "ISCS Supply Chain Dashboard Screenshots",
      projectLink: "https://i-scs.co.uk/",
      technologies: ["Next.js", "React.js", "Bootstrap", "MySQL", "Node.js", "Redux"],
      features: [
        "Inventory Tracking & Management",
        "Supplier & Vendor Management",
        "Order Tracking & Optimization",
        "Real-Time Analytics & Reports",
        "Logistics & Shipment Management"
      ]
    },
    {
      id: 8,
      images: [
        "/assets/serniore.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "Serniore Netherlands",
      description:
        "A beautifully designed website developed from Figma, tailored for the client's business. It offers a clean, responsive layout with smooth UI/UX, ensuring seamless user experience across all devices.",
      client: "Serniore Netherlands",
      alt: "Serniore Netherlands Website Screenshots",
      projectLink: "https://voucherpagina.seniorenvoordeelpas.nl/new-page/",
      technologies: ["Vanilla.js", "CSS3", "HTML5", "UI/UX Design", "Responsiveness"],
      features: [
        "Clean, Modern Design",
        "Fully Responsive Layout",
        "Smooth User Interface & Navigation",
        "Custom Interactive Elements",
        "Optimized for All Devices"
      ]
    },
    {
      id: 9,
      images: [
        "/assets/marble.png",
        "/assets/ecommerce-2.png",
        "/assets/ecommerce-3.png",
        "/assets/ecommerce-4.png"
      ],
      category: "E-Commerce",
      title: "Ice Creams, Cakes, and Battery Shop",
      description:
        "A fully integrated WooCommerce website for a Saudi Arabian company offering a variety of ice creams, cakes, and batteries. Features include online ordering, product customization, and secure payment options.",
      client: "Saudian F&B and Retail Solutions",
      alt: "Ice Cream, Cake, and Battery Shop E-Commerce Website Screenshots",
      projectLink: "https://www.marblestore.sa/",
      technologies: ["WooCommerce", "WordPress", "JavaScript", "Ajax", "JQuery", "MySQL", "Bootstrap", "PHP", "HTML5", "CSS3"],
      features: [
        "Product Customization & Selection",
        "Online Ordering System",
        "Secure Payment Integration",
        "Real-Time Stock Updates",
        "Responsive Design for Mobile & Desktop"
      ]
    },
    {
      id: 10,
      images: [
        "/assets/zad-ksa.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Hospitality & F&B",
      title: "Food & Beverage Concepts",
      description:
        "A dynamic hospitality platform designed to showcase our passion for food, offering a variety of unique food and beverage concepts. Features include easy ordering, menu browsing, and restaurant location tracking.",
      client: "Global F&B Concepts",
      alt: "F&B Concept Platform Screenshots",
      projectLink: "https://zad-ksa.com/",
      technologies: ["WordPress", "JavaScript", "Ajax", "JQuery", "MySQL", "Bootstrap", "PHP", "HTML5", "CSS3"],
      features: [
        "Menu Browsing & Ordering",
        "Restaurant Location Finder",
        "Dynamic Food & Beverage Concepts",
        "Seamless User Experience",
        "Responsive Design for All Devices"
      ]
    },
    {
      id: 11,
      images: [
        "/assets/bathleganza.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "E-Commerce",
      title: "Sanitary Shop WooCommerce",
      description:
        "A custom-built WooCommerce website designed for a sanitary products store. Features include an easy-to-navigate catalog, secure payment integration, and a user-friendly interface for browsing and purchasing sanitary goods.",
      client: "Sanitary Solutions Co.",
      alt: "Sanitary Shop WooCommerce Website Screenshots",
      projectLink: "https://shop.codenterprise.com/",
      technologies: ["WooCommerce", "WordPress", "JavaScript", "Ajax", "JQuery", "MySQL", "Bootstrap", "PHP", "HTML5", "CSS3"],
      features: [
        "Product Catalog with Categories",
        "Secure Online Payments",
        "Customer Reviews & Ratings",
        "Customizable Product Options",
        "User-Friendly Interface & Responsive Design"
      ]
    },
    {
      id: 12,
      images: [
        "/assets/abadzone.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Real Estate",
      title: "AbadZone",
      description:
        "A comprehensive real estate website designed to help users buy, sell, or rent properties. Features include advanced property search, detailed listings, and responsive design for a seamless experience on all devices.",
      client: "Abadzone Real Estate",
      alt: "Property Finder Website Screenshots",
      projectLink: "https://www.abadzone.com/",
      technologies: ["WordPress", "JavaScript", "Ajax", "JQuery", "MySQL", "Bootstrap", "PHP", "HTML5", "CSS3"],
      features: [
        "Advanced Property Search",
        "Detailed Property Listings",
        "Responsive Design",
        "User Registration & Profile Management",
        "Map Integration for Property Locations",
        "Property Comparison Tools"
      ]
    },
    {
      id: 13,
      images: [
        "/assets/virrgotech.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "VirrgoTech Agency",
      description:
        "A sleek and professional website for a digital agency offering innovative solutions in web development, marketing, and design. The website includes a portfolio, service offerings, and client testimonials.",
      client: "VirrgoTech Agency",
      alt: "VirrgoTech Agency Website Screenshots",
      projectLink: "https://www.virrgotech.com/",
      technologies: ["WordPress", "JavaScript", "Ajax", "JQuery", "MySQL", "Bootstrap", "PHP", "HTML5", "CSS3"],
      features: [
        "Service Portfolio",
        "Client Testimonials",
        "Responsive Design",
        "SEO Optimization",
        "Contact Forms & Inquiry Management",
        "Project Showcase & Case Studies"
      ]
    },
    {
      id: 14,
      images: [
        "/assets/lfmaudio.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "LFMAudio - FM Radio Station",
      description:
        "An online FM radio website offering live streaming of music, news, and talk shows. The website features a user-friendly interface, real-time audio streaming, and easy access to the station's schedule.",
      client: "LFMAudio",
      alt: "LFMAudio FM Radio Station Website Screenshots",
      projectLink: "https://www.lfmaudio.com/club-top-40-dev/",
      technologies: ["WordPress", "JavaScript", "DIVI Builder", "Bootstrap", "PHP", "HTML5", "CSS3"],
      features: [
        "Live Audio Streaming",
        "Schedule Display",
        "User-Friendly Interface",
        "Podcast and Show Archive",
        "Responsive Design",
        "Real-Time Audio Updates"
      ]
    },
    {
      id: 15,
      images: [
        "/assets/whitepinefunding.png",
        "/assets/dashboard-2.png",
        "/assets/dashboard-3.png",
        "/assets/dashboard-4.png"
      ],
      category: "Web Application",
      title: "White Pine Funding",
      description:
        "A user-friendly website offering financial services for funding and loans. The platform features detailed loan options, application forms, and real-time loan status tracking.",
      client: "White Pine Funding",
      alt: "White Pine Funding Website Screenshots",
      projectLink: "https://whitepinefunding.com/",
      technologies: ["WordPress", "Elementor Builder", "jQuery", "Bootstrap", "PHP", "HTML5", "CSS3"],
      features: [
        "Loan Application Forms",
        "Real-Time Loan Status Tracking",
        "User-Friendly Interface",
        "Client Dashboard",
        "Responsive Design",
        "Financial Services Overview"
      ]
    }
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

  // Pagination logic - Show exactly 4 projects per page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = portfolioItems.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(portfolioItems.length / projectsPerPage);
  
  // Ensure we're showing exactly 4 projects (except on the last page if there are fewer remaining)
  const projectsOnCurrentPage = currentProjects.length;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Portfolio Grid - Mobile Responsive */}
      <motion.div
        className="max-w-6xl mx-auto px-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {/* Page Info */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-400 text-sm">
              Showing {projectsOnCurrentPage} of {portfolioItems.length} projects (Page {currentPage} of {totalPages})
            </p>
          </motion.div>
          
          <AnimatePresence>
            {currentProjects.map((item) => (
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
                className="overflow-hidden rounded-xl group relative bg-gray-800 shadow-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Mobile and Desktop Layout */}
                <div className="w-full md:w-2/3 bg-gray-700 rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden relative">
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
                    <div className="absolute inset-0 bg-yellow-500 bg-opacity-80 opacity-0 group-hover:opacity-70 transition-opacity duration-500 flex flex-col items-center justify-center">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        <div
                         className="flex space-x-4 mb-4">
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
                        <h4 
                        className="text-white font-bold text-xl text-center">
                          {item.title}
                        </h4>
                      </motion.div>
                    </div>
                  </div>

                  )}
                </div>
                
                <div className="w-full md:w-1/3 p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-lg md:text-xl mb-2">
                      {item.title}
                    </h4>
                    <p className="text-yellow-500 text-sm md:text-base mb-3">
                      {item.category}
                    </p>
                    <p className="text-gray-300 text-sm mb-3">
                      {item.description}
                    </p>
                  </div>
                  <div>
                    <div className="mb-3">
                      <p className="text-gray-400 text-xs mb-2">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.slice(0,6).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-yellow-500 px-2 py-0.5 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 6 && (
                          <span className="bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full text-xs">
                            +{item.technologies.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                      <Link href={item.projectLink} target="_blank">
                        <motion.button
                          className="w-full md:w-auto px-3 py-1.5 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 text-xs"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Project
                        </motion.button>
                      </Link>
                      <motion.button
                        className="w-full md:w-auto px-3 py-1.5 border border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 text-xs"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="flex justify-center items-center mt-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <motion.button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-800 text-yellow-500 hover:bg-yellow-500 hover:text-white border border-gray-700 hover:border-yellow-500'
                }`}
                whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.9 } : {}}
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </motion.button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                
                // Show first page, last page, current page, and pages around current
                const shouldShow = 
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  Math.abs(pageNumber - currentPage) <= 1;

                if (!shouldShow) {
                  // Show ellipsis
                  if (pageNumber === 2 && currentPage > 3) {
                    return (
                      <span key={`ellipsis-start-${pageNumber}`} className="text-gray-400 px-2">
                        ...
                      </span>
                    );
                  }
                  if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
                    return (
                      <span key={`ellipsis-end-${pageNumber}`} className="text-gray-400 px-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <motion.button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-800 text-yellow-500 hover:bg-yellow-500 hover:text-white border border-gray-700 hover:border-yellow-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {pageNumber}
                  </motion.button>
                );
              })}

              {/* Next Button */}
              <motion.button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-800 text-yellow-500 hover:bg-yellow-500 hover:text-white border border-gray-700 hover:border-yellow-500'
                }`}
                whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.9 } : {}}
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </motion.button>
            </div>
          </motion.div>
        )}
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