import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Construction, FileText, Shield, GraduationCap, Award, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    { icon: Construction, title: "Rigging & Lifting Supervision", description: "Expert supervision of complex operations", path: "/services" },
    { icon: FileText, title: "Lift Plan Development", description: "Comprehensive planning with engineering analysis", path: "/services" },
    { icon: Shield, title: "Risk Assessments", description: "Thorough analysis and mitigation strategies", path: "/services" },
    { icon: GraduationCap, title: "Training Programs", description: "Professional lifting awareness training", path: "/services" }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Your Trusted Partner in<br />
            <span className="text-accent">Rigging & Lifting Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Professional consultancy services ensuring safety, compliance, and operational excellence 
            across Trinidad & Tobago and the Caribbean.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" asChild>
              <Link to="/services">Our Services</Link>
            </Button>
            <Button variant="outline" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive rigging and lifting solutions with certified expertise and proven track record.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link key={index} to={service.path}>
                  <Card className="text-center hover:shadow-industrial transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Preview */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Certified Excellence</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {["OPITO", "OSHA", "ISO 9001", "NCCCO", "API", "ASME"].map((cert) => (
              <div key={cert} className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary">
                <Award className="h-10 w-10 text-primary-foreground" />
              </div>
            ))}
          </div>
          <Button variant="outline" asChild>
            <Link to="/about">View All Certifications</Link>
          </Button>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Contact our expert team today for professional rigging and lifting consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Phone className="h-5 w-5 mr-2" />
              (868) 301-2781
            </Button>
            <Button variant="ghost" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Mail className="h-5 w-5 mr-2" />
              srls.mw21@gmail.com
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
