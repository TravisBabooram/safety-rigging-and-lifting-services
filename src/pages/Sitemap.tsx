import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Users, 
  Settings, 
  Image, 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  MapPin,
  FileText,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const siteStructure = [
  {
    category: "Main Pages",
    icon: Home,
    pages: [
      { name: "Home", path: "/", description: "Welcome page with company overview and services summary" },
      { name: "About Us", path: "/about", description: "Company history, mission, team, and certifications" },
      { name: "Services", path: "/services", description: "Comprehensive listing of rigging and lifting services" },
      { name: "Portfolio", path: "/portfolio", description: "Gallery of completed projects and case studies" }
    ]
  },
  {
    category: "Contact & Support",
    icon: Phone,
    pages: [
      { name: "Contact Us", path: "/contact", description: "Contact information, location, and business hours" },
      { name: "Contact Form", path: "/contact-form", description: "Detailed contact form for project inquiries" },
      { name: "FAQ", path: "/faq", description: "Frequently asked questions and answers" }
    ]
  },
  {
    category: "Information",
    icon: FileText,
    pages: [
      { name: "Sitemap", path: "/sitemap", description: "Complete site navigation and page listing" },
      { name: "Privacy & Terms", path: "/privacy-terms", description: "Privacy policy and terms of use" }
    ]
  }
];

export default function Sitemap() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <MapPin className="h-8 w-8 text-accent" />
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">Sitemap</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Navigate our website easily with this comprehensive sitemap. Find all pages, 
          services, and information about Safety Rigging & Lifting Services.
        </p>
      </section>

      {/* Site Structure */}
      <section className="space-y-8">
        {siteStructure.map((section, index) => {
          const SectionIcon = section.icon;
          return (
            <Card key={index} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <SectionIcon className="h-6 w-6 text-accent" />
                  <span>{section.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="p-4 rounded-lg bg-gradient-card border border-border hover:shadow-card transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{page.name}</h3>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={page.path}>Visit</Link>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {page.description}
                      </p>
                      <div className="text-xs text-accent font-mono">
                        {page.path}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Quick Navigation */}
      <section className="bg-gradient-primary rounded-lg p-8 text-primary-foreground">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Quick Navigation</h2>
          <p className="text-lg opacity-90">
            Jump directly to the most important sections of our website
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-auto p-4 flex-col space-y-2" asChild>
            <Link to="/services">
              <Settings className="h-6 w-6" />
              <span className="text-sm font-medium">Our Services</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-auto p-4 flex-col space-y-2" asChild>
            <Link to="/portfolio">
              <Image className="h-6 w-6" />
              <span className="text-sm font-medium">Portfolio</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-auto p-4 flex-col space-y-2" asChild>
            <Link to="/about">
              <Users className="h-6 w-6" />
              <span className="text-sm font-medium">About Us</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-auto p-4 flex-col space-y-2" asChild>
            <Link to="/contact">
              <Phone className="h-6 w-6" />
              <span className="text-sm font-medium">Contact</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Additional Information */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-accent" />
              <span>Website Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              <p className="text-sm"><strong>Total Pages:</strong> {siteStructure.reduce((total, section) => total + section.pages.length, 0)} pages</p>
              <p className="text-sm"><strong>Mobile Responsive:</strong> Yes</p>
              <p className="text-sm"><strong>Accessibility:</strong> WCAG 2.1 AA Compliant</p>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground leading-relaxed">
              This website is optimized for all devices and browsers. All pages feature 
              responsive design and accessibility features for the best user experience.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-accent" />
              <span>Need Help?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Can't find what you're looking for? Our team is here to help you navigate 
              our services and find the information you need.
            </p>
            <div className="space-y-2">
              <Button variant="cta" size="sm" className="w-full" asChild>
                <Link to="/contact-form">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/faq">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  View FAQ
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}