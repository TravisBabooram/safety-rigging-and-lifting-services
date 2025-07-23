import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  CheckCircle, 
  Shield, 
  Settings, 
  ArrowLeft,
  Clipboard,
  Users,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LiftPlanning() {
  const planComponents = [
    "Load characteristics and weight calculations",
    "Crane capacity and positioning analysis", 
    "Rigging accessories selection and inspection",
    "Environmental factors assessment",
    "Safety exclusion zones mapping",
    "Communication protocols establishment"
  ];

  const benefits = [
    "Reduce operational risks and ensure crew protection",
    "Streamline lift execution with precise step-by-step instructions", 
    "Comply with industry standards and avoid costly incidents",
    "Minimize downtime through efficient planning",
    "Provide clear documentation for regulatory compliance",
    "Enable informed decision-making for complex lifts"
  ];

  const applications = [
    "Heavy equipment installation and removal",
    "Structural steel placement in construction",
    "Process equipment maintenance in refineries",
    "Offshore platform crane operations", 
    "Marine cargo handling at terminals",
    "Emergency response and recovery operations"
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Navigation */}
      <div className="flex items-center space-x-2 text-sm">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/services">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </Button>
      </div>

      {/* Header */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
            <FileText className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Lift Planning & Method Statements</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We provide detailed lift plans that ensure operational safety, precision, and regulatory compliance 
          for all types of lifting operations.
        </p>
      </section>

      {/* Overview */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clipboard className="h-6 w-6 text-accent" />
              <span>What We Deliver</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Our comprehensive lift plans cover all aspects of your lifting operation, from initial 
              load assessment to final execution. Each plan includes detailed method statements, 
              risk assessments, and compliance documentation.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Plan Components:</h4>
              <ul className="space-y-2">
                {planComponents.map((component, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{component}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-6 w-6 text-accent" />
              <span>Our Process</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-foreground">Site Assessment</h4>
                  <p className="text-sm text-muted-foreground">Comprehensive evaluation of lift environment and constraints</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-foreground">Engineering Analysis</h4>
                  <p className="text-sm text-muted-foreground">Load calculations, crane selection, and rigging design</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-foreground">Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground">Identification and mitigation of potential hazards</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-foreground">Documentation</h4>
                  <p className="text-sm text-muted-foreground">Complete method statement and compliance documentation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Benefits */}
      <section className="bg-gradient-card rounded-lg p-8 shadow-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Key Benefits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional lift planning ensures safety, efficiency, and regulatory compliance for your operations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Applications */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Applications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our lift planning services support a wide range of industries and lifting scenarios.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((application, index) => (
            <Card key={index} className="text-center p-4 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="h-6 w-6 text-primary-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">{application}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Standards & Compliance */}
      <section className="bg-gradient-primary rounded-lg p-8 text-primary-foreground">
        <div className="text-center mb-6">
          <Shield className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Standards & Compliance</h2>
          <p className="opacity-90 max-w-2xl mx-auto">
            All lift plans are developed in accordance with local and international standards, 
            ensuring full regulatory compliance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 text-center">
          {["Local Safety Regulations", "International Standards", "Industry Best Practices", "Client Requirements"].map((standard, index) => (
            <div key={index} className="space-y-2">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8" />
              </div>
              <p className="text-sm font-medium">{standard}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Ready to Plan Your Next Lift?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Contact us today to discuss your lift planning requirements and get a customized solution 
          that ensures safety and success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cta" size="lg" asChild>
            <Link to="/contact">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}