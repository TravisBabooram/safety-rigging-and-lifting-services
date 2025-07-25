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

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Ready to discuss your rigging and lifting requirements? Get in touch with our 
          expert team for professional consultation and solutions.
        </p>
      </section>

      {/* Contact Methods */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card className="text-center hover:shadow-industrial transition-shadow">
          <CardHeader>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4">
              <Phone className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle>Call Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-semibold text-foreground">(868) 301-2781</p>
              <p className="font-semibold text-foreground">(868) 774-1498</p>
              <p className="text-sm text-muted-foreground">
                Available 24/7 for emergency consultations
              </p>
            </div>
            <Button variant="cta" className="w-full">
              <PhoneCall className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-industrial transition-shadow">
          <CardHeader>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle>Email Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
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
            <Button variant="cta" className="w-full" asChild>
              <a href="mailto:srls.mw21@gmail.com">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-industrial transition-shadow">
          <CardHeader>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Prefer to send a detailed message? Use our contact form for 
                comprehensive project inquiries.
              </p>
            </div>
            <Button variant="cta" className="w-full" asChild>
              <Link to="/contact-form">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Form
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>


      {/* Why Contact Us */}
      <section className="bg-gradient-card rounded-lg p-8 shadow-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Contact SRLS?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            When you contact us, you're not just getting a service provider – 
            you're partnering with rigging and lifting experts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-gradient-primary rounded-lg p-12 text-primary-foreground">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Don't let rigging challenges hold back your project. Contact our expert team today 
          and let's discuss how we can help you achieve your goals safely and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <PhoneCall className="h-5 w-5 mr-2" />
            Call (868) 301-2781
          </Button>
          <Button variant="ghost" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" asChild>
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