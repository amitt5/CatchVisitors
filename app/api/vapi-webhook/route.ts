import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// VAPI webhook types
interface VapiWebhook {
  message: {
    type: string;
    call?: {
      id: string;
      assistantId: string;
      status: string;
      transcript?: string;
      summary?: string;
      endedAt?: string;
    };
    [key: string]: any;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: VapiWebhook = await request.json();
    const { message } = body;

    // Verify webhook secret (optional but recommended)
    const webhookSecret = process.env.VAPI_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get('x-vapi-signature');
      // You should verify the signature here using HMAC
      // For now, we'll skip this for simplicity
    }

    const supabase = createServerSupabaseClient();

    // Handle different message types
    switch (message.type) {
      case 'call-start':
        // Call has started
        if (message.call?.id) {
          await supabase
            .from("demos")
            .update({ 
              call_id: message.call.id,
              call_completed_at: null 
            })
            .eq("vapi_assistant_id", message.call.assistantId);
        }
        break;

      case 'call-end':
        // Call has ended
        if (message.call?.id) {
          await supabase
            .from("demos")
            .update({ 
              call_completed_at: message.call.endedAt || new Date().toISOString()
            })
            .eq("call_id", message.call.id);
        }
        break;

      case 'transcript':
        // Update transcript
        if (message.call?.id && message.call.transcript) {
          await supabase
            .from("demos")
            .update({ transcript: message.call.transcript })
            .eq("call_id", message.call.id);
        }
        break;

      case 'summary':
        // Update summary
        if (message.call?.id && message.call.summary) {
          await supabase
            .from("demos")
            .update({ summary: message.call.summary })
            .eq("call_id", message.call.id);
        }
        break;

      case 'function-call':
        // Handle function calls (like booking appointments)
        if (message.functionCall?.name === 'schedule_appointment') {
          const { name, email, phone, preferredTime, description } = message.functionCall.parameters;
          
          // Store the appointment details
          await supabase
            .from("demos")
            .update({ 
              email: email || phone,
              // You might want to create a separate table for appointments
            })
            .eq("call_id", message.call.id);

          // Here you could also:
          // - Send an email to the law firm
          // - Add to a calendar
          // - Send a confirmation to the client
          console.log('Appointment scheduled:', { name, email, phone, preferredTime, description });
        }
        break;

      default:
        console.log('Unhandled webhook message type:', message.type);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
