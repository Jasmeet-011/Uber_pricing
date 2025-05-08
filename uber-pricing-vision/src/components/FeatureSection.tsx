
import { Check, Code, ChartBar, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "./RevealOnScroll";

export function FeatureSection() {
  const features = [
    {
      icon: <Code className="h-10 w-10 text-uber-blue" />,
      title: "Advanced Project Analysis",
      description: "Our AI engine breaks down complex project requirements into measurable components."
    },
    {
      icon: <ChartBar className="h-10 w-10 text-uber-purple" />,
      title: "Real-time Cost Estimation",
      description: "Get instant pricing feedback as you refine your project description."
    },
    {
      icon: <Shield className="h-10 w-10 text-uber-green" />,
      title: "Accurate Predictions",
      description: "Machine learning algorithms trained on thousands of successful projects."
    },
    {
      icon: <Zap className="h-10 w-10 text-uber-yellow" />,
      title: "Lightning Fast Results",
      description: "Calculations completed in milliseconds, saving you hours of manual estimation."
    }
  ];

  return (
    <>
      {/* Feature Overview Section */}
      <RevealOnScroll threshold={0.15}>
        <section className="py-24 md:py-32 bg-white dark:bg-uber-charcoal">
          <div className="container max-w-[1800px] px-4 md:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">How It Works</h2>
              <p className="text-xl text-muted-foreground">
                Our AI pricing engine analyzes your project requirements and delivers accurate estimates in real-time.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <RevealOnScroll key={index} threshold={0.1} delay={index * 100}>
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-uber-slate/20 h-full">
                    <CardContent className="pt-6">
                      <div className="mb-5">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>
      
      {/* Case Study Section with Image */}
      <RevealOnScroll threshold={0.2}>
        <section className="py-24 md:py-32 bg-muted/30 dark:bg-black/20">
          <div className="container max-w-[1800px] px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Trusted by Industry Leaders</h2>
                <p className="text-xl mb-6 text-muted-foreground">
                  Our AI pricing engine has helped companies of all sizes streamline their project estimation process and improve budgeting accuracy.
                </p>
                <ul className="space-y-4">
                  {[
                    "Reduce estimation time by 75%",
                    "Improve budget accuracy by 40%",
                    "Identify cost-saving opportunities",
                    "Plan resources more effectively"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-uber-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <RevealOnScroll className="order-1 lg:order-2 relative" threshold={0.3} delay={200}>
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-uber-blue to-uber-purple rounded-xl blur-xl opacity-20 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop"
                  alt="Professional using the pricing engine" 
                  className="relative rounded-lg shadow-xl w-full h-full object-cover"
                />
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </RevealOnScroll>
      
      {/* Full-width CTA Section */}
      <RevealOnScroll threshold={0.15}>
        <section className="py-24 md:py-32 bg-uber-blue">
          <div className="container max-w-[1800px] px-4 md:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Ready to Transform Your Project Planning?</h2>
              <p className="text-xl md:text-2xl mb-8 text-white/80">
                Start using our AI pricing engine today and experience the future of project estimation.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href="#pricing">
                <Button size="lg" className="bg-white text-uber-blue hover:bg-white/90">
                  Get Started Now
                </Button>
                </a>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </>
  );
}
