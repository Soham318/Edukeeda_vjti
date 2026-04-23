import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Briefcase, Trophy, GraduationCap, CalendarDays, ClipboardCheck, BookOpen, UserCircle, ShieldAlert, MonitorPlay, PanelLeft } from 'lucide-react';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const { user } = useAuth();
  
  const candidateLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Internships', path: '/internships', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Competitions', path: '/competitions', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Scholarships', path: '/scholarships', icon: <GraduationCap className="w-5 h-5" /> },
    { name: 'Hackathons', path: '/hackathons', icon: <MonitorPlay className="w-5 h-5" /> },
    { name: 'Cultural Events', path: '/cultural-events', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'College Events', path: '/college-events', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'Conferences', path: '/conferences', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Education Loan', path: '/loans', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'My Hosting', path: '/my-hosting', icon: <UserCircle className="w-5 h-5" /> },
  ];

  const adminLinks = [
    { name: 'Pending Approvals', path: '/admin/requests', icon: <ShieldAlert className="w-5 h-5" /> },
    { name: 'Manage Events', path: '/admin/manage', icon: <ClipboardCheck className="w-5 h-5" /> },
  ];

  const links = user?.role === 'employer' ? adminLinks : candidateLinks;

  return (
    <aside className={`fixed left-0 top-16 bottom-0 ${isExpanded ? 'w-64' : 'w-20'} bg-[#0B0F19] border-r border-white/5 overflow-y-auto scrollbar-hide hidden md:block transition-all duration-300 z-40`}>
      <div className={`p-4 ${!isExpanded ? 'flex flex-col items-center' : ''}`}>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex ${isExpanded ? 'justify-end' : 'justify-center'} py-2 mb-4 text-slate-400 hover:text-white transition`}
        >
          <div className="p-2 hover:bg-white/10 rounded-lg">
            <PanelLeft className="w-5 h-5 pointer-events-none" />
          </div>
        </button>

        {isExpanded && (
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3 mt-2 whitespace-nowrap">
            {user?.role === 'employer' ? 'Admin Controls' : 'Explore'}
          </div>
        )}

        <nav className="space-y-2 w-full">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              title={!isExpanded ? link.name : ""}
              className={({ isActive }) => 
                `flex items-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  !isExpanded ? 'justify-center px-0' : 'px-3'
                } ${
                  isActive 
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                }`
              }
            >
              <div className="flex-shrink-0 flex items-center justify-center">{link.icon}</div>
              {isExpanded && <span className="truncate">{link.name}</span>}
            </NavLink>
          ))}
        </nav>

        {user?.role === 'candidate' && (
          <div className={`mt-8 mb-8 ${isExpanded ? 'px-3' : 'px-0 flex justify-center'}`}>
            <NavLink 
              to="/host-event" 
              title={!isExpanded ? "Host Event" : ""}
              className={`flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all ${isExpanded ? 'w-full' : 'w-10 h-10 p-0 text-xl'}`}
            >
              {isExpanded ? '+ Host an Event' : '+'}
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
