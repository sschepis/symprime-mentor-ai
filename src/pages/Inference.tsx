import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";

const Inference = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <main className="relative flex-1 container mx-auto px-6 py-8 flex flex-col">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent">
            Inference Chat
          </h1>
          <p className="text-muted-foreground mt-2">
            Natural language interaction with Greek Mythology Engine
          </p>
        </header>

        {/* Chat Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-8 flex flex-col">
            <Card className="glass-card flex-1 p-6 flex flex-col">
              {/* Messages */}
              <div className="flex-1 space-y-6 overflow-y-auto mb-6">
                {/* AI Message */}
                <div className="flex gap-4">
                  <div className="p-2 h-fit rounded-lg bg-gradient-ai">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm text-muted-foreground">AI Assistant</p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="leading-relaxed">
                        Hello! I'm your Greek Mythology symbolic AI assistant. I can help you explore myths, 
                        understand relationships between gods, and analyze ancient Greek narratives. What would 
                        you like to know?
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-4 flex-row-reverse">
                  <div className="p-2 h-fit rounded-lg bg-primary">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-2 text-right">
                    <p className="text-sm text-muted-foreground">You</p>
                    <div className="bg-primary/10 rounded-lg p-4 inline-block">
                      <p className="leading-relaxed">
                        Tell me about Zeus and his relationship with other gods
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-4">
                  <div className="p-2 h-fit rounded-lg bg-gradient-ai">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm text-muted-foreground">AI Assistant</p>
                    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                      <p className="leading-relaxed">
                        Based on the symbolic patterns I've learned, Zeus has strong relationships with several 
                        other deities:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Hera (Prime: 19):</strong> His wife and queen, relationship strength: 0.92</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Athena (Prime: 23):</strong> His daughter, born from his head, relationship strength: 0.87</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span><strong>Poseidon (Prime: 29):</strong> His brother, ruler of seas, relationship strength: 0.81</span>
                        </li>
                      </ul>
                      <p className="leading-relaxed text-sm text-muted-foreground">
                        These relationships are represented through prime factorization patterns that encode symbolic 
                        meanings from training on ancient texts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="flex gap-3">
                <Input 
                  placeholder="Ask about Greek mythology..." 
                  className="flex-1 bg-muted/30 border-border/50 focus-visible:ring-primary"
                />
                <Button className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar - Context & Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Active Engine</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <div className="flex-1">
                    <p className="font-medium">Greek Mythology</p>
                    <p className="text-sm text-muted-foreground">Autonomy: 85%</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Conversation Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Messages</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Symbols Used</span>
                  <span className="font-semibold text-accent">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <span className="font-semibold text-success">92%</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold mb-4">Suggested Topics</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  The Twelve Olympians
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Heroes and Monsters
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Creation Myths
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inference;
