import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { PricingInput } from '@/components/PricingInput';
import { PricingOutput } from '@/components/PricingOutput';
import { Footer } from '@/components/Footer';
import { FeatureSection } from '@/components/FeatureSection';
import { HeroSection } from '@/components/HeroSection';
import { SmoothScroll } from '@/components/SmoothScroll';

const Index = () => {
  const [pricingData, setPricingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ThemeProvider defaultTheme="system">
      <SmoothScroll>
        <div className="min-h-screen flex flex-col scroll-smooth">
          <Header />
          <main className="flex-1">
            <HeroSection />
            
            {/* Pricing Section */}
            <section id="pricing" className="bg-muted/20 py-24 md:py-32 lg:py-40">
              <div className="container">
                <div className="max-w-4xl mx-auto mb-16 md:mb-24">
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-uber-black to-uber-slate dark:from-white dark:to-muted">
                      AI-Powered Pricing
                    </span>
                  </h2>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                    Get instant cost estimates for your project based on our advanced AI analysis. 
                    Simply describe your project and see the breakdown in real-time.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                  <div className="animate-fade-in">
                    <PricingInput 
                      onPricingUpdate={setPricingData} 
                      setIsLoading={setIsLoading}
                    />
                  </div>
                  <div className="animate-slide-in-right">
                    <PricingOutput 
                      pricingData={pricingData} 
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features">
              <FeatureSection />
            </section>

            {/* Examples Section */}
            <section id="examples" className="py-32 bg-muted/10">
              <div className="container max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Example Projects</h2>
                <ul className="space-y-4 text-muted-foreground text-lg">
                  <li>✅ A static website with blog and contact form — 2 weeks</li>
                  <li>✅ A shopping app with login, cart, and payments — 4 weeks</li>
                  <li>✅ A mobile app with GPS and chat — 6 weeks</li>
                </ul>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 bg-muted/20">
              <div className="container max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">About</h2>
                <p className="text-muted-foreground text-lg">
                  This app uses cutting-edge AI to evaluate your project description,
                  break it into features, and generate accurate cost estimates. It blends 
                  expert human effort and AI intelligence to support smarter budgeting and planning.
                </p>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
};

export default Index;
