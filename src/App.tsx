import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

const AppContent = () => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services/lift-planning" element={<LiftPlanning />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/privacy-terms" element={<PrivacyTerms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default App;
