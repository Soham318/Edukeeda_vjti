import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CandidateHome from './pages/CandidateHome';
import AdminDashboard from './pages/AdminDashboard';
import AdminManageItems from './pages/AdminManageItems';
import HostEvent from './pages/HostEvent';
import ItemsList from './pages/ItemsList';
import MyHosting from './pages/MyHosting';
import Search from './pages/Search';
import { HelpCenter, Terms, Privacy, Contact } from './pages/SupportPages';
import { useAuth, AuthProvider } from './context/AuthContext';

const ProtectedRoute = ({ children, employerOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (employerOnly && user.role !== 'employer') return <Navigate to="/" />;
  return children;
};

const Layout = ({ children }) => {
  const { user } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-purple-500/30 font-sans flex flex-col">
      <Navbar />
      {user && <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />}
      <main className={`pt-16 ${user ? (isSidebarExpanded ? 'md:ml-64' : 'md:ml-20') : ''} flex-1 transition-all duration-300 relative z-0`}>
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              {user?.role === 'employer' ? <AdminDashboard /> : <CandidateHome />}
            </ProtectedRoute>
          } />

          {/* Employer Routes */}
          <Route path="/admin/requests" element={<ProtectedRoute employerOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/manage" element={<ProtectedRoute employerOnly><AdminManageItems /></ProtectedRoute>} />
          
          {/* Candidate Routes */}
          <Route path="/host-event" element={<ProtectedRoute><HostEvent /></ProtectedRoute>} />
          <Route path="/my-hosting" element={<ProtectedRoute><MyHosting /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          
          <Route path="/scholarships" element={
            <ProtectedRoute><ItemsList type="Scholarship" title="Scholarships" subtitle="Find financial aid to fund your dreams." /></ProtectedRoute>
          } />
          <Route path="/hackathons" element={
            <ProtectedRoute><ItemsList type="Hackathon" title="Hackathons" subtitle="Code, build, and win global challenges." /></ProtectedRoute>
          } />
          <Route path="/internships" element={
            <ProtectedRoute><ItemsList type="Internship" title="Internships" subtitle="Gain real-world experience and accelerate your career." /></ProtectedRoute>
          } />
          <Route path="/cultural-events" element={
            <ProtectedRoute><ItemsList type="Cultural Event" title="Cultural Events" subtitle="Explore cultural fests and activities." /></ProtectedRoute>
          } />
          <Route path="/college-events" element={
            <ProtectedRoute><ItemsList type="College Event" title="College Events" subtitle="Discover what's happening on campuses." /></ProtectedRoute>
          } />
          <Route path="/conferences" element={
            <ProtectedRoute><ItemsList type="Conference" title="Conferences" subtitle="Attend global conferences and network." /></ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute><ItemsList type="Course" title="Courses" subtitle="Upskill with professional courses." /></ProtectedRoute>
          } />
          <Route path="/competitions" element={
            <ProtectedRoute><ItemsList type="Competition" title="Competitions" subtitle="Showcase your skills." /></ProtectedRoute>
          } />
          <Route path="/loans" element={
            <ProtectedRoute><ItemsList type="Loan" title="Education Loans" subtitle="Get funding for your higher education." /></ProtectedRoute>
          } />

          {/* Support Routes */}
          <Route path="/help-center" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
          <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
          <Route path="/privacy" element={<ProtectedRoute><Privacy /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />

        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
