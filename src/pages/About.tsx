import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Shield, HardHat } from "lucide-react";
import { Link } from "react-router-dom";
import { DocumentsSection } from "@/components/DocumentsSection";
import { MotionWrapper } from "@/components/animations/MotionWrapper";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { SEO } from "@/components/SEO";

const COMPANY_FOUNDED_YEAR = 2020;

function YearsInOperationStat() {
  const years = new Date().getFullYear() - COMPANY_FOUNDED_YEAR;
  const { ref, value } = useCountUp(years);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="inline-flex flex-col items-center">
      <span className="text-5xl font-heading font-bold text-brand-orange tabular-nums">{value}+</span>
      <span className="text-sm text-muted-foreground uppercase tracking-wide">Years in Operation</span>
    </div>
  );
}

export default function About() {
  return <div className="container mx-auto px-4 py-16 space-y-16">
      <SEO
        title="About Us | Safety Rigging & Lifting Services Ltd."
        description="Learn about Safety Rigging & Lifting Services Ltd. — our team, certifications, and commitment to safe lifting operations in Trinidad & Tobago."
        canonical="https://safetyriggingandliftingconsultancy.com/about"
      />

      {/* Hero Banner */}
      <section className="text-center space-y-6 bg-gradient-hero text-white rounded-lg p-8 md:p-12">
        <MotionWrapper>
          <h1 className="text-4xl md:text-6xl font-bold text-white">About SRLS</h1>
        </MotionWrapper>
        <MotionWrapper delay={0.15}>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            Your trusted partner in rigging & lifting solutions with over a decade of expertise
            in safety, compliance, and operational excellence.
          </p>
        </MotionWrapper>
      </section>

      <MotionWrapper delay={0.1} className="text-center block">
        <YearsInOperationStat />
      </MotionWrapper>

      {/* Who We Are */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <MotionWrapper>
          <div className="flex items-center justify-center space-x-2">
            <Users className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold text-foreground">Who We Are</h2>
          </div>
        </MotionWrapper>
        <MotionWrapper delay={0.1}>
          <p className="text-muted-foreground leading-relaxed">
            Safety Rigging & Lifting Services (SRLS) became a registered company in March 2020 to support
            construction, oil & gas, and industrial projects across the Caribbean. We specialize in
            rigging and lifting operations, with a commitment to safety that matches our pursuit of quality
            and timely delivery.
          </p>
        </MotionWrapper>
        <MotionWrapper delay={0.2}>
          <p className="text-muted-foreground leading-relaxed">
            Our expertise spans across various industries including petrochemical facilities, marine terminals,
            construction sites, and offshore platforms. We bring together technical knowledge, operational
            experience, and regulatory compliance to deliver solutions that exceed client expectations.
          </p>
        </MotionWrapper>
      </section>

      {/* Mission & Values */}
      <MotionWrapper as="section" className="bg-gradient-card rounded-lg p-8 shadow-card">
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
      </MotionWrapper>

      {/* Meet the Director */}
      <section className="space-y-8">
        <MotionWrapper>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Director</h2>
          </div>
        </MotionWrapper>
         <Card className="max-w-4xl mx-auto shadow-card">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div
                className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 rounded-full overflow-hidden"
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img
                  src="/images/michael-williams.jpg"
                  alt="Michael Williams, Managing Director at Safety Rigging & Lifting Services Ltd."
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
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
        <MotionWrapper>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Approach</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in delivering solutions that prioritize safety, efficiency, and compliance while exceeding client expectations.
            </p>
          </div>
        </MotionWrapper>
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 hover:shadow-card transition-shadow h-full min-h-[280px] flex flex-col">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
              <HardHat className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Safety Excellence</h3>
            <p className="text-sm text-muted-foreground flex-grow">
              Zero compromise approach to safety with comprehensive risk management and mitigation strategies.
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-card transition-shadow h-full min-h-[280px] flex flex-col">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
              <Target className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Precision Planning</h3>
            <p className="text-sm text-muted-foreground flex-grow">
              Detailed planning and execution ensuring every lifting operation is conducted with precision and control.
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-card transition-shadow h-full min-h-[280px] flex flex-col">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Client Focus</h3>
            <p className="text-sm text-muted-foreground flex-grow">
              Tailored solutions that meet specific client requirements while maintaining the highest service standards.
            </p>
          </Card>
        </StaggerContainer>
      </section>

      {/* Company Documents Section */}
      <DocumentsSection />

      {/* CTA Section */}
      <MotionWrapper as="section" className="text-center space-y-6 bg-gradient-primary rounded-lg p-12 text-primary-foreground">
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
      </MotionWrapper>
    </div>;
}