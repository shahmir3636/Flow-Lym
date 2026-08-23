import React, { useState, useEffect } from 'react';
import { PageRoute, ProjectItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AutomationAtmosphere } from './components/AutomationAtmosphere';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { ROICalculatorPage } from './pages/ROICalculatorPage';
import { AIDemosPage } from './pages/AIDemosPage';
import { TeamPage } from './pages/TeamPage';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Sync hash routing on mount & hash change for smooth navigation & deep linking
  useEffect(() => {
    const parseHashRoute = (): PageRoute => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validRoutes: PageRoute[] = [
        'home', 
        'services', 
        'projects',
        'ai-demos',
        'team',
        'roi-calculator',
        'about', 
        'contact'
      ];
      if (validRoutes.includes(hash as PageRoute)) {
        return hash as PageRoute;
      }
      return 'home';
    };

    setActiveRoute(parseHashRoute());

    const handleHashChange = () => {
      setActiveRoute(parseHashRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setActiveRoute(route);
    window.location.hash = route === 'home' ? '' : `#${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] selection:bg-violet-200 selection:text-violet-950 flex flex-col font-sans relative overflow-x-hidden">
      
      <AutomationAtmosphere />

      {/* Soft Ambient Top Lighting (No straight lines or geometric cages) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-violet-500/[0.06] via-fuchsia-500/[0.025] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/[0.025] rounded-full blur-3xl" />
        <div className="absolute top-2/3 -right-32 w-96 h-96 bg-violet-400/[0.025] rounded-full blur-3xl" />
      </div>

      {/* Sticky Fixed Top Header Navigation */}
      <Navbar
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        onOpenStartProject={() => handleNavigate('contact')}
      />

      {/* Main Page Content Viewports */}
      <main className="flex-1 relative z-10">
        <div key={activeRoute} className="page-transition" aria-live="polite">
        {activeRoute === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenStartProject={() => handleNavigate('contact')}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}

        {activeRoute === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenStartProject={() => handleNavigate('contact')}
          />
        )}

        {activeRoute === 'projects' && (
          <ProjectsPage
            onNavigate={handleNavigate}
            onOpenStartProject={() => handleNavigate('contact')}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}

        {activeRoute === 'ai-demos' && (
          <AIDemosPage onOpenStartProject={() => handleNavigate('contact')} />
        )}

        {activeRoute === 'team' && (
          <TeamPage onOpenStartProject={() => handleNavigate('contact')} />
        )}

        {activeRoute === 'roi-calculator' && (
          <ROICalculatorPage
            onNavigate={handleNavigate}
            onOpenStartProject={() => handleNavigate('contact')}
          />
        )}

        {activeRoute === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenStartProject={() => handleNavigate('contact')}
          />
        )}


        {activeRoute === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
          />
        )}
        </div>
      </main>

      {/* Agency Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenStartProject={() => handleNavigate('contact')}
      />

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={() => setIsStartProjectOpen(true)}
        onOpenDemo={() => handleNavigate('ai-demos')}
      />

    </div>
  );
}
