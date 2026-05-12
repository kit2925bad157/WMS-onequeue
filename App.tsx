
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { QueueProvider, useQueue } from './store/QueueContext';
import CitizenView from './components/CitizenView';
import StaffDashboard from './components/StaffDashboard';
import PublicDisplay from './components/PublicDisplay';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthView from './components/AuthView';
import SupportCenter from './components/SupportCenter';
import { Smartphone, X, Download } from 'lucide-react';

const InstallBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const dismissed = localStorage.getItem('onequeue_install_dismissed');
    
    if (!isStandalone && !dismissed) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('onequeue_install_dismissed', 'true');
    setVisible(false);
  };

  const handleInstall = () => {
    alert("Installing OneQueue on your device... Check your home screen!");
    handleDismiss();
  };

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-6 right-6 z-[100] md:left-auto md:right-10 md:w-96 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-6 animate-in slide-in-from-top-10 duration-500">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-indigo-600 p-3 rounded-2xl text-white">
          <Smartphone className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-slate-900">Experience the App</h4>
          <p className="text-xs text-slate-500 font-medium">Install OneQueue for a faster experience, real-time push notifications, and offline access.</p>
        </div>
        <button onClick={handleDismiss} className="p-1 text-slate-300 hover:text-slate-500">
          <X className="w-5 h-5" />
        </button>
      </div>
      <button 
        onClick={handleInstall}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
      >
        <Download className="w-4 h-4" /> Install Now
      </button>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useQueue();
  if (!currentUser) return <Navigate to="/auth" />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { setRole, t, isSupportOpen, setIsSupportOpen } = useQueue();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('staff')) setRole('staff');
    else if (location.pathname.includes('display')) setRole('display');
    else if (location.pathname.includes('citizen')) setRole('citizen');
  }, [location.pathname, setRole]);

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto shadow-xl bg-white lg:rounded-3xl lg:my-4">
      <InstallBanner />
      <Navbar />
      
      {/* Global NEGU AI Assistant */}
      <SupportCenter isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthView />} />
          <Route path="/citizen/*" element={
            <ProtectedRoute>
              <CitizenView />
            </ProtectedRoute>
          } />
          <Route path="/staff" element={
            <ProtectedRoute>
              <StaffDashboard />
            </ProtectedRoute>
          } />
          <Route path="/display" element={<PublicDisplay />} />
        </Routes>
      </main>
      <footer className="py-12 px-6 text-center border-t border-slate-100 bg-slate-50/50">
        <p className="text-slate-500 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
          {t('footer_desc')}
        </p>
        <div className="flex flex-col items-center gap-2">
           <div className="h-px w-12 bg-slate-200 mb-2"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
             {t('powered_by')}
           </p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueueProvider>
      <Router>
        <AppContent />
      </Router>
    </QueueProvider>
  );
};

export default App;
