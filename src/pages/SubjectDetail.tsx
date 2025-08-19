import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { subjects, seedResources, Resource } from "@/data/seedData";
import { Search, Filter, Download, Eye, ArrowLeft, BookOpen, Calendar, User, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubjectDetail = () => {
  const { subjectCode } = useParams();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [unitFilter, setUnitFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const subject = subjects.find(s => s.code === subjectCode);
  const resources = seedResources.filter(r => r.subjectCode === subjectCode);

  const filteredAndSortedResources = useMemo(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = typeFilter === "all" || resource.type === typeFilter;
      const matchesUnit = unitFilter === "all" || resource.unit === unitFilter;
      
      return matchesSearch && matchesType && matchesUnit;
    });

    // Sort resources
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case "oldest":
          return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [resources, searchQuery, typeFilter, unitFilter, sortBy]);

  const uniqueTypes = [...new Set(resources.map(r => r.type))];
  const uniqueUnits = [...new Set(resources.map(r => r.unit))];

  const handleDownload = (resource: Resource) => {
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title}...`,
    });
  };

  const handlePreview = (resource: Resource) => {
    setSelectedResource(resource);
  };

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subject Not Found</h1>
          <Button asChild>
            <Link to="/subjects">Back to Subjects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/subjects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subjects
            </Link>
          </Button>

          <div className="glass rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xl font-mono font-bold">
                {subject.code}
              </div>
              <Badge variant="outline" className="text-sm">
                {resources.length} resources
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{subject.name}</h1>
            <p className="text-lg text-muted-foreground">{subject.description}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={unitFilter} onValueChange={setUnitFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Units</SelectItem>
                {uniqueUnits.map(unit => (
                  <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resources List */}
        <div className="space-y-4">
          {filteredAndSortedResources.map((resource) => (
            <div key={resource.id} className="resource-item">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {resource.unit}
                    </Badge>
                    {resource.featured && (
                      <Badge variant="default" className="text-xs bg-yellow-500/10 text-yellow-700">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {resource.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(resource.uploadedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {resource.views} views
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePreview(resource)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{resource.title}</DialogTitle>
                      </DialogHeader>
                      <div className="flex items-center justify-center h-96 bg-muted/20 rounded-lg">
                        <div className="text-center">
                          <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground">Preview not available</p>
                          <p className="text-sm text-muted-foreground">Click download to access the resource</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedResources.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/20 rounded-full mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms.
            </p>
            <Button asChild>
              <Link to="/upload">
                Upload First Resource
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetail;