import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-30 w-full transition-all duration-300 ${
      scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="container h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`${scrolled || mobileMenuOpen ? 'bg-uber-black dark:bg-white' : 'bg-white/90'} text-white dark:text-uber-black p-2 rounded-md`}>
            {/* Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47 1-1 1H7a1 1 0 0 1-1-1v-2.34"></path>
              <path d="M18 14.66V17c0 .55-.47 1-1 1h-2a1 1 0 0 1-1-1v-2.34"></path>
              <path d="M14 14.66V17c0 .55-.47 1-1 1"></path>
              <path d="M2 12h20"></path>
              <path d="M6 12v2.66"></path>
              <path d="M12 12v2.66"></path>
              <path d="M18 12v2.66"></path>
            </svg>
          </div>
          <h1 className={`text-xl font-bold tracking-tight ${
            scrolled || mobileMenuOpen ? 'text-foreground' : 'text-white'
          }`}>AI Pricing Engine</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <a href="#pricing" className={`text-sm font-medium hover:text-primary transition-colors ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}>Pricing</a>
            <a href="#features" className={`text-sm font-medium hover:text-primary transition-colors ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}>Features</a>
            <a href="#examples" className={`text-sm font-medium hover:text-primary transition-colors ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}>Examples</a>
            <a href="#about" className={`text-sm font-medium hover:text-primary transition-colors ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}>About</a>
          </nav>
          <ThemeToggle />
          <a href="#pricing">
          <Button className="bg-uber-blue hover:bg-uber-blue/90 text-white">Get Started</Button></a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full ${
              scrolled || mobileMenuOpen ? 'bg-muted' : 'bg-white/10'
            }`}
          >
            {mobileMenuOpen ? (
              <X className={scrolled ? "h-5 w-5" : "h-5 w-5 text-white"} />
            ) : (
              <Menu className={scrolled ? "h-5 w-5" : "h-5 w-5 text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-20 bg-background/95 backdrop-blur-sm p-6 flex flex-col md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-6 text-lg font-medium pt-6">
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
              Pricing
            </a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
              Features
            </a>
            <a href="#examples" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
              Examples
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
              About
            </a>
            <a href="#pricing">
            <Button className="w-full bg-uber-blue hover:bg-uber-blue/90 text-white mt-4">
              Get Started
            </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
