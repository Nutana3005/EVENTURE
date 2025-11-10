import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import eventBg from "../assets/event.png.jpg";
import poster2025 from "../assets/image3.png";
import poster2024 from "../assets/image2.jpg";
import poster2023 from "../assets/image1.jpg";
import genesis from "../assets/genesis.jpg";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const timelineData = [
  {
    year: 2025,
    title: "Future Vision",
    description: "Pioneering virtual events with immersive metaverse experiences",
    image: poster2025,
  },
  {
    year: 2024,
    title: "Global Expansion",
    description: "Connecting 100,000+ attendees across virtual conferences",
    image: poster2024,
  },
  {
    year: 2023,
    title: "Innovation Year",
    description: "Launched AI-powered networking and virtual exhibition halls",
    image: poster2023,
  },
  {
    year: 2022,
    title: "Our Genesis",
    description: "Started with virtual conferences and webinars platform",
    image: genesis,
  },
];

const videoTeasers = [
  {
    title: "Virtual Conferences",
    thumbnail: poster2024,
    description: "Seamless online conferences with interactive features",
  },
  {
    title: "Webinar Series",
    thumbnail: poster2023,
    description: "Expert-led sessions with global reach",
  },
  {
    title: "Virtual Exhibitions",
    thumbnail: poster2025,
    description: "Immersive 3D exhibition experiences",
  },
];

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative w-full">
      <div className="bg-black text-white overflow-x-hidden">
       
        <div
          className="relative min-h-screen flex flex-col items-center justify-center bg-black p-4"
          ref={containerRef}
        >
          <img
            src={eventBg}
            alt="Event Background"
            className="absolute w-full rounded-3xl h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/70" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Eventure
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Making your dream event into reality
            </p>
          </motion.div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            Welcome to Eventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto z-50 text-center px-4"
          >
            Your one-stop solution for all your event management needs. From planning to execution, 
            we've got you covered. Let's make your next event a success!
          </motion.p>
        </div>

        {/* Video Teasers Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-12 text-center z-50 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text"
          >
            Event Highlights
          </motion.h2>
          <div className="grid grid-cols-1 z-50 md:grid-cols-3 gap-8">
            {videoTeasers.map((teaser, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-purple-900/20 rounded-lg overflow-hidden"
              >
                <img
                  src={teaser.thumbnail}
                  alt={teaser.title}
                  className="w-full h-48 z-50 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 ">
                  <h3 className="text-xl font-bold  text-purple-300 mb-2">
                    {teaser.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{teaser.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 py-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-20 text-center z-50 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text"
          >
            Our Journey
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Timeline Visual */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 opacity-20"></div>
              
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative mb-16 last:mb-0"
                >
                  {/* Year Bubble */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <span className="text-white font-bold">{item.year}</span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`relative grid grid-cols-2 gap-4 ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <div className={index % 2 === 0 ? 'pr-12' : 'pl-12 col-start-2'}>
                      <div className="bg-gradient-to-br from-purple-900/30 to-black/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-500/5">
                        <h3 className="text-xl font-bold text-purple-400 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Visual */}
            <div className="relative lg:sticky lg:top-24 h-fit">
              <div className="space-y-6">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-2">
                              {item.year}
                            </h4>
                            <p className="text-purple-300 font-medium">
                              {item.title}
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-white text-xl">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
