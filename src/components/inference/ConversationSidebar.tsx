import { useState } from "react";
import { Conversation } from "@/contexts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Plus, MoreVertical, Edit2, Trash2, Download, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ConversationSidebarProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onRefresh: () => void;
}

export const ConversationSidebar = ({
  conversations,
  currentConversation,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation,
  onRefresh,
}: ConversationSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRename = async (id: string) => {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      const { error } = await supabase
        .from("conversations")
        .update({ title: newTitle.trim() })
        .eq("id", id);

      if (error) throw error;

      toast.success("Conversation renamed");
      setRenamingId(null);
      setNewTitle("");
      onRefresh();
    } catch (error) {
      console.error("Error renaming conversation:", error);
      toast.error("Failed to rename conversation");
    }
  };

  const handleExport = async (conversation: Conversation) => {
    try {
      // Fetch messages for this conversation
      const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const exportData = {
        conversation: {
          id: conversation.id,
          title: conversation.title,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at,
        },
        messages: messages,
        exported_at: new Date().toISOString(),
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${conversation.title.replace(/[^a-z0-9]/gi, "_")}_${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Conversation exported");
    } catch (error) {
      console.error("Error exporting conversation:", error);
      toast.error("Failed to export conversation");
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      onDeleteConversation(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <>
      <Card className="glass-card h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversations
            </h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={onCreateConversation}
              className="hover:bg-primary/10 hover:scale-110 transition-all"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/30 border-border/50"
            />
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">
                  {searchQuery ? "No conversations found" : "No conversations yet"}
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group relative rounded-lg transition-all duration-200 ${
                    currentConversation?.id === conversation.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50"
                  }`}
                >
                  {renamingId === conversation.id ? (
                    <div className="p-3">
                      <Input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename(conversation.id);
                          if (e.key === "Escape") {
                            setRenamingId(null);
                            setNewTitle("");
                          }
                        }}
                        onBlur={() => handleRename(conversation.id)}
                        autoFocus
                        className="h-8 text-sm"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-start gap-2 p-3 cursor-pointer"
                      onClick={() => onSelectConversation(conversation.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.updated_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 h-8 w-8 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setRenamingId(conversation.id);
                              setNewTitle(conversation.title);
                            }}
                          >
                            <Edit2 className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExport(conversation);
                            }}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(conversation.id);
                            }}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone
              and will permanently delete all messages in this conversation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
