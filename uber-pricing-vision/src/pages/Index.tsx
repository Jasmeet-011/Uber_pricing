
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
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <HeroSection />
            
            <section id="pricing" className="bg-muted/20 py-24 md:py-32 lg:py-40">
              <div className="container">
                <div className="max-w-4xl mx-auto mb-16 md:mb-24">
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-uber-black to-uber-slate dark:from-white dark:to-muted">AI-Powered Pricing</span>
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

            <FeatureSection />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
};

export default Index;
