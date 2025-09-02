import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Check, 
  Calendar, 
  Clock, 
  Star,
  Zap
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
}

interface SubscriptionPlansProps {
  onBack: () => void;
  onPurchase: (planId: string) => void;
}

const SubscriptionPlans = ({ onBack, onPurchase }: SubscriptionPlansProps) => {
  const plans: Plan[] = [
    {
      id: "monthly",
      name: "Monthly Pass",
      duration: "1 Month",
      price: 500,
      features: [
        "Unlimited bus rides for 30 days",
        "Valid on all city routes",
        "Digital QR pass",
        "Mobile app access",
        "Customer support"
      ]
    },
    {
      id: "quarterly",
      name: "Quarterly Pass",
      duration: "3 Months",
      price: 1350,
      originalPrice: 1500,
      popular: true,
      features: [
        "Unlimited bus rides for 90 days",
        "Valid on all city routes",
        "Digital QR pass",
        "Mobile app access",
        "Priority customer support",
        "10% savings vs monthly"
      ]
    },
    {
      id: "semester",
      name: "Semester Pass",
      duration: "6 Months",
      price: 2400,
      originalPrice: 3000,
      recommended: true,
      features: [
        "Unlimited bus rides for 6 months",
        "Valid on all city routes",
        "Digital QR pass",
        "Mobile app access",
        "Premium customer support",
        "20% savings vs monthly",
        "Perfect for academic semester"
      ]
    },
    {
      id: "yearly",
      name: "Annual Pass",
      duration: "12 Months",
      price: 4200,
      originalPrice: 6000,
      features: [
        "Unlimited bus rides for 1 year",
        "Valid on all city routes",
        "Digital QR pass",
        "Mobile app access",
        "Premium customer support",
        "30% savings vs monthly",
        "Best value for regular commuters",
        "Free pass replacement"
      ]
    }
  ];

  const handlePurchase = (planType: string, planName: string) => {
    toast.success(`🎉 ${planName} purchased successfully! Your pass is now active.`);
    onPurchase(planType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 flex items-center space-x-2 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Pass</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the perfect bus pass plan for your travel needs. All plans include unlimited rides 
              and work on all city routes.
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative card-elevated hover:shadow-strong transition-all duration-300 ${
                plan.recommended ? 'ring-2 ring-primary ring-offset-2' : ''
              } ${
                plan.popular ? 'scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-success text-white px-4 py-1 shadow-medium">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white px-4 py-1 shadow-medium">
                    <Zap className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="flex items-center justify-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{plan.duration}</span>
                </CardDescription>
                
                <div className="py-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-primary">₹{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{plan.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {plan.originalPrice && (
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Save ₹{plan.originalPrice - plan.price}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Purchase Button */}
                <Button 
                  onClick={() => handlePurchase(plan.id, plan.name)}
                  className={`w-full mt-6 ${
                    plan.recommended || plan.popular 
                      ? 'btn-hero shadow-glow' 
                      : 'btn-success'
                  }`}
                  size="lg"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Purchase Now
                </Button>

                {/* Per Day Cost */}
                <div className="text-center text-xs text-muted-foreground pt-2">
                  ≈ ₹{(plan.price / (plan.id === 'monthly' ? 30 : plan.id === 'quarterly' ? 90 : plan.id === 'semester' ? 180 : 365)).toFixed(0)} per day
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="card-elevated max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3">Why Choose Our Bus Pass?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <p><strong>Easy Verification:</strong> Quick QR code scanning</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-success" />
                  </div>
                  <p><strong>Instant Activation:</strong> Pass works immediately after purchase</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-warning" />
                  </div>
                  <p><strong>24/7 Support:</strong> Help available anytime you need it</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;