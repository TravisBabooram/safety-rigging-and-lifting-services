import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, FileText, Shield, GraduationCap, Phone, Mail, CheckCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MotionWrapper } from "@/components/animations/MotionWrapper";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";

// Animation-heavy hero graphic — kept out of the main bundle.
const LogoHero = lazy(() => import("@/components/LogoHero"));

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Safety Rigging & Lifting Services Ltd.",
  url: "https://safetyriggingandliftingconsultancy.com",
  logo: "https://safetyriggingandliftingconsultancy.com/assets/images/25e7cac9-955d-46a1-8e99-1fae325046d6.png",
  description:
    "Trinidad's leading rigging and lifting consultancy providing certified rigging inspections, lift planning, load testing, and safety training.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "TT",
    addressRegion: "Trinidad",
  },
  areaServed: {
    "@type": "Country",
    name: "Trinidad and Tobago",
  },
  serviceType: [
    "Rigging Inspection",
    "Lift Planning",
    "Load Testing",
    "Safety Training",
    "Rigging Consultancy",
  ],
  priceRange: "$$",
};

const TAGLINE_WORDS = "PRECISION LIFTING. PROVEN SAFETY.".split(" ");
const SUBHEADING = "Trinidad's trusted rigging & lifting consultancy — certified, experienced, precise.";
const TAGLINE_START = 3.5;
const TAGLINE_STAGGER = 0.08;
const TAGLINE_DURATION = 0.5;
const SUBHEADING_DELAY = TAGLINE_START + TAGLINE_WORDS.length * TAGLINE_STAGGER + TAGLINE_DURATION;
const CTA_DELAY = SUBHEADING_DELAY + 0.4;

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const logoParallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const handleScroll = () => setShowScrollHint(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { 
      icon: Construction, 
      title: "Site Assessments & Supervision", 
      description: "Evaluating site conditions and providing on-site support during lifting operations to ensure adherence to safety protocols.", 
      path: "/services" 
    },
    { 
      icon: FileText, 
      title: "Lift Planning & Review", 
      description: "Developing detailed lift plans and providing documented reviews of safe systems of work against regulatory obligations.", 
      path: "/services" 
    },
    { 
      icon: GraduationCap, 
      title: "Training & Compliance", 
      description: "In-house awareness training for safe lifting practices and ensuring compliance with local and international regulations.", 
      path: "/services" 
    },
    { 
      icon: Shield, 
      title: "Risk Assessment & Investigation", 
      description: "Conducting comprehensive risk assessments and providing expert support for incident investigations.", 
      path: "/services" 
    }
  ];

  return (
    <div className="space-y-0">
      <SEO
        title="Safety Rigging & Lifting Services Ltd. | Trinidad's Rigging Consultancy"
        description="Trinidad's leading rigging and lifting consultancy. Certified rigging inspections, lift planning, and safety training across the energy and construction sectors."
        canonical="https://safetyriggingandliftingconsultancy.com"
      />
      <StructuredData data={LOCAL_BUSINESS_SCHEMA} />

      {/* Hero Section — animated brand logo with scroll-driven text reveal */}
      <section ref={heroRef} className="relative w-full h-dvh overflow-hidden">
        <motion.div style={{ y: logoParallaxY }} className="absolute inset-0">
          <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
            <LogoHero />
          </Suspense>
        </motion.div>

        <motion.div
          style={{ y: textParallaxY }}
          className="absolute inset-0 flex items-end justify-center px-4 pb-28 md:pb-32 pointer-events-none"
        >
          <div className="text-center max-w-4xl space-y-6">
            <h1
              className="font-heading font-bold uppercase text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-wide"
              style={{ textWrap: "balance" }}
            >
              {TAGLINE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: TAGLINE_START + i * TAGLINE_STAGGER,
                    duration: TAGLINE_DURATION,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: SUBHEADING_DELAY, duration: 0.6, ease: "easeOut" }}
            >
              {SUBHEADING}
            </motion.p>

            <motion.div
              className="pointer-events-auto pt-2 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: CTA_DELAY, duration: 0.5, type: "spring", stiffness: 260, damping: 18 }}
            >
              <Button variant="cta" size="xl" asChild>
                <Link to="/contact">Get a Consultation</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/services">View Our Services</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
          animate={{ opacity: showScrollHint ? 1 : 0, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.3 },
            y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ChevronDown className="h-7 w-7 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Services Summary */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <MotionWrapper>
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Expertise</h2>
            </MotionWrapper>
            <MotionWrapper delay={0.15}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Expert guidance and support for lifting operations, ensuring safety, efficiency, and compliance with industry standards, regulations, and legislations.
              </p>
            </MotionWrapper>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link key={index} to={service.path} className="h-full block">
                  <Card className="text-center hover:shadow-industrial transition-all duration-300 group cursor-pointer h-full min-h-[280px] flex flex-col">
                    <CardHeader className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4 transition-transform group-hover:scale-105">
                        <IconComponent className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose SRLS */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <MotionWrapper>
            <h2 className="text-3xl font-bold text-foreground mb-8">Why Choose SRLS?</h2>
          </MotionWrapper>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center space-y-3 flex flex-col h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Safety First</h3>
              <p className="text-sm text-muted-foreground flex-grow">Reducing risk of accidents and injuries during lifting operations</p>
            </div>
            <div className="text-center space-y-3 flex flex-col h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Efficiency</h3>
              <p className="text-sm text-muted-foreground flex-grow">Streamlining operations to minimize downtime and costs</p>
            </div>
            <div className="text-center space-y-3 flex flex-col h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Expertise</h3>
              <p className="text-sm text-muted-foreground flex-grow">Access to industry knowledge and best practices</p>
            </div>
            <div className="text-center space-y-3 flex flex-col h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">Customization</h3>
              <p className="text-sm text-muted-foreground flex-grow">Tailoring solutions to specific project needs and challenges</p>
            </div>
          </StaggerContainer>
          <Button variant="outline" asChild>
            <Link to="/about">Learn More About SRLS</Link>
          </Button>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <MotionWrapper>
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          </MotionWrapper>
          <MotionWrapper delay={0.15}>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Contact our expert team today for professional rigging and lifting consultation.
            </p>
          </MotionWrapper>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="light-cta" size="lg" asChild>
              <a href="tel:+18683012781">
                <Phone className="h-5 w-5 mr-2" />
                (868) 301-2781
              </a>
            </Button>
            <Button variant="dark-cta" size="lg" asChild>
              <a href="mailto:srls.mw21@gmail.com">
                <Mail className="h-5 w-5 mr-2" />
                srls.mw21@gmail.com
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
