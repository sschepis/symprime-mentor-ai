import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, BookOpen, MessageCircle, Mail, FileText, Video, HelpCircle } from "lucide-react";

const HelpSupport = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <main className="relative container mx-auto px-6 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Help & Support
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </header>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Search */}
          <Card className="glass-card p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help articles, guides, and FAQs..." 
                className="pl-10 bg-muted/30"
              />
            </div>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card p-6 hover:border-primary/50 transition-all cursor-pointer group">
              <BookOpen className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive guides and API references
              </p>
            </Card>

            <Card className="glass-card p-6 hover:border-accent/50 transition-all cursor-pointer group">
              <Video className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">
                Learn through step-by-step video guides
              </p>
            </Card>

            <Card className="glass-card p-6 hover:border-secondary/50 transition-all cursor-pointer group">
              <MessageCircle className="w-8 h-8 text-secondary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Community Forum</h3>
              <p className="text-sm text-muted-foreground">
                Connect with other users and experts
              </p>
            </Card>
          </div>

          {/* FAQ */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  How do I create a new symbolic AI engine?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Click the "New Engine" button on your dashboard, fill in the engine name, category, and description. 
                  Your engine will be created with 0% autonomy and ready for training. You can then start training 
                  sessions to build symbolic relationships.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  What is autonomy and how does it improve?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Autonomy measures how well your engine can independently recognize and process symbolic relationships. 
                  It improves through training sessions where the AI assistant guides pattern recognition and relationship 
                  building. Higher autonomy means more accurate and confident symbolic reasoning.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  How does the AI training assistant work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The AI training assistant monitors your training sessions in real-time, analyzing metrics like entropy, 
                  success rate, and pattern recognition. It makes intelligent suggestions for optimizing training parameters, 
                  detecting strong symbol relationships, and adjusting strategies to maximize autonomy gains.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  Can I export my trained models?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Premium and Enterprise users can export their trained models, including all symbolic relationships, 
                  prime factorizations, and training history. Go to the engine details dialog and select "Export Model Data" 
                  from the settings tab.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  What's the difference between training and inference?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Training is where you teach your engine symbolic relationships using examples. Inference is using your 
                  trained engine to chat and get answers based on what it has learned. The LLM translation layer makes 
                  inference feel like natural conversation while leveraging the symbolic reasoning underneath.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  How do I upgrade my subscription?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Visit the Billing page from your profile menu, review the available plans, and click "Upgrade" on your 
                  desired plan. Changes take effect immediately, and you'll only be charged the prorated difference for 
                  the current billing cycle.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* Contact Support */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Contact Support
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-muted/30" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="bg-muted/30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Describe your issue or question in detail..." 
                  className="bg-muted/30 min-h-[150px]"
                />
              </div>

              <div className="flex gap-3">
                <Button className="bg-gradient-primary hover:opacity-90 gap-2">
                  <Mail className="w-4 h-4" />
                  Send Message
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Attach Files
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-3">
                You can also reach us directly:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> support@symprime.ai</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
                <p><strong>Premium Support:</strong> Within 4 hours</p>
              </div>
            </div>
          </Card>

          {/* Resources */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start gap-3 h-auto py-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-semibold">API Documentation</p>
                  <p className="text-xs text-muted-foreground">Complete API reference and examples</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start gap-3 h-auto py-4">
                <Video className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="font-semibold">Getting Started Guide</p>
                  <p className="text-xs text-muted-foreground">Step-by-step tutorial for beginners</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start gap-3 h-auto py-4">
                <FileText className="w-5 h-5 text-secondary" />
                <div className="text-left">
                  <p className="font-semibold">Best Practices</p>
                  <p className="text-xs text-muted-foreground">Tips for optimal training results</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start gap-3 h-auto py-4">
                <MessageCircle className="w-5 h-5 text-success" />
                <div className="text-left">
                  <p className="font-semibold">Community Discord</p>
                  <p className="text-xs text-muted-foreground">Join our active community</p>
                </div>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HelpSupport;
