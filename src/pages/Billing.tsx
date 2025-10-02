import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Calendar, Check, Zap } from "lucide-react";

const Billing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <main className="relative container mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription and payment methods
          </p>
        </header>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Current Plan */}
          <Card className="glass-card p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Current Plan</h2>
                <Badge className="bg-gradient-primary text-white">Premium Plan</Badge>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90">
                Upgrade Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Monthly Cost</p>
                <p className="text-3xl font-bold">$49<span className="text-lg text-muted-foreground">/mo</span></p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Next Billing Date</p>
                <p className="text-xl font-semibold">April 15, 2024</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Billing Cycle</p>
                <p className="text-xl font-semibold">Monthly</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50">
              <h3 className="font-semibold mb-3">Plan Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Unlimited engines",
                  "Advanced AI assistant",
                  "Priority training",
                  "Custom symbol mappings",
                  "API access",
                  "Priority support",
                  "Export capabilities",
                  "Team collaboration"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <Button variant="outline">Add New Card</Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border-2 border-primary">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-card rounded-lg">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Default
                </Badge>
              </div>
            </div>
          </Card>

          {/* Usage This Month */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Usage This Month</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <p className="text-sm text-muted-foreground">Training Sessions</p>
                </div>
                <p className="text-2xl font-bold">47<span className="text-sm text-muted-foreground"> / unlimited</span></p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-secondary" />
                  <p className="text-sm text-muted-foreground">API Calls</p>
                </div>
                <p className="text-2xl font-bold">8.2k<span className="text-sm text-muted-foreground"> / unlimited</span></p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                </div>
                <p className="text-2xl font-bold">2.1GB<span className="text-sm text-muted-foreground"> / 100GB</span></p>
              </div>
            </div>
          </Card>

          {/* Billing History */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Billing History</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download All
              </Button>
            </div>

            <div className="space-y-2">
              {[
                { date: "Mar 15, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-003" },
                { date: "Feb 15, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-002" },
                { date: "Jan 15, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-001" },
              ].map((invoice, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{invoice.invoice}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">{invoice.amount}</p>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Available Plans */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Starter",
                  price: "$19",
                  features: ["5 engines", "100 training sessions/mo", "Basic AI assistant", "Email support"],
                  current: false
                },
                {
                  name: "Premium",
                  price: "$49",
                  features: ["Unlimited engines", "Unlimited training", "Advanced AI assistant", "Priority support"],
                  current: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: ["Everything in Premium", "Dedicated support", "Custom integrations", "SLA guarantee"],
                  current: false
                }
              ].map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 rounded-lg border-2 ${plan.current ? 'border-primary bg-primary/5' : 'border-border bg-muted/20'}`}
                >
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={plan.current ? "w-full bg-gradient-primary hover:opacity-90" : "w-full"} 
                    variant={plan.current ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : plan.price === "Custom" ? "Contact Sales" : "Upgrade"}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Billing;
