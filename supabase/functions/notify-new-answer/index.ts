import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend@1.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  try {
    const payload = await req.json()
    console.log("Webhook payload received:", payload)

    // Verify it's an insert operation
    if (payload.type !== 'INSERT') {
      return new Response("Not an insert operation", { status: 200 })
    }

    const answer = payload.record

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get the question details
    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('title, user_id')
      .eq('id', answer.question_id)
      .single()

    if (questionError) throw questionError

    // Don't send email if the answerer is the question owner
    if (question.user_id === answer.user_id) {
      return new Response("Answerer is the question owner, skipping email", { status: 200 })
    }

    // Get Question Owner's email
    const { data: questionOwner, error: ownerError } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', question.user_id)
      .single()

    if (ownerError) throw ownerError

    // Get Answer Author's name
    const { data: answerAuthor, error: authorError } = await supabase
      .from('users')
      .select('name')
      .eq('id', answer.user_id)
      .single()

    if (authorError) throw authorError

    const appUrl = Deno.env.get('PUBLIC_APP_URL') || 'https://your-app-domain.com'
    const questionLink = `${appUrl}/question/${answer.question_id}`

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'AnswerHub <noreply@your-app-domain.com>',
      to: [questionOwner.email],
      subject: `New Answer on: ${question.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4f46e5;">New Answer to Your Question!</h2>
          <p>Hi <strong>${questionOwner.name || 'User'}</strong>,</p>
          <p><strong>${answerAuthor.name || 'Someone'}</strong> just posted a new answer to your question: <em>"${question.title}"</em>.</p>
          <div style="margin: 30px 0;">
            <a href="${questionLink}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Answer</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #6b7280; font-size: 14px;"><a href="${questionLink}">${questionLink}</a></p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">You received this email because you asked a question on AnswerHub.</p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending email:', error)
      return new Response(JSON.stringify({ error }), { status: 400 })
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error('Function error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
