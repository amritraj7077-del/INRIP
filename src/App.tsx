import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { Navbar } from './components/landing/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { SolutionsSection } from './components/landing/SolutionsSection';
import { PricingSection } from './components/landing/PricingSection';
import { AboutSection } from './components/landing/AboutSection';
import { ContactSection } from './components/landing/ContactSection';
import { Footer } from './components/landing/Footer';
import { AIAssistant } from './components/landing/AIAssistant';
import { Skeleton } from './components/ui/Skeleton';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { TrustedDataSources } from './components/landing/TrustedDataSources';
import { WhyINRIP } from './components/landing/WhyINRIP';
import { AIScoring } from './components/landing/AIScoring';
import { IndustriesSection } from './components/landing/IndustriesSection';
import { ProductRoadmap } from './components/landing/ProductRoadmap';
import { Testimonials } from './components/landing/Testimonials';
import { FAQ } from './components/landing/FAQ';
import { Newsletter } from './components/landing/Newsletter';
import { CookieConsent } from './components/landing/CookieConsent';
import { MapTopOverlays } from './components/dashboard/MapTopOverlays';
import { FloatingFilterPanel } from './components/dashboard/FloatingFilterPanel';
import { FloatingLayersPanel } from './components/dashboard/FloatingLayersPanel';
import { FloatingLegend } from './components/dashboard/FloatingLegend';
import { ActiveLayerWidget } from './components/dashboard/ActiveLayerWidget';
import { MapBottomControls } from './components/dashboard/MapBottomControls';
import { ClusteredMarkers } from './components/dashboard/ClusteredMarkers';
import { fetchMinerals } from './services/mineralsService';
import { Mineral } from './types/minerals';
import { isSupabaseConfigured } from './lib/supabase';
import './styles/index.css';

// Lazy load auth pages for code splitting
const LoginPage = lazy(() => import('./components/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./components/auth/RegisterPage').then(module => ({ default: module.RegisterPage })));

// Auth page skeleton for lazy loading
const AuthPageSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
    <div className="w-full max-w-md space-y-6">
      <Skeleton variant="rectangular" width={64} height={64} className="mx-auto mb-6" />
      <Skeleton variant="text" width="60%" height={32} className="mx-auto mb-2" />
      <Skeleton variant="text" width="80%" height={20} className="mx-auto mb-8" />
      <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 space-y-6">
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={48} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={48} />
        <Skeleton variant="rectangular" width="100%" height={48} />
      </div>
    </div>
  </div>
);

const INDIA_SUBCONTINENT_BOUNDS: [[number, number], [number, number]] = [
  [60, 0],
  [100, 40]
];

const INDIA_CENTER: [number, number] = [78.9629, 20.5937];

type View = 'landing' | 'login' | 'register' | 'map';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [minerals, setMinerals] = useState<Mineral[]>([]);
  const [selectedMine, setSelectedMine] = useState<Mineral | null>(null);
  const isInitialized = useRef(false);

  const handleLaunchDashboard = useCallback(() => {
    setCurrentView('map');
  }, []);

  const handleLogin = useCallback(() => {
    setCurrentView('login');
  }, []);

  const handleRegister = useCallback(() => {
    setCurrentView('register');
  }, []);

  const handleBackToLanding = useCallback(() => {
    setCurrentView('landing');
  }, []);

  const handleNavigate = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleMarkerClick = useCallback((mineral: Mineral) => {
    setSelectedMine(mineral);
    
    if (map.current) {
      map.current.flyTo({
        center: [mineral.longitude, mineral.latitude],
        zoom: 12,
        duration: 1500,
      });
    }
  }, []);

  // Initialize map when switching to map view
  useEffect(() => {
    if (currentView !== 'map') return;

    const maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY || '';

    if (isInitialized.current) {
      if (map.current) {
        setTimeout(() => {
          if (map.current) {
            map.current.resize();
          }
        }, 100);
      }
      return;
    }

    if (!mapContainer.current) return;
    if (!maptilerApiKey) {
      setError('MapTiler API key is required');
      setIsLoading(false);
      return;
    }

    isInitialized.current = true;
    setIsLoading(true);

    try {
      const styleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${maptilerApiKey}`;
      
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: styleUrl,
        center: INDIA_CENTER,
        zoom: 5,
        maxBounds: INDIA_SUBCONTINENT_BOUNDS,
        minZoom: 3,
        maxZoom: 18,
        renderWorldCopies: false,
      });

      map.current = mapInstance;

      mapInstance.on('load', () => {
        setIsLoading(false);
        setIsMapReady(true);
      });

      mapInstance.on('error', (e: any) => {
        setError('Failed to load map: ' + (e.error?.message || e.message));
        setIsLoading(false);
      });

      return () => {
        if (mapInstance) {
          mapInstance.remove();
          map.current = null;
        }
        isInitialized.current = false;
      };
    } catch (err) {
      setError('Failed to initialize map');
      setIsLoading(false);
      isInitialized.current = false;
    }
  }, [currentView]);

  // Fetch minerals when map is ready
  useEffect(() => {
    if (!isMapReady || !isSupabaseConfigured) return;

    const loadMinerals = async () => {
      try {
        const data = await fetchMinerals();
        setMinerals(data);
      } catch (err) {
        console.error('Error fetching minerals:', err);
        setError('Failed to load minerals data');
      }
    };

    loadMinerals();
  }, [isMapReady]);

  if (error) {
    return (
      <ToastProvider>
        <ThemeProvider>
          <div className="flex items-center justify-center h-screen bg-[#F8FAFC] dark:bg-slate-900">
            <div className="text-center">
              <p className="text-destructive text-lg">{error}</p>
            </div>
          </div>
        </ThemeProvider>
      </ToastProvider>
    );
  }

  // Login Page
  if (currentView === 'login') {
    return (
      <ToastProvider>
        <ThemeProvider>
          <Suspense fallback={<AuthPageSkeleton />}>
            <LoginPage onRegister={handleRegister} onBack={handleBackToLanding} />
          </Suspense>
        </ThemeProvider>
      </ToastProvider>
    );
  }

  // Register Page
  if (currentView === 'register') {
    return (
      <ToastProvider>
        <ThemeProvider>
          <Suspense fallback={<AuthPageSkeleton />}>
            <RegisterPage onLogin={handleLogin} onBack={handleBackToLanding} />
          </Suspense>
        </ThemeProvider>
      </ToastProvider>
    );
  }

  // GIS Dashboard (unchanged from original)
  if (currentView === 'map') {
    return (
      <ToastProvider>
        <ThemeProvider>
          <div className="w-full h-full relative bg-[#F8FAFC] dark:bg-slate-900">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-900 z-50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">Loading map...</p>
                </div>
              </div>
            )}
            
            <div ref={mapContainer} className="w-full h-full" />
            
            {isMapReady && (
              <>
                <MapTopOverlays onBackToHome={handleBackToLanding} />
                <FloatingFilterPanel />
                <div className="absolute top-20 right-4 z-20 w-48 space-y-3">
                  <FloatingLayersPanel />
                  <FloatingLegend />
                </div>
                <ActiveLayerWidget />
                <MapBottomControls map={map.current} />
                <ClusteredMarkers
                  map={map.current}
                  minerals={minerals}
                  onMarkerClick={handleMarkerClick}
                  selectedMineId={selectedMine?.id}
                />
              </>
            )}
          </div>
        </ThemeProvider>
      </ToastProvider>
    );
  }

  // Landing Page
  return (
    <ToastProvider>
      <ThemeProvider>
        <LoadingScreen />
        <div className="min-h-screen bg-white dark:bg-slate-900">
          <Navbar
            onNavigate={handleNavigate}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
          <main className="w-full">
            <HeroSection
              onLaunchDashboard={handleLaunchDashboard}
              onRequestDemo={handleLogin}
            />
            <TrustedDataSources />
            <WhyINRIP />
            <FeaturesSection />
            <SolutionsSection />
            <AIScoring />
            <IndustriesSection />
            <ProductRoadmap />
            <Testimonials />
            <PricingSection />
            <AboutSection />
            <FAQ />
            <Newsletter />
            <ContactSection />
          </main>
          <Footer />
          <AIAssistant />
          <CookieConsent />
        </div>
      </ThemeProvider>
    </ToastProvider>
  );
}
