import React from 'react';
import { FaInstagram, FaTwitter, FaSoundcloud, FaYoutube } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';

function App() {
  const slides = [
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa'
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  // Sample playlist data
  const playlist = [
    { title: "KU MUSARABA Featuring Gentil Izere", artist: "Voice of Angels Family", duration: "2:30" },
    { title: "Another Song Title", artist: "Another Artist", duration: "3:15" },
    { title: "Third Song Title", artist: "Third Artist", duration: "4:20" }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
    }
    return () => {
      if (audio) {
        audio.removeEventListener('ended', () => setIsPlaying(false));
        audio.removeEventListener('play', () => setIsPlaying(true));
        audio.removeEventListener('pause', () => setIsPlaying(false));
      }
    };
  }, []);

  const playAudio = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const forwardAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const backwardAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const playTrack = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    // In a real app, you'd change the audio src here
    // audioRef.current.src = playlist[trackIndex].src;
    playAudio();
  };
  const TrackList = ({ tracks }) => (
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
const carouselRef = useRef<HTMLDivElement | null>(null);

const scrollLeft = () => {
  carouselRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
};

const scrollRight = () => {
  carouselRef.current?.scrollBy({ left: 500, behavior: 'smooth' });
};

const [liked, setLiked] = useState(false);


  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      {/* Header Navigation */}
      <nav className="flex justify-center items-center mb-12 fixed top-0 w-full bg-white py-2 z-10">
        <a href="#">
          <div className="text-2xl font-bold tracking-widest mx-10">KK Studios</div>
        </a>
        <div className="flex text-sm font-bold uppercase tracking-wide px-4">
          <a href="#about" className="bg-gray-100 px-6 py-2 border-r border-gray-300 text-black hover:bg-gray-400">
            About
          </a>
          <a href="#clients" className="bg-black px-6 py-2 border-r border-gray-300 text-white hover:bg-gray-400">
            Clients
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
{/* About Section */}
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

<section id="clients" className="px-6 py-20 bg-gradient-to-b from-white to-gray-100">
  <h2 className="text-4xl font-extrabold text-center text-black mb-4">Trusted by Top Talent</h2>
  <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
  topping artists to rising stars, KK Studios offers a full spectrum of professional services designed to elevate your sound and brand.
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



<section className="bg-black px-4 py-20">
  <h2 className="text-4xl font-bold text-center text-white mb-12">MUSIC WORK</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    {/* Production Card */}
    <div className="bg-red-700 rounded-xl overflow-hidden shadow-lg">
      <div className="p-6">
        <img src="https://link-to-production-image.jpg" alt="Production" className="w-20 h-20 rounded-md mb-4" />
        <h3 className="text-white text-2xl font-bold mb-1">Roark Bailey - Production</h3>
        <p className="text-white text-sm mb-4">roarkbailey</p>
        <button className="flex items-center gap-2 text-white hover:underline">
        <i className="fa-solid fa-circle-plus text-lg"></i> Save on Spotify
        </button>
        <div className="mt-6">
        <span className="text-xs bg-red-950 text-white px-2 py-0.5 rounded">Preview</span>
        </div>
      </div>
      <div className="bg-red-800 px-6 py-4 h-64 overflow-y-auto">
        <TrackList
          tracks={[
            { title: "Slay3r", artist: "Playboi Carti", duration: "02:44", explicit: true },
            { title: "KEHLANI", artist: "Jordan Adetunji", duration: "02:02" },
            { title: "Body On Me", artist: "SAINt JHN", duration: "02:30", explicit: true },
            { title: "92 Explorer", artist: "Post Malone", duration: "03:31" },
          ]}
        />
      </div>
    </div>

    {/* Mixing Card */}
    <div className="bg-red-700 rounded-xl overflow-hidden shadow-lg">
      <div className="p-6">
        <img src="https://link-to-mixing-image.jpg" alt="Mixing" className="w-20 h-20 rounded-md mb-4" />
        <h3 className="text-white text-2xl font-bold mb-1">Roark Bailey - Mixing</h3>
        <p className="text-white text-sm mb-4">roarkbailey</p>
        <button className="flex items-center gap-2 text-white hover:underline">
          <i className="fa-solid fa-circle-plus text-lg"></i> Save on Spotify
        </button>
        <div className="mt-6">
          <span className="text-xs bg-red-950 text-white px-2 py-0.5 rounded">Preview</span>
        </div>
      </div>

      <div className="bg-red-800 px-6 py-4 h-64 overflow-y-auto">
        <TrackList
          tracks={[
            { title: "Pain 1993 (with Playboi Carti)", artist: "Drake, Playboi Carti", duration: "02:29", explicit: true },
            { title: "@ MEH", artist: "Playboi Carti", duration: "02:46", explicit: true },
            { title: "Roses (Imanbek Remix)", artist: "SAINt JHN, J Balvin, Imanbek", duration: "03:28", explicit: true },
            { title: "Eleven (feat. Summer Walker)", artist: "Khalid", duration: "03:26" },
          ]}
        />
      </div>
    </div>
  </div>
</section>

      
     <section id="gallery" className="my-20 px-4 max-w-6xl mx-auto">

  <div className="relative">
    {/* Image Carousel */}
    <div
      ref={carouselRef}
      className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth gap-4"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-full md:w-[700px] snap-start relative"
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="h-96 w-full object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>

    {/* Left Arrow */}
    <button
      onClick={() => setLiked(!liked), scrollLeft}
      className=" text-2xl transition-colors duration-300 ${
    liked ? 'text-red-600' : 'text-gray-400'
  } absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10"
    >
      <i className=" fas fa-heart fa-solid fa-chevron-left text-gray-800 text-xl"></i>
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
      <img src="https://images.unsplash.com/photo-1585386959984-a41552262b8e" alt="Event" className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">🎤 Open Mic Night!</h3>
      <p className="text-gray-700 text-sm mb-3">
        Join our monthly Open Mic at the studio and perform your latest work live. All genres welcome. Connect. Create. Inspire.
      </p>
      <a href="#contact" className="text-red-500 font-semibold hover:underline">Register Now →</a>
    </div>

    {/* News Item 3 */}
    <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-xl transition duration-300">
      <img src="https://images.unsplash.com/photo-1618005198919-d3d4b07a74d8" alt="Collab" className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">📢 Collab with Top Artists</h3>
      <p className="text-gray-700 text-sm mb-3">
        This month, we welcomed Gentil Izere and Keffa to the studio for an exclusive gospel collab. Full story on our YouTube.
      </p>
      <a href="https://www.youtube.com/@yourstudio" target="_blank" className="text-red-500 font-semibold hover:underline">Watch Now →</a>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="flex flex-col md:flex-row justify-between items-start p-10 bg-white">
        <div className="w-full md:w-2/3 max-w-xl">
          <h2 className="text-3xl font-bold tracking-widest mb-8">CONTACT ROARK</h2>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-4 border border-red-300 bg-red-100 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border border-red-300 bg-red-100 outline-none"
            />
            <textarea
              placeholder="Add a message"
              className="w-full p-4 h-40 border border-red-300 bg-red-100 outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white font-bold tracking-widest px-8 py-3 hover:bg-red-700 transition"
            >
              SUBMIT
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center gap-6 mt-12 md:mt-0 text-gray-700">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/yourstudio" // Replace with your studio's real IG
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-500 transition"
  >
    <FaInstagram className="text-3xl" />
  </a>

  {/* Twitter (X) */}
  <a
    href="https://twitter.com/yourstudio" // Replace with your studio Twitter/X
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-400 transition"
  >
    <FaTwitter className="text-3xl" />
  </a>

  {/* SoundCloud */}
  <a
    href="https://soundcloud.com/yourstudio" // Replace with your SoundCloud profile
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-orange-500 transition"
  >
    <FaSoundcloud className="text-3xl" />
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@yourstudio" // Replace with your YouTube channel
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
        &copy; {new Date().getFullYear()} Michou. All rights Deliver.
      </footer>
    </div>
  );
}

export default App;
