import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import LiftPlanning from "./pages/LiftPlanning";
import Contact from "./pages/Contact";
import ContactForm from "./pages/ContactForm";
import FAQ from "./pages/FAQ";
import Sitemap from "./pages/Sitemap";
import PrivacyTerms from "./pages/PrivacyTerms";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import ManagePortfolio from "./pages/admin/ManagePortfolio";
import ManageServices from "./pages/admin/ManageServices";
import ViewMessages from "./pages/admin/ViewMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

const AppContent = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
    <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
    <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
    <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
    <Route path="/services/lift-planning" element={<PublicLayout><LiftPlanning /></PublicLayout>} />
    <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
    <Route path="/contact-form" element={<PublicLayout><ContactForm /></PublicLayout>} />
    <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
    <Route path="/sitemap" element={<PublicLayout><Sitemap /></PublicLayout>} />
    <Route path="/privacy-terms" element={<PublicLayout><PrivacyTerms /></PublicLayout>} />
    
    {/* Admin Routes */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    }>
      <Route path="dashboard" element={<DashboardHome />} />
      <Route path="portfolio" element={
        <ProtectedRoute requiredRole="editor">
          <ManagePortfolio />
        </ProtectedRoute>
      } />
      <Route path="services" element={
        <ProtectedRoute requiredRole="editor">
          <ManageServices />
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

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default App;
