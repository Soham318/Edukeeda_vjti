import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Search, User, X, HelpCircle } from 'lucide-react';
import api from '../services/api';
import UserProfileCard from './UserProfileCard';
import FAQMenu from './FAQMenu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debounced Search Handler
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        try {
          const { data } = await api.get(`/search?q=${searchTerm}`);
          setSuggestions(data.results.slice(0, 5));
        } catch (error) {
          console.error('Search error', error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim()){
      setSuggestions([]); // close dropdown
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-4 md:px-8">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
          EduKeeda
        </span>
      </Link>

      {/* Center Search & FAQ */}
      <div className="flex-1 max-w-xl mx-4 lg:mx-12 hidden md:flex items-center gap-3 relative pointer-events-auto" ref={dropdownRef}>
        <div className="w-full relative">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-[#131B2F] border border-white/10 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/50 transition">
            <Search className="w-4 h-4 text-slate-400 ml-4 hidden sm:block" />
            <input 
              type="text" 
              placeholder="Search for Scholarships, Internships, Hackathons..."
              className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Floating Autocomplete Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-[#131B2F] border border-white/10 shadow-2xl rounded-2xl overflow-hidden py-2 z-50">
              {suggestions.map((item) => (
                <div 
                  key={item._id} 
                  onClick={() => { setSearchTerm(''); setSuggestions([]); navigate(`/search?q=${item.title}`); }}
                  className="px-4 py-3 hover:bg-white/5 cursor-pointer flex flex-col"
                >
                  <span className="font-semibold text-white text-sm">{item.title}</span>
                  <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{item.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* FAQ Button Just right of Search Bar */}
        <button 
          onClick={() => setIsFaqOpen(true)}
          className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-purple-600/20 hover:bg-purple-600/40 text-purple-100 border border-purple-500/50 hover:border-purple-400 rounded-full transition shadow-sm font-bold"
          title="Questions & Answers (FAQ)"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help & FAQ</span>
        </button>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {user ? (
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end">
               <span className="text-sm font-bold text-white leading-tight">{user.name}</span>
               <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">{user.role}</span>
             </div>
             <button 
               onClick={() => setIsProfileOpen(true)}
               className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg hover:scale-105 transition"
               title="Profile"
             >
               {user.name.charAt(0).toUpperCase()}
             </button>
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-2 px-5 py-2 font-bold text-white bg-white/10 hover:bg-white/20 rounded-full transition">
            <User className="w-4 h-4" /> Login / Signup
          </Link>
        )}
      </div>
    </header>

    {/* Profile Drawer - Rendered outside of header to avoid backdrop-blur stacking context issues */}
    {isProfileOpen && user && (
      <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm pointer-events-auto">
        <div className="w-full max-w-2xl bg-[#0B0F19] h-full overflow-y-auto border-l border-white/10 shadow-2xl transition-transform duration-300 relative">
            <div className="sticky top-0 z-50 flex justify-between items-center p-6 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white">My Account</h2>
              <div className="flex items-center gap-4">
                <button onClick={() => { logout(); setIsProfileOpen(false); }} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-bold transition">
                  <LogOut className="w-4 h-4"/> Sign Out
                </button>
                <button onClick={() => setIsProfileOpen(false)} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition hover:bg-slate-700">
                  <X className="w-5 h-5"/>
                </button>
              </div>
            </div>
            <div className="p-4 md:p-8 pb-32">
              <UserProfileCard />
            </div>
        </div>
      </div>
    )}
    {/* FAQ Modal */}
    <FAQMenu isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
  </>
  );
};

export default Navbar;
