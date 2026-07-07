import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  PhoneCall,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { MotionWrapper } from "@/components/animations/MotionWrapper";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SEO } from "@/components/SEO";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <SEO
        title="Contact Us | Safety Rigging & Lifting Services Ltd."
        description="Get in touch with Safety Rigging & Lifting Services Ltd. for rigging consultancy, lift planning, or safety training enquiries in Trinidad & Tobago."
        canonical="https://safetyriggingandliftingconsultancy.com/contact"
      />

      {/* Hero Banner */}
      <section className="text-center space-y-6 bg-gradient-hero text-white rounded-lg p-8 md:p-12">
        <MotionWrapper>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Contact Us</h1>
        </MotionWrapper>
        <MotionWrapper delay={0.15}>
          <p className="text-xl text-white/85 max-w-3xl mx-auto">
            Ready to discuss your rigging and lifting requirements? Get in touch with our
            expert team for professional consultation and solutions.
          </p>
        </MotionWrapper>
      </section>

      {/* Contact Methods */}
      <StaggerContainer className="grid md:grid-cols-3 gap-8">
        <Card className="text-center hover:shadow-industrial transition-shadow h-full min-h-[280px] flex flex-col">
          <CardHeader>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
              <Phone className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle>Call Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-grow">
            <div className="space-y-2 flex-grow">
              <p className="font-semibold text-foreground">(868) 301-2781</p>
              <p className="font-semibold text-foreground">(868) 774-1498</p>
              <p className="text-sm text-muted-foreground">
                Available 24/7 for emergency consultations
              </p>
            </div>
            <Button variant="cta" className="w-full mt-auto" asChild>
              <a href="tel:+18683012781">
                <PhoneCall className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-industrial transition-shadow h-full min-h-[280px] flex flex-col">
          <CardHeader>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle>Email Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-grow">
            <div className="space-y-2 flex-grow">
              <a
                href="mailto:srls.mw21@gmail.com"
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                srls.mw21@gmail.com
              </a>
              <p className="text-sm text-muted-foreground">
                We respond to all inquiries within 24 hours
              </p>
            </div>
            <Button variant="cta" className="w-full mt-auto" asChild>
              <a href="mailto:srls.mw21@gmail.com">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-industrial transition-shadow h-full min-h-[280px] flex flex-col">
          <CardHeader>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-grow">
            <div className="space-y-2 flex-grow">
              <p className="text-sm text-muted-foreground">
                Prefer to send a detailed message? Use our contact form for
                comprehensive project inquiries.
              </p>
            </div>
            <Button variant="cta" className="w-full mt-auto" asChild>
              <Link to="/contact-form">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Form
              </Link>
            </Button>
          </CardContent>
        </Card>
      </StaggerContainer>

      {/* Why Contact Us */}
      <section className="bg-gradient-card rounded-lg p-8 shadow-card">
        <MotionWrapper>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Contact SRLS?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              When you contact us, you're not just getting a service provider –
              you're partnering with rigging and lifting experts.
            </p>
          </div>
        </MotionWrapper>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Expert Consultation</h3>
              <p className="text-sm text-muted-foreground">
                Get professional advice from certified rigging experts with years of experience.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Custom Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Every project is unique. We provide tailored solutions for your specific needs.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Fast Response</h3>
              <p className="text-sm text-muted-foreground">
                Quick turnaround times for quotes, consultations, and emergency support.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Competitive Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Transparent, competitive pricing with no hidden costs or surprise fees.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Proven Track Record</h3>
              <p className="text-sm text-muted-foreground">
                Hundreds of successful projects with zero safety incidents.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Ongoing Support</h3>
              <p className="text-sm text-muted-foreground">
                Continuous support throughout your project and beyond completion.
              </p>
            </div>
          </div>
        </StaggerContainer>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-gradient-primary rounded-lg p-12 text-primary-foreground">
        <MotionWrapper>
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Don't let rigging challenges hold back your project. Contact our expert team today
            and let's discuss how we can help you achieve your goals safely and efficiently.
          </p>
        </MotionWrapper>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="light-cta" size="lg" asChild>
            <a href="tel:+18683012781">
              <PhoneCall className="h-5 w-5 mr-2" />
              Call (868) 301-2781
            </a>
          </Button>
          <Button variant="dark-cta" size="lg" asChild>
            <Link to="/contact-form">
              <MessageSquare className="h-5 w-5 mr-2" />
              Send Message
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}