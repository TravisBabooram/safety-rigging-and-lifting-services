import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { MaintenanceModeProvider, useMaintenanceMode } from "@/hooks/useMaintenanceMode";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import LiftPlanning from "./pages/LiftPlanning";
import Contact from "./pages/Contact";
import ContactForm from "./pages/ContactForm";
import Sitemap from "./pages/Sitemap";
import PrivacyTerms from "./pages/PrivacyTerms";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import ManageServices from "./pages/admin/ManageServices";
import ManageDocuments from "./pages/admin/ManageDocuments";
import ViewMessages from "./pages/admin/ViewMessages";
import { MaintenancePage } from "./components/MaintenancePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <MaintenanceModeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <GoogleAnalytics trackingId={import.meta.env.VITE_GA_TRACKING_ID} />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </MaintenanceModeProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

const AppContent = () => {
  const { isMaintenanceMode, maintenanceMessage, loading } = useMaintenanceMode();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/services/lift-planning" element={<PublicLayout><LiftPlanning /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/contact-form" element={<PublicLayout><ContactForm /></PublicLayout>} />
      <Route path="/sitemap" element={<PublicLayout><Sitemap /></PublicLayout>} />
      <Route path="/privacy-terms" element={<PublicLayout><PrivacyTerms /></PublicLayout>} />
      
      {/* Admin Routes - Always accessible regardless of maintenance mode */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="services" element={
          <ProtectedRoute requiredRole="editor">
            <ManageServices />
          </ProtectedRoute>
        } />
        <Route path="documents" element={
          <ProtectedRoute requiredRole="editor">
            <ManageDocuments />
          </ProtectedRoute>
        } />
        <Route path="messages" element={
          <ProtectedRoute requiredRole="admin">
            <ViewMessages />
          </ProtectedRoute>
        } />
      </Route>
      
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMaintenanceMode, maintenanceMessage } = useMaintenanceMode();

  // Show maintenance page if maintenance mode is enabled
  if (isMaintenanceMode) {
    return <MaintenancePage message={maintenanceMessage} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};


export default App;
