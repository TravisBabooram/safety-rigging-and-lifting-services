import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
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
              <p className="font-semibold text-foreground">srls.mw21@gmail.com</p>
              <p className="text-sm text-muted-foreground">
                We respond to all inquiries within 24 hours
              </p>
            </div>
            <Button variant="cta" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
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

      {/* Company Information */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-accent" />
              <CardTitle>Our Location</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Safety Rigging & Lifting Services</p>
              <p className="text-muted-foreground">
                #1 Rahaman Development<br />
                Bamboo Village, La Romaine<br />
                Trinidad and Tobago
              </p>
            </div>
            <div className="bg-gradient-card rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Ready to support your project:</strong> We're ready to support your next 
                lifting or rigging project. Contact us today for a consultation or quote.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-accent" />
              <CardTitle>Business Hours</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="font-semibold">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span className="font-semibold">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="font-semibold">Emergency Only</span>
              </div>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">
                  <strong>24/7 Emergency Support</strong><br />
                  Critical lifting operations and emergency consultations available around the clock.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Map Placeholder */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Find Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Located in the heart of Trinidad, we're strategically positioned to serve 
            clients across the Caribbean region efficiently.
          </p>
        </div>
        <Card className="overflow-hidden shadow-industrial">
          <div className="aspect-video bg-gradient-card flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 text-primary mx-auto" />
              <div>
                <p className="text-lg font-semibold text-foreground">Interactive Map</p>
                <p className="text-muted-foreground">
                  Bamboo Village, La Romaine, Trinidad
                </p>
              </div>
              <Button variant="outline">
                Open in Google Maps
              </Button>
            </div>
          </div>
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