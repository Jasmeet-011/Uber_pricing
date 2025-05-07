
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { DollarSign, Clock, TrendingUp, AlertTriangle } from "lucide-react";

interface PricingOutputProps {
  pricingData: any;
  isLoading: boolean;
}

export function PricingOutput({ pricingData, isLoading }: PricingOutputProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-full flex flex-col justify-center items-center p-12 animate-fade-in shadow-xl border-none bg-white dark:bg-uber-slate/20">
        <div className="w-20 h-20 border-4 border-uber-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-lg font-medium">Analyzing your project...</p>
        <p className="text-muted-foreground">Our AI is breaking down your requirements</p>
      </Card>
    );
  }

  if (!pricingData) {
    return (
      <Card className="w-full h-full flex flex-col justify-center items-center p-12 animate-fade-in shadow-xl border-none bg-white dark:bg-uber-slate/20">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-muted/30 mb-6">
          <DollarSign className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle className="mb-3"> Your Project Analyses</CardTitle>
        <CardDescription className="text-center max-w-md">
          We'll analyze your project and provide a detailed cost breakdown based on our advanced AI algorithms.
        </CardDescription>
      </Card>
    );
  }

  const { human_hours, human_cost, ai_cost, complexity, complexity_surcharge, total_cost } = pricingData;
  
  const chartData = [
    { name: 'Human Cost', value: human_cost, color: '#276EF1' },
    { name: 'AI Cost', value: ai_cost, color: '#7356BF' },
    { name: 'Surcharge', value: (complexity_surcharge / 100) * human_cost, color: '#05944F' }
  ];

  const pieData = [
    { name: 'Human Cost', value: human_cost, color: '#276EF1' },
    { name: 'AI Cost', value: ai_cost, color: '#7356BF' },
    { name: 'Surcharge', value: (complexity_surcharge / 100) * human_cost, color: '#05944F' }
  ];

  const getComplexityColor = () => {
    switch (complexity) {
      case 'low':
        return 'bg-uber-green';
      case 'medium':
        return 'bg-uber-yellow';
      case 'high':
        return 'bg-uber-red';
      default:
        return 'bg-uber-blue';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full shadow-xl border-none bg-white dark:bg-uber-slate/20 hover:shadow-2xl transition-all duration-300 animate-slide-up">
      <CardHeader>
        <div className="flex justify-between items-center mb-1">
          <CardTitle>Pricing Estimate</CardTitle>
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uber-blue to-uber-purple">
            {formatCurrency(total_cost)}
          </div>
        </div>
        <CardDescription>AI-powered analysis based on your project description</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Project Complexity</span>
            </div>
            <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
              complexity === 'low' 
                ? 'bg-uber-green/10 text-uber-green' 
                : complexity === 'medium'
                  ? 'bg-uber-yellow/10 text-uber-yellow'
                  : 'bg-uber-red/10 text-uber-red'
            }`}>
              {complexity.toUpperCase()}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className={`h-full rounded-full ${getComplexityColor()}`} 
              style={{ 
                width: complexity === 'low' ? '33%' : complexity === 'medium' ? '66%' : '100%' 
              }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-muted/20 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-uber-blue" />
              <span className="text-sm font-medium">Human Hours</span>
            </div>
            <p className="text-3xl font-bold">{human_hours} hrs</p>
          </div>
          <div className="bg-muted/20 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-uber-green" />
              <span className="text-sm font-medium">Human Cost</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(human_cost)}</p>
          </div>
          <div className="bg-muted/20 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-uber-purple" />
              <span className="text-sm font-medium">AI Cost</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(ai_cost)}</p>
          </div>
          <div className="bg-muted/20 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-uber-yellow" />
              <span className="text-sm font-medium">Complexity Surcharge</span>
            </div>
            <p className="text-3xl font-bold">{complexity_surcharge}%</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-4">Cost Breakdown</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={formatCurrency} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={(entry) => `$${Math.round(entry.value)}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t border-border/30 pt-4">
        <p className="text-sm text-muted-foreground">
          Estimate is based on current rates and project complexity. Final pricing may vary based on detailed requirements.
        </p>
      </CardFooter>
    </Card>
  );
}
