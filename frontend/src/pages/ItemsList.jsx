import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

const ItemsList = ({ type, title, subtitle }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    fetchItems();
  }, [type]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/items?type=${type}`);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    if (categoryFilter !== 'All' && !item.eligibility?.includes(categoryFilter)) return false;
    if (domainFilter !== 'All' && item.domain !== domainFilter) return false;
    if (locationFilter !== 'All' && item.locationType !== locationFilter) return false;
    return true;
  });

  const getBannerImage = (type) => {
    const defaultImg = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";
    const imageMap = {
      'Hackathon': "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      'Cultural Event': "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80", 
      'Scholarship': "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
      'Internship': "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      'College Event': "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      'Conference': "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      'Course': "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      'Competition': "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80"
    };
    return imageMap[type] || defaultImg;
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* VIBRANT DYNAMIC BANNER */}
      <div className="relative bg-[#0B0F19] border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl overflow-hidden min-h-[320px] flex items-center group">
        <div className="absolute inset-0 z-0">
           <img 
              src={getBannerImage(type)} 
              alt={title} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 mix-blend-overlay grayscale-[0.2]"
           />
           {/* Dark Gradient Overlay to isolate text */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-transparent"></div>
           
           {/* Crazy Pulsing Abstract Lighting */}
           <div className="absolute top-[-30%] right-[-10%] w-[60%] h-[160%] bg-gradient-to-br from-purple-600/30 to-indigo-500/20 mix-blend-screen filter blur-[120px] group-hover:bg-purple-500/40 transition-colors duration-1000"></div>
        </div>
        <div className="relative z-10 max-w-2xl hover:scale-[1.02] transition-transform">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-6 drop-shadow-xl tracking-tight leading-tight">{title}</h1>
          <p className="text-xl md:text-2xl text-indigo-100 font-medium drop-shadow-md">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-[#131B2F] border border-white/5 p-4 rounded-2xl gap-4 shadow-lg">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Student', 'Professional'].map(cat => (
            <button 
              key={cat} onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${categoryFilter === cat ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-[#0B0F19] text-slate-400 hover:bg-white/5 border border-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={domainFilter} 
            onChange={(e) => setDomainFilter(e.target.value)}
            className="w-full md:w-40 p-3 rounded-xl bg-[#0B0F19] border border-white/10 text-slate-300 font-medium focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
          >
            <option value="All">All Domains</option>
            <option value="Tech">Tech</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
          </select>
          <select 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full md:w-40 p-3 rounded-xl bg-[#0B0F19] border border-white/10 text-slate-300 font-medium focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
          >
            <option value="All">All Locations</option>
            <option value="Online">Online</option>
            <option value="In-Person">In-Person</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#131B2F] border border-white/5 border-dashed rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-2">No {title.toLowerCase()} found</h3>
          <p className="text-slate-400">Try adjusting your filters or search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ItemsList;
