import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Download, Trash2, Settings, Plus } from "lucide-react";
import { ExportConversationDialog } from "@/components/dialogs/ExportConversationDialog";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useConversation, useEngines } from "@/contexts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

const Inference = () => {
  const [exportOpen, setExportOpen] = useState(false);
  const [clearChatOpen, setClearChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { currentConversation, messages, sendMessage, clearMessages, createConversation } = useConversation();
  const { engines, selectedEngine } = useEngines();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Create initial conversation if none exists
    if (!currentConversation && engines.length > 0) {
      const engine = selectedEngine || engines[0];
      createConversation(`Chat with ${engine.name}`, engine.id);
    }
  }, [currentConversation, engines, selectedEngine]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    await sendMessage(inputValue.trim());
    setInputValue("");
  };

  const handleClearChat = async () => {
    await clearMessages();
    setClearChatOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <main className="relative flex-1 container mx-auto px-6 py-8 flex flex-col">
        {/* Header */}
        <header className="mb-6 flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">
              Inference Chat
            </h1>
            <p className="text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
              {currentConversation?.title || "Start a new conversation"}
            </p>
          </div>
          
          {/* Chat Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="hover:scale-110 transition-all duration-200 hover:bg-primary/10">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border z-50">
              <DropdownMenuItem onClick={() => setExportOpen(true)} className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Export Conversation
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setClearChatOpen(true)} 
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Chat Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-8 flex flex-col">
            <Card className="glass-card flex-1 p-6 flex flex-col animate-fade-in" style={{ animationDelay: '200ms' }}>
              {/* Messages */}
              <ScrollArea className="flex-1 pr-4 mb-6">
                <div className="space-y-6">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((message, idx) => (
                      <div 
                        key={message.id}
                        className={`flex gap-4 animate-fade-in ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className={`p-2 h-fit rounded-lg ${message.role === 'assistant' ? 'bg-gradient-ai' : 'bg-primary'}`}>
                          {message.role === 'assistant' ? (
                            <Bot className="w-5 h-5 text-white" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className={`flex-1 space-y-2 ${message.role === 'user' ? 'text-right' : ''}`}>
                          <p className="text-sm text-muted-foreground">
                            {message.role === 'assistant' ? 'AI Assistant' : 'You'} • {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                          </p>
                          <div className={`rounded-lg p-4 ${message.role === 'assistant' ? 'bg-muted/30' : 'bg-primary/10 inline-block'}`}>
                            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '600ms' }}>
                <Input 
                  placeholder="Type your message..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-muted/30 border-border/50 focus-visible:ring-primary transition-all duration-200 focus:scale-[1.02]"
                  disabled={!currentConversation}
                />
                <Button 
                  className="gap-2 bg-gradient-primary hover:opacity-90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  onClick={handleSendMessage}
                  disabled={!currentConversation || !inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar - Context & Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="glass-card p-6 animate-fade-in hover:shadow-glow-accent transition-all duration-300" style={{ animationDelay: '300ms' }}>
              <h3 className="font-semibold mb-4">Active Engine</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <div className="flex-1">
                    <p className="font-medium">{selectedEngine?.name || "No engine selected"}</p>
                    <p className="text-sm text-muted-foreground">
                      Accuracy: {selectedEngine?.accuracy?.toFixed(1) || 0}%
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 animate-fade-in hover:shadow-glow-accent transition-all duration-300" style={{ animationDelay: '400ms' }}>
              <h3 className="font-semibold mb-4">Conversation Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Messages</span>
                  <span className="font-semibold">{messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">User Messages</span>
                  <span className="font-semibold text-accent">{messages.filter(m => m.role === 'user').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">AI Responses</span>
                  <span className="font-semibold text-success">{messages.filter(m => m.role === 'assistant').length}</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 animate-fade-in hover:shadow-glow-accent transition-all duration-300" style={{ animationDelay: '500ms' }}>
              <h3 className="font-semibold mb-4">Suggested Topics</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105">
                  The Twelve Olympians
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105">
                  Heroes and Monsters
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105">
                  Creation Myths
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <ExportConversationDialog open={exportOpen} onOpenChange={setExportOpen} />
      <ConfirmDialog
        open={clearChatOpen}
        onOpenChange={setClearChatOpen}
        title="Clear Chat"
        description="Are you sure you want to clear this conversation? This action cannot be undone."
        onConfirm={handleClearChat}
        confirmText="Clear Chat"
        variant="destructive"
      />
    </div>
  );
};

export default Inference;
