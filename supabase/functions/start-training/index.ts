import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { engine_id, config } = await req.json();

    if (!engine_id) {
      return new Response(JSON.stringify({ error: 'Engine ID required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify engine belongs to user
    const { data: engine, error: engineError } = await supabase
      .from('engines')
      .select('*')
      .eq('id', engine_id)
      .eq('user_id', user.id)
      .single();

    if (engineError || !engine) {
      return new Response(JSON.stringify({ error: 'Engine not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create training session
    const { data: session, error: sessionError } = await supabase
      .from('training_sessions')
      .insert({
        engine_id,
        user_id: user.id,
        status: 'running',
        progress: 0,
        config: config || {},
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (sessionError) {
      return new Response(JSON.stringify({ error: sessionError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Start training process in background
    simulateTraining(supabase, session.id, engine_id);

    return new Response(JSON.stringify({ session }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function simulateTraining(supabase: any, sessionId: string, engineId: string) {
  const totalSteps = 100;
  const updateInterval = 2000; // Update every 2 seconds

  for (let step = 0; step <= totalSteps; step += 5) {
    await new Promise(resolve => setTimeout(resolve, updateInterval));

    const metrics = {
      loss: 1.0 - (step / totalSteps) * 0.8 + Math.random() * 0.1,
      accuracy: (step / totalSteps) * 0.95 + Math.random() * 0.05,
      learning_rate: 0.001 * Math.pow(0.95, step / 10),
    };

    await supabase
      .from('training_sessions')
      .update({
        progress: step,
        metrics,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId);
  }

  // Mark as completed
  await supabase
    .from('training_sessions')
    .update({
      status: 'completed',
      progress: 100,
      completed_at: new Date().toISOString(),
    })
    .eq('id', sessionId);

  // Update engine status
  await supabase
    .from('engines')
    .update({
      status: 'trained',
      last_trained: new Date().toISOString(),
    })
    .eq('id', engineId);
}
