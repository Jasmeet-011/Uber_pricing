
import { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockAnalyzePricing } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import { Terminal } from "lucide-react";

interface PricingInputProps {
  onPricingUpdate: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
}

export function PricingInput({ onPricingUpdate, setIsLoading }: PricingInputProps) {
  const [description, setDescription] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Sample descriptions for testing
  const sampleDescriptions = [
    "A web application with user authentication and a product catalog.",
    "A mobile app with in-app purchases, real-time notifications, and a chat system."
  ];

  useEffect(() => {
    // Don't fetch on empty description
    if (!description.trim()) {
      onPricingUpdate(null);
      return;
    }

    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    const timeout = setTimeout(() => {
      fetchPricing(description);
    }, 500);

    setTypingTimeout(timeout);

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [description]);

  const fetchPricing = async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      // Use mockAnalyzePricing instead of actual API call for demo
      const result = await mockAnalyzePricing(text);
      onPricingUpdate(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch pricing. Please try again later.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setDescription('');
    onPricingUpdate(null);
  };

  const handleSampleClick = (sample: string) => {
    setDescription(sample);
  };

  return (
    <Card className="w-full animate-fade-in shadow-xl border-none bg-white dark:bg-uber-slate/20 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-uber-blue p-2 rounded-md">
            <Terminal className="h-4 w-4 text-white" />
          </div>
          <CardTitle>Project Description</CardTitle>
        </div>
        <CardDescription>
          Describe your project in detail to get an accurate price estimate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea 
            placeholder="Enter your project description here..." 
            className="min-h-[180px] resize-none bg-muted/20 border border-border/50 focus:border-uber-blue transition-colors"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {description.length} characters
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => fetchPricing(description)} 
            className="bg-uber-blue hover:bg-uber-blue/90 text-white"
          >
            Get Estimate
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear Description
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm font-medium mb-2">Sample descriptions:</p>
          <div className="flex flex-wrap gap-2">
            {sampleDescriptions.map((sample, index) => (
              <Button 
                key={index} 
                variant="secondary" 
                size="sm" 
                onClick={() => handleSampleClick(sample)}
                className="text-xs"
              >
                Sample {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
