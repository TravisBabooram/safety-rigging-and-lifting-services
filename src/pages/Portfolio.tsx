import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Filter, 
  Eye, 
  FileText, 
  GraduationCap,
  Image,
  Video,
  Camera,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn
} from "lucide-react";
import { Link } from "react-router-dom";

const portfolioItems = [
  {
    id: 1,
    title: "Offshore Platform Heavy Lift",
    category: "Lift Plans",
    type: "image",
    description: "Complex 150-ton crane installation on offshore drilling platform with detailed engineering analysis and safety protocols.",
    tags: ["Offshore", "Heavy Lift", "150 Tons"],
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Refinery Equipment Inspection Report",
    category: "Inspections",
    type: "document",
    description: "Comprehensive visual inspection and assessment of critical lifting equipment at major refinery facility.",
    tags: ["Refinery", "Equipment", "Compliance"],
    thumbnail: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Rigging Awareness Training Session",
    category: "Training Sessions",
    type: "video",
    description: "Custom rigging safety training program delivered to 50+ personnel covering advanced techniques and safety protocols.",
    tags: ["Training", "Safety", "50+ Personnel"],
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Marine Terminal Cargo Operations",
    category: "Site Supervision",
    type: "image",
    description: "On-site supervision during specialized cargo handling operations with custom rigging solutions at marine terminal.",
    tags: ["Marine", "Custom Rigging", "Port Operations"],
    thumbnail: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Construction Site Risk Assessment",
    category: "Equipment Evaluation",
    type: "document",
    description: "Detailed equipment evaluation and risk assessment for multi-tower construction project lifting requirements.",
    tags: ["Construction", "Risk Assessment", "Multi-tower"],
    thumbnail: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Petrochemical Plant Maintenance Lift",
    category: "Lift Plans",
    type: "image",
    description: "Emergency lift plan for reactor vessel maintenance with tight timeline and space constraints in live plant environment.",
    tags: ["Petrochemical", "Emergency", "Reactor Vessel"],
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42d?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42d?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Crane Operator Training Certification",
    category: "Training Sessions",
    type: "image",
    description: "OPITO-certified crane operator training program with practical and theoretical assessment components.",
    tags: ["OPITO", "Certification", "Crane Operator"],
    thumbnail: "https://images.unsplash.com/photo-1439337153520-868627443f44?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1439337153520-868627443f44?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Pipeline Installation Supervision",
    category: "Site Supervision",
    type: "video",
    description: "Multi-crane coordination and site supervision for large-scale pipeline installation with precise positioning requirements.",
    tags: ["Pipeline", "Multi-crane", "Coordination"],
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Offshore Platform Equipment Audit",
    category: "Inspections",
    type: "document",
    description: "Comprehensive equipment audit and compliance review for offshore drilling platform lifting accessories.",
    tags: ["Offshore", "Audit", "Compliance"],
    thumbnail: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Industrial Facility Turnaround",
    category: "Site Supervision",
    type: "image",
    description: "Complete turnaround supervision including rigging oversight and safety compliance during plant shutdown operations.",
    tags: ["Turnaround", "Industrial", "Safety"],
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 11,
    title: "Mobile Crane Evaluation",
    category: "Equipment Evaluation",
    type: "image",
    description: "Fit-for-purpose evaluation of mobile crane fleet including load testing and certification verification.",
    tags: ["Mobile Crane", "Load Testing", "Certification"],
    thumbnail: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 12,
    title: "Lifting Gear Training Program",
    category: "Training Sessions",
    type: "video",
    description: "Comprehensive lifting gear awareness training covering inspection techniques and safe usage practices.",
    tags: ["Lifting Gear", "Inspection", "Safety"],
    thumbnail: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?q=80&w=800&auto=format&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?q=80&w=1920&auto=format&fit=crop"
  }
];

const categories = ["All", "Lift Plans", "Inspections", "Training Sessions", "Site Supervision", "Equipment Evaluation"];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Lift Plans": return FileText;
      case "Inspections": return CheckCircle;
      case "Training Sessions": return GraduationCap;
      case "Site Supervision": return Eye;
      case "Equipment Evaluation": return Camera;
      default: return FileText;
    }
  };

  const openLightbox = (item: any) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedItem(null);
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!selectedItem) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedItem(filteredItems[newIndex]);
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Project Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore some of our recent rigging, lifting, inspection, and training work across Trinidad and Tobago.
        </p>
      </section>

      {/* Filter Section */}
      <section className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Filter className="h-5 w-5" />
          <span className="text-sm font-medium">Filter by category:</span>
        </div>
        {categories.map((category) => {
          const CategoryIcon = getCategoryIcon(category);
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "cta" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              <CategoryIcon className="h-4 w-4" />
              {category}
            </Button>
          );
        })}
      </section>

      {/* Portfolio Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          return (
            <Card key={item.id} className="group overflow-hidden hover:shadow-industrial transition-all duration-300 cursor-pointer">
              <div className="relative" onClick={() => openLightbox(item)}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Watermark */}
                  <div className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-xs font-bold text-white">SRLS</span>
                  </div>
                  {/* Type indicator */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                      <TypeIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs bg-black/50 text-white border-white/20">
                      {item.category}
                    </Badge>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Eye className="h-8 w-8 text-white mx-auto" />
                      <span className="text-white text-sm font-medium">View Details</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground text-sm leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-5xl w-full h-[90vh] p-0 overflow-hidden">
          {selectedItem && (
            <div className="relative w-full h-full flex flex-col">
              {/* Header */}
              <DialogHeader className="p-6 pb-4 border-b">
                <DialogTitle className="text-xl font-bold pr-8">
                  {selectedItem.title}
                </DialogTitle>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={closeLightbox}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogHeader>

              {/* Image Container */}
              <div className="flex-1 relative bg-black/5">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative max-w-full max-h-full">
                    <img 
                      src={selectedItem.fullImage || selectedItem.thumbnail}
                      alt={selectedItem.title}
                      className="max-w-full max-h-full object-contain rounded"
                    />
                    {/* Watermark on full image */}
                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded px-3 py-2">
                      <span className="text-sm font-bold text-white">SRLS</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 border-white/20 text-white hover:bg-black/40"
                  onClick={() => navigateGallery('prev')}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 border-white/20 text-white hover:bg-black/40"
                  onClick={() => navigateGallery('next')}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Footer Info */}
              <div className="p-6 pt-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-sm">
                    {selectedItem.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{filteredItems.findIndex(item => item.id === selectedItem.id) + 1}</span>
                    <span>/</span>
                    <span>{filteredItems.length}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {selectedItem.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

      {/* Copyright Notice */}
      <section className="text-center py-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          All media shown here is the property of SRLS. Unauthorized use is prohibited.
        </p>
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