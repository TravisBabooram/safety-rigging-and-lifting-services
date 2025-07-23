import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Lift Planning</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A detailed lift plan is highly important. This ensures that every aspect of a lifting operation is carefully assessed — from the load characteristics, equipment and accessory selection, necessary safety measures, and more.
        </p>
      </section>

      {/* Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-foreground">Comprehensive Lift Planning Services</h2>
            <p className="text-lg text-muted-foreground">
              A detailed lift plan is highly important. This ensures that every aspect of a lifting operation is carefully assessed — from the load characteristics, equipment and accessory selection, necessary safety measures, and more. This includes method statements and risk assessments.
            </p>
            <p className="text-lg text-muted-foreground">
              Lifting plans should be developed not just for the use of a crane, but also for the utilization of lifting equipment such as chain hoists, lever hoists, etc.
            </p>
          </div>
        </div>
      </section>

      {/* Why Are Lift Plans So Important */}
      <section className="bg-gradient-card rounded-lg p-8 shadow-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Are Lift Plans So Important?</h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-start space-x-4">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Safety</h3>
              <p className="text-muted-foreground">
                Lift plans identify hazards, associated risks, and ensure all necessary precautions and equipment are in place to protect everyone involved.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Precision</h3>
              <p className="text-muted-foreground">
                They provide step-by-step instructions for executing smooth and controlled lifting operations, ensuring accuracy throughout the process.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Efficiency</h3>
              <p className="text-muted-foreground">
                Proper planning minimizes delays and ensures that resources are used effectively, keeping projects on schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SRLS Highlight */}
      <section className="bg-gradient-primary rounded-lg p-8 text-primary-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">SRLS Advantage</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            <strong>SRLS</strong> offers cost-effective, whole-of-market access to independent and impartial lifting operations assurance services.
          </p>
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