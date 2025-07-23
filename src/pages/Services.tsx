import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Construction, 
  FileText, 
  Shield, 
  CheckCircle, 
  GraduationCap, 
  Settings,
  AlertTriangle,
  ClipboardCheck
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Construction,
    title: "Rigging & Lifting Supervision",
    description: "Expert supervision of complex rigging and lifting operations ensuring safety and efficiency.",
    features: [
      "On-site supervision and guidance",
      "Critical lift oversight",
      "Equipment inspection and verification",
      "Safety protocol implementation",
      "Real-time decision making support"
    ],
    category: "Operations"
  },
  {
    icon: FileText,
    title: "Lift Plan Development",
    description: "Comprehensive lift planning services from concept to execution with detailed engineering analysis.",
    features: [
      "Detailed lift calculations",
      "3D modeling and simulation",
      "Risk assessment integration",
      "Equipment selection guidance",
      "Regulatory compliance documentation"
    ],
    category: "Planning"
  },
  {
    icon: Shield,
    title: "Risk Assessments",
    description: "Thorough risk analysis and mitigation strategies for all rigging and lifting operations.",
    features: [
      "Hazard identification and analysis",
      "Risk matrix development",
      "Mitigation strategy planning",
      "Safety protocol development",
      "Compliance verification"
    ],
    category: "Safety"
  },
  {
    icon: CheckCircle,
    title: "Equipment Fit-for-Purpose Evaluations",
    description: "Comprehensive assessment of lifting equipment to ensure operational readiness and compliance.",
    features: [
      "Equipment inspection and testing",
      "Load capacity verification",
      "Certification review",
      "Compliance documentation",
      "Recommendation reports"
    ],
    category: "Inspection"
  },
  {
    icon: GraduationCap,
    title: "Lifting Awareness Training",
    description: "Professional training programs to enhance team competency in rigging and lifting operations.",
    features: [
      "Safety awareness training",
      "Equipment operation training",
      "Best practices workshops",
      "Certification programs",
      "Customized training modules"
    ],
    category: "Training"
  },
  {
    icon: Settings,
    title: "Engineering Consultancy",
    description: "Specialized engineering support for complex rigging challenges and custom solutions.",
    features: [
      "Structural analysis",
      "Custom rigging design",
      "Load path analysis",
      "Equipment modification guidance",
      "Technical documentation"
    ],
    category: "Engineering"
  }
];

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive rigging and lifting solutions tailored to meet your specific operational needs. 
          From planning to execution, we've got you covered.
        </p>
      </section>

      {/* Services Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Card key={index} className="group hover:shadow-industrial transition-all duration-300 h-full">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                    <IconComponent className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Why Choose Our Services */}
      <section className="bg-gradient-card rounded-lg p-8 shadow-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose SRLS?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our commitment to excellence sets us apart in the rigging and lifting industry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Safety First</h3>
            <p className="text-sm text-muted-foreground">
              Zero compromise approach to safety with comprehensive risk management.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
              <CheckCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Proven Expertise</h3>
            <p className="text-sm text-muted-foreground">
              Decades of combined experience across diverse industry sectors.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
              <ClipboardCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Compliance Ready</h3>
            <p className="text-sm text-muted-foreground">
              Full regulatory compliance with international standards and best practices.
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
              <AlertTriangle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">
              Round-the-clock emergency support and consultation services.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-gradient-primary rounded-lg p-12 text-primary-foreground">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Contact us today to discuss your rigging and lifting requirements. 
          Let our experts provide you with a customized solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link to="/contact">Request Quote</Link>
          </Button>
          <Button variant="ghost" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/portfolio">View Portfolio</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}