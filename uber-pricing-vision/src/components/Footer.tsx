
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border/20 bg-white dark:bg-uber-charcoal", className)}>
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
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
              <h3 className="text-xl font-bold">AI Pricing Engine</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Transform your project planning with our AI-powered pricing engine. Get accurate estimates in seconds.
            </p>
            <div className="flex gap-4">
              {['twitter', 'linkedin', 'facebook', 'github'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Use Cases', 'Pricing', 'Customers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {['Documentation', 'Guides', 'API Reference', 'Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Subscribe</h4>
            <p className="text-muted-foreground mb-4">Get the latest news and updates</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 rounded-md border border-border bg-background"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; 2025 AI Pricing Engine. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
