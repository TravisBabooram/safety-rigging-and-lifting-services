import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, CheckCircle, Shield, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Form validation schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  serviceType: z.string().optional(),
  preferredContact: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to data storage and contact",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
      serviceType: "",
      preferredContact: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('messages')
        .insert({
          name: data.fullName,
          email: data.email,
          subject: data.subject,
          message: data.message,
          service_type: data.serviceType || null,
          preferred_contact: data.preferredContact || null,
        });

      if (error) throw error;

      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
          body: {
            name: data.fullName,
            email: data.email,
            subject: data.subject,
            message: data.message,
            serviceType: data.serviceType,
            preferredContact: data.preferredContact,
            phoneNumber: data.phoneNumber,
            companyName: data.companyName,
          },
        });

        if (emailError) {
          console.error('Error sending email notification:', emailError);
          // Don't throw error here - form submission should still succeed
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't throw error here - form submission should still succeed
      }

      // Set success state
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error toast here
    }
  };

  const serviceTypeOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "rigging-supervision", label: "Rigging Supervision" },
    { value: "lift-plan-review", label: "Lift Plan Review" },
    { value: "equipment-assessment", label: "Equipment Assessment" },
    { value: "training-request", label: "Training Request" },
    { value: "other", label: "Other" },
  ];

  const preferredContactOptions = [
    { value: "phone", label: "Phone" },
    { value: "email", label: "Email" },
    { value: "either", label: "Either" },
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Get In Touch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We'd love to hear from you. Please fill out the form below and we'll get back to you shortly.
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {isSubmitted && (
          <Alert className="mb-8 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Thank you! Your message has been received. We'll contact you shortly.
            </AlertDescription>
          </Alert>
        )}

        {/* Contact Form */}
        <Card className="shadow-industrial">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span>Contact Form</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name and Company Name */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input 
                            id="full-name"
                            placeholder="Enter your full name" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input 
                            id="company-name"
                            placeholder="Your company name (optional)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            id="email"
                            type="email"
                            placeholder="your.email@example.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            id="phone-number"
                            type="tel"
                            placeholder="(868) XXX-XXXX" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input 
                          id="subject"
                          placeholder="Brief description of your inquiry" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          id="message"
                          placeholder="Please provide details about your project, timeline, location, and any specific requirements..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Service Type */}
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger id="service-type" className="bg-background">
                            <SelectValue placeholder="Select a service type (optional)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border border-border z-50">
                          {serviceTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preferred Contact Method */}
                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row space-x-6"
                        >
                          {preferredContactOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value={option.value} 
                                id={`contact-${option.value}`}
                              />
                              <Label htmlFor={`contact-${option.value}`} className="text-sm">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Consent Checkbox */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          id="consent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="consent" className="text-sm leading-relaxed">
                          I consent to SRLS storing and using my data to contact me regarding my inquiry. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  variant="cta" 
                  size="lg" 
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="mt-8 bg-muted/30 border-muted">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Privacy & Data Protection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Safety Rigging & Lifting Services is committed to protecting and respecting your privacy. 
              We only use your information to respond to inquiries and do not share your data. Read our{" "}
              <Link 
                to="/privacy-terms" 
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}