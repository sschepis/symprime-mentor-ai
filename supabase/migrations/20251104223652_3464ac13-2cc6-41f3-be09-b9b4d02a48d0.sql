-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.engine_status AS ENUM ('active', 'training', 'paused', 'archived');
CREATE TYPE public.training_status AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT,
  role TEXT DEFAULT 'AI Researcher',
  joined_date TIMESTAMPTZ DEFAULT NOW(),
  subscription TEXT DEFAULT 'free' CHECK (subscription IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create engines table
CREATE TABLE public.engines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  model_type TEXT NOT NULL,
  status engine_status DEFAULT 'active',
  accuracy NUMERIC(5,2),
  training_time INTEGER, -- in minutes
  last_trained TIMESTAMPTZ,
  version TEXT DEFAULT '1.0',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.engines ENABLE ROW LEVEL SECURITY;

-- RLS policies for engines
CREATE POLICY "Users can view their own engines"
  ON public.engines FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own engines"
  ON public.engines FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own engines"
  ON public.engines FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own engines"
  ON public.engines FOR DELETE
  USING (auth.uid() = user_id);

-- Create training_sessions table
CREATE TABLE public.training_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  engine_id UUID REFERENCES public.engines(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  status training_status DEFAULT 'pending',
  dataset_size INTEGER,
  epochs INTEGER,
  batch_size INTEGER,
  learning_rate NUMERIC(10,8),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for training_sessions
CREATE POLICY "Users can view their own training sessions"
  ON public.training_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own training sessions"
  ON public.training_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own training sessions"
  ON public.training_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own training sessions"
  ON public.training_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Create conversations table
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  engine_id UUID REFERENCES public.engines(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- RLS policies for conversations
CREATE POLICY "Users can view their own conversations"
  ON public.conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations"
  ON public.conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
  ON public.conversations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
  ON public.conversations FOR DELETE
  USING (auth.uid() = user_id);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for messages (access through conversation ownership)
CREATE POLICY "Users can view messages from their own conversations"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their own conversations"
  ON public.messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete messages from their own conversations"
  ON public.messages FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar', SUBSTRING(NEW.email FROM 1 FOR 2))
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_engines_updated_at
  BEFORE UPDATE ON public.engines
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_sessions_updated_at
  BEFORE UPDATE ON public.training_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for training data and models
INSERT INTO storage.buckets (id, name, public) 
VALUES ('training-data', 'training-data', false);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('models', 'models', false);

-- Storage policies for training-data bucket
CREATE POLICY "Users can view their own training data"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'training-data' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own training data"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'training-data' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own training data"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'training-data' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own training data"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'training-data' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for models bucket
CREATE POLICY "Users can view their own models"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'models' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own models"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'models' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own models"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'models' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own models"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'models' AND auth.uid()::text = (storage.foldername(name))[1]);