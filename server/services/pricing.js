// server/services/pricing.js
function calculatePricing(featuresCount, complexity, timelineWeeks) {
  const baseRate = 50; // per hour
  const hoursPerFeature = 10;
  const aiCost = 5;

  // Calculate base human effort
  const humanHours = featuresCount * hoursPerFeature;
  const humanCost = humanHours * baseRate;

  // Determine surcharge based on complexity and urgency
  let surchargeRate = 0;
  if (complexity?.toLowerCase() === "medium") surchargeRate += 0.15;
  if (complexity?.toLowerCase() === "high") surchargeRate += 0.3;
  if (timelineWeeks && timelineWeeks < 3) surchargeRate += 0.2;

  const totalBeforeSurcharge = humanCost + aiCost;
  const totalCost = totalBeforeSurcharge * (1 + surchargeRate);

  return {
    humanHours,
    humanCost: `$${humanCost.toFixed(2)}`,
    aiCost: `$${aiCost.toFixed(2)}`,
    surcharge: `${Math.round(surchargeRate * 100)}%`,
    totalCost: `$${totalCost.toFixed(2)}`,
  };
}

module.exports = calculatePricing;
