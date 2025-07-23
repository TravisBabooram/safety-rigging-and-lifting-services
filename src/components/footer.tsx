import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Wrench } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Wrench className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">SRLS</div>
                <div className="text-xs text-gray-400">Safety Rigging & Lifting</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Your trusted partner in rigging & lifting solutions. Expert guidance and support for lifting operations in Trinidad & Tobago.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  #1 Rahaman Development<br />
                  Bamboo Village, La Romaine<br />
                  Trinidad
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  (868) 301-2781 / (868) 774-1498
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  srls.mw21@gmail.com
                </div>
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
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
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
            Professional rigging consultancy services in Trinidad & Tobago
          </div>
        </div>
      </div>
    </footer>
  );
}