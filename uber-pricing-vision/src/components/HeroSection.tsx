
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop"
          alt="Technology Background" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Hero Content */}
      <div className="container relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-6">
            Predictive <span className="text-uber-blue">Pricing</span> <span className="text-white">Engine</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
            Transform project planning with our AI-powered estimation tool that delivers accurate pricing in seconds.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-uber-blue hover:bg-uber-blue/90 text-white">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <a 
        href="#pricing" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 hover:text-white transition-colors"
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <ArrowDown className="animate-bounce" />
      </a>
    </section>
  );
}
