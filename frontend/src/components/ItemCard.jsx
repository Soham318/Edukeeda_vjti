import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';

const ItemCard = ({ item }) => {
  const isApprovedRequest = item.details !== undefined;
  const itemData = isApprovedRequest ? item.details : item;
  const displayType = item.eventType || item.type || 'Event';
  const linkLabel = isApprovedRequest ? 'View Source' : 'Apply Now';

  return (
    <div className="bg-[#131B2F] border border-white/5 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(168,85,247,0.3)] hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-300 group flex flex-col h-full relative cursor-pointer">
      <div className="h-44 bg-gradient-to-r from-purple-900 to-indigo-900 relative overflow-hidden">
        {itemData.imageUrl ? (
          <img src={itemData.imageUrl} alt={itemData.title} className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <Tag className="w-12 h-12 text-white" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20 uppercase tracking-wider shadow-lg">
          {displayType}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative z-10 bg-gradient-to-b from-[#131B2F] to-[#0B0F19]">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-purple-500/20">
            <MapPin className="w-3.5 h-3.5" /> {itemData.locationType || 'Online'}
          </div>
          {itemData.domain && (
            <div className="flex items-center gap-1.5 text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-indigo-500/20">
              {itemData.domain}
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-400 transition-colors drop-shadow-sm">{itemData.title}</h3>
        <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-3 leading-relaxed font-medium">{itemData.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/5">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold bg-white/5 px-3 py-1.5 rounded-xl">
            <Calendar className="w-3.5 h-3.5" /> {new Date(item.createdAt || Date.now()).toLocaleDateString()}
          </div>
          <a 
            href={itemData.externalLink || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold flex items-center gap-1.5 px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          >
            {linkLabel} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
