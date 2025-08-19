import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { subjects, seedResources, announcements } from "@/data/seedData";
import { ArrowRight, TrendingUp, Clock, Star } from "lucide-react";

const Home = () => {
  const featuredResources = seedResources.filter(r => r.featured).slice(0, 3);
  const recentResources = seedResources
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 4);
  const featuredAnnouncement = announcements.find(a => a.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            DS Batch-1 • Manipal University Jaipur
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            7th Sem Study Hub
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fast, clean, and collaborative sharing for all your semester subjects. 
            Access notes, slides, and resources in one beautiful place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-primary">
              <Link to="/subjects">
                Browse Subjects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-secondary">
              <Link to="/upload">
                Upload Resource
              </Link>
            </Button>
          </div>
        </div>

        {/* Featured Announcement */}
        {featuredAnnouncement && (
          <div className="mb-12 animate-slide-up">
            <div className="glass rounded-2xl p-6 border-l-4 border-l-primary">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{featuredAnnouncement.title}</h3>
                  <p className="text-muted-foreground">{featuredAnnouncement.message}</p>
                </div>
                <Badge variant="secondary" className="ml-4">
                  {featuredAnnouncement.type}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Quick Subject Links */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Quick Access</h2>
            <Button asChild variant="ghost" className="text-primary">
              <Link to="/subjects">
                View All
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.slice(0, 6).map((subject) => (
              <Link
                key={subject.code}
                to={`/subjects/${subject.code}`}
                className="subject-card group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-mono">
                    {subject.code}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {subject.resourceCount} resources
                  </Badge>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {subject.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Resources */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Featured Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    Featured
                  </div>
                </div>
                
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {resource.subject} • {resource.unit}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    by {resource.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {resource.views} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Uploads */}
        <section>
          <div className="flex items-center mb-6">
            <Clock className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Recent Uploads</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentResources.map((resource) => (
              <div key={resource.id} className="resource-item">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {resource.subjectCode}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    
                    <h3 className="font-medium mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {resource.unit} • by {resource.author}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right text-xs text-muted-foreground ml-4">
                    <div>{new Date(resource.uploadedAt).toLocaleDateString()}</div>
                    <div>{resource.views} views</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;