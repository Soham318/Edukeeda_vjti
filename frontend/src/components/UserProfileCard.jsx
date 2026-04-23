import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, User, Briefcase, GraduationCap, MapPin, Code, Star, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

const UserProfileCard = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      educationDetails: user?.educationDetails || '',
      category: user?.category || 'Student',
      experienceLevel: user?.experienceLevel || 'Beginner',
      domain: user?.domain || '',
      skills: user?.skills?.join(', ') || '',
      interests: user?.interests?.join(', ') || '',
      location: user?.location || '',
    }
  });

  if (!user) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Transform skills and interests back to array
      const payload = {
        ...data,
        skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : [],
        interests: data.interests ? data.interests.split(',').map(s => s.trim()).filter(s => s) : []
      };
      await updateProfile(payload);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset to current user values
    setValue('name', user?.name || '');
    setValue('phone', user?.phone || '');
    setValue('educationDetails', user?.educationDetails || '');
    setValue('category', user?.category || 'Student');
    setValue('experienceLevel', user?.experienceLevel || 'Beginner');
    setValue('domain', user?.domain || '');
    setValue('skills', user?.skills?.join(', ') || '');
    setValue('interests', user?.interests?.join(', ') || '');
    setValue('location', user?.location || '');
    setIsEditing(false);
  };

  // Helper to render skills tags
  const renderTags = (items) => {
    if (!items || items.length === 0) return <span className="text-slate-500 text-sm">Not specified</span>;
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-3 py-1 bg-slate-800 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold">
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#131B2F] to-slate-900 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      {/* Header Area */}
      <div className="border-b border-white/5 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-3xl font-black text-white leading-tight">{user.name}</h2>
            <p className="text-indigo-300 font-medium flex items-center gap-2">
              <User size={16} /> {user.email} {user.role === 'candidate' && <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-md ml-2 border border-green-500/20">Candidate</span>}
            </p>
          </div>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 hover:text-white transition-all text-slate-300 rounded-xl font-bold border border-white/10 shadow-sm whitespace-nowrap"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        )}
      </div>

      <div className="p-8 relative z-10">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Full Name</label>
                <input {...register('name', { required: true })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Phone Number</label>
                <input {...register('phone')} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Education Details</label>
                <input {...register('educationDetails')} placeholder="e.g. B.Tech in Computer Science" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Current Status</label>
                <select {...register('category')} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none">
                  <option value="Student">Student</option>
                  <option value="Professional">Professional</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Experience Level</label>
                <select {...register('experienceLevel')} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Core Domain</label>
                <input {...register('domain')} placeholder="e.g. Web Development" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-400">Skills (Comma separated)</label>
                <input {...register('skills')} placeholder="React, Node.js, Python" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-400">Interests (Comma separated)</label>
                <input {...register('interests')} placeholder="AI, Blockchain, UI/UX" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-400">Location</label>
                <input {...register('location')} placeholder="City, Country" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" />
              </div>

            </div>

            <div className="flex gap-4 pt-6 border-t border-white/5">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold shadow-[0_10px_20px_rgba(147,51,234,0.3)] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : <><Save size={18} /> Save Changes</>}
              </button>
              <button 
                type="button" 
                onClick={handleCancel}
                className="flex items-center gap-2 px-8 py-3 bg-transparent hover:bg-white/5 text-slate-300 rounded-xl font-bold transition-all"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
            
            {/* View Mode Fields */}
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400"><Briefcase size={24} /></div>
                 <div>
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Status & Level</p>
                   <p className="text-lg font-bold text-white">{user.category || 'Not specified'} • {user.experienceLevel || 'Beginner'}</p>
                 </div>
               </div>
               
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><GraduationCap size={24} /></div>
                 <div>
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Education</p>
                   <p className="text-lg font-bold text-white">{user.educationDetails || 'Not specified'}</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400"><MapPin size={24} /></div>
                 <div>
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                   <p className="text-lg font-bold text-white">{user.location || 'Not specified'}</p>
                 </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><Code size={24} /></div>
                 <div className="w-full">
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-between">
                     <span>Top Skills</span>
                     <span className="text-xs text-slate-600">{user.domain}</span>
                   </p>
                   {renderTags(user.skills)}
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400"><Star size={24} /></div>
                 <div className="w-full">
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Interests</p>
                   {renderTags(user.interests)}
                 </div>
               </div>
            </div>

          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
