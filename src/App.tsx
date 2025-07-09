import React, { useRef, useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaSoundcloud, FaYoutube } from 'react-icons/fa';

interface Track {
  title: string;
  artist: string;
  duration: string;
  explicit?: boolean;
}

interface TrackListProps {
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => (
  <ul className="space-y-4">
    {tracks.map((track, index) => (
      <li key={index} className="flex justify-between items-start text-white">
        <div>
          <p className="font-bold">{index + 1}. {track.title}</p>
          <p className="text-sm text-gray-300">
            {track.explicit && <span className="bg-white text-black px-1 text-xs rounded mr-1">E</span>}
            {track.artist}
          </p>
        </div>
        <span className="text-sm">{track.duration}</span>
      </li>
    ))}
  </ul>
);

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
    <div className="p-1 bg-gray-100 min-h-screen">
      
      <nav className="flex justify-center items-center mb-12 fixed top-0 w-full bg-white py-2 z-10">
        <a href="#">
          <div className="text-2xl font-bold tracking-widest mx-10">KK Studios</div>
        </a>
        <div className="flex text-sm font-bold uppercase tracking-wide px-4">
          <a href="#about" className="bg-gray-100 px-6 py-2 border-r border-gray-300 text-black hover:bg-gray-400">
            About
          </a>
          <a href="#production" className="bg-black px-6 py-2 border-r border-gray-300 text-white hover:bg-gray-400">
            Mix & Production
          </a>
          <a href="#clients" className="bg-black px-6 py-2 border-r border-gray-300 text-white hover:bg-gray-400">
            Clients
          </a>
          <a href="#gallery" className="bg-black px-6 py-2 border-r border-gray-300 text-white hover:bg-gray-400">
            Gallery
          </a>
          <a href="#news" className="bg-black px-6 py-1 border-r border-gray-300 text-white hover:bg-gray-400">
            News
          </a>
          <a href="#contact" className="bg-black px-6 py-2 border-r border-gray-300 text-white hover:bg-gray-400">
            Contact
          </a>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="grid md:grid-cols-2 gap-12 items-start my-16 pt-16">
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          alt="KK Studios"
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-5xl font-extrabold mb-6">KK Studios</h2>
          <p className="text-lg leading-relaxed mb-4">
            <strong>Location:</strong> Kagarama, Kicukiro, Kigali, Rwanda
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Services Offered</h3>
            <ul className="list-disc list-inside text-lg leading-relaxed space-y-1">
              <li>Recording & Mixing: High-quality vocal and instrumental recording</li>
              <li>Mastering: Final audio polishing for commercial release</li>
              <li>Beat Production: Custom beat creation tailored to artists</li>
              <li>Studio Rental: Hourly or project-based rental options</li>
              <li>Artist Development: Vocal performance, songwriting, and branding</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Studio Equipment</h3>
            <ul className="list-disc list-inside text-lg leading-relaxed space-y-1">
              <li><strong>Studio Monitors:</strong> KRK Rokit 6 GEN 3, Behringer Truth B3031A, Yamaha NS10</li>
              <li><strong>Microphones:</strong> Rode NT1-A, Takstar SM10-B, Shure SM58</li>
              <li><strong>Audio Interface:</strong> Universal Audio Apollo Twin Duo</li>
              <li><strong>Mic Preamp:</strong> PreSonus Bluetube DUOPATH</li>
              <li><strong>Mixing Console:</strong> Yamaha AG03</li>
              <li><strong>Closed-Back Headphones:</strong> Audio Technica M50x (Black), M50rd (Limited Edition)</li>
              <li><strong>Open-Back Headphones:</strong> Samson SR850</li>
              <li><strong>DAWs:</strong> Pro Tools, FL Studio, Ableton Live</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Special Features & Offers</h3>
            <ul className="list-disc list-inside text-lg leading-relaxed space-y-1">
              <li>Exclusive packages for emerging artists</li>
              <li>Discounts for bulk recording sessions</li>
              <li>Behind-the-scenes content creation (YouTube and more)</li>
            </ul>
          </div>
          <a href="#clients" className="inline-block bg-red-500 px-6 py-2 text-black hover:bg-gray-400 mt-4">
            View Clients
          </a>
        </div>
      </section>

      {/* Production Section with Spotify Playlists */}
      <section id="production" className="px-6 py-20 bg-gray-800">
        <h2 className="text-4xl font-bold text-center text-white mb-12 tracking-widest">MUSIC WORK</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* PRODUCTION PLAYLIST */}
          <div className="text-center">
            <h3 className="text-white text-3xl font-bold tracking-widest mb-6">PRODUCTION</h3>
            <iframe
                           style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2sUQwD7tbmL?utm_source=generator"
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl shadow-xl"
            />
          </div>

          {/* MIXING PLAYLIST */}
          <div className="text-center">
            <h3 className="text-white text-3xl font-bold tracking-widest mb-6">MIXING</h3>
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>
     {/* Clients Section */}
      <section id="clients" className="px-6 py-20 bg-gradient-to-b from-white to-gray-100">
        <h2 className="text-4xl font-extrabold text-center text-black mb-4">Trusted by Top Talent</h2>
        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          From topping artists to rising stars, KK Studios offers a full spectrum of professional services designed to elevate your sound and brand.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Service Card: Recording & Mixing */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <div className="text-red-500 text-4xl mb-4 text-center">
              <i className="fas fa-microphone-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Recording & Mixing</h3>
            <p className="text-gray-600 text-sm text-center">
              High-quality vocal and instrumental capture, with precision-engineered mixing for pro sound.
            </p>
          </div>
          {/* Service Card: Mastering */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <div className="text-red-500 text-4xl mb-4 text-center">
              <i className="fas fa-headphones-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Mastering</h3>
            <p className="text-gray-600 text-sm text-center">
              Final polish and enhancement to ensure your track shines across all platforms.
            </p>
          </div>
          {/* Service Card: Beat Production */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <div className="text-red-500 text-4xl mb-4 text-center">
              <i className="fas fa-drum"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Beat Production</h3>
            <p className="text-gray-600 text-sm text-center">
              Custom beats designed to fit your style, energy, and story — from trap to gospel.
            </p>
          </div>
          {/* Service Card: Studio Rental */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <div className="text-red-500 text-4xl mb-4 text-center">
              <i className="fas fa-door-open"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Studio Rental</h3>
            <p className="text-gray-600 text-sm text-center">
              Flexible hourly or full-day rentals in a world-class environment.
            </p>
          </div>
          {/* Service Card: Artist Development */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 col-span-1 sm:col-span-2 md:col-span-1">
            <div className="text-red-500 text-4xl mb-4 text-center">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Artist Development</h3>
            <p className="text-gray-600 text-sm text-center">
              Hands-on coaching in vocals, songwriting, branding, and stage presence.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="my-20 px-4 max-w-6xl mx-auto">
        <div className="relative">
          {/* Image Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden no-scrollbar snap-x snap-mandatory scroll-smooth gap-4"
          >
            {slides.map((slide, index) => {
              const imageId = `img-${index}`;
              return (
                <div
                  key={imageId}
                  className="flex-shrink-0 w-full md:w-[700px] snap-start relative"
                >
                  <img
                    id={imageId}
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="h-96 w-full object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={() =>
                      setLikedImages(prev => ({
                        ...prev,
                        [imageId]: !prev[imageId]
                      }))
                    }
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-7 w-7 flex justify-center items-center rounded-full transition-all duration-300 ${
                      likedImages[imageId]
                        ? 'bg-red-700 text-white'
                        : 'bg-white bg-opacity-70 text-gray-400 hover:bg-opacity-100'
                    }`}
                  >
                    <i className={`fa fa-heart text-xl ${likedImages[imageId] ? 'fas' : 'far'}`}></i>
                  </button>
                </div>
              );
            })}
          </div>
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="text-2xl transition-colors duration-300 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10"
          >
            <i className="fa-solid fa-chevron-left text-gray-800 text-xl"></i>
          </button>
          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10"
          >
            <i className="fa-solid fa-chevron-right text-gray-800 text-xl"></i>
          </button>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="px-6 py-20 bg-white">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-black">Studio News & Highlights</h2>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Stay in the loop with our latest music drops, studio collabs, events, and behind-the-scenes moments that define the KK Studios experience.
        </p>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {/* News Item 1 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-xl transition duration-300">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" alt="New Gear" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-bold mb-2">🔥 New Gear Arrived!</h3>
            <p className="text-gray-700 text-sm mb-3">
              We just upgraded with the Universal Audio Apollo x8 — ready to take your mixes to the next level. Book your session today!
            </p>
            <a href="#contact" className="text-red-500 font-semibold hover:underline">Book a Session →</a>
          </div>
          {/* News Item 2 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-xl transition duration-300">
            <img src="/assets/mic1.jpg" alt="Event" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-bold mb-2">🎤 Open Mic Night!</h3>
            <p className="text-gray-700 text-sm mb-3">
              Join our monthly Open Mic at the studio and perform your latest work live. All genres welcome. Connect. Create. Inspire.
            </p>
            <a href="#contact" className="text-red-500 font-semibold hover:underline">Register Now →</a>
          </div>
          {/* News Item 3 */}
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-xl transition duration-300">
            <img src="/assets/artist.jpg" alt="Collab" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-bold mb-2">📢 Collab with Top Artists</h3>
            <p className="text-gray-700 text-sm mb-3">
              This month, we welcomed Gentil Izere and Keffa to the studio for an exclusive gospel collab. Full story on our YouTube.
            </p>
            <a href="https://www.youtube.com/@yourstudio" target="_blank" rel="noopener noreferrer" className="text-red-500 font-semibold hover:underline">Watch Now →</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="flex flex-col md:flex-row justify-between items-start p-10 bg-white">
        <div className="w-full md:w-2/3 max-w-xl">
          <h2 className="text-3xl font-bold tracking-widest mb-8">CONTACT ROARK</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-red-300 bg-red-100 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-red-300 bg-red-100 outline-none"
            />
            <textarea
              name="message"
              placeholder="Add a message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 h-40 border border-red-300 bg-red-100 outline-none"></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white font-bold tracking-widest px-8 py-3 hover:bg-red-700 transition"
            >
              SUBMIT
            </button>
            {/* ✅ Submission Message */}
            {submissionMessage && (
              <p className={`text-sm mt-2 ${submitted ? 'text-green-600' : 'text-red-600'}`}>
                {submissionMessage}
              </p>
            )}
          </form>
        </div>
        <div className="flex flex-col items-center gap-6 mt-12 md:mt-0 text-gray-700">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/yourstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
          >
            <FaInstagram className="text-3xl" />
          </a>
          {/* Twitter */}
          <a
            href="https://twitter.com/yourstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter className="text-3xl" />
          </a>
          {/* SoundCloud */}
          <a
            href="https://soundcloud.com/yourstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition"
          >
            <FaSoundcloud className="text-3xl" />
          </a>
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@yourstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition"
          >
            <FaYoutube className="text-3xl" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-0 pb-3">
        &copy; {new Date().getFullYear()} Dev@Michou.All rights reserved.
      </footer>
    </div>
  );
}

export default App;

