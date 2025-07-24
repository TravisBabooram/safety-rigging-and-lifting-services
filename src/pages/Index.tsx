import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, FileText, Shield, GraduationCap, Phone, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-banner.jpg";
import { LogoProcessor } from "@/components/LogoProcessor";

const Index = () => {
  const services = [
    { 
      icon: Construction, 
      title: "Site Assessments & Supervision", 
      description: "Evaluating site conditions and providing on-site support during lifting operations to ensure adherence to safety protocols.", 
      path: "/services" 
    },
    { 
      icon: FileText, 
      title: "Lift Planning & Review", 
      description: "Developing detailed lift plans and providing documented reviews of safe systems of work against regulatory obligations.", 
      path: "/services" 
    },
    { 
      icon: GraduationCap, 
      title: "Training & Compliance", 
      description: "In-house awareness training for safe lifting practices and ensuring compliance with local and international regulations.", 
      path: "/services" 
    },
    { 
      icon: Shield, 
      title: "Risk Assessment & Investigation", 
      description: "Conducting comprehensive risk assessments and providing expert support for incident investigations.", 
      path: "/services" 
    }
  ];

  return (
    <div className="space-y-0">
      {/* Logo Section */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4 text-center">
          <img 
            src="/lovable-uploads/cdae1e93-e234-4e65-8bf1-356fd65f4de2.png" 
            alt="SRLS - Safety Rigging & Lifting Services" 
            className="h-40 w-auto mx-auto"
          />
        </div>
      </section>

      {/* Logo Processor - Temporary for background removal */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <LogoProcessor />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Expert Rigging & Lifting Services<br />
            <span className="text-accent">in Trinidad & Tobago</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            We deliver safe, efficient, and customized solutions for every lifting challenge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" asChild>
              <Link to="/services">Explore Our Services</Link>
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 text-white border-white hover:bg-white/20" asChild>
              <Link to="/contact">Request a Quote</Link>
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
              Expert guidance and support for lifting operations, ensuring safety, efficiency, and compliance with industry standards, regulations, and legislations.
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

      {/* Why Choose SRLS */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Why Choose SRLS?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Safety First</h3>
              <p className="text-sm text-muted-foreground">Reducing risk of accidents and injuries during lifting operations</p>
            </div>
            <div className="text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Efficiency</h3>
              <p className="text-sm text-muted-foreground">Streamlining operations to minimize downtime and costs</p>
            </div>
            <div className="text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Expertise</h3>
              <p className="text-sm text-muted-foreground">Access to industry knowledge and best practices</p>
            </div>
            <div className="text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Customization</h3>
              <p className="text-sm text-muted-foreground">Tailoring solutions to specific project needs and challenges</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/about">Learn More About SRLS</Link>
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
