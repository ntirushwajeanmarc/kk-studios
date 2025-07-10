import React, { useRef, useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaSoundcloud, FaYoutube, FaPlay, FaPause, FaVolumeUp, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

function App() {
  const slides = [
    '/assets/image2.jpg',
    '/assets/kk.png',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
    'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa',
    '/assets/image3.png',
    '/assets/image4.webp',
    '/assets/image1.jpg',
  ];

  // Contact form state and logic
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Scroll animations
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Audio visualizer state
  const [isVisualizerActive, setIsVisualizerActive] = useState(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmissionMessage('❌ Please fill out all fields.');
      setSubmitted(false);
      return;
    }
    setTimeout(() => {
      setSubmissionMessage('✅ Your message was submitted successfully!');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  // Audio refs and states
  const productionAudioRef = useRef<HTMLAudioElement | null>(null);
  const mixingAudioRef = useRef<HTMLAudioElement | null>(null);

  const [isProductionPlaying, setIsProductionPlaying] = useState(false);
  const [isMixingPlaying, setIsMixingPlaying] = useState(false);

  // Gallery carousel ref and like states
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [likedImages, setLikedImages] = useState<{ [id: string]: boolean }>({});

  // Production audio useEffect
  useEffect(() => {
    const productionAudio = productionAudioRef.current;
    if (productionAudio) {
      const handleProductionEnded = () => setIsProductionPlaying(false);
      const handleProductionPlay = () => setIsProductionPlaying(true);
      const handleProductionPause = () => setIsProductionPlaying(false);

      productionAudio.addEventListener('ended', handleProductionEnded);
      productionAudio.addEventListener('play', handleProductionPlay);
      productionAudio.addEventListener('pause', handleProductionPause);

      return () => {
        productionAudio.removeEventListener('ended', handleProductionEnded);
        productionAudio.removeEventListener('play', handleProductionPlay);
        productionAudio.removeEventListener('pause', handleProductionPause);
      };
    }
  }, []);

  // Mixing audio useEffect
  useEffect(() => {
    const mixingAudio = mixingAudioRef.current;
    if (mixingAudio) {
      const handleMixingEnded = () => setIsMixingPlaying(false);
      const handleMixingPlay = () => setIsMixingPlaying(true);
      const handleMixingPause = () => setIsMixingPlaying(false);

      mixingAudio.addEventListener('ended', handleMixingEnded);
      mixingAudio.addEventListener('play', handleMixingPlay);
      mixingAudio.addEventListener('pause', handleMixingPause);

      return () => {
        mixingAudio.removeEventListener('ended', handleMixingEnded);
        mixingAudio.removeEventListener('play', handleMixingPlay);
        mixingAudio.removeEventListener('pause', handleMixingPause);
      };
    }
  }, []);

  // Production Audio Functions
  const playProductionAudio = async () => {
    try {
      if (productionAudioRef.current) {
        if (isMixingPlaying) {
          pauseMixingAudio();
        }
        await productionAudioRef.current.play();
        setIsProductionPlaying(true);
      }
    } catch (error) {
      console.error('Error playing production audio:', error);
    }
  };

  const pauseProductionAudio = () => {
    if (productionAudioRef.current) {
      productionAudioRef.current.pause();
      setIsProductionPlaying(false);
    }
  };

  const toggleProductionPlayPause = () => {
    if (isProductionPlaying) {
      pauseProductionAudio();
    } else {
      playProductionAudio();
    }
  };

  const forwardProductionAudio = () => {
    if (productionAudioRef.current) {
      productionAudioRef.current.currentTime += 10;
    }
  };

  const backwardProductionAudio = () => {
    if (productionAudioRef.current) {
      productionAudioRef.current.currentTime -= 10;
    }
  };

  // Mixing Audio Functions
  const playMixingAudio = async () => {
    try {
      if (mixingAudioRef.current) {
        if (isProductionPlaying) {
          pauseProductionAudio();
        }
        await mixingAudioRef.current.play();
        setIsMixingPlaying(true);
      }
    } catch (error) {
      console.error('Error playing mixing audio:', error);
    }
  };

  const pauseMixingAudio = () => {
    if (mixingAudioRef.current) {
      mixingAudioRef.current.pause();
      setIsMixingPlaying(false);
    }
  };

  const toggleMixingPlayPause = () => {
    if (isMixingPlaying) {
      pauseMixingAudio();
    } else {
      playMixingAudio();
    }
  };

  const forwardMixingAudio = () => {
    if (mixingAudioRef.current) {
      mixingAudioRef.current.currentTime += 10;
    }
  };

  const backwardMixingAudio = () => {
    if (mixingAudioRef.current) {
      mixingAudioRef.current.currentTime -= 10;
    }
  };

  // Gallery functions
  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 500, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-white text-4xl font-bold tracking-widest"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
              />
              KK STUDIOS
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex justify-between items-center px-6 py-4 fixed top-0 w-full bg-black/90 backdrop-blur-md z-40 transition-all duration-300"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-widest text-white"
        >
          KK Studios
        </motion.div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex text-sm font-bold uppercase tracking-wide">
          {['About', 'Production', 'Clients', 'Gallery', 'News', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-6 py-2 text-white hover:text-red-400 transition-colors duration-300 relative group"
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white text-2xl"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-y-0 right-0 w-64 bg-black/95 backdrop-blur-md z-30 lg:hidden"
          >
            <div className="flex flex-col pt-20 px-6 space-y-6">
              {['About', 'Production', 'Clients', 'Gallery', 'News', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-lg font-semibold hover:text-red-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"
        />
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
          alt="Studio Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-20 text-center text-white px-4"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
            className="text-6xl md:text-8xl font-black tracking-wider mb-6"
          >
            KK STUDIOS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto"
          >
            Where Music Comes to Life • Professional Recording & Production
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold tracking-wide transition-all duration-300"
            >
              BOOK A SESSION
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 font-bold tracking-wide transition-all duration-300"
            >
              LISTEN TO OUR WORK
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white text-center"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
            <p className="mt-2 text-sm">Scroll</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="grid lg:grid-cols-2 gap-12 items-start px-6 py-20 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/images.png"
            alt="KK Studios"
            className="w-full h-auto object-cover rounded-2xl shadow-2xl transition-transform duration-500"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 transition-opacity duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-4"
            >
              <FaPlay className="text-white text-2xl ml-1" />
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-6xl font-black mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent"
          >
            KK Studios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed mb-6 text-gray-700"
          >
            <strong>Location:</strong> Kagarama, Kicukiro, Kigali, Rwanda
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Services Offered</h3>
            <div className="grid gap-3">
              {[
                "Recording & Mixing: High-quality vocal and instrumental recording",
                "Mastering: Final audio polishing for commercial release",
                "Beat Production: Custom beat creation tailored to artists",
                "Studio Rental: Hourly or project-based rental options",
                "Artist Development: Vocal performance, songwriting, and branding"
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    className="w-2 h-2 bg-red-500 rounded-full mr-3 transition-all duration-300"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {service}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Studio Equipment</h3>
            <div className="grid gap-2 text-gray-700">
              <motion.p whileHover={{ x: 10 }} className="transition-all duration-300">
                <strong>Studio Monitors:</strong> KRK Rokit 6 GEN 3, Behringer Truth B3031A, Yamaha NS10
              </motion.p>
              <motion.p whileHover={{ x: 10 }} className="transition-all duration-300">
                <strong>Microphones:</strong> Rode NT1-A, Takstar SM10-B, Shure SM58
              </motion.p>
              <motion.p whileHover={{ x: 10 }} className="transition-all duration-300">
                <strong>Audio Interface:</strong> Universal Audio Apollo Twin Duo
              </motion.p>
              <motion.p whileHover={{ x: 10 }} className="transition-all duration-300">
                <strong>DAWs:</strong> Pro Tools, FL Studio, Ableton Live
              </motion.p>
            </div>
          </motion.div>

          <motion.a
            href="#clients"
            whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-4 font-bold tracking-wide transition-all duration-300 rounded-full shadow-lg"
          >
            View Our Work
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Production Section with Interactive Audio */}
      <motion.section 
        id="production" 
        className="px-6 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-24 h-24 border border-red-500/20 rounded-full"
        />
        
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-6xl font-black text-center text-white mb-16 tracking-widest"
        >
          MUSIC WORK
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* PRODUCTION PLAYLIST */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white text-4xl font-bold tracking-widest mb-8"
            >
              PRODUCTION
            </motion.h3>
            
            {/* Custom Audio Player */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleProductionPlayPause}
                  className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transition-all duration-300 shadow-lg"
                >
                  {isProductionPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </motion.button>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={backwardProductionAudio}
                    className="text-white/70 hover:text-white p-2"
                  >
                    ⏪
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={forwardProductionAudio}
                    className="text-white/70 hover:text-white p-2"
                  >
                    ⏩
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVisualizerActive(!isVisualizerActive)}
                    className="text-white/70 hover:text-white p-2"
                  >
                    <FaVolumeUp />
                  </motion.button>
                </div>
              </div>
              
              {/* Audio Visualizer */}
              <AnimatePresence>
                {isVisualizerActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 60 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-end justify-center gap-1 mb-4"
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [10, Math.random() * 50 + 10, 10],
                          backgroundColor: [
                            "#ef4444",
                            "#f97316",
                            "#eab308",
                            "#22c55e",
                            "#3b82f6",
                            "#8b5cf6"
                          ]
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                        className="w-3 bg-red-500 rounded-t"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <audio ref={productionAudioRef} src="/assets/song.mp3" />
            </motion.div>
            
            <motion.iframe
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2sUQwD7tbmL?utm_source=generator"
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl shadow-2xl hover:shadow-red-500/20 transition-shadow duration-500"
            />
          </motion.div>

          {/* MIXING PLAYLIST */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white text-4xl font-bold tracking-widest mb-8"
            >
              MIXING
            </motion.h3>
            
            {/* Custom Audio Player */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMixingPlayPause}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-300 shadow-lg"
                >
                  {isMixingPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </motion.button>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={backwardMixingAudio}
                    className="text-white/70 hover:text-white p-2"
                  >
                    ⏪
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={forwardMixingAudio}
                    className="text-white/70 hover:text-white p-2"
                  >
                    ⏩
                  </motion.button>
                </div>
              </div>
              <audio ref={mixingAudioRef} src="/assets/song.mp3" />
            </motion.div>
            
            <motion.iframe
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-500"
            />
          </motion.div>
        </div>
      </motion.section>
      {/* Clients Section */}
      <motion.section 
        id="clients" 
        className="px-6 py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-center text-black mb-6 relative z-10"
        >
          Trusted by Top Talent
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-xl text-gray-700 max-w-4xl mx-auto mb-16 relative z-10"
        >
          From topping artists to rising stars, KK Studios offers a full spectrum of professional services designed to elevate your sound and brand.
        </motion.p>
        
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto relative z-10">
          {[
            {
              icon: "🎤",
              title: "Recording & Mixing",
              description: "High-quality vocal and instrumental capture, with precision-engineered mixing for pro sound.",
              color: "from-red-500 to-pink-500"
            },
            {
              icon: "🎧",
              title: "Mastering",
              description: "Final polish and enhancement to ensure your track shines across all platforms.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: "🥁",
              title: "Beat Production",
              description: "Custom beats designed to fit your style, energy, and story — from trap to gospel.",
              color: "from-purple-500 to-indigo-500"
            },
            {
              icon: "🚪",
              title: "Studio Rental",
              description: "Flexible hourly or full-day rentals in a world-class environment.",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: "💡",
              title: "Artist Development",
              description: "Hands-on coaching in vocals, songwriting, branding, and stage presence.",
              color: "from-orange-500 to-yellow-500"
            },
            {
              icon: "📱",
              title: "Digital Marketing",
              description: "Social media strategy, content creation, and digital presence optimization.",
              color: "from-gray-700 to-gray-900"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl`}
                />
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-6xl mb-6 text-center relative z-10"
                >
                  {service.icon}
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-4 text-center text-gray-800 relative z-10"
                >
                  {service.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  className="text-gray-600 text-center leading-relaxed relative z-10"
                >
                  {service.description}
                </motion.p>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.color} rounded-b-2xl`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#1f2937" }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-12 py-4 rounded-full font-bold text-lg tracking-wide hover:shadow-xl transition-all duration-300"
          >
            Start Your Project Today
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Interactive Gallery Section */}
      <motion.section 
        id="gallery" 
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-center mb-16 text-gray-800"
        >
          Studio Gallery
        </motion.h2>
        
        <div className="relative">
          {/* Image Carousel */}
          <motion.div
            ref={carouselRef}
            className="flex overflow-x-hidden no-scrollbar snap-x snap-mandatory scroll-smooth gap-6"
          >
            {slides.map((slide, index) => {
              const imageId = `img-${index}`;
              return (
                <motion.div
                  key={imageId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-full md:w-[600px] lg:w-[700px] snap-start relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl shadow-2xl"
                  >
                    <img
                      id={imageId}
                      src={slide}
                      alt={`Studio ${index + 1}`}
                      className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Image Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-4"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setLikedImages(prev => ({
                              ...prev,
                              [imageId]: !prev[imageId]
                            }))
                          }
                          className={`p-4 rounded-full backdrop-blur-md border transition-all duration-300 ${
                            likedImages[imageId]
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                          }`}
                        >
                          <motion.div
                            animate={likedImages[imageId] ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            <i className={`fa fa-heart text-xl ${likedImages[imageId] ? 'fas' : 'far'}`}></i>
                          </motion.div>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                        >
                          <i className="fas fa-expand text-xl"></i>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                    
                    {/* Image Info */}
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white"
                    >
                      <h3 className="text-xl font-bold mb-2">Studio Session {index + 1}</h3>
                      <p className="text-sm opacity-90">Professional recording environment</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-xl hover:bg-white transition-all duration-300 z-10 group"
          >
            <i className="fa-solid fa-chevron-left text-gray-800 text-xl group-hover:text-black"></i>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-xl hover:bg-white transition-all duration-300 z-10 group"
          >
            <i className="fa-solid fa-chevron-right text-gray-800 text-xl group-hover:text-black"></i>
          </motion.button>
        </div>
        
        {/* Gallery Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
        >
          {[
            { number: "500+", label: "Sessions Recorded" },
            { number: "100+", label: "Artists Worked With" },
            { number: "50+", label: "Albums Produced" },
            { number: "24/7", label: "Studio Access" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.h3
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl font-black text-red-500 mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Dynamic News Section */}
      <motion.section 
        id="news" 
        className="px-6 py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 border border-gray-200 rounded-full opacity-30"
        />
        
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-center mb-6 text-gray-800"
        >
          Latest News & Updates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-xl text-gray-600 max-w-4xl mx-auto mb-16"
        >
          Stay in the loop with our latest music drops, studio collabs, events, and behind-the-scenes moments that define the KK Studios experience.
        </motion.p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {[
            {
              image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
              title: "🔥 New Gear Arrived!",
              description: "We just upgraded with the Universal Audio Apollo x8 — ready to take your mixes to the next level. Book your session today!",
              link: "#contact",
              linkText: "Book a Session →",
              category: "Equipment",
              date: "2 days ago"
            },
            {
              image: "/assets/mic1.jpg",
              title: "🎤 Open Mic Night!",
              description: "Join our monthly Open Mic at the studio and perform your latest work live. All genres welcome. Connect. Create. Inspire.",
              link: "#contact",
              linkText: "Register Now →",
              category: "Events",
              date: "1 week ago"
            },
            {
              image: "/assets/artist.jpg",
              title: "📢 Collab with Top Artists",
              description: "This month, we welcomed Gentil Izere and Keffa to the studio for an exclusive gospel collab. Full story on our YouTube.",
              link: "https://www.youtube.com/@yourstudio",
              linkText: "Watch Now →",
              category: "Collaborations",
              date: "2 weeks ago"
            }
          ].map((news, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 object-cover transition-transform duration-500"
                  />
                  <motion.div
                    initial={{ x: -100 }}
                    whileHover={{ x: 0 }}
                    className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {news.category}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-3"
                    >
                      <i className="fas fa-arrow-right text-gray-800"></i>
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">{news.date}</span>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  </div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-xl font-bold mb-3 text-gray-800 group-hover:text-red-500 transition-colors"
                  >
                    {news.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-gray-600 text-sm mb-4 leading-relaxed"
                  >
                    {news.description}
                  </motion.p>
                  
                  <motion.a
                    href={news.link}
                    target={news.link.startsWith('http') ? '_blank' : '_self'}
                    rel={news.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    whileHover={{ x: 5 }}
                    className="text-red-500 font-semibold hover:text-red-600 transition-colors inline-flex items-center group"
                  >
                    {news.linkText}
                    <motion.i
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"
                    />
                  </motion.a>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-black rounded-2xl p-8 max-w-2xl mx-auto relative overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full"
            />
            <h3 className="text-white text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Get the latest news, exclusive content, and early access to new releases.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border-none outline-none focus:ring-2 focus:ring-red-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Interactive Contact Section */}
      <motion.section 
        id="contact" 
        className="relative bg-gradient-to-br from-black via-gray-900 to-black py-20 overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-96 h-96 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-64 h-64 border border-red-500/20 rounded-full"
        />
        
        <div className="flex flex-col lg:flex-row justify-between items-start p-10 max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5 max-w-2xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl font-black tracking-widest mb-8 text-white"
            >
              LET'S CREATE
              <br />
              <span className="text-red-500">TOGETHER</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-lg mb-8 leading-relaxed"
            >
              Ready to bring your musical vision to life? Get in touch with us and let's discuss how we can help you create something extraordinary.
            </motion.p>
            
            <motion.form
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileFocus={{ width: "100%" }}
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileFocus={{ width: "100%" }}
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300"
                  />
                </motion.div>
              </div>
              
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 resize-none"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileFocus={{ width: "100%" }}
                  className="absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300"
                />
              </motion.div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold tracking-widest px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/25 relative overflow-hidden group"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white/20 skew-x-12"
                />
                <span className="relative z-10">SEND MESSAGE</span>
              </motion.button>
              
              {/* Submission Message */}
              <AnimatePresence>
                {submissionMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`text-sm ${submitted ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {submissionMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
          
          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 mt-12 lg:mt-0 lg:pl-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4 text-gray-300">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <i className="fas fa-map-marker-alt text-red-500"></i>
                  <span>Kagarama, Kicukiro, Kigali, Rwanda</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <i className="fas fa-phone text-red-500"></i>
                  <span>+250 123 456 789</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <i className="fas fa-envelope text-red-500"></i>
                  <span>hello@kkstudios.rw</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <i className="fas fa-clock text-red-500"></i>
                  <span>24/7 Available</span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-xl font-bold text-white mb-6">Follow Our Journey</h3>
              <div className="flex justify-center gap-6">
                {[
                  { icon: FaInstagram, href: "https://www.instagram.com/yourstudio", color: "hover:text-pink-500" },
                  { icon: FaTwitter, href: "https://twitter.com/yourstudio", color: "hover:text-blue-400" },
                  { icon: FaSoundcloud, href: "https://soundcloud.com/yourstudio", color: "hover:text-orange-500" },
                  { icon: FaYoutube, href: "https://www.youtube.com/@yourstudio", color: "hover:text-red-500" }
                ].map(({ icon: Icon, href, color }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                    viewport={{ once: true }}
                    className={`text-gray-400 ${color} transition-all duration-300 p-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:border-white/30`}
                  >
                    <Icon className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Modern Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-black text-white py-8 relative overflow-hidden"
      >
        <motion.div
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"
        />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">KK Studios</h3>
              <p className="text-gray-400 leading-relaxed">
                Professional music production, recording, and artist development in the heart of Kigali.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {['Recording', 'Mixing', 'Mastering', 'Production', 'Development'].map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    className="cursor-pointer transition-all duration-300"
                  >
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {['About', 'Portfolio', 'Booking', 'Contact', 'Blog'].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    className="cursor-pointer transition-all duration-300"
                  >
                    {link}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Get the latest updates and exclusive content.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-red-500"
                />
                <motion.button
                  whileHover={{ backgroundColor: "#dc2626" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 px-4 py-2 rounded-r-lg hover:bg-red-600 transition-colors"
                >
                  <i className="fas fa-paper-plane"></i>
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-6 text-center text-gray-400"
          >
            <p>&copy; {new Date().getFullYear()} KK Studios • Designed with ❤️ by Dev@Michou • All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;

