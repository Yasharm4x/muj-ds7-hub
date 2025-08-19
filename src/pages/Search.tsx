import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { seedResources, subjects } from "@/data/seedData";
import { Search as SearchIcon, Filter, Download, Eye, BookOpen, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    let results = seedResources.filter(resource => {
      const matchesQuery = 
        resource.title.toLowerCase().includes(query) ||
        resource.subject.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query)) ||
        resource.author.toLowerCase().includes(query);
        
      const matchesSubject = subjectFilter === "all" || resource.subjectCode === subjectFilter;
      const matchesType = typeFilter === "all" || resource.type === typeFilter;
      
      return matchesQuery && matchesSubject && matchesType;
    });

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case "oldest":
          return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default: // relevance
          // Simple relevance scoring based on title match
          const aScore = a.title.toLowerCase().includes(query) ? 2 : 1;
          const bScore = b.title.toLowerCase().includes(query) ? 2 : 1;
          return bScore - aScore;
      }
    });

    return results;
  }, [searchQuery, subjectFilter, typeFilter, sortBy]);

  const uniqueTypes = [...new Set(seedResources.map(r => r.type))];

  const handleDownload = (resource: any) => {
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title}...`,
    });
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <SearchIcon className="w-4 h-4 mr-2 text-primary" />
            Global Search
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Resources
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search across all subjects, tags, and content types to find exactly what you need.
          </p>
        </div>

        {/* Search Form */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="lg:col-span-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by title, tags, subject, or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </div>
            
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject.code} value={subject.code}>
                    {subject.code} - {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {searchQuery && (
              <div className="text-sm text-muted-foreground">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery ? (
          <div className="space-y-4">
            {searchResults.map((resource) => (
              <div key={resource.id} className="resource-item">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Link 
                        to={`/subjects/${resource.subjectCode}`}
                        className="hover:underline"
                      >
                        <Badge variant="outline" className="text-xs hover:bg-primary/10">
                          {resource.subjectCode}
                        </Badge>
                      </Link>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.unit}
                      </Badge>
                      {resource.featured && (
                        <Badge variant="default" className="text-xs bg-yellow-500/10 text-yellow-700">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">
                      {highlightMatch(resource.title, searchQuery)}
                    </h3>
                    
                    <p className="text-muted-foreground mb-3">
                      {highlightMatch(resource.subject, searchQuery)}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {highlightMatch(resource.author, searchQuery)}
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
                    
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {highlightMatch(tag, searchQuery)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
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
        ) : (
          /* Search Suggestions */
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <SearchIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Start searching for resources</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Enter keywords, subject codes, or tags to find the study materials you need.
            </p>
            
            <div className="max-w-lg mx-auto">
              <h4 className="text-sm font-medium mb-4 text-muted-foreground">Popular searches:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {["blockchain", "opencv", "design patterns", "tf-idf", "centrality", "forecasting"].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(term)}
                    className="text-xs"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/20 rounded-full mb-4">
              <SearchIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try different keywords or check your spelling.
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSubjectFilter("all");
                  setTypeFilter("all");
                }}
              >
                Clear Search
              </Button>
              <Button asChild>
                <Link to="/upload">
                  Upload Resource
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;