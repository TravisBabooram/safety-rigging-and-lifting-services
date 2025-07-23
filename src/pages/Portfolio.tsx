import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  Eye, 
  ExternalLink, 
  FileText, 
  ClipboardCheck, 
  GraduationCap,
  Image,
  Video,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

const portfolioItems = [
  {
    id: 1,
    title: "Offshore Platform Crane Installation",
    category: "Lift Plans",
    type: "image",
    description: "Complex 150-ton crane installation on offshore drilling platform with detailed engineering analysis and risk assessment.",
    tags: ["Offshore", "Heavy Lift", "150 Tons"],
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "Refinery Equipment Inspection",
    category: "Inspections",
    type: "document",
    description: "Comprehensive inspection report for critical lifting equipment at major refinery facility.",
    tags: ["Refinery", "Equipment", "Compliance"],
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "Rigging Safety Training Program",
    category: "Training",
    type: "video",
    description: "Custom training program delivered to 50+ personnel covering advanced rigging techniques and safety protocols.",
    tags: ["Training", "Safety", "50+ Personnel"],
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 4,
    title: "Marine Terminal Cargo Handling",
    category: "Lift Plans",
    type: "image",
    description: "Specialized lift plan for unusual cargo shapes at marine terminal with custom rigging solutions.",
    tags: ["Marine", "Custom Rigging", "Port Operations"],
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 5,
    title: "Construction Site Risk Assessment",
    category: "Inspections",
    type: "document",
    description: "Detailed risk assessment and mitigation plan for multi-tower construction project.",
    tags: ["Construction", "Risk Assessment", "Multi-tower"],
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 6,
    title: "Petrochemical Plant Maintenance",
    category: "Lift Plans",
    type: "image",
    description: "Emergency lift plan for reactor vessel maintenance with tight timeline and space constraints.",
    tags: ["Petrochemical", "Emergency", "Reactor Vessel"],
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 7,
    title: "Crane Operator Certification",
    category: "Training",
    type: "document",
    description: "NCCCO crane operator certification program with practical and theoretical components.",
    tags: ["NCCCO", "Certification", "Crane Operator"],
    thumbnail: "/api/placeholder/400/300"
  },
  {
    id: 8,
    title: "Pipeline Installation Project",
    category: "Lift Plans",
    type: "video",
    description: "Large-scale pipeline installation with multiple crane coordination and precise positioning requirements.",
    tags: ["Pipeline", "Multi-crane", "Coordination"],
    thumbnail: "/api/placeholder/400/300"
  }
];

const categories = ["All", "Lift Plans", "Inspections", "Training"];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return Image;
      case "video": return Video;
      case "document": return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Our Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our extensive portfolio of successful rigging and lifting projects across 
          various industries and operational environments.
        </p>
      </section>

      {/* Filter Section */}
      <section className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Filter className="h-5 w-5" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "cta" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </section>

      {/* Portfolio Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          return (
            <Card key={item.id} className="group overflow-hidden hover:shadow-industrial transition-all duration-300">
              <div className="relative">
                <div className="aspect-video bg-gradient-card flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <TypeIcon className="h-12 w-12 text-primary mx-auto" />
                    <div className="text-xs text-muted-foreground font-medium">
                      {item.type.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center opacity-80">
                    <span className="text-xs font-bold text-primary-foreground">SRLS</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground text-sm leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-primary rounded-lg p-12 text-primary-foreground">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Portfolio Highlights</h2>
          <p className="text-lg opacity-90">
            Numbers that showcase our expertise and commitment to excellence
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">200+</div>
            <div className="opacity-90">Lift Plans Created</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="opacity-90">Equipment Inspections</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="opacity-90">Personnel Trained</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="opacity-90">Major Projects</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 bg-gradient-card rounded-lg p-12">
        <h2 className="text-3xl font-bold text-foreground">Start Your Next Project</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ready to add your project to our portfolio? Contact us to discuss how we can 
          help you achieve your rigging and lifting objectives safely and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cta" size="lg">
            <Link to="/contact">Discuss Your Project</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link to="/services">Explore Our Services</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}