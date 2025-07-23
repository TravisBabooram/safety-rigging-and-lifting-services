import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, FileText, Eye, Lock, Phone, Mail } from "lucide-react";

export default function PrivacyTerms() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shield className="h-8 w-8 text-accent" />
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">Privacy & Terms</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your privacy and trust are important to us. Learn about how we collect, use, 
          and protect your information, and our terms of service.
        </p>
      </section>

      {/* Privacy Policy */}
      <section>
        <Card className="shadow-industrial">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Eye className="h-6 w-6 text-accent" />
              <span>Privacy Policy</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Information We Collect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Safety Rigging & Lifting Services (SRLS) collects information you provide directly to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Fill out our contact forms or send us inquiries</li>
                <li>Request quotes or consultations</li>
                <li>Participate in our training programs</li>
                <li>Subscribe to our communications</li>
                <li>Engage with our services</li>
              </ul>
              
              <p className="text-muted-foreground leading-relaxed">
                The types of information we may collect include your name, email address, phone number, 
                company name, project details, and any other information you choose to provide.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">How We Use Your Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Develop quotes and proposals for your projects</li>
                <li>Schedule consultations and site visits</li>
                <li>Provide ongoing project support and communication</li>
                <li>Send relevant updates about our services (with your consent)</li>
                <li>Improve our services and customer experience</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Information Sharing</h3>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Lock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-2">We Do Not Sell Your Information</p>
                    <p className="text-sm text-muted-foreground">
                      SRLS does not sell, trade, or otherwise transfer your personal information to third parties 
                      without your explicit consent, except as described in this policy.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>To protect our rights, property, or safety, or that of others</li>
                <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Data Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                of transmission over the internet or electronic storage is 100% secure.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Your Rights</h3>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Terms of Use */}
      <section>
        <Card className="shadow-industrial">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <FileText className="h-6 w-6 text-accent" />
              <span>Terms of Use</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Acceptance of Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the SRLS website and services, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Use License</h3>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily access and use the materials on SRLS's website for 
                personal, non-commercial transitory viewing only. This license shall automatically 
                terminate if you violate any of these restrictions.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Service Disclaimer</h3>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Professional Services:</strong> All information provided on this website is for 
                  general informational purposes. Specific rigging and lifting operations require professional 
                  assessment and should not rely solely on general information. Always consult with qualified 
                  professionals for your specific projects.
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Limitations</h3>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall SRLS or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or 
                inability to use the materials on our website or services, even if SRLS or an authorized 
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Governing Law</h3>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of 
                Trinidad & Tobago, and you irrevocably submit to the exclusive jurisdiction of the courts 
                in that state or location.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact for Privacy/Terms Questions */}
      <section className="bg-gradient-card rounded-lg p-8 shadow-card">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Questions About Privacy or Terms?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or Terms of Use, please contact us using 
            the information below.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <Phone className="h-8 w-8 text-accent mx-auto" />
            <p className="font-semibold">Phone</p>
            <p className="text-sm text-muted-foreground">(868) 301-2781</p>
          </div>
          
          <div className="text-center space-y-2">
            <Mail className="h-8 w-8 text-accent mx-auto" />
            <p className="font-semibold">Email</p>
            <p className="text-sm text-muted-foreground">srls.mw21@gmail.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}