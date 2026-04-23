import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronDown, ChevronUp } from 'lucide-react';

const qaData = [
  {
    q: "What is EduKeeda?",
    a: "EduKeeda is a comprehensive educational platform that connects candidates with opportunities like hackathons, internships, scholarships, and cultural events globally."
  },
  {
    q: "How do I apply for opportunities?",
    a: "Once you find an opportunity through our search bar or category chips, click on the card to read the details. There will be an 'Apply' or 'Register' button that redirects you to the specific application portal."
  },
  {
    q: "How do I host a Hackathon or Event?",
    a: "You can use the 'Host Event' feature by clicking 'Host Now' on the Candidate Home page. You'll fill out an approval form for your event which our admins will review and publish."
  },
  {
    q: "Is creating an account completely free?",
    a: "Yes! Candidates can create an account, build their profile, and browse opportunities for entirely free."
  },
  {
    q: "How can I update my profile details?",
    a: "Click on your circular profile avatar in the top right corner of the navigation bar. Your Profile Drawer will open, and you can click the 'Edit Profile' button to instantly update your skills, education, and domain."
  },
  {
    q: "Are the scholarships and internships verified?",
    a: "Our trusted employer network posts their opportunities directly. However, we always recommend candidates review the specific company's requirements and legitimacy before dispensing highly sensitive data."
  },
  {
    q: "Can I reset my password if I forget it?",
    a: "Yes, you can click 'Forgot Password' on the login screen. An OTP will be sent to your registered email address allowing you to securely reset it."
  },
  {
    q: "How can I track the events I have registered for?",
    a: "Tracking registered events is done through the specific event vendor at the moment. As we continuously upgrade the platform, a 'My Activities' dashboard will be integrated."
  },
  {
    q: "What does the 'Status & Level' on my profile mean?",
    a: "These categorize your experience to help match you with suitable internships and competitions. 'Student' indicates you are currently in academia, while 'Professional' suggests industry experience."
  },
  {
    q: "How do I contact support directly?",
    a: "If you have specific issues, you can navigate to the 'Help Center' or 'Contact' links at the bottom footer of the homepage to reach our administrative support team."
  }
];

const FAQMenu = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 md:p-8 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-3xl bg-[#0B0F19] rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="px-8 py-6 border-b border-white/10 bg-[#131B2F] flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
               <HelpCircle className="w-6 h-6" />
             </div>
             <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 md:p-8 scrollbar-hide">
          <div className="space-y-4">
             {qaData.map((item, index) => {
               const isOpen = openIndex === index;
               return (
                 <div 
                   key={index} 
                   className={`border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-slate-800/50 border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.1)]' : 'bg-[#131B2F] hover:border-white/10'}`}
                 >
                   <button 
                     onClick={() => toggleOpen(index)}
                     className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
                   >
                     <p className="text-white font-bold text-lg leading-tight">{item.q}</p>
                     <div className={`p-1.5 rounded-full bg-slate-800 transition-colors ${isOpen ? 'text-purple-400' : 'text-slate-400'}`}>
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                     </div>
                   </button>
                   
                   <AnimatePresence>
                     {isOpen && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3, ease: 'easeInOut' }}
                         className="overflow-hidden"
                       >
                         <div className="px-6 pb-6 text-slate-300 leading-relaxed text-[15px]">
                           {item.a}
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               )
             })}
          </div>
        </div>
        
        <div className="border-t border-white/10 p-6 bg-[#131B2F]/80 text-center">
            <p className="text-slate-400 text-sm">Still have questions? Feel free to checkout our <span className="text-purple-400 font-bold hover:underline cursor-pointer">Help Center</span>.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQMenu;
