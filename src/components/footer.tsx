import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Linkedin } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "Sitemap", path: "/sitemap" },
  { name: "Privacy & Terms", path: "/privacy-terms" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/cdae1e93-e234-4e65-8bf1-356fd65f4de2.png" 
                alt="SRLS" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Your trusted partner in rigging & lifting solutions. Expert guidance and support for lifting operations across the Caribbean.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  (868) 301-2781 / (868) 774-1498
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a 
                  href="mailto:srls.mw21@gmail.com" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  srls.mw21@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media & CTA */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Connect With Us</h3>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a 
                  href="https://www.linkedin.com/company/safety-rigging-lifting-services/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="space-y-2">
              <Button variant="cta" size="sm" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Safety Rigging & Lifting Services. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            Professional rigging consultancy services across the Caribbean
          </div>
        </div>
      </div>
    </footer>
  );
}