import React from 'react';
import { Calendar, MapPin, ExternalLink, Sparkles } from 'lucide-react';

const ItemCard = ({ item }) => {
  const isApprovedRequest = item.details !== undefined;
  const itemData = isApprovedRequest ? item.details : item;
  const displayType = item.eventType || item.type || 'Event';
  const linkLabel = isApprovedRequest ? 'View Source' : 'Apply Now';

  const cardGradient = "bg-gradient-to-br from-[#131B2F] via-[#0B0F19] to-[#0B0F19]";
  const headerGradient = "bg-gradient-to-tr from-purple-800 via-indigo-700 to-blue-900";

  return (
    <div className={`relative w-full border border-white/5 rounded-2xl overflow-hidden ${cardGradient} shadow-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 group flex flex-col h-full ring-1 ring-white/5 hover:ring-purple-500/30 cursor-pointer`}>
      
      {/* Banner Area */}
      <div className={`h-40 relative overflow-hidden ${!itemData.imageUrl ? headerGradient : 'bg-[#0B0F19]'}`}>
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        {itemData.imageUrl ? (
          <img src={itemData.imageUrl} alt={itemData.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0 relative" />
        ) : (
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center opacity-30 filter">
             {/* Abstract CSS vector shapes for fallback purely in tailwind */}
             <div className="w-40 h-40 rounded-full border-[12px] border-white/20 absolute -top-12 -right-12 mix-blend-overlay"></div>
             <div className="w-24 h-24 rotate-45 border-[6px] border-white/20 absolute bottom-4 left-6 mix-blend-overlay"></div>
             <Sparkles className="w-24 h-24 text-white/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-lg" />
          </div>
        )}
        
        {/* Floating Category Badge */}
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-white/10 shadow-lg">
          {displayType}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 relative z-10 mt-[-16px]">
        {/* Badges slightly overlapping banner */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-100 bg-purple-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-purple-400/40 shadow-xl">
            <MapPin className="w-3 h-3" /> {itemData.locationType || 'Online'}
          </div>
          {itemData.domain && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-100 bg-blue-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-blue-400/40 shadow-xl">
              <Sparkles className="w-3 h-3" /> {itemData.domain}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-black text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors">{itemData.title}</h3>
        <p className="text-[13px] text-slate-400 mb-5 flex-1 line-clamp-3 leading-relaxed">{itemData.description}</p>
        
        {/* Footer Area */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold uppercase tracking-wide">
            <Calendar className="w-3 h-3" /> 
            {new Date(item.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
          </div>
          <a 
            href={itemData.externalLink || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/btn flex items-center gap-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-purple-600 px-4 py-2.5 rounded-lg transition-all duration-300 border border-white/10 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            {linkLabel}
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
