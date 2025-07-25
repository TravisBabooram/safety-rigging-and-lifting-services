import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Construction, FileText, Shield, GraduationCap, Phone, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

import Autoplay from "embla-carousel-autoplay";

const Index = () => {
  const heroImages = [
    "/lovable-uploads/85823cab-9802-42ba-ac41-a859d74aac19.png",
    "/lovable-uploads/2196359f-3834-4e7f-8657-edc6b441c4ce.png", 
    "/lovable-uploads/bb510e32-4197-4c6c-ba9f-5aad3e21beca.png",
    "/lovable-uploads/33c2738b-72b0-43ae-8577-fdf16a85bcf1.png",
    "/lovable-uploads/a31f43de-44aa-4c56-ba71-82175c7558f2.png"
  ];

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
            src="/lovable-uploads/25e7cac9-955d-46a1-8e99-1fae325046d6.png" 
            alt="SRLS - Safety Rigging & Lifting Services" 
            className="h-40 w-auto mx-auto"
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] flex items-center justify-center overflow-hidden bg-muted">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          className="absolute inset-0 w-full h-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="h-full w-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full p-0 basis-full w-full">
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <img 
                    src={image} 
                    alt={`Hero slide ${index + 1}`}
                    className="w-full h-full object-cover md:object-contain lg:max-w-[95%] lg:max-h-[95%]"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="relative z-10 text-center space-y-4 md:space-y-6 lg:space-y-8 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            Safety Rigging & Lifting Services
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
            We deliver safe, efficient, and customized solutions for every lifting challenge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button variant="cta" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/services">Explore Our Services</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black" asChild>
              <Link to="/contact">Get in Contact</Link>
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
                <Link key={index} to={service.path} className="h-full">
                  <Card className="text-center hover:shadow-industrial transition-all duration-300 group cursor-pointer h-full flex flex-col">
                    <CardHeader className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
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
            <div className="text-center space-y-3 flex flex-col h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Safety First</h3>
              <p className="text-sm text-muted-foreground flex-grow">Reducing risk of accidents and injuries during lifting operations</p>
            </div>
            <div className="text-center space-y-3 flex flex-col h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Efficiency</h3>
              <p className="text-sm text-muted-foreground flex-grow">Streamlining operations to minimize downtime and costs</p>
            </div>
            <div className="text-center space-y-3 flex flex-col h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Expertise</h3>
              <p className="text-sm text-muted-foreground flex-grow">Access to industry knowledge and best practices</p>
            </div>
            <div className="text-center space-y-3 flex flex-col h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Customization</h3>
              <p className="text-sm text-muted-foreground flex-grow">Tailoring solutions to specific project needs and challenges</p>
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
            <Button variant="light-cta" size="lg">
              <Phone className="h-5 w-5 mr-2" />
              (868) 301-2781
            </Button>
            <Button variant="dark-cta" size="lg">
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
