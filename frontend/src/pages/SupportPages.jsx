import React from 'react';

const PageContainer = ({ title, children }) => (
  <div className="p-4 md:p-8 max-w-4xl mx-auto mt-8 relative z-10 w-full h-full min-h-[60vh]">
    <div className="bg-slate-800/50 rounded-3xl border border-slate-700 p-8 shadow-xl backdrop-blur-sm">
      <h1 className="text-3xl font-black text-white mb-6 border-b border-slate-700 pb-4">{title}</h1>
      <div className="text-slate-300 space-y-4 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export const HelpCenter = () => (
  <PageContainer title="Help Center">
    <p>Welcome to the EduKeeda Help Center. We're here to assist you with any issues you may encounter on our platform.</p>
    <h2 className="text-xl font-bold text-white mt-8 mb-2">Frequently Asked Questions</h2>
    <ul className="list-disc list-inside space-y-3 ml-4 bg-slate-900/50 p-6 rounded-xl border border-slate-700">
      <li><strong className="text-purple-400">How do I apply for a hackathon?</strong><br/> Navigate to the Hackathons section and click "Apply" on any active event.</li>
      <li><strong className="text-purple-400">Is my data secure?</strong><br/> Yes, we use industry-standard encryption for all user data.</li>
      <li><strong className="text-purple-400">Are education loans guaranteed?</strong><br/> Loan approval depends on the specific financial partner's criteria.</li>
    </ul>
  </PageContainer>
);

export const Terms = () => (
  <PageContainer title="Terms of Service">
    <p>These Terms of Service govern your use of the EduKeeda platform. By using our services, you agree to these terms.</p>
    <div className="space-y-4 mt-6">
      <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-1">1. User Conduct</h3>
        <p className="text-sm">You agree not to misuse the platform for any illegal activities or violations of organizational guidelines.</p>
      </div>
      <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-1">2. Account Security</h3>
        <p className="text-sm">You are responsible for maintaining the confidentiality of your account credentials and OTPs.</p>
      </div>
      <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-1">3. Content Ownership</h3>
        <p className="text-sm">Users retain ownership of any code or submissions made during hackathons, subject to specific event rules.</p>
      </div>
    </div>
    <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest">Last updated: April 2026</p>
  </PageContainer>
);

export const Privacy = () => (
  <PageContainer title="Privacy Policy">
    <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
    <div className="space-y-4 mt-6">
      <p><strong>Information Collection:</strong> We collect information necessary to provide and improve our services, such as your profile details and activity data.</p>
      <p><strong>Data Usage:</strong> We do not sell your personal data to third parties. We may share data with partner organizations only when you explicitly apply for their opportunities.</p>
      <p><strong>Cookies:</strong> We use cookies to enhance your experience and keep you securely logged in.</p>
    </div>
    <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest">Last updated: April 2026</p>
  </PageContainer>
);

export const Contact = () => (
  <PageContainer title="Contact Us">
    <p>If you need further assistance, our support team is ready to help!</p>
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 mt-6 inline-block pr-12 w-full md:w-auto">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-1">Soham Chavan</h3>
        <p className="mb-1 text-sm"><strong>Email:</strong> <span className="text-purple-400">soham@gmail.com</span></p>
        <p className="text-sm"><strong>Phone:</strong> <span className="text-purple-400">+91 98765 43210</span></p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2 border-b border-white/10 pb-1">Rohan Patil</h3>
        <p className="mb-1 text-sm"><strong>Email:</strong> <span className="text-purple-400">rohann@gmail.com</span></p>
        <p className="text-sm"><strong>Phone:</strong> <span className="text-purple-400">+91 91234 56789</span></p>
      </div>
    </div>
    <div className="mt-8 border-t border-slate-700 pt-6">
       <p className="text-sm text-slate-400">Response time is typically within 24 hours on business days.</p>
    </div>
  </PageContainer>
);
