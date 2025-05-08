// services/apiService.ts

export interface PricingResponse {
  human_hours: number;
  human_cost: number;
  ai_cost: number;
  complexity: string;
  complexity_surcharge: number;
  total_cost: number;
}

/**
 * Call the backend pricing analysis API.
 * Set useMock to true for local testing with mock logic.
 */
export async function analyzePricing(
  description: string,
  useMock: boolean = false
): Promise<PricingResponse> {
  if (useMock) {
    return mockAnalyzePricing(description);
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing pricing:', error);
    throw error;
  }
}

/**
 * Mock pricing analysis logic for development/testing.
 */
export function mockAnalyzePricing(description: string): Promise<PricingResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let humanHours = 10;
      const hourlyRate = 150;
      const aiCost = 50;

      if (description.length > 100) {
        humanHours += Math.floor(description.length / 50);
      }

      let complexity = "low";
      let complexitySurcharge = 0;

      const lowerDesc = description.toLowerCase();

      if (
        lowerDesc.includes("authentication") ||
        lowerDesc.includes("user") ||
        lowerDesc.includes("login")
      ) {
        complexity = "medium";
        complexitySurcharge = 0.1;
        humanHours += 5;
      }

      if (
        lowerDesc.includes("mobile app") ||
        lowerDesc.includes("real-time") ||
        lowerDesc.includes("chat") ||
        lowerDesc.includes("notifications")
      ) {
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
        complexity_surcharge: complexitySurcharge * 100,
        total_cost: totalCost,
      });
    }, 800);
  });
}
