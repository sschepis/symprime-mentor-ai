-- Enable realtime for training_sessions table
ALTER TABLE public.training_sessions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.training_sessions;

-- Enable realtime for engines table
ALTER TABLE public.engines REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.engines;

-- Enable realtime for conversations table
ALTER TABLE public.conversations REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;

-- Enable realtime for messages table
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;