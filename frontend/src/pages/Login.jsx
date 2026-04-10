import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Phone, User, Briefcase, Search as SearchIcon, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [role, setRole] = useState('candidate'); // 'candidate' or 'employer'
  const [authMethod, setAuthMethod] = useState('email'); // 'email', 'otp'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { login, loginWithOtp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (role === 'employer' && data.role !== 'employer') {
        alert('You are not authorized as an Employer.');
        localStorage.removeItem('userInfo');
        window.location.reload();
        return;
      }
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Network Error: Cannot connect to Backend/MongoDB. Check console/terminal.');
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    if (role === 'employer') return alert('Employers cannot use OTP.');
    try {
      await loginWithOtp(phone);
      navigate('/');
    } catch (error) {
      alert('Mock OTP Failed. Ensure Backend is running.');
    }
  };

  const handleGoogleLogin = async () => {
    if (role === 'employer') return alert('Employers must use Email/Password.');
    try {
      await loginWithGoogle('testuser@google.com', 'Google Test User');
      navigate('/');
    } catch (error) {
      alert('Mock Google Auth Failed. Ensure Backend is running.');
    }
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#0B0F19] text-white">
      
      {/* Left Column: Image Background & Global Search */}
      <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Dark aesthetic background image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent z-0"></div>

        <div className="relative z-10 space-y-8 max-w-lg mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Future.</span>
            </h1>
            <p className="text-lg text-slate-300">
              Access premium hackathons, seamless internships, and exclusive scholarships globally. Start searching before you even log in!
            </p>
          </motion.div>

          {/* Quick Search */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            onSubmit={handleQuickSearch}
            className="flex items-center bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 focus-within:ring-2 ring-purple-500 transition-all shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]"
          >
            <SearchIcon className="w-6 h-6 text-slate-300 ml-3" />
            <input 
              type="text" 
              placeholder="Search opportunities..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 w-full p-3 font-medium text-white placeholder-slate-400 outline-none bg-transparent"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white p-3 px-6 rounded-xl font-bold transition shadow-lg whitespace-nowrap">
              Search
            </button>
          </motion.form>
        </div>
      </div>

      {/* Right Column: Dark Form Card */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#131B2F] rounded-3xl shadow-2xl border border-white/10 p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-sm text-slate-400">Select your portal to continue.</p>
          </div>

          {/* Role Toggle Selector */}
          <div className="flex bg-[#0B0F19] p-1 rounded-2xl mb-8 border border-white/5">
            <button 
              type="button"
              onClick={() => { 
                setRole('candidate'); 
                setAuthMethod('email'); 
                setEmail(''); 
                setPassword(''); 
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${role === 'candidate' ? 'bg-[#1D2847] text-white shadow-md border border-white/10' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <User className="w-4 h-4" /> Candidate
            </button>
            <button 
              type="button"
              onClick={() => { 
                setRole('employer'); 
                setAuthMethod('email'); 
                setEmail(''); 
                setPassword(''); 
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${role === 'employer' ? 'bg-[#1D2847] text-white shadow-md border border-white/10' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Briefcase className="w-4 h-4" /> Employer Admin
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={`${role}-${authMethod}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={authMethod === 'email' ? handleEmailLogin : handleOtpLogin} className="space-y-5">
                
                {authMethod === 'email' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                        <input 
                          type="email" required
                          className="w-full pl-12 pr-4 py-3 bg-[#0B0F19]/50 border border-white/10 rounded-xl focus:bg-[#0B0F19] focus:ring-2 ring-purple-500 outline-none transition-all font-medium text-white placeholder-slate-500" 
                          placeholder={role === 'employer' ? "employer@email.com" : "candidate@email.com"}
                          value={email} onChange={e => setEmail(e.target.value)} 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                        <a href="#" className="text-xs font-semibold text-purple-400 hover:text-purple-300">Forgot?</a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                        <input 
                          type="password" required 
                          className="w-full pl-12 pr-4 py-3 bg-[#0B0F19]/50 border border-white/10 rounded-xl focus:bg-[#0B0F19] focus:ring-2 ring-purple-500 outline-none transition-all font-medium text-white placeholder-slate-500" 
                          placeholder="••••••••" 
                          value={password} onChange={e => setPassword(e.target.value)} 
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                      <input 
                        type="text" required 
                        className="w-full pl-12 pr-4 py-3 bg-[#0B0F19]/50 border border-white/10 rounded-xl focus:bg-[#0B0F19] focus:ring-2 ring-purple-500 outline-none transition-all font-medium text-white placeholder-slate-500" 
                        placeholder="+91 9999999999" 
                        value={phone} onChange={e => setPhone(e.target.value)} 
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 mt-4 font-bold text-white bg-purple-600 rounded-xl hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  Sign In <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Alternative Logins */}
          {role === 'candidate' && (
             <div className="mt-8 space-y-4">
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-500 text-sm font-medium">Alternatively</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setAuthMethod(authMethod === 'email' ? 'otp' : 'email')} 
                    className="flex justify-center items-center py-3 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:bg-white/5 transition"
                  >
                    {authMethod === 'email' ? 'Use Phone OTP' : 'Use Email'}
                  </button>
                  <button 
                    type="button"
                    onClick={handleGoogleLogin} 
                    className="flex justify-center items-center gap-2 py-3 border bg-white rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-100 transition shadow-sm"
                  >
                    <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                    Google
                  </button>
                </div>
             </div>
          )}


        </motion.div>

        {role === 'candidate' && (
          <p className="absolute bottom-4 text-center text-sm font-medium text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-bold ml-1 transition-colors">
              Sign up today!
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
