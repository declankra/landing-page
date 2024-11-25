// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { Resend } from 'npm:resend'
import { WelcomeEmail } from './email.tsx'


const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  try {
    // Get request data
    const { record } = await req.json()
    const { email_address } = record

    // Initialize Supabase client (if needed for additional data)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Declan from ValidateIdea <declan@validateidea.now>',
      to: email_address,
      subject: 'Welcome to ValidateIdea - Let\'s Build Something Great!',
      react: WelcomeEmail({
        email: email_address,
        projectURL: 'https://www.validateidea.now',
        portfolioUrl: 'https://declankramper.me',
        guideUrl: 'https://declankramper.notion.site/ValidateIdea-now-Guide-1446a6685a8c80478177e8fa4ccca5e1?pvs=4',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/declan-kramper',
          github: 'https://github.com/declankra',
          producthunt: 'https://www.producthunt.com/@declan_kramper',
          twitter: 'https://twitter.com/asbestostrades',
        }
      })
    })

    return new Response(
      JSON.stringify({ 
        message: 'Welcome email sent successfully',
        data 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error sending welcome email:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send welcome email',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-welcome-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
