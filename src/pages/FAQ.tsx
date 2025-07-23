import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    id: "services",
    question: "What rigging and lifting services do you provide?",
    answer: "SRLS offers comprehensive rigging and lifting solutions including supervision of lifting operations, lift plan development, risk assessments, equipment fit-for-purpose evaluations, lifting awareness training, and specialized engineering consultancy. We serve various industries including oil & gas, construction, marine operations, and industrial maintenance."
  },
  {
    id: "coverage",
    question: "Do you offer offshore and remote location services?",
    answer: "Yes, we provide services both onshore and offshore throughout Trinidad & Tobago and the wider Caribbean region. Our team is experienced in working in challenging environments including offshore platforms, remote construction sites, and marine terminals. We can mobilize quickly to any location as required."
  },
  {
    id: "certifications",
    question: "What certifications and qualifications do you hold?",
    answer: "Our team holds multiple industry certifications including OPITO, OSHA compliance, ISO 9001, NCCCO crane operator certifications, API standards, and ASME B30 certifications. We maintain continuous professional development to stay current with industry best practices and regulatory requirements."
  },
  {
    id: "emergency",
    question: "Do you provide emergency support services?",
    answer: "Yes, we offer 24/7 emergency support for critical lifting operations and urgent consultations. Our experienced team can provide immediate guidance for unexpected rigging challenges and mobilize quickly for emergency situations. Contact us anytime at (868) 301-2781 for emergency support."
  },
  {
    id: "planning",
    question: "How long does it take to develop a lift plan?",
    answer: "The timeline for lift plan development depends on the complexity of the operation. Simple lifts can typically be planned within 24-48 hours, while complex multi-crane operations or critical lifts may require 1-2 weeks for detailed engineering analysis, 3D modeling, and comprehensive risk assessment. We work with your project timeline to ensure timely delivery."
  },
  {
    id: "training",
    question: "What training programs do you offer?",
    answer: "We provide customized lifting awareness training programs covering safety protocols, equipment operation, best practices, and regulatory compliance. Our training can be delivered on-site or at our facilities and includes both theoretical instruction and hands-on practical sessions. We also offer certification programs and refresher training."
  },
  {
    id: "pricing",
    question: "How do you structure your pricing?",
    answer: "Our pricing is project-specific and depends on factors such as scope of work, duration, location, and complexity. We provide transparent, competitive pricing with detailed quotations outlining all services and costs. Contact us for a free initial consultation and customized quote for your specific requirements."
  },
  {
    id: "equipment",
    question: "Do you supply lifting equipment or just consultancy services?",
    answer: "SRLS specializes in consultancy services including supervision, planning, and training. While we don't directly supply lifting equipment, we can recommend certified equipment suppliers and assist with equipment selection, inspection, and fit-for-purpose evaluations to ensure you have the right tools for your project."
  },
  {
    id: "compliance",
    question: "How do you ensure regulatory compliance?",
    answer: "We stay current with all relevant local and international regulations including OSHA standards, API guidelines, ASME codes, and Trinidad & Tobago safety regulations. Our lift plans and procedures are designed to meet or exceed all applicable regulatory requirements, and we provide comprehensive documentation for compliance auditing."
  },
  {
    id: "timeline",
    question: "How far in advance should we contact you for project planning?",
    answer: "For optimal planning and scheduling, we recommend contacting us as early as possible in your project development phase. This allows for thorough planning, risk assessment, and coordination. However, we understand that urgent situations arise and can provide expedited services when needed. Early engagement helps ensure the best possible outcomes."
  }
];

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <HelpCircle className="h-8 w-8 text-accent" />
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">FAQ</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to commonly asked questions about our rigging and lifting services, 
          processes, and expertise. Can't find what you're looking for? Contact us directly.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto">
        <Card className="shadow-industrial">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left hover:text-accent transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Quick Contact Section */}
      <section className="bg-gradient-card rounded-lg p-8 shadow-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our expert team is here to help. Reach out to us through any of the following methods 
            and we'll provide personalized answers to your specific questions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Button variant="cta" size="lg" className="h-auto p-6 flex-col space-y-2">
            <Phone className="h-8 w-8" />
            <span className="font-semibold">Call Us</span>
            <span className="text-sm">(868) 301-2781</span>
          </Button>
          
          <Button variant="outline" size="lg" className="h-auto p-6 flex-col space-y-2">
            <Mail className="h-8 w-8 text-accent" />
            <span className="font-semibold">Email Us</span>
            <span className="text-sm text-muted-foreground">srls.mw21@gmail.com</span>
          </Button>
          
          <Button variant="outline" size="lg" className="h-auto p-6 flex-col space-y-2" asChild>
            <Link to="/contact-form">
              <MessageSquare className="h-8 w-8 text-accent" />
              <span className="font-semibold">Contact Form</span>
              <span className="text-sm text-muted-foreground">Detailed inquiry</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Emergency Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Need immediate assistance with a critical lifting operation? Our emergency support 
              team is available 24/7 to provide expert guidance and rapid response.
            </p>
            <Button variant="cta" className="w-full">
              Emergency Hotline: (868) 301-2781
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Service Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Want to learn more about our specific services and capabilities? 
              Browse our comprehensive service portfolio and portfolio of completed projects.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/services">Our Services</Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/portfolio">Portfolio</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}