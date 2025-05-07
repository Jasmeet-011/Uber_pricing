
interface PricingResponse {
  human_hours: number;
  human_cost: number;
  ai_cost: number;
  complexity: string;
  complexity_surcharge: number;
  total_cost: number;
}

export async function analyzePricing(description: string): Promise<PricingResponse> {
  try {
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pricing data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing pricing:', error);
    throw error;
  }
}

// Mock API for development and testing
export function mockAnalyzePricing(description: string): Promise<PricingResponse> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Base values
      let humanHours = 10;
      let hourlyRate = 150;
      let aiCost = 50;
      
      // Adjust based on description length and complexity
      if (description.length > 100) {
        humanHours += Math.floor(description.length / 50);
      }
      
      // Check for complexity indicators
      let complexity = "low";
      let complexitySurcharge = 0;
      
      if (description.includes("authentication") || description.includes("user") || description.includes("login")) {
        complexity = "medium";
        complexitySurcharge = 0.1;
        humanHours += 5;
      }
      
      if (description.includes("mobile app") || description.includes("real-time") || description.includes("chat") || description.includes("notifications")) {
        complexity = "high";
        complexitySurcharge = 0.2;
        humanHours += 10;
      }
      
      const humanCost = humanHours * hourlyRate;
      const surchargeAmount = humanCost * complexitySurcharge;
      const totalCost = humanCost + aiCost + surchargeAmount;
      
      resolve({
        human_hours: humanHours,
        human_cost: humanCost,
        ai_cost: aiCost,
        complexity,
        complexity_surcharge: complexitySurcharge * 100, // Convert to percentage
        total_cost: totalCost
      });
    }, 800); // Simulate a slight delay for realism
  });
}
