import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home", emoji: "🏠" },
    { href: "/subjects", label: "Subjects", emoji: "📚" },
    { href: "/search", label: "Search", emoji: "🔍" },
    { href: "/profile", label: "Profile", emoji: "👤" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span className="font-semibold text-lg">7th Sem Hub</span>
            </Link>
            
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.label}
                </Link>
              ))}
            </div>
            
            <Button asChild variant="outline" size="sm" className="glass">
              <Link to="/upload">
                Upload
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 nav-blur">
          <div className="flex items-center justify-between h-14 px-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl">📚</span>
              <span className="font-semibold">Hub</span>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="fixed top-14 left-0 right-0 glass p-4 m-4 rounded-2xl animate-slide-up">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <span className="mr-3 text-lg">{item.emoji}</span>
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/upload"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <span className="mr-3 text-lg">📤</span>
                  Upload Resource
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 nav-blur border-t border-white/20">
          <div className="flex items-center justify-around h-16 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full rounded-lg transition-all duration-200",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-xl mb-1">{item.emoji}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;