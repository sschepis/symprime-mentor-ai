import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Zap } from "lucide-react";
import { FeatureList } from "@/components/common/FeatureList";
import { InvoiceItem, InvoiceData } from "@/components/common/InvoiceItem";
import { PlanCard, PlanData } from "@/components/common/PlanCard";

const Billing = () => {
  const planFeatures = [
    "Unlimited engines",
    "Advanced AI assistant",
    "Priority training",
    "Custom symbol mappings",
    "API access",
    "Priority support",
    "Export capabilities",
    "Team collaboration"
  ];

  const invoices: InvoiceData[] = [
    { date: "Mar 15, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-003" },
    { date: "Feb 15, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-002" },
    { date: "Jan 15, 2024", amount: "$49.00", status: "Paid", invoice: "INV-2024-001" },
  ];

  const plans: PlanData[] = [
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
      current: true,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Everything in Premium", "Dedicated support", "Custom integrations", "SLA guarantee"],
      current: false
    }
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Billing & Subscription"
        description="Manage your subscription and payment methods"
      />

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
              <FeatureList features={planFeatures} />
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

            <InvoiceItem invoices={invoices} />
          </Card>

          {/* Available Plans */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Available Plans</h2>
            <PlanCard plans={plans} />
          </Card>
        </div>
    </PageLayout>
  );
};

export default Billing;
