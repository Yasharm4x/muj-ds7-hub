import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, BookmarkIcon, Upload, Settings, Edit, Heart, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  uploadCount: number;
  bookmarkCount: number;
}

const Profile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [uploads, setUploads] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is logged in (mock)
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
      loadUserData(userData.id);
    }
  }, []);

  const loadUserData = (userId: string) => {
    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem("userBookmarks") || "[]");
    setBookmarks(savedBookmarks);

    // Load uploads from localStorage
    const savedUploads = JSON.parse(localStorage.getItem("userUploads") || "[]");
    setUploads(savedUploads);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login
    const mockUser: MockUser = {
      id: "user1",
      name: "Student User",
      email: loginForm.email,
      joinDate: "2024-08-01",
      uploadCount: uploads.length,
      bookmarkCount: bookmarks.length
    };

    localStorage.setItem("currentUser", JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoggedIn(true);
    loadUserData(mockUser.id);

    toast({
      title: "Welcome back!",
      description: "You have been logged in successfully.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsLoggedIn(false);
    setBookmarks([]);
    setUploads([]);

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-secondary">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to access your profile and bookmarks</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@muj.manipal.edu"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Demo login - use any email and password</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="glass rounded-2xl p-8 mb-8 animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                <p className="text-muted-foreground mb-1">{user?.email}</p>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(user?.joinDate || "").toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Name</Label>
                      <Input defaultValue={user?.name} />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input defaultValue={user?.email} />
                    </div>
                    <Button className="w-full">Save Changes</Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 bg-background/50 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">{uploads.length}</div>
              <div className="text-sm text-muted-foreground">Resources Uploaded</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{bookmarks.length}</div>
              <div className="text-sm text-muted-foreground">Bookmarked Items</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-1">1.2k</div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="uploads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 glass">
            <TabsTrigger value="uploads" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              My Uploads ({uploads.length})
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center gap-2">
              <BookmarkIcon className="w-4 h-4" />
              Bookmarked ({bookmarks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="uploads" className="space-y-4">
            {uploads.length > 0 ? (
              uploads.map((resource) => (
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
                        <Badge variant="outline" className="text-xs">
                          {resource.unit}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold mb-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {resource.subject} • Uploaded {new Date(resource.uploadedAt).toLocaleDateString()}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {resource.views || 0} views
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {Math.floor(Math.random() * 50)} downloads
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/20 rounded-full mb-4">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No uploads yet</h3>
                <p className="text-muted-foreground mb-4">
                  Share your study materials with the community.
                </p>
                <Button asChild>
                  <Link to="/upload">
                    Upload First Resource
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-4">
            {bookmarks.length > 0 ? (
              bookmarks.map((resource) => (
                <div key={resource.id} className="resource-item">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Link to={`/subjects/${resource.subjectCode}`}>
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
                      </div>
                      
                      <h3 className="font-semibold mb-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {resource.subject} • by {resource.author}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags?.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/20 rounded-full mb-4">
                  <BookmarkIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start bookmarking resources you want to save for later.
                </p>
                <Button asChild>
                  <Link to="/subjects">
                    Browse Resources
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;