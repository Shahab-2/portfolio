// Blog.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Own Your Audience by Creating an Email List',
      excerpt: 'Tomfoolery crikey bits and bobs brilliant bamboozled down the pub amongst brolly hanky panky, cack b',
      image: '/images/blog/email-list.jpg',
      category: 'Marketing'
    },
    {
      id: 2,
      title: 'Top 10 Toolkits for Deep Learning in 2022',
      excerpt: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e',
      image: '/images/blog/deep-learning.jpg',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Everything You Need to Know About Web Accessibility',
      excerpt: 'Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma',
      image: '/images/blog/web-accessibility.jpg',
      category: 'Web Development'
    },
    {
      id: 4,
      title: 'How to Inject Humor & Comedy Into Your Brand',
      excerpt: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
      image: '/images/blog/humor-brand.jpg',
      category: 'Branding'
    },
    {
      id: 5,
      title: 'Women in Web Design: How To Achieve Success',
      excerpt: 'Jorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      image: '/images/blog/women-web-design.jpg',
      category: 'Design'
    },
    {
      id: 6,
      title: 'Evergreen versus topical content: An overview',
      excerpt: 'Still ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      image: '/images/blog/evergreen-content.jpg',
      category: 'Content'
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-900 text-white relative pb-16">
      {/* Navigation Icons - Right Side */}
      {/* <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col space-y-4">
          <button className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300">
            <i className="fas fa-cog text-white"></i>
          </button>
          <button className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300">
            <i className="fas fa-home text-white"></i>
          </button>
          <button className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300">
            <i className="fas fa-user text-white"></i>
          </button>
          <button className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300">
            <i className="fas fa-briefcase text-white"></i>
          </button>
          <button className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300">
            <i className="fas fa-envelope text-white"></i>
          </button>
          <button className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-300">
            <i className="fas fa-comment text-white"></i>
          </button>
        </div>
      </div> */}

      {/* Header */}
      <header className="relative text-center py-20 px-4">
        <div className="absolute inset-0 flex justify-center">
          <h1 className="text-9xl md:text-[20rem] font-black text-gray-800 opacity-20 tracking-widest">POSTS</h1>
        </div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10"
        >
          <h2 className="text-5xl font-bold mb-1">
            <span className="text-white">Upcoming</span> <span className="text-yellow-500">...</span>
          </h2>
        </motion.div>
      </header>

      {/* Blog Grid */}
      {/* <motion.section 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <motion.article 
              key={post.id}
              variants={fadeInUp}
              className="bg-gray-800 bg-opacity-40 rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
            >
              <Link href={`/blog/${post.id}`} className="block">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 hover:text-yellow-500 transition-colors duration-300">{post.title}</h3>
                  <p className="text-gray-400 text-sm">{post.excerpt}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section> */}

      {/* Mobile Navigation - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 z-50">
        <div className="flex justify-around py-3">
          <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
            <i className="fas fa-home text-white"></i>
          </button>
          <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-white"></i>
          </button>
          <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
            <i className="fas fa-briefcase text-white"></i>
          </button>
          <button className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <i className="fas fa-file-alt text-white"></i>
          </button>
          <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
            <i className="fas fa-envelope text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;