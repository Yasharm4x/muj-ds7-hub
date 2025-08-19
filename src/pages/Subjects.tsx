import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { subjects } from "@/data/seedData";
import { Search, BookOpen, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

const Subjects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2 text-primary" />
            7th Semester Subjects
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Subject
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access study materials, notes, and resources for all your Data Science subjects.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-0 bg-white/50 backdrop-blur-xl"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">6</h3>
            <p className="text-muted-foreground">Core Subjects</p>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-4">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-2">70+</h3>
            <p className="text-muted-foreground">Total Resources</p>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mb-4">
              <Users className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-2xl font-bold mb-2">150+</h3>
            <p className="text-muted-foreground">Active Students</p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject, index) => (
            <Link
              key={subject.code}
              to={`/subjects/${subject.code}`}
              className="subject-card group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-lg font-mono font-bold">
                  {subject.code}
                </div>
                <Badge variant="outline" className="text-sm">
                  {subject.resourceCount} resources
                </Badge>
              </div>
              
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {subject.name}
              </h2>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {subject.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>View Resources</span>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>Popular</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/20 rounded-full mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No subjects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse all available subjects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;