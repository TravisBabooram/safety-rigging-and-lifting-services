import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Shield, HardHat } from "lucide-react";
import { Link } from "react-router-dom";
import { DocumentsSection } from "@/components/DocumentsSection";
export default function About() {
  return <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">About SRLS</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your trusted partner in rigging & lifting solutions with over a decade of expertise 
          in safety, compliance, and operational excellence.
        </p>
      </section>

      {/* Who We Are */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-2">
          <Users className="h-6 w-6 text-accent" />
          <h2 className="text-3xl font-bold text-foreground">Who We Are</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Safety Rigging & Lifting Services (SRLS) became a registered company in March 2020 to support 
          construction, oil & gas, and industrial projects across the Caribbean. We specialize in 
          rigging and lifting operations, with a commitment to safety that matches our pursuit of quality 
          and timely delivery.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our expertise spans across various industries including petrochemical facilities, marine terminals, 
          construction sites, and offshore platforms. We bring together technical knowledge, operational 
          experience, and regulatory compliance to deliver solutions that exceed client expectations.
        </p>
      </section>

      {/* Mission & Values */}
      <section className="bg-gradient-card rounded-lg p-8 shadow-card">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              SRLS's aim is to provide an efficient and reliable service to our clients and to enable them 
              in every aspect of operation to achieve sustainable growth and development. Clients are our 
              highest priority. We provide quality services while respecting health, safety, and the 
              environment by applying international standards, safe work, and best practices in all 
              lifting and rigging operations.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Our Values</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Safety First - Zero compromises on safety standards</li>
              <li>• Professionalism - Maintaining excellence in all operations</li>
              <li>• Client-Centered Service - Putting client needs at the forefront</li>
              <li>• Integrity in Every Lift - Honest and transparent practices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet the Director */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Director</h2>
        </div>
         <Card className="max-w-4xl mx-auto shadow-card">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 rounded-full overflow-hidden">
                <img 
                  src="/images/michael-williams.jpg" 
                  alt="Michael Williams - Managing Director" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Michael Williams</h3>
                  <p className="text-accent font-semibold">Managing Director & Principal Consultant</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Michael Williams brings extensive experience in lifting operations, procedural audits, and rigging inspections. His leadership and technical 
                  knowledge ensure every project meets the highest standards of safety and compliance. Michael's expertise spans 
                  across offshore drilling operations, construction projects, and marine lifting operations 
                  throughout the Caribbean region.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Our Approach */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Approach</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in delivering solutions that prioritize safety, efficiency, and compliance while exceeding client expectations.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 hover:shadow-card transition-shadow">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <HardHat className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Safety Excellence</h3>
            <p className="text-sm text-muted-foreground">
              Zero compromise approach to safety with comprehensive risk management and mitigation strategies.
            </p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-card transition-shadow">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Precision Planning</h3>
            <p className="text-sm text-muted-foreground">
              Detailed planning and execution ensuring every lifting operation is conducted with precision and control.
            </p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-card transition-shadow">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Client Focus</h3>
            <p className="text-sm text-muted-foreground">
              Tailored solutions that meet specific client requirements while maintaining the highest service standards.
            </p>
          </Card>
        </div>
      </section>

      {/* Company Documents Section */}
      <DocumentsSection />

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-gradient-primary rounded-lg p-12 text-primary-foreground">
        <h2 className="text-3xl font-bold">Ready to Work With Us?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Let our experienced team help you with your next rigging and lifting project. 
          Contact us today for a consultation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="light-cta" size="lg" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
          <Button variant="dark-cta" size="lg" asChild>
            <Link to="/services">View Our Services</Link>
          </Button>
        </div>
      </section>
    </div>;
}