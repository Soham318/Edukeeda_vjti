import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const CandidateHome = () => {
  const { user } = useAuth();
  const scrollRef = useRef(null);

  const scrollContainer = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = [
    { title: 'Hackathons', path: '/hackathons', emoji: '💻' },
    { title: 'Internships', path: '/internships', emoji: '💼' },
    { title: 'Scholarships', path: '/scholarships', emoji: '🎓' },
    { title: 'Competitions', path: '/competitions', emoji: '🏆' },
    { title: 'Cultural Events', path: '/cultural-events', emoji: '🎭' },
    { title: 'College Events', path: '/college-events', emoji: '🏛️' },
    { title: 'Conferences', path: '/conferences', emoji: '🎤' },
    { title: 'Courses', path: '/courses', emoji: '📚' }
  ];

  const featuredOpportunities = [
    {
      title: 'Global CodeSprint 2026', type: 'Hackathon', daysLeft: '2 Days Left',
      img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop',
      prize: '$10,000', tags: ['Coding', 'AI']
    },
    {
      title: 'Fintech Innovation Challenge', type: 'Competition', daysLeft: '5 Days Left',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop',
      prize: '$15,000', tags: ['Finance', 'Blockchain']
    },
    {
      title: 'Google Summer of Code', type: 'Internship', daysLeft: '10 Days Left',
      img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=300&fit=crop',
      prize: 'Stipend', tags: ['Open Source', 'Software']
    },
    {
      title: 'Women in Tech Scholarship', type: 'Scholarship', daysLeft: 'Closing Soon',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop',
      prize: '$5,000', tags: ['Diversity', 'Education']
    },
    {
      title: 'Web3 Builders Weekend', type: 'Hackathon', daysLeft: 'Registration Open',
      img: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&h=300&fit=crop',
      prize: '10 ETH', tags: ['Web3', 'Crypto']
    },
    {
      title: 'Data Science Fellowship', type: 'Internship', daysLeft: '1 Week Left',
      img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop',
      prize: '$4,000/mo', tags: ['Data', 'Machine Learning']
    },
    {
      title: 'Global Leaders Summit', type: 'Conference', daysLeft: 'Upcoming',
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop',
      prize: 'Networking', tags: ['Leadership', 'Business']
    },
    {
      title: 'Cybersecurity CTF', type: 'Competition', daysLeft: 'Starts Tomorrow',
      img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=300&fit=crop',
      prize: '$8,000', tags: ['Security', 'Hacking']
    },
    {
      title: 'Web Design Bootcamp', type: 'Workshop', daysLeft: '5 Days Left',
      img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=300&fit=crop',
      prize: 'Certification', tags: ['UI/UX', 'Design']
    },
    {
      title: 'Startup Pitch Competition', type: 'Competition', daysLeft: 'Starts Tomorrow',
      img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=300&fit=crop',
      prize: '$25,000', tags: ['Entrepreneurship', 'Pitch']
    },
    {
      title: 'AWS Cloud Hackathon', type: 'Hackathon', daysLeft: 'Registration Open',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop',
      prize: '$15,000', tags: ['Cloud', 'AWS']
    },
    {
      title: 'Machine Learning Summit', type: 'Conference', daysLeft: 'Next Week',
      img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&h=300&fit=crop',
      prize: 'Access', tags: ['AI', 'Tech']
    },
    {
      title: 'Full-Stack Developer Intern', type: 'Internship', daysLeft: '2 Weeks Left',
      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop',
      prize: '$3,500/mo', tags: ['React', 'Node.js']
    },
    {
      title: 'Women Empower Tech Grant', type: 'Scholarship', daysLeft: 'Closing Soon',
      img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=300&fit=crop',
      prize: '$10,000', tags: ['Grant', 'Women']
    }
  ];



  return (
    <>
      <div className="p-4 md:p-8 max-w-[90rem] mx-auto space-y-16">
      
      {/* VIBRANT HERO SECTION */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-[#0B0F19] shadow-2xl border border-white/10 mt-4">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-10 md:p-16 gap-10">
          <div className="lg:w-[60%] space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight"
            >
              Compete, Learn &<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-purple-400 drop-shadow-sm">
                Get Hired
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-xl text-indigo-100/90 font-medium leading-relaxed max-w-lg"
            >
              The premier ecosystem to showcase your skills. Discover global hackathons, coding challenges, internships, and scholarships.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <NavLink to="/search" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 hover:scale-105 transition-all shadow-[0_10px_30px_rgb(147,51,234,0.3)]">
                Explore All Opportunities
              </NavLink>
            </motion.div>
          </div>

          <div className="lg:w-[40%] flex justify-center pb-8 lg:pb-0">
             <motion.img 
               initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
               alt="Students collaborating" 
               className="w-full max-w-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 object-cover aspect-video lg:aspect-square"
             />
          </div>
        </div>
      </section>

      {/* CATEGORY CHIPS */}
      <section className="relative group">
        <button 
          onClick={() => scrollContainer('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-slate-800 backdrop-blur-md rounded-full shadow-md border border-slate-700 text-white opacity-0 group-hover:opacity-100 transition-opacity -ml-4 hover:bg-slate-700"
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scroll-smooth pb-4 scrollbar-hide snap-x px-2">
          {categories.map((cat, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i}
              className="snap-start"
            >
              <NavLink
                to={cat.path}
                className="whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition shadow-sm border bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white flex items-center gap-2"
              >
                <span className="text-lg">{cat.emoji}</span> {cat.title}
              </NavLink>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => scrollContainer('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-slate-800 backdrop-blur-md rounded-full shadow-md border border-slate-700 text-white opacity-0 group-hover:opacity-100 transition-opacity -mr-4 hover:bg-slate-700"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* FEATURED CAROUSEL (UNSTOP STYLE) */}
      <section>
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-2">
          <h2 className="text-2xl md:text-3xl font-black text-white px-2">Featured Opportunities</h2>
          <NavLink to="/search" className="text-purple-400 font-bold hover:text-purple-300">View All &rarr;</NavLink>
        </div>
        
        <div className="overflow-hidden pb-8 pt-2 relative">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          >
            {[...featuredOpportunities, ...featuredOpportunities].map((opp, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="w-[260px] md:w-[280px] flex-shrink-0 bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-lg cursor-pointer group flex flex-col"
              >
                {/* Image Banner */}
                <div className="relative h-40 overflow-hidden">
                <img src={opp.img} alt={opp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-white border border-white/20">
                  {opp.type}
                </div>
                <div className="absolute bottom-[-1px] left-0 w-full h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
              </div>

               {/* Card Content */}
              <div className="p-6 pt-2 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight mb-3 group-hover:text-purple-400 transition-colors">{opp.title}</h3>
                
                <div className="flex items-center gap-2 mb-6">
                  {opp.tags.map((tag, j) => (
                    <span key={j} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-md">{tag}</span>
                  ))}
                </div>


              </div>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </section>

      {/* TOP BRANDS TICKER */}
      <section className="py-10 bg-slate-800/30 rounded-3xl border border-slate-800 text-center">
         <p className="text-slate-400 font-bold mb-8 uppercase tracking-widest text-sm">Trusted by Top Ecosystems & Brands</p>
         <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Mock Logos using text for structural demonstration */}
           <h3 className="text-3xl font-black text-white">GOOGLE</h3>
           <h3 className="text-3xl font-black text-white">MICROSOFT</h3>
           <h3 className="text-3xl font-black text-white">AMAZON</h3>
           <h3 className="text-3xl font-black text-white">META</h3>
           <h3 className="text-3xl font-black text-white">NETFLIX</h3>
           <h3 className="text-3xl font-black text-white">STRIPE</h3>
         </div>
      </section>

      {/* PLATFORM STATISTICS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/20 p-8 rounded-[2rem] text-center shadow-lg">
           <h2 className="text-4xl lg:text-5xl font-black text-white mb-2">5M+</h2>
           <p className="text-indigo-200 font-medium">Active Candidates</p>
         </div>
         <div className="bg-gradient-to-br from-purple-900/50 to-slate-900 border border-purple-500/20 p-8 rounded-[2rem] text-center shadow-lg">
           <h2 className="text-4xl lg:text-5xl font-black text-white mb-2">130K+</h2>
           <p className="text-purple-200 font-medium">Opportunities Listed</p>
         </div>
         <div className="bg-gradient-to-br from-rose-900/50 to-slate-900 border border-rose-500/20 p-8 rounded-[2rem] text-center shadow-lg">
           <h2 className="text-4xl lg:text-5xl font-black text-white mb-2">1,200+</h2>
           <p className="text-rose-200 font-medium">Hiring Brands</p>
         </div>
      </section>

      {/* HOST BANNER */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-purple-600/20 to-transparent z-0"></div>
         <div className="md:w-2/3 relative z-10">
            <h2 className="text-3xl font-black text-white mb-3">Want to Host an Event?</h2>
            <p className="text-slate-300 font-medium text-lg max-w-xl">Create a branded microsite to host hackathons, quizzes, and hiring challenges to recruit top talent instantly.</p>
         </div>
         <div className="relative z-10 w-full flex md:justify-end md:w-auto">
            <NavLink to="/host-event" className="w-full text-center px-8 py-4 bg-white text-slate-900 font-black rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
               Host Now &rarr;
            </NavLink>
         </div>
      </section>

      </div>
      <Footer />
    </>
  );
};

export default CandidateHome;
