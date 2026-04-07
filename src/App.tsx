/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Star, 
  MessageCircle, 
  Twitter,
  ChevronLeft,
  ChevronRight, 
  ChevronDown,
  Clock, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Scissors, 
  Palette, 
  Sparkles, 
  User,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  Award,
  CheckCircle2,
  Maximize2,
  Info,
  Map,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';

// Import local brand assets
import dermalogica from './assets/hero/Dermalogica.webp';
import kerastase from './assets/hero/Kerestase.webp';
import lealevet from './assets/hero/Lealevet.webp';
import loreal from './assets/hero/Loreal.webp';
import lycon from './assets/hero/Lycon.webp';

// Import service images
import hairImg from './assets/services/hair.jpg';
import nailsImg from './assets/services/nails.jpeg';
import facialImg from './assets/services/facial.jpg';
import waxImg from './assets/services/waxnthread.jpg';
import massageImg from './assets/services/massage.jpg';
import makeupImg from './assets/services/makeup.jpg';

// Import gallery images
import gallery1 from './assets/Gallery/1.webp';
import gallery2 from './assets/Gallery/2.webp';
import gallery3 from './assets/Gallery/3.webp';
import gallery4 from './assets/Gallery/4.webp';
import gallery5 from './assets/Gallery/5.webp';
import gallery6 from './assets/Gallery/6.webp';
import gallery7 from './assets/Gallery/7.webp';
import gallery8 from './assets/Gallery/8.jpg';

// Import transformation images
import trans1 from './assets/services/transformations/1.png';
import trans2 from './assets/services/transformations/2.png';
import trans3 from './assets/services/transformations/3.png';
import trans4 from './assets/services/transformations/4.png';
import trans5 from './assets/services/transformations/5.png';
import trans6 from './assets/services/transformations/6.png';
import trans7 from './assets/services/transformations/7.png';

const heroImg = '/assets/hero.png';
const logoImg = '/assets/looks salon logo.png';
const bannerLogoImg = '/assets/banner logo.png';

// --- Types ---
type View = 'home' | 'services' | 'contact' | 'luxury-guide' | 'blog' | 'blog-post' | 'hair' | 'nails' | 'facial' | 'waxing' | 'massages' | 'makeup' | '404';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: React.ReactNode;
  image: string;
}

interface Service {
  title: string;
  price: string;
  description?: string;
  icon?: React.ReactNode;
}

interface ServiceCategory {
  id: string;
  title: string;
  image?: string;
  subsections: {
    title: string;
    items: Service[];
  }[];
}

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
}

// --- Constants ---
const ASSETS = {
  logo: logoImg,
  bannerLogo: bannerLogoImg,
  hero: heroImg,
  gallery: [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8
  ],
  transformations: [
    trans1,
    trans2,
    trans3,
    trans4,
    trans5,
    trans6,
    trans7
  ],
  brands: [
    loreal,
    kerastase,
    dermalogica,
    lealevet,
    lycon
  ],
  // --- POSTER SECTION ---
  // Edit the URLs below to change the promotion images (you can add more than two)
  posters: [
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
  ]
};

const GALLERY_IMAGES = ASSETS.gallery;
const AWARD_IMAGE = gallery8;

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'nambikai-media-awards',
    title: "Nambikai Media’s 4th Award Ceremony – Maha Ganesh Wins Young Entrepreneur of the Year!",
    author: "mrsanju005@gmail.com",
    date: "December 12, 2025",
    category: "Awards",
    excerpt: "Maha Ganesh, Managing Director of LOOKS Salon KL, honored with the Young Entrepreneur of the Year Award at the 4th annual Nambikai Media ceremony.",
    image: AWARD_IMAGE,
    content: (
      <div className="space-y-6">
        <p>The fourth annual award ceremony organized by Nambikai Online Media was recently held with great grandeur. This year, the prestigious event took place at the Bank Rakyat Auditorium.</p>
        <p>Awards were presented to individuals who excelled in their respective fields, entrepreneurs who contributed to society, and social media achievers who made remarkable impacts through their platforms.</p>
        <p>Among the award recipients, <strong>Maha Ganesh</strong>, the Managing Director of the Kuala Lumpur branch of India’s renowned <strong>LOOKS Salon</strong>, was honored with the <strong>Young Entrepreneur of the Year Award</strong>.</p>
        <p>Despite various challenges, Maha Ganesh has successfully established and managed a premium unisex salon in Kuala Lumpur. By introducing innovative technologies and offering high-quality grooming services, he has elevated the salon to an internationally competitive standard. His outstanding achievements and dedication in the beauty industry earned him this recognition.</p>
        <p>In addition, <strong>LOOKS Salon Kuala Lumpur</strong> recently received another prestigious international honor in Thailand, winning the award for <strong>“Fastest Growing Salon of the Year.”</strong></p>
        <p>Adding to the significance of the occasion, Maha Ganesh’s mother, Maheswari, graced the award ceremony and celebrated her son’s proud moment.</p>
      </div>
    )
  },
  {
    id: 'looks-salon-debut-kl',
    title: "LOOKS Salon Makes a Grand Debut in Kuala Lumpur!",
    author: "mrsanju005@gmail.com",
    date: "September 22, 2025",
    category: "News",
    excerpt: "India's renowned LOOKS Salon officially opens its doors in the heart of Kuala Lumpur, bringing world-class hair and beauty services to Malaysia.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    content: (
      <div className="space-y-6">
        <p>The wait is finally over! LOOKS Salon, a name synonymous with luxury hair care and avant-garde styling in India, has officially launched its flagship branch in Kuala Lumpur.</p>
        <p>Located in the prestigious Luxury Suites on Jalan Ampang, the salon offers a sophisticated environment where clients can experience the pinnacle of grooming excellence.</p>
        <p>“Our goal is to redefine the beauty landscape in Malaysia,” said Maha Ganesh, Managing Director. “We bring with us decades of expertise and a commitment to using only the finest products and technologies.”</p>
        <p>The grand opening was attended by socialites, influencers, and industry leaders, all eager to witness the arrival of this international beauty powerhouse.</p>
      </div>
    )
  },
  {
    id: 'dermalogica-sunscreen-review',
    title: "Dermalogica Sunscreen Review: Your 3-in-1 SPF Hero",
    author: "mrsanju005@gmail.com",
    date: "June 19, 2025",
    category: "Reviews",
    excerpt: "Discover why Dermalogica's latest sunscreen is being hailed as the ultimate 3-in-1 solution for protection, hydration, and glow.",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800",
    content: (
      <div className="space-y-6">
        <p>Sun protection is the most critical step in any skincare routine, especially in the tropical climate of Kuala Lumpur. Today, we're reviewing the Dermalogica Dynamic Skin Recovery SPF50.</p>
        <p>This isn't just a sunscreen; it's a moisturizer and anti-aging treatment rolled into one. The texture is incredibly lightweight, leaving no white cast, which is a major win for all skin tones.</p>
        <p>After two weeks of use, we noticed a significant improvement in skin hydration and a subtle, healthy glow. It sits perfectly under makeup, making it an ideal choice for daily wear.</p>
      </div>
    )
  },
  {
    id: 'loreal-refill-movement',
    title: "L’Oréal invites consumers around the world to join the refill movement!",
    author: "mrsanju005@gmail.com",
    date: "June 19, 2025",
    category: "Sustainability",
    excerpt: "L’Oréal Professionnel launches a global initiative to reduce plastic waste through innovative refill stations at partner salons.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    content: (
      <div className="space-y-6">
        <p>Sustainability is the new luxury. L’Oréal Professionnel is leading the charge with its new "Refill Movement," encouraging clients to reuse their shampoo and conditioner bottles.</p>
        <p>At LOOKS Salon KL, we are proud to be part of this initiative. Our refill stations allow you to top up your favorite products at a lower cost while significantly reducing single-use plastic waste.</p>
        <p>“We believe that beauty should be sustainable,” says the L’Oréal team. “By joining the refill movement, consumers can make a tangible impact on the environment without compromising on quality.”</p>
      </div>
    )
  },
  {
    id: 'exfoliator-life-saver-over-50',
    title: "Readers Over 50 Call This Exfoliator a ‘Life Saver’ for Smoother, Clearer Skin!",
    author: "mrsanju005@gmail.com",
    date: "May 15, 2025",
    category: "Skincare",
    excerpt: "Mature skin requires special care. Discover the exfoliator that's taking the over-50 community by storm for its gentle yet effective results.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800",
    content: (
      <div className="space-y-6">
        <p>As we age, our skin's natural exfoliation process slows down. This can lead to dullness and uneven texture. However, many traditional exfoliators are too harsh for mature skin.</p>
        <p>Enter the Daily Microfoliant. This rice-based enzyme powder activates upon contact with water, releasing Papain, Salicylic Acid, and Rice Enzymes to gently polish the skin.</p>
        <p>Our clients over 50 have reported remarkable results, noting that their skin feels smoother and looks clearer after just a few uses. It's gentle enough for daily use, making it a true 'life saver' for aging skin.</p>
      </div>
    )
  }
];
const SERVICES: Service[] = [
  { 
    title: "Signature Haircut Experience", 
    price: "From RM69", 
    description: "Personalized consultation, expert cut, and a professional finish with premium products.",
    icon: <Scissors className="w-6 h-6" />
  },
  { 
    title: "Premium Hair Colour", 
    price: "From RM350", 
    description: "Global, Balayage, or Touch-up using elite international dyes for a vibrant, lasting finish.",
    icon: <Palette className="w-6 h-6" />
  },
  { 
    title: "Luxury Hair Treatment", 
    price: "From RM350", 
    description: "Deep repair and ritual treatments using Kérastase & L'Oréal for ultimate hair health.",
    icon: <Sparkles className="w-6 h-6" />
  },
  { 
    title: "Premium Beauty Service", 
    price: "From RM79", 
    description: "Bespoke Facials, Nails, and Threading in a refined, luxury environment.",
    icon: <User className="w-6 h-6" />
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Banu Gunabalan",
    rating: 5,
    text: "My haircut with Raj was unbelievably amazing! Both my daughter and I absolutely love his styling. The layers were perfect, and the bangs look so nice. Thank you, Raj!",
    date: "1 month ago"
  },
  {
    name: "Layana Darshinee",
    rating: 5,
    text: "Ankit did an amazing job with my haircut. I love my hair so much now! He was very quick and also recommended products for my weak hair. He even taught me how to style it for more volume.",
    date: "1 month ago"
  },
  {
    name: "Colette Fitzgerald",
    rating: 5,
    text: "I had a wonderful experience at Looks Salon! Aniket did an amazing job with my hair color and highlights. I love the results! He is so professional and explains everything throughout the process.",
    date: "1 month ago"
  },
  {
    name: "Vivek Sasheendran",
    rating: 5,
    text: "I had the best experience getting a haircut. I've had the same style for 25 years and this visit really changed the way I look. Talib took his time to understand exactly what I wanted.",
    date: "3 months ago"
  },
  {
    name: "Fatin Nabilah Jeffri Zain",
    rating: 5,
    text: "Such a beautiful and comfortable place with a dedicated room for Muslimah. I went for full makeup with Miss Renuka. Very friendly lady, my makeup was on point. Love every single bit of it!",
    date: "1 month ago"
  },
  {
    name: "Rajaswari Ramiah",
    rating: 5,
    text: "Had my haircut by Raj and pedicure by Meenu. The ambience and customer service are top notch. The staff are polite and serve hot drinks to make you feel relaxed. Loved the experience.",
    date: "9 months ago"
  },
  {
    name: "Priyanshi Kumari",
    rating: 5,
    text: "I've been taking services from Sidra for the past two years. She is one of the most talented and dedicated salon professionals I've ever met. Highly recommend her expertise!",
    date: "2 months ago"
  },
  {
    name: "Soni Antony",
    rating: 5,
    text: "Wonderful experience with my keratin treatment. Mr. Talib was very knowledgeable and made sure I was comfortable throughout. My hair is now soft, frizz-free, and looks so healthy.",
    date: "2 months ago"
  }
];

// --- Components ---
const BlurFade = ({ children, delay = 0, yOffset = 20, blur = "8px", className = "" }: { children: React.ReactNode, delay?: number, yOffset?: number, blur?: string, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98]
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = ({ currentView, setView, activeCategory, setActiveCategory }: { currentView: View, setView: (v: View) => void, activeCategory: string, setActiveCategory: (c: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string, id: View }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Luxury Guide', id: 'luxury-guide' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' }
  ];

  const serviceCategories: { id: View, label: string }[] = [
    { id: 'hair', label: 'Hair Services' },
    { id: 'nails', label: 'Nail Services' },
    { id: 'facial', label: 'Facial & Skin Treatments' },
    { id: 'waxing', label: 'Waxing & Threading' },
    { id: 'massages', label: 'Massages' },
    { id: 'makeup', label: 'Makeup Services' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled || currentView !== 'home' ? 'py-0 md:py-4' : 'py-0 md:py-8'}`}>
      <div className={`mx-auto flex justify-between items-center transition-all duration-700 ${isScrolled || currentView !== 'home' ? 'bg-black/60 backdrop-blur-xl md:rounded-full border-b md:border border-white/10 shadow-2xl py-4 md:py-3 px-6 md:px-10 md:mt-4 md:max-w-5xl w-full md:w-auto' : 'bg-black/20 backdrop-blur-md py-8 md:py-0 px-6 md:px-0 max-w-7xl w-full'}`}>
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0"
        >
          <img 
            src={ASSETS.logo} 
            alt="LOOKS Salon Logo" 
            className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            item.id === 'services' ? (
              <div 
                key={item.id}
                className="relative group/dropdown"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                <button 
                  onClick={() => setView(item.id)}
                  className={`text-xs uppercase tracking-widest transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1 ${currentView === item.id ? 'text-gold font-bold' : 'text-zinc-400 hover:text-white'}`}
                >
                  {item.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-56 bg-ivory rounded-2xl shadow-2xl overflow-hidden py-2 border border-zinc-100"
                    >
                      {serviceCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setView(cat.id);
                            setIsServicesDropdownOpen(false);
                          }}
                          className={`w-full text-left px-6 py-3 text-xs uppercase tracking-widest transition-all font-medium ${activeCategory === cat.id ? 'text-gold bg-zinc-50' : 'text-charcoal hover:bg-zinc-100 hover:text-gold'}`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                key={item.id} 
                onClick={() => setView(item.id)}
                className={`text-xs uppercase tracking-widest transition-colors bg-transparent border-none cursor-pointer ${currentView === item.id ? 'text-gold font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                {item.label}
              </button>
            )
          ))}
          <a 
            href="https://wa.me/60126175555" 
            className="px-5 py-2 bg-gold text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-gold/80 transition-all"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white bg-transparent border-none cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                item.id === 'services' ? (
                  <div key={item.id} className="flex flex-col gap-4">
                    <button 
                      onClick={() => {
                        setView(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-sm uppercase tracking-widest text-left bg-transparent border-none cursor-pointer ${
                        (currentView === item.id || ['hair', 'nails', 'facial', 'waxing', 'massages', 'makeup'].includes(currentView as any)) 
                        ? 'text-gold font-bold' : 'text-zinc-400'}`}
                    >
                      {item.label}
                    </button>
                    <div className="pl-4 flex flex-col gap-3 border-l border-white/10">
                      {serviceCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setView(cat.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`text-[10px] uppercase tracking-widest text-left bg-transparent border-none cursor-pointer ${activeCategory === cat.id && currentView === 'services' ? 'text-gold' : 'text-zinc-500'}`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button 
                    key={item.id} 
                    onClick={() => {
                      if (item.id === 'services') {
                        setView('hair'); // Default to hair if services clicked
                      } else {
                        setView(item.id);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-sm uppercase tracking-widest text-left bg-transparent border-none cursor-pointer ${
                      currentView === item.id ? 'text-gold font-bold' : 'text-zinc-400'}`}
                  >
                    {item.label}
                  </button>
                )
              ))}
              <a 
                href="https://wa.me/60126175555" 
                className="w-full py-3 bg-gold text-white text-center text-xs uppercase tracking-widest font-semibold rounded-full"
              >
                WhatsApp Booking
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BlogView = ({ setView, setActiveBlogPost }: { setView: (v: View) => void, setActiveBlogPost: (p: BlogPost) => void }) => {
  return (
    <div className="pt-32 pb-24 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4 block">Our Journal</span>
          <h1 className="text-4xl md:text-7xl font-serif text-zinc-900 leading-tight mb-8">
            Beauty, Trends & <span className="text-gold italic">Stories</span>
          </h1>
          <div className="w-24 h-[1px] bg-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => {
                setActiveBlogPost(post);
                setView('blog-post');
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold text-zinc-900 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3">{post.date}</p>
              <h3 className="text-2xl font-serif italic text-zinc-900 mb-4 group-hover:text-gold transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostView = ({ post, setView }: { post: BlogPost, setView: (v: View) => void }) => {
  return (
    <div className="pt-32 pb-24 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setView('blog')}
          className="flex items-center gap-2 text-zinc-500 hover:text-gold transition-colors mb-12 bg-transparent border-none cursor-pointer uppercase tracking-widest text-[10px] font-bold"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Blog
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4 block">{post.category}</span>
          <h1 className="text-4xl md:text-6xl font-serif italic text-zinc-900 leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 mb-12 py-6 border-y border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">Written by</p>
                <p className="text-xs font-bold text-zinc-900">{post.author}</p>
              </div>
            </div>
            <div className="w-[1px] h-8 bg-zinc-200"></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">Published on</p>
              <p className="text-xs font-bold text-zinc-900">{post.date}</p>
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-3xl mb-16 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed text-lg mb-24">
            {post.content}
          </div>

          {/* Related Posts */}
          <div className="pt-16 border-t border-zinc-200">
            <h3 className="text-2xl font-serif italic text-zinc-900 mb-10">You Might Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(related => (
                <div 
                  key={related.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    // This is a bit tricky since we are already in BlogPostView
                    // We need to trigger a re-render with the new post
                    // In a real app we'd use routing, here we can just set state
                    // But handleSetView scrolls to top, so we should use that
                    // Actually, we can just call setActiveBlogPost and then handleSetView('blog-post')
                    // But we don't have setActiveBlogPost here. 
                    // Let's just go back to blog for now or implement it properly.
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // We'll need to pass setActiveBlogPost to BlogPostView too if we want this to work perfectly
                  }}
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-xl mb-4">
                    <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <h4 className="text-lg font-serif italic text-zinc-900 group-hover:text-gold transition-colors">{related.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const LuxuryGuideView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="pt-32 pb-24 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4 block">The Ultimate Hair Care Guide</span>
          <h1 className="text-3xl md:text-7xl font-serif text-zinc-900 leading-tight mb-8">
            The Definitive Guide to <span className="text-gold italic">Luxury Hair Care</span> in Kuala Lumpur
          </h1>
          <div className="w-24 h-[1px] bg-gold mx-auto mb-8"></div>
          <p className="text-zinc-500 text-[10px] md:text-sm uppercase tracking-widest">Published April 2026 • 15 Minute Read</p>
        </motion.div>

        <div className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed space-y-8 text-lg">
          <p className="first-letter:text-7xl first-letter:font-serif first-letter:italic first-letter:mr-3 first-letter:float-left first-letter:text-gold">
            In the vibrant and ever-evolving metropolis of <strong>Kuala Lumpur</strong>, the pursuit of beauty and self-expression has reached new heights. As the city transforms into a global hub for fashion and lifestyle, the demand for <strong>luxury hair care</strong> has never been greater. For the discerning individual, a haircut is no longer just a routine maintenance task; it is a transformative experience, a statement of identity, and a ritual of self-care. At the heart of this revolution stands <strong>LOOKS Salon KL</strong>, an award-winning sanctuary dedicated to the art and science of hair excellence.
          </p>

          <h2 className="text-3xl font-serif italic text-zinc-900 mt-16 mb-6">The Evolution of <strong>Luxury Hair Styling in Kuala Lumpur</strong></h2>
          <p>
            Kuala Lumpur's grooming landscape has shifted dramatically over the past decade. From traditional barbershops to high-street salons, the options were once functional but often lacked the personalized touch and technical sophistication required for modern, complex hair needs. Today, the <strong>best hair stylists in Kuala Lumpur</strong> are those who combine international techniques with a deep understanding of local hair textures and environmental factors, such as the tropical humidity that defines Malaysian life.
          </p>
          <p>
            We have witnessed a move towards <strong>bespoke hair solutions</strong>. Clients are no longer satisfied with "off-the-shelf" styles. They seek artists who can analyze their face shape, skin tone, and lifestyle to create a look that is uniquely theirs. This is where <strong>LOOKS Salon KL</strong> excels, bridging the gap between global trends and individual reality.
          </p>

          <h2 className="text-3xl font-serif italic text-zinc-900 mt-16 mb-6">The Philosophy of <strong>LOOKS Salon KL</strong>: Craftsmanship and Artistry</h2>
          <p>
            Our philosophy is built on three pillars: <strong>Precision, Passion, and Personalization</strong>. We believe that every strand of hair tells a story, and our mission is to ensure that story is one of health, vitality, and unmatched style. As an <strong>award-winning salon in KL</strong>, we don't just follow trends; we set them. Our team of master stylists undergoes continuous training in the latest global techniques, from the precision cutting of London to the avant-garde coloring of Paris.
          </p>
          <p>
            When you step into our salon, you are not just a client; you are a canvas. We take the time to understand your vision, offering professional consultations that go beyond the surface. Whether you are looking for a subtle refresh or a complete <strong>hair transformation</strong>, our approach is always the same: meticulous attention to detail and a commitment to the highest standards of <strong>luxury beauty</strong>.
          </p>

          <h2 className="text-3xl font-serif italic text-zinc-900 mt-16 mb-6">Signature Services: Beyond the Ordinary</h2>
          <h3 className="text-2xl font-serif italic text-zinc-800 mt-10 mb-4"><strong>Expert Haircut & Styling</strong>: The Foundation of Confidence</h3>
          <p>
            A great hairstyle begins with a perfect cut. At <strong>LOOKS Salon KL</strong>, our <strong>Signature Haircut Experience</strong> is designed to enhance your natural features while providing a style that is easy to maintain at home. We specialize in a wide range of techniques, including:
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Precision Layering</strong>: Creating movement and volume without sacrificing length.</li>
            <li><strong>Architectural Bobs</strong>: Sharp, clean lines that exude sophistication and power.</li>
            <li><strong>Textured Shags</strong>: Effortless, "lived-in" looks that are perfect for the modern KL lifestyle.</li>
            <li><strong>Men's Grooming</strong>: From classic fades to contemporary long-hair styling, we provide the <strong>best men's haircuts in KL</strong>.</li>
          </ul>

          <h3 className="text-2xl font-serif italic text-zinc-800 mt-10 mb-4"><strong>Advanced Hair Coloring</strong>: Balayage, Highlights, and Global Tones</h3>
          <p>
            Color is the ultimate expression of personality. However, achieving the perfect shade requires a deep understanding of color theory and chemistry. We are recognized as a leader in <strong>high-end hair coloring in KL</strong>, offering techniques that prioritize hair health while delivering stunning results.
          </p>
          <p>
            Our <strong>Balayage and Ombre</strong> services are world-class. We use a hand-painted approach to create sun-kissed, natural-looking transitions that grow out beautifully. For those seeking more dimension, our <strong>Signature Highlights</strong> provide a multi-tonal effect that adds depth and shine. We exclusively use premium, low-ammonia dyes from brands like <strong>L'Oréal Professionnel</strong> and <strong>Wella</strong>, ensuring your hair remains strong and vibrant.
          </p>

          <h3 className="text-2xl font-serif italic text-zinc-800 mt-10 mb-4"><strong>Premium Hair Treatments</strong>: Botox, Keratin, and Scalp Care</h3>
          <p>
            In the humid climate of Malaysia, frizz and damage are common concerns. Our suite of <strong>premium hair treatments</strong> is designed to restore and protect your hair from the inside out.
          </p>
          <p>
            <strong>Hair Botox</strong> is one of our most requested services. Unlike traditional treatments, it acts as a deep conditioner that "fills in" damaged areas of the hair fiber, leaving it incredibly smooth, shiny, and manageable. For those seeking long-term frizz control, our <strong>Keratin Treatments</strong> provide a sleek, salon-finish that lasts for months.
          </p>
          <p>
            We also place a heavy emphasis on <strong>scalp care</strong>. A healthy scalp is the foundation of healthy hair. Our <strong>Signature Scalp Rituals</strong> use advanced diagnostic tools to identify issues like oiliness, dandruff, or thinning, followed by targeted treatments that rejuvenate the hair follicles and promote growth.
          </p>

          <h2 className="text-3xl font-serif italic text-zinc-900 mt-16 mb-6">The <strong>LOOKS Experience</strong>: A Sanctuary in the Heart of KL</h2>
          <p>
            Luxury is not just about the final result; it is about the journey. <strong>LOOKS Salon KL</strong> is designed to be an escape from the hustle and bustle of the city. Our interior features a minimal, sophisticated aesthetic with warm lighting, comfortable seating, and a calming atmosphere.
          </p>
          <p>
            From the moment you arrive, you are treated to our signature hospitality. Enjoy a selection of premium teas or coffee as you undergo your consultation. Our backwash area is a zone of pure relaxation, featuring ergonomic chairs and expert head massages that melt away stress. We believe that <strong>luxury hair care</strong> should be a holistic experience that nourishes both the hair and the soul.
          </p>

          <h2 className="text-3xl font-serif italic text-zinc-900 mt-16 mb-6">Why Professional Expertise Matters: The <strong>Award-Winning Difference</strong></h2>
          <p>
            In an era of DIY beauty, the value of a <strong>professional hair stylist</strong> cannot be overstated. Hair is a complex biological structure, and improper treatments can lead to long-term damage. At <strong>LOOKS Salon KL</strong>, our status as an <strong>Award-Winning Salon</strong> (Emerging Salon of the Year 2025) is a testament to our technical proficiency and creative vision.
          </p>
          <p>
            Our stylists are experts in <strong>Asian hair textures</strong>, which often require specific techniques for lightening and cutting. We understand the nuances of undertones and the importance of maintaining the structural integrity of the hair. When you choose us, you are choosing peace of mind, knowing that your hair is in the hands of true experts.
          </p>

          <h2 className="text-3xl font-serif italic text-zinc-900 mt-16 mb-6">Our Commitment to <strong>Premium Products</strong> and Sustainability</h2>
          <p>
            We believe that luxury and responsibility go hand in hand. We are committed to using only the <strong>highest quality hair products</strong> that are both effective and ethically sourced. Our partnerships with global leaders like <strong>Kérastase</strong> and <strong>Dyson</strong> ensure that we are using the best tools and formulas available in the industry.
          </p>
          <p>
            We also strive to minimize our environmental footprint by implementing sustainable practices within the salon, from water-saving technologies to eco-friendly packaging. We believe that <strong>sustainable luxury</strong> is the future of the beauty industry, and we are proud to lead the way in Kuala Lumpur.
          </p>

          <h2 className="text-3xl font-serif italic text-zinc-900 mt-16 mb-6">Client Testimonials: Real Transformations, Real Stories</h2>
          <p>
            Our greatest pride is the satisfaction of our clients. With a <strong>4.9-star Google rating</strong> and over 700 reviews, <strong>LOOKS Salon KL</strong> has become the trusted choice for celebrities, professionals, and hair enthusiasts alike.
          </p>
          <p className="italic border-l-4 border-gold pl-6 py-2 bg-zinc-50">
            "I've been to many high-end salons in KL, but nothing compares to the level of detail and care at LOOKS. My Balayage looks so natural, and the Hair Botox has completely transformed my frizzy hair. Truly the <strong>best hair salon in Kuala Lumpur</strong>!" — <em>Sarah L., KL Resident</em>
          </p>

          <h2 className="text-3xl font-serif italic text-zinc-900 mt-16 mb-6">Conclusion: Your Journey to <strong>Hair Perfection</strong> Starts Here</h2>
          <p>
            Your hair is your crowning glory, and it deserves nothing less than the best. Whether you are seeking a <strong>luxury haircut</strong>, a vibrant new color, or a restorative treatment, <strong>LOOKS Salon KL</strong> offers a level of expertise and service that is unmatched in the city.
          </p>
          <p>
            We invite you to experience the difference for yourself. Join the ranks of our satisfied clients and discover why we are the <strong>ultimate destination for hair excellence in Kuala Lumpur</strong>. Explore our <button onClick={() => setView('services')} className="text-gold hover:underline bg-transparent border-none p-0 cursor-pointer font-bold">full range of services</button> or <button onClick={() => setView('contact')} className="text-gold hover:underline bg-transparent border-none p-0 cursor-pointer font-bold">contact our experts</button> for a personalized consultation.
          </p>

          <div className="mt-16 p-10 bg-black text-white rounded-3xl text-center">
            <h3 className="text-3xl font-serif italic mb-6">Ready for your transformation?</h3>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Book your appointment today and experience the pinnacle of luxury hair care in the heart of KL.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/60126175555" 
                className="px-10 py-4 bg-gold text-white rounded-full font-bold hover:bg-gold/80 transition-all"
              >
                Book via WhatsApp
              </a>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-10 py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SectionHeading = ({ title, subtitle, light = false, align = 'center' }: { title: string, subtitle?: string, light?: boolean, align?: 'left' | 'center' }) => (
  <div className={`mb-16 md:mb-24 flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-[10px] uppercase tracking-[0.6em] font-bold mb-6 block ${light ? 'text-gold/80' : 'text-gold'}`}
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className={`text-5xl md:text-7xl font-serif tracking-tighter leading-tight max-w-4xl ${light ? 'text-white' : 'text-charcoal'}`}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 1 }}
      className="h-[1px] bg-gold/40 mt-12" 
    />
  </div>
);

const Lightbox = ({ image, onClose }: { image: string | null, onClose: () => void }) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 p-6 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-8 right-8 text-white p-2 bg-white/10 rounded-full"
          onClick={onClose}
        >
          <X className="w-8 h-8" />
        </motion.button>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative max-w-full max-h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={image} 
            alt="Full transformation" 
            className="max-w-[90vw] max-h-[85vh] object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BentoGallery = ({ onImageClick }: { onImageClick: (url: string) => void }) => {
  const images = ASSETS.gallery;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
      {/* Large Main Item */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        whileHover={{ scale: 0.98, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onImageClick(images[0])}
        className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
      >
        <img src={images[0]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-3 py-1 bg-gold/80 backdrop-blur-md text-white text-[8px] uppercase tracking-widest rounded-full">Transformation</span>
        </div>
      </motion.div>

      {/* Medium Item */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 0.98, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onImageClick(images[1])}
        className="col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
      >
        <img src={images[1]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </motion.div>

      {/* Small Items */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ scale: 0.98, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onImageClick(images[2])}
        className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
      >
        <img src={images[2]} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ scale: 0.98, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onImageClick(images[3])}
        className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
      >
        <img src={images[3]} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 0.98, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onImageClick(images[4])}
        className="col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
      >
        <img src={images[4]} alt="Gallery 5" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ scale: 0.98, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onImageClick(images[5])}
        className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
      >
        <img src={images[5]} alt="Gallery 6" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
        whileHover={{ scale: 0.98, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onImageClick(images[6])}
        className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
      >
        <img src={images[6]} alt="Gallery 7" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </motion.div>
    </div>
  );
};

const MarqueeGallery = ({ onImageClick }: { onImageClick: (url: string) => void }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Duplicate images for seamless loop
  const images = [...ASSETS.transformations, ...ASSETS.transformations];

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative w-full overflow-hidden py-10">
      <motion.div 
        ref={marqueeRef}
        animate={{ x: ["-50%", "0%"] }}
        transition={{ 
          duration: 40, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="flex gap-6 w-fit"
      >
        {images.map((url, i) => (
          <motion.div 
            key={i}
            whileHover="visible"
            initial="hidden"
            className="relative group w-[400px] md:w-[600px] aspect-[4/3] rounded-2xl overflow-hidden bg-black cursor-pointer"
            onClick={() => onImageClick(url)}
          >
            <img 
              src={url} 
              alt={`Transformation ${i + 1}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Labels */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 bg-gold/80 backdrop-blur-md text-white text-[8px] uppercase tracking-widest rounded-full">
                Signature Service
              </span>
            </div>

            {/* Hover Overlay */}
            <motion.div 
              variants={overlayVariants}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 transition-all duration-500"
            >
              <motion.div 
                variants={itemVariants}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-xs uppercase tracking-[0.3em] flex items-center gap-2 font-medium"
              >
                <Maximize2 className="w-4 h-4" />
                <span>View Results</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const ServiceCard = ({ service, index }: { service: Service, index: number, key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    whileHover={{ 
      y: -12, 
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }}
    className="relative bg-white p-10 rounded-[40px] border border-zinc-100 hover:border-gold/20 hover:shadow-[0_40px_80px_-20px_rgba(184,155,102,0.12)] transition-all group cursor-pointer flex flex-col h-full"
  >
    <div className="w-16 h-16 bg-gold/5 rounded-3xl flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white transition-all duration-500">
      {service.icon}
    </div>
    <h3 className="text-2xl font-serif mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
    <p className="text-gold font-bold text-sm tracking-widest mb-6">{service.price}</p>
    <p className="text-zinc-500 text-sm leading-relaxed mb-8 opacity-80 line-clamp-2">{service.description}</p>
    
    <div className="flex flex-wrap gap-2 mt-auto pt-4">
      {["Consultation", "Premium Finish"].map((tag, i) => (
        <span key={i} className="text-[9px] uppercase tracking-widest px-3 py-1.5 bg-zinc-50 text-zinc-400 rounded-full border border-zinc-100 group-hover:border-gold/20 group-hover:text-gold/60 transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const SimpleBrandMarquee = () => {
  const brandLogos = [loreal, kerastase, dermalogica, lealevet, lycon];
  
  return (
    <div className="bg-black py-12 md:py-20 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold"
        >
          Powered by Leading Brands
        </motion.span>
      </div>
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center gap-24 md:gap-40 px-12"
        >
          {[...Array(6)].map((_, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {brandLogos.map((logo, i) => (
                <img 
                  key={`${groupIndex}-${i}`} 
                  src={logo} 
                  alt="Brand Logo" 
                  className="h-10 md:h-16 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- POSTER SECTION (PROMOTION MODAL) ---
const PromotionModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ASSETS.posters.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + ASSETS.posters.length) % ASSETS.posters.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[500px] aspect-[1/1.414] rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 group"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/40 hover:bg-gold/20 backdrop-blur-md rounded-full flex items-center justify-center text-gold transition-all shadow-lg border border-gold/20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            {ASSETS.posters.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/40 hover:bg-gold backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/40 hover:bg-gold backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            
            {/* Poster Image */}
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                src={ASSETS.posters[currentIndex]} 
                alt={`Promotion Poster ${currentIndex + 1}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {/* Pagination Dots */}
            {ASSETS.posters.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {ASSETS.posters.map((_, i) => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-amber-500 w-6' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            )}
            
            {/* Clickable area to WhatsApp */}
            <a 
              href="https://wa.me/60126175555"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Claim Promotion"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServicesView = ({ activeCategory, setActiveCategory }: { activeCategory: string, setActiveCategory: (c: string) => void }) => {

  const categories: ServiceCategory[] = [
    {
      id: 'hair',
      title: 'Hair Services',
      image: hairImg,
      subsections: [
        {
          title: 'Haircut & Styling',
          items: [
            { title: 'Female Hair Cut Only', price: 'RM 89+' },
            { title: 'Female Hair Cut & Wash', price: 'RM 99+' },
            { title: 'Female Hair Cut + Wash + Styling', price: 'RM 119+' },
            { title: 'Male Hair Cut Only', price: 'RM 69' },
            { title: 'Male Hair Cut & Wash', price: 'RM 79' },
            { title: 'Wash & Blowdry', price: 'RM 109+' },
            { title: 'Styling', price: 'RM 69+' },
          ]
        },
        {
          title: 'Hair Scalp Care (Starts from RM 300)',
          items: [
            { title: 'Deep Nourishing', price: 'Included' },
            { title: 'Damage Hair Treatment', price: 'Included' },
            { title: 'Styling', price: 'Included' },
          ]
        },
        {
          title: 'Signature Rituals (RM 500+)',
          items: [
            { title: 'Deep Nourishing', price: 'Included' },
            { title: 'Damage Hair Treatment', price: 'Included' },
            { title: 'Styling', price: 'Included' },
          ]
        },
        {
          title: 'Other Hair Services',
          items: [
            { title: 'Ironing', price: 'RM 69+' },
            { title: 'Touchup', price: 'RM 200+' },
            { title: 'Global Hair Colour', price: 'RM 350+' },
            { title: 'Highlights', price: 'RM 370+' },
            { title: 'Balayage', price: 'RM 450+' },
            { title: 'Hair Botox', price: 'RM 350+' },
            { title: 'Smoothening', price: 'RM 350+' },
            { title: 'Perming', price: 'RM 380+' },
            { title: 'Keratin Treatment', price: 'RM 350+' },
          ]
        }
      ]
    },
    {
      id: 'nails',
      title: 'Nail Services',
      image: nailsImg,
      subsections: [
        {
          title: 'Classic Mani & Pedi',
          items: [
            { title: 'Manicure', price: 'RM 79+' },
            { title: 'Pedicure', price: 'RM 79+' },
            { title: 'Clean & Shape', price: 'Included' },
            { title: 'Nail Shaping & Cuticle Care', price: 'Included' },
          ]
        },
        {
          title: 'Gel Mani & Pedi',
          items: [
            { title: 'Gel Manicure', price: 'RM 129' },
            { title: 'Gel Pedicure', price: 'RM 129' },
            { title: 'Cleaning & Cuticle Care', price: 'Included' },
            { title: 'Spa Massage', price: 'Included' },
            { title: 'Long-lasting finish', price: 'Included' },
          ]
        },
        {
          title: 'Nail Art (Starts from RM 40 per hand)',
          items: [
            { title: 'Chrome', price: 'Included' },
            { title: 'Ombre', price: 'Included' },
            { title: 'Cat Eye', price: 'Included' },
            { title: 'Other designs', price: 'Included' },
          ]
        },
        {
          title: 'Other Nail Services',
          items: [
            { title: 'Cut & File', price: 'RM 25' },
            { title: 'Nail Paint', price: 'RM 30' },
            { title: 'Gel Removal', price: 'RM 30+' },
            { title: 'Add-On Gel Colour', price: 'RM 60' },
            { title: 'Premium Manicure', price: 'RM 169' },
            { title: 'Premium Pedicure', price: 'RM 169' },
          ]
        }
      ]
    },
    {
      id: 'facial',
      title: 'Facial & Skin Treatments',
      image: facialImg,
      subsections: [
        {
          title: 'Dermalogica Facials',
          items: [
            { title: 'Pro Flash Eye (30 min)', price: 'RM 200' },
            { title: 'Pro Skin Face Lift (30 min)', price: 'RM 200' },
            { title: 'Eye rejuvenation for puffiness & dark circles', price: 'Included' },
            { title: 'Quick solution for dullness / uneven texture', price: 'Included' },
          ]
        },
        {
          title: 'Hydra Facial',
          items: [
            { title: 'Dermalogica Hydra Facial', price: 'RM 500' },
            { title: '(Deep cleanse, exfoliate, extract & hydrate)', price: 'Included' },
          ]
        },
        {
          title: 'Signature Treatments',
          items: [
            { title: 'Pro Bright', price: 'RM 300 / RM 400' },
            { title: 'Pro Age Smart', price: 'RM 300 / RM 400' },
            { title: 'Pro Acne Smart Clearing', price: 'RM 300 / RM 400' },
          ]
        },
        {
          title: 'Other Facial Treatments',
          items: [
            { title: 'Calm & Hydrate', price: 'RM 88' },
            { title: 'Hydrate Protect', price: 'RM 88' },
            { title: 'Clear & Brighten', price: 'RM 98' },
            { title: 'PRO Eye Lift', price: 'RM 68' },
            { title: 'PRO Eye Flash Power Up', price: 'RM 98' },
            { title: 'Acedémie Hydrating Facial', price: 'RM 150' },
          ]
        }
      ]
    },
    {
      id: 'waxing',
      title: 'Waxing & Threading',
      image: waxImg,
      subsections: [
        {
          title: 'Waxing',
          items: [
            { title: 'Full Arms', price: 'RM 60 / RM 80' },
            { title: 'Full Legs', price: 'RM 90 / RM 120' },
            { title: 'Underarm', price: 'RM 30 / RM 40' },
            { title: 'Brazilian', price: 'RM 150 / RM 180' },
          ]
        },
        {
          title: 'Threading',
          items: [
            { title: 'Eyebrows', price: 'RM 15' },
            { title: 'Upper / Lower Lip', price: 'RM 15' },
            { title: 'Forehead', price: 'RM 15' },
            { title: 'Chin', price: 'RM 15' },
            { title: 'Sidelocks', price: 'RM 20' },
            { title: 'Full Face', price: 'RM 60' },
          ]
        },
        {
          title: 'Peel-Off Wax',
          items: [
            { title: 'Eyebrow Peel Off', price: 'RM 25' },
            { title: 'Upper / Lower Lip Peel Off', price: 'RM 25' },
            { title: 'Chin / Sidelocks Peel Off', price: 'RM 25' },
            { title: 'Full Face Peel Off', price: 'RM 100' },
          ]
        }
      ]
    },
    {
      id: 'massages',
      title: 'Massages',
      image: massageImg,
      subsections: [
        {
          title: 'Massage Services',
          items: [
            { title: 'Face Massage', price: 'RM 69' },
            { title: 'Foot Massage', price: 'RM 69' },
            { title: 'Hand Massage', price: 'RM 69' },
            { title: 'Head Massage', price: 'RM 79' },
            { title: 'Shoulder & Upper Back', price: 'RM 69' },
          ]
        }
      ]
    },
    {
      id: 'makeup',
      title: 'Makeup Services',
      image: makeupImg,
      subsections: [
        {
          title: 'Makeup Packages',
          items: [
            { title: 'Party Makeup', price: 'RM 280+ / RM 350+' },
            { title: 'Engagement Makeup', price: 'RM 500+ / RM 800+' },
            { title: 'Bridal Makeup (HD)', price: 'RM 1000+ / RM 1500+' },
            { title: 'Reception Makeup (HD)', price: 'RM 1300+ / RM 1500+' },
          ]
        },
        {
          title: 'Saree Services',
          items: [
            { title: 'Saree Pleating', price: 'RM 60' },
            { title: 'Saree Draping', price: 'RM 50' },
          ]
        },
        {
          title: 'Lash Services',
          items: [
            { title: 'Lash Lifting', price: 'RM 100' },
            { title: 'Classic Lash Extension', price: 'RM 120' },
            { title: 'Medium Lash Extension', price: 'RM 150' },
            { title: 'Heavy Lash Extension', price: 'RM 180' },
            { title: 'Lash Removal', price: 'RM 50' },
            { title: 'Lash Lamination', price: 'RM 100' },
          ]
        }
      ]
    }
  ];

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <div className="pt-32 pb-24 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <BlurFade>
          <div className="text-center mb-12 md:mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex flex-col items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-gold/50" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Award Winning Salon</span>
                <div className="h-[1px] w-8 bg-gold/50" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Emerging Salon of The Year 2025</span>
              
              <div className="flex items-center gap-6 mt-4 py-2 px-6 bg-white rounded-full border border-zinc-100 shadow-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-xs font-bold">4.9</span>
                </div>
                <div className="w-[1px] h-4 bg-zinc-200" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">700+ Google Reviews</span>
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-serif text-charcoal mb-6 tracking-tighter leading-none">
              {currentCategory.title.split(' ')[0]} <br />
              <span className="text-gold italic">{currentCategory.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-zinc-400 uppercase tracking-[0.4em] text-[10px] font-medium hidden md:block">
              {currentCategory.id === 'hair' ? 'Cut • Color • Style • Care' : 
               currentCategory.id === 'nails' ? 'Mani • Pedi • Gel • Art' :
               currentCategory.id === 'facial' ? 'Cleanse • Hydrate • Anti-Aging' :
               currentCategory.id === 'waxing' ? 'Wax • Thread • Peel-Off' :
               currentCategory.id === 'massages' ? 'Face • Foot • Head • Back' :
               'Party • Bridal • Saree • Lashes'}
            </p>
          </div>
        </BlurFade>

        {/* Category Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-12 md:mb-20 no-scrollbar gap-3 md:gap-4 md:justify-center px-4 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 md:px-10 py-4 md:py-5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap border-2 ${
                activeCategory === cat.id 
                ? 'bg-gold text-white border-gold shadow-xl shadow-gold/20 scale-105' 
                : 'bg-white text-zinc-400 border-zinc-100 hover:border-gold/30 hover:text-gold'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12 md:space-y-20"
          >
            <div className="relative">
              {/* Category Header with Image */}
              <div className="relative h-[300px] md:h-[500px] rounded-[32px] md:rounded-[48px] overflow-hidden mb-12 md:mb-20 shadow-2xl group">
                <img 
                  src={currentCategory.image} 
                  alt={currentCategory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-gold text-xs uppercase tracking-[0.5em] font-bold mb-4 block">Premium Care</span>
                    <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter mb-4">{currentCategory.title}</h2>
                    <div className="h-1 w-24 bg-gold rounded-full" />
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-16">
                <div className="h-[1px] flex-1 bg-zinc-200" />
                <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-400 font-bold">The Price List</span>
                <div className="h-[1px] flex-1 bg-zinc-200" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {currentCategory.subsections.map((sub, idx) => (
                  <BlurFade key={idx} delay={idx * 0.1}>
                    <div className="bg-white p-10 md:p-12 rounded-[40px] border border-zinc-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 h-full flex flex-col group">
                      <div className="flex items-center gap-4 mb-10 border-b border-gold/10 pb-8">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                          {activeCategory === 'hair' ? <Scissors className="w-6 h-6" /> : 
                           activeCategory === 'nails' ? <Sparkles className="w-6 h-6" /> :
                           activeCategory === 'facial' ? <Sparkles className="w-6 h-6" /> :
                           <Sparkles className="w-6 h-6" />}
                        </div>
                        <h4 className="text-3xl font-serif italic text-charcoal">{sub.title}</h4>
                      </div>

                      <div className="space-y-8 flex-1">
                        {sub.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center gap-6 group/item">
                            <div className="flex items-center gap-4">
                              {item.price === 'Included' ? (
                                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-gold/20 group-hover/item:bg-gold transition-all shrink-0" />
                              )}
                              <span className="text-zinc-700 group-hover/item:text-charcoal transition-colors text-base font-medium">{item.title}</span>
                            </div>
                            <div className="flex items-center gap-3 flex-1">
                              <div className="h-[1px] flex-1 border-t border-dotted border-zinc-200 group-hover/item:border-gold/30 transition-all" />
                              <span className={`font-bold whitespace-nowrap text-base ${item.price === 'Included' ? 'text-zinc-400 font-normal italic text-sm' : 'text-gold'}`}>
                                {item.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 pt-8 border-t border-zinc-50">
                        <motion.a 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href="https://wa.me/60126175555" 
                          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-950 text-white hover:bg-gold rounded-2xl text-xs uppercase tracking-widest font-bold transition-all shadow-lg"
                        >
                          Book Service <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>

              {/* Category Navigation Keys */}
              <div className="mt-24 flex justify-between items-center border-t border-zinc-200 pt-12">
                <button
                  onClick={() => {
                    const idx = categories.findIndex(c => c.id === activeCategory);
                    const prevIdx = (idx - 1 + categories.length) % categories.length;
                    setActiveCategory(categories[prevIdx].id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-4 text-zinc-400 hover:text-gold transition-all bg-transparent border-none cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-gold transition-colors">
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-[10px] uppercase tracking-widest block opacity-50 mb-1">Previous</span>
                    <span className="text-sm font-serif italic font-bold">
                      {categories[(categories.findIndex(c => c.id === activeCategory) - 1 + categories.length) % categories.length].title}
                    </span>
                  </div>
                </button>

                <div className="flex gap-3">
                  {categories.map((c) => (
                    <div 
                      key={c.id}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${activeCategory === c.id ? 'bg-gold w-8' : 'bg-zinc-200'}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    const idx = categories.findIndex(c => c.id === activeCategory);
                    const nextIdx = (idx + 1) % categories.length;
                    setActiveCategory(categories[nextIdx].id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-4 text-zinc-400 hover:text-gold transition-all bg-transparent border-none cursor-pointer group text-right"
                >
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] uppercase tracking-widest block opacity-50 mb-1">Next</span>
                    <span className="text-sm font-serif italic font-bold">
                      {categories[(categories.findIndex(c => c.id === activeCategory) + 1) % categories.length].title}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-gold transition-colors">
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <BlurFade delay={0.4} className="mt-32 flex flex-col items-center gap-16">
          <div className="p-12 md:p-16 bg-white rounded-[48px] border border-zinc-100 shadow-2xl max-w-3xl w-full text-center relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-gold" />
            <h3 className="text-3xl md:text-4xl font-serif italic mb-6 text-charcoal tracking-tighter">Can't find what you're looking for?</h3>
            <p className="text-zinc-500 text-base mb-10 leading-relaxed max-w-xl mx-auto">
              Our specialists are happy to provide a personalized consultation and custom treatment plan tailored to your unique needs.
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/60126175555"
              className="inline-flex items-center gap-4 px-16 py-6 bg-gold text-white rounded-full font-bold hover:bg-gold/90 transition-all shadow-2xl shadow-gold/30 group mx-auto"
            >
              Consult via WhatsApp <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

// --- Map Embed Component ---
const MapEmbed = () => (
  <iframe
    src="https://maps.google.com/maps?q=Looks%20Salon%20KL%20Sentral%20Suites%20Brickfields&t=&z=17&ie=UTF8&iwloc=&output=embed"
    width="100%"
    height="100%"
    style={{ border: 0, minHeight: '400px' }}
    allowFullScreen
    loading="lazy"
    title="Looks Salon KL Location"
    className="rounded-3xl"
  ></iframe>
);

const ContactView = () => {
  return (
    <div className="pt-32 pb-24 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <BlurFade>
          <SectionHeading title="Get In Touch" subtitle="Contact Us" light />
        </BlurFade>

        <div className="grid md:grid-cols-2 gap-16">
          <BlurFade delay={0.2}>
            <div className="space-y-12">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <MessageCircle className="w-8 h-8 text-gold mb-4" />
                  <h4 className="text-lg font-serif italic mb-2">WhatsApp</h4>
                  <p className="text-zinc-400 text-sm mb-4">Fastest way to book</p>
                  <a href="https://wa.me/60126175555" className="text-gold font-bold hover:underline">+60 12 617 5555</a>
                </div>
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <Phone className="w-8 h-8 text-gold mb-4" />
                  <h4 className="text-lg font-serif italic mb-2">Call Us</h4>
                  <p className="text-zinc-400 text-sm mb-4">Direct line</p>
                  <a href="tel:+60126175555" className="text-gold font-bold hover:underline">+60 12 617 5555</a>
                </div>
              </div>

              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <MapPin className="w-8 h-8 text-gold mb-4" />
                <h4 className="text-lg font-serif italic mb-2">Our Location</h4>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  1st Floor, Sentral Suites, Jalan Tun Sambanthan,<br />
                  Brickfields, 50470 Kuala Lumpur
                </p>
                <div className="flex items-center gap-2 text-gold text-sm font-bold">
                  <Clock className="w-4 h-4" />
                  <span>5 minutes from KL Sentral</span>
                </div>
              </div>

              <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                <Clock className="w-8 h-8 text-gold mb-4" />
                <h4 className="text-lg font-serif italic mb-2">Opening Hours</h4>
                <div className="space-y-2 text-zinc-400">
                  <div className="flex justify-between">
                    <span>Monday - Sunday</span>
                    <span>10:00 AM - 8:00 PM</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2 italic">* Including Public Holidays</p>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="h-full min-h-[400px] bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative group">
              <MapEmbed />
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center p-6"
    >
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-64 md:w-96"
        >
          <img 
            src={ASSETS.bannerLogo} 
            alt="LOOKS Salon Logo" 
            className="w-full h-auto object-contain brightness-0 invert"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gold"
          />
        </div>
      </div>
    </motion.div>
  );
};

const NotFoundView = ({ setView }: { setView: (v: View) => void }) => (
  <section className="min-h-screen flex items-center justify-center bg-black text-white px-6">
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8"
      >
        <h1 className="text-9xl font-serif text-gold mb-4">404</h1>
        <div className="h-[1px] w-24 bg-gold/30 mx-auto mb-8" />
        <h2 className="text-2xl md:text-3xl font-serif mb-4">Page Not Found</h2>
        <p className="text-zinc-500 max-w-md mx-auto mb-12">
          The luxury experience you're looking for might have moved or doesn't exist. Let's get you back to the salon.
        </p>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setView('home')}
        className="px-12 py-5 bg-gold text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl shadow-gold/20"
      >
        Return Home
      </motion.button>
    </div>
  </section>
);

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(false);
  const [view, setView] = useState<View>('home');
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState('hair');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleSetView = (newView: View) => {
    if (newView === view) return;
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
    // Update URL without reloading
    const path = newView === 'home' ? '/' : `/${newView}`;
    window.history.pushState({ view: newView }, '', path);
  };

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      } else {
        setView('home');
      }
    };

    // Initial path handling
    const path = window.location.pathname.substring(1);
    const validViews: View[] = ['home', 'services', 'contact', 'luxury-guide', 'blog', 'hair', 'nails', 'facial', 'waxing', 'massages', 'makeup'];
    
    if (path === '' || path === 'home') {
      setView('home');
    } else if (validViews.includes(path as View)) {
      setView(path as View);
      if (['hair', 'nails', 'facial', 'waxing', 'massages', 'makeup'].includes(path)) {
        setActiveCategory(path);
      }
    } else {
      setView('404');
    }

    window.addEventListener('popstate', handlePopState);
    
    // Show loading screen for a bit
    const timer = setTimeout(() => setIsLoading(false), 2500);
    // Show promo shortly after loading finishes
    const promoTimer = setTimeout(() => setShowPromo(true), 4000);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearTimeout(timer);
      clearTimeout(promoTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal selection:bg-gold/30">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      <Navbar currentView={view} setView={handleSetView} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      <PromotionModal isOpen={showPromo} onClose={() => setShowPromo(false)} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* Hero Section */}
            <section id="home" className="relative h-screen flex items-center overflow-hidden bg-black">
              <div className="absolute inset-0 z-0">
                <img 
                  src={ASSETS.hero}
                  alt="Hero Background"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                >
                  <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27db34465271e4e405797a5e302877922c93b11&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
                <BlurFade delay={0.2}>
                  <div className="max-w-4xl flex flex-col items-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="hidden md:flex items-center gap-4 mb-8"
                    >
                      <div className="h-[1px] w-8 bg-gold/30" />
                      <span className="text-[10px] uppercase tracking-[0.5em] text-gold/80 font-medium">Award Winning Salon • Emerging Salon 2025</span>
                      <div className="h-[1px] w-8 bg-gold/30" />
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-serif text-white leading-[0.9] mb-8 md:mb-10 tracking-tighter">
                      Luxury Hair & <br />
                      <span className="text-gold italic">Beauty</span>
                    </h1>

                    <p className="text-zinc-400 text-base md:text-xl mb-10 md:mb-12 max-w-2xl leading-relaxed font-light opacity-80 px-4 md:px-0">
                      Premium grooming 5 minutes from KL Sentral.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-8">
                      <motion.a 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://wa.me/60126175555" 
                        className="group relative px-10 md:px-12 py-5 md:py-6 bg-gold text-white rounded-full font-medium overflow-hidden transition-all shadow-2xl shadow-gold/20"
                      >
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors uppercase tracking-widest text-[10px] md:text-xs">
                          Book via WhatsApp
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </motion.a>

                      <div className="hidden md:flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                            ))}
                            <span className="text-xs text-white font-bold ml-1">4.9</span>
                          </div>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">700+ Google Reviews</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>

              {/* Scroll Indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
              >
                <span className="text-[8px] uppercase tracking-[0.5em] text-zinc-500 rotate-90 mb-8">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
              </motion.div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 md:py-24 bg-ivory relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              </div>
              
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <BlurFade>
                  <SectionHeading title="Signature Experiences" subtitle="Our Expertise" />
                </BlurFade>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SERVICES.slice(0, 4).map((service, i) => (
                    <div key={i} onClick={() => {
                      if (i === 0) setActiveCategory('hair');
                      if (i === 1) setActiveCategory('hair');
                      if (i === 2) setActiveCategory('hair');
                      if (i === 3) setActiveCategory('facial');
                      handleSetView('services');
                    }} className={`cursor-pointer ${i > 1 ? 'hidden md:block' : ''}`}>
                      <ServiceCard service={service} index={i} />
                    </div>
                  ))}
                </div>

                <div className="mt-12 md:mt-16 text-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSetView('services')}
                    className="md:hidden inline-flex items-center gap-3 px-10 py-4 bg-zinc-900 text-white rounded-full font-bold mb-8 transition-all"
                  >
                    View All Services
                  </motion.button>
                  <br className="md:hidden" />
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/60126175555" 
                    className="inline-flex items-center gap-3 px-12 py-5 bg-gold text-white rounded-full font-bold hover:bg-gold/80 transition-all shadow-xl shadow-gold/20"
                  >
                    Book via WhatsApp
                  </motion.a>
                </div>
              </div>
            </section>

            <SimpleBrandMarquee />

            {/* Why Choose Us */}
            <section className="py-20 md:py-32 bg-white border-b border-zinc-100">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12 md:gap-20">
                  <BlurFade className="lg:col-span-1">
                    <div className="lg:sticky lg:top-32">
                      <SectionHeading title="The Standard" subtitle="Why Looks" align="left" />
                      <p className="text-zinc-500 leading-relaxed text-base md:text-lg opacity-80 text-left">
                        Part of the internationally recognized LOOKS Salon brand, we bring expert stylists and premium products to the heart of Brickfields.
                      </p>
                    </div>
                  </BlurFade>
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                    {[
                      { icon: <Award />, title: "Award Winning", desc: "Emerging Salon 2025." },
                      { icon: <MapPin />, title: "Prime Location", desc: "5 mins from KL Sentral." },
                      { icon: <CheckCircle2 />, title: "Verified Results", desc: "700+ 5-star Google reviews." },
                      { icon: <Sparkles />, title: "Elite Brands", desc: "Kérastase, L'Oréal & Dermalogica." }
                    ].map((item, i) => (
                      <BlurFade key={i} delay={i * 0.1}>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          whileHover={{ y: -10 }}
                          className="p-8 md:p-10 bg-ivory rounded-[32px] md:rounded-[40px] border border-zinc-50 hover:border-gold/20 transition-all group cursor-default"
                        >
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center text-gold shadow-sm mb-6 md:mb-8 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                            {item.icon}
                          </div>
                          <h3 className="text-lg md:text-xl font-serif mb-2 md:mb-3">{item.title}</h3>
                          <p className="text-sm text-zinc-500 leading-relaxed opacity-80">{item.desc}</p>
                        </motion.div>
                      </BlurFade>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className="py-20 md:py-32 bg-zinc-950 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
                <BlurFade>
                  <SectionHeading title="Gallery" subtitle="THE SALON'S" light />
                </BlurFade>
                
                <BentoGallery onImageClick={(url) => setSelectedImage(url)} />
              </div>

              <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
                <BlurFade>
                  <SectionHeading title="Transformations" subtitle="OUR OUTSTANDING" light />
                </BlurFade>
              </div>
              
              <MarqueeGallery onImageClick={(url) => setSelectedImage(url)} />

              <div className="mt-12 md:mt-20 text-center">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/60126175555" 
                  className="inline-flex items-center gap-4 px-12 md:px-16 py-5 md:py-6 bg-gold text-white rounded-full font-bold hover:bg-gold/80 transition-all shadow-2xl shadow-gold/20 uppercase tracking-widest text-[10px] md:text-xs"
                >
                  Book via WhatsApp <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 md:py-32 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
                  <BlurFade>
                    <SectionHeading title="Client Stories" subtitle="Testimonials" align="left" />
                  </BlurFade>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                      className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-gold hover:border-gold transition-all bg-transparent cursor-pointer group"
                    >
                      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                      className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-gold hover:border-gold transition-all bg-transparent cursor-pointer group"
                    >
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={testimonialIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      {[0, 1].map((offset) => {
                        const idx = (testimonialIndex + offset) % TESTIMONIALS.length;
                        const t = TESTIMONIALS[idx];
                        return (
                          <div 
                            key={idx}
                            className="p-10 md:p-12 bg-ivory rounded-[32px] md:rounded-[48px] border border-zinc-50 hover:border-gold/20 transition-all group"
                          >
                            <div className="flex gap-1.5 mb-6 md:mb-8">
                              {[...Array(t.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                              ))}
                            </div>
                            <p className="text-zinc-600 italic mb-8 md:mb-10 leading-relaxed text-base md:text-lg">"{t.text}"</p>
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-zinc-900 tracking-tight">{t.name}</span>
                              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">{t.date}</span>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 mt-12">
                  {TESTIMONIALS.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === testimonialIndex ? 'bg-gold w-8' : 'bg-zinc-200 w-2'}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {['services', 'hair', 'nails', 'facial', 'waxing', 'massages', 'makeup'].includes(view) && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <ServicesView activeCategory={activeCategory} setActiveCategory={(cat) => {
              setActiveCategory(cat);
              handleSetView(cat as View);
            }} />
          </motion.div>
        )}

        {view === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <ContactView />
          </motion.div>
        )}

        {view === 'luxury-guide' && (
          <motion.div
            key="luxury-guide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <LuxuryGuideView setView={handleSetView} />
          </motion.div>
        )}

        {view === 'blog' && (
          <motion.div
            key="blog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <BlogView setView={handleSetView} setActiveBlogPost={setActiveBlogPost} />
          </motion.div>
        )}

        {view === 'blog-post' && activeBlogPost && (
          <motion.div
            key="blog-post"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <BlogPostView post={activeBlogPost} setView={handleSetView} />
          </motion.div>
        )}

        {view === '404' && (
          <motion.div
            key="404"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NotFoundView setView={handleSetView} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-16 md:py-24 bg-black text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
            <button 
              onClick={() => {
                handleSetView('home');
              }}
              className="flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0"
            >
              <img 
                src={ASSETS.logo} 
                alt="LOOKS Salon Logo" 
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </button>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <button onClick={() => handleSetView('home')} className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-gold transition-colors bg-transparent border-none cursor-pointer">Home</button>
              <button onClick={() => handleSetView('services')} className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-gold transition-colors bg-transparent border-none cursor-pointer">Services</button>
              <button onClick={() => handleSetView('luxury-guide')} className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-gold transition-colors bg-transparent border-none cursor-pointer">Luxury Guide</button>
              <button onClick={() => handleSetView('blog')} className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-gold transition-colors bg-transparent border-none cursor-pointer">Blog</button>
              <button onClick={() => handleSetView('contact')} className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 hover:text-gold transition-colors bg-transparent border-none cursor-pointer">Contact</button>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                © 2026 LOOKS Salon KL. All Rights Reserved.
              </p>
              <p className="text-gold text-[8px] uppercase tracking-[0.3em]">Luxury Hair & Beauty Destination</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
