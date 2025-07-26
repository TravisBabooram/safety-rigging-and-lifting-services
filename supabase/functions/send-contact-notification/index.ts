import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  serviceType?: string;
  preferredContact?: string;
  phoneNumber?: string;
  companyName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactNotificationRequest = await req.json();
    
    console.log("Received contact form data:", data);

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">SRLS Website Contact Form</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${data.email}</p>
            ${data.companyName ? `<p style="margin: 0 0 10px 0;"><strong>Company:</strong> ${data.companyName}</p>` : ''}
            ${data.phoneNumber ? `<p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${data.phoneNumber}</p>` : ''}
            ${data.serviceType ? `<p style="margin: 0 0 10px 0;"><strong>Service Type:</strong> ${data.serviceType}</p>` : ''}
            ${data.preferredContact ? `<p style="margin: 0;"><strong>Preferred Contact:</strong> ${data.preferredContact}</p>` : ''}
          </div>
          
          <h3 style="color: #1e293b; margin-bottom: 10px;">Subject</h3>
          <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-weight: 500;">${data.subject}</p>
          </div>
          
          <h3 style="color: #1e293b; margin-bottom: 10px;">Message</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #dbeafe; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Next Steps:</strong> Please respond to this inquiry promptly. You can reply directly to ${data.email} or use their preferred contact method.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 12px;">
          <p>This email was automatically generated from the SRLS website contact form.</p>
        </div>
      </div>
    `;

    // Send notification email to SRLS
    const emailResponse = await resend.emails.send({
      from: "SRLS Contact Form <onboarding@resend.dev>",
      to: ["srls.mw21@gmail.com"],
      subject: `New Contact Form Submission: ${data.subject}`,
      html: emailHtml,
      replyTo: data.email, // Allow direct reply to the contact
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);