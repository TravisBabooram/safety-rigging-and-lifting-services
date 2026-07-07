import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, CheckCircle, Shield, Users, Target, Award, Wrench, FileText, 
  AlertTriangle, Search, BarChart3, Phone, Mail, Settings, Cog, Truck, 
  HardHat, Building2, Clipboard, Calculator, MapPin, Clock, Zap, 
  Eye, Package, Hammer, Gauge, Lock, Briefcase, Factory, ArrowUpDown 
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MotionWrapper } from "@/components/animations/MotionWrapper";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Rigging and Lifting Consultancy",
  provider: {
    "@type": "ProfessionalService",
    name: "Safety Rigging & Lifting Services Ltd.",
    url: "https://safetyriggingandliftingconsultancy.com",
  },
  areaServed: "Trinidad and Tobago",
  description:
    "Certified rigging inspections, lift planning, load testing, and safety audits across the energy and construction sectors in Trinidad & Tobago.",
};

// Icon mapping for database stored icon names
const iconMap = {
  Search,
  FileText,
  Shield,
  Wrench,
  AlertTriangle,
  BarChart3,
  Users,
  Target,
  Phone,
  Mail,
  Settings,
  Cog,
  CheckCircle,
  Award,
  Truck,
  HardHat,
  Building2,
  Clipboard,
  Calculator,
  MapPin,
  Clock,
  Zap,
  Eye,
  Package,
  Hammer,
  Gauge,
  Lock,
  Briefcase,
  Factory,
  ArrowUpDown,
};

interface Service {
  id: string;
  title: string;
  content: string;
  icon: string | null;
  created_at: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('display_order');

        if (error) {
          // Silent by design — falls through to the empty-grid state below
          // rather than alarming visitors over a background fetch.
        } else {
          setServices(data || []);
        }
      } catch (error) {
        // Same as above.
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: "Safety",
      description: "Reducing the risk of accidents and injuries during lifting operations."
    },
    {
      icon: BarChart3,
      title: "Efficiency",
      description: "Streamlining operations to minimize downtime and costs."
    },
    {
      icon: Award,
      title: "Expertise",
      description: "Access to industry knowledge and best practices."
    },
    {
      icon: Target,
      title: "Customization",
      description: "Tailoring solutions to specific project needs and challenges."
    }
  ];

  return (
    <div className="space-y-0">
      <SEO
        title="Rigging & Lifting Services | SRLS Ltd. Trinidad"
        description="Rigging inspections, lift planning, load testing, and safety audits. SRLS Ltd. delivers certified rigging and lifting solutions across Trinidad & Tobago."
        canonical="https://safetyriggingandliftingconsultancy.com/services"
      />
      <StructuredData data={SERVICE_SCHEMA} />

      {/* Navigation */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <MotionWrapper>
            <h1 className="text-4xl md:text-6xl font-bold">
              Our Services
            </h1>
          </MotionWrapper>
          <MotionWrapper delay={0.15}>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto">
              Safety Rigging and Lifting Services provide expert guidance and support for lifting operations, ensuring safety, efficiency, and compliance with industry standards, regulations, and legislations.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Key Services Offered */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <MotionWrapper>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Key Services Offered</h2>
            </div>
          </MotionWrapper>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon ? iconMap[service.icon as keyof typeof iconMap] || Search : Search;
                return (
                  <Card
                    key={service.id}
                    className="text-left hover:shadow-industrial transition-all duration-300 h-full min-h-[280px] flex flex-col border-l-4 border-l-brand-orange"
                  >
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                          <IconComponent className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{service.content}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Benefits of Consultancy Services */}
      <section className="bg-gradient-card py-16">
        <div className="container mx-auto px-4">
          <MotionWrapper>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Benefits of Consultancy Services</h2>
            </div>
          </MotionWrapper>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="text-left h-full min-h-[280px] flex flex-col border-l-4 border-l-brand-orange"
                >
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-primary mb-4 transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground flex-grow">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </StaggerContainer>

          <MotionWrapper>
            <div className="text-center">
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                Engaging a rigging and lifting consultancy service can significantly enhance the safety and efficiency of lifting operations, providing peace of mind and compliance with regulations, standards, and legislations.
              </p>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Lift Planning Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <MotionWrapper>
              <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Lift Planning</h2>
            </MotionWrapper>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg">
                A detailed lift plan is highly important. This ensures that every aspect of a lifting operation is carefully assessed — from the load characteristics, equipment and accessory selection, necessary safety measures, and more. This includes method statements and risk assessments.
              </p>
              
              <p className="text-lg">
                Lifting plans should be developed not just for the use of a crane, but also for the utilization of lifting equipment such as chain hoists, lever hoists, etc.
              </p>
              
              <h3 className="text-2xl font-bold text-foreground mt-8 mb-6">Why Are Lift Plans So Important?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground">Safety:</span> Lift plans identify hazards, associated risks, and ensure all necessary precautions and equipment are in place to protect everyone involved.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground">Precision:</span> They provide step-by-step instructions for executing smooth and controlled lifting operations, ensuring accuracy throughout the process.
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground">Efficiency:</span> Proper planning minimizes delays and ensures that resources are used effectively, keeping projects on schedule.
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-primary text-primary-foreground p-6 rounded-lg mt-8">
                <p className="text-lg font-semibold text-center">
                  <strong>SRLS</strong> offers cost-effective, whole-of-market access to independent and impartial lifting operations assurance services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <MotionWrapper>
            <h2 className="text-3xl font-bold">Ready to Enhance Your Lifting Operations?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Contact our expert team today for professional rigging and lifting consultation.
            </p>
          </MotionWrapper>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="light-cta" size="lg" asChild>
              <Link to="/contact">Request a Quote</Link>
            </Button>
            <Button variant="dark-cta" size="lg" asChild>
              <Link to="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;