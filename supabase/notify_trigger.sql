-- Trigger to call edge function on new answer insertion
-- Make sure to enable the pg_net extension if not already enabled.
-- Run: CREATE EXTENSION IF NOT EXISTS "pg_net";

-- Note: Replace the url with your actual deployed Edge Function URL.
-- For local development, this URL might be different based on your docker network.

CREATE OR REPLACE FUNCTION public.invoke_notify_new_answer()
RETURNS TRIGGER AS $$
DECLARE
  request_id BIGINT;
BEGIN
  -- We use pg_net's http_post to send the webhook
  SELECT net.http_post(
      url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-new-answer',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
      body:=json_build_object(
        'type', 'INSERT',
        'table', TG_TABLE_NAME,
        'schema', TG_TABLE_SCHEMA,
        'record', row_to_json(NEW)
      )::jsonb
  ) INTO request_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS notify_new_answer_trigger ON public.answers;
CREATE TRIGGER notify_new_answer_trigger
AFTER INSERT ON public.answers
FOR EACH ROW EXECUTE FUNCTION public.invoke_notify_new_answer();

-- Alternative (Recommended): If you are setting up via the Supabase Dashboard UI
-- 1. Go to Database -> Webhooks
-- 2. Create Webhook
-- 3. Name: Notify New Answer
-- 4. Table: answers
-- 5. Events: Insert
-- 6. Type: Supabase Edge Function
-- 7. Edge Function: notify-new-answer
