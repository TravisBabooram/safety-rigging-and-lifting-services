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
    <footer className="bg-brand-dark text-white border-t border-brand-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div className="space-y-4">
            <img
              src="/assets/images/cdae1e93-e234-4e65-8bf1-356fd65f4de2.png"
              alt="Safety Rigging & Lifting Services Ltd. logo"
              className="h-12 w-auto"
            />
            <p className="text-sm text-white/60 max-w-xs">
              Your trusted partner in rigging & lifting solutions. Expert guidance and support for lifting operations across the Caribbean.
            </p>
            <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2 text-white/60 hover:text-brand-orange" asChild>
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

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-orange">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-white/70 hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-orange">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white/50" />
                <div className="text-sm text-white/70 space-y-1">
                  <a href="tel:+18683012781" className="block hover:text-brand-orange transition-colors">
                    (868) 301-2781
                  </a>
                  <a href="tel:+18687741498" className="block hover:text-brand-orange transition-colors">
                    (868) 774-1498
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white/50" />
                <a
                  href="mailto:srls.mw21@gmail.com"
                  className="text-sm text-white/70 hover:text-brand-orange transition-colors"
                >
                  srls.mw21@gmail.com
                </a>
              </div>
            </div>
            <Button variant="cta" size="sm" asChild>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-brand-charcoal" />

        <div className="text-center text-sm text-white/50">
          © {new Date().getFullYear()} Safety Rigging & Lifting Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
}