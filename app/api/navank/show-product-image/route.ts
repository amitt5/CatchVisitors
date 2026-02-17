import { NextRequest, NextResponse } from 'next/server';

// This endpoint handles the Vapi tool call for showing product images
export async function POST(req: NextRequest) {
  console.log('\n🔔 ===== VAPI TOOL CALL RECEIVED =====');
  console.log('⏰ Timestamp:', new Date().toISOString());

  try {
    const body = await req.json();

    console.log('📦 Full request body:', JSON.stringify(body, null, 2));

    // Extract the message object which contains the tool call details
    const message = body.message;
    console.log('📨 Message object:', JSON.stringify(message, null, 2));

    // Get product_id and product_name from the tool call arguments
    const productId = message?.toolCalls?.[0]?.function?.arguments?.product_id;
    const productName = message?.toolCalls?.[0]?.function?.arguments?.product_name;

    console.log('🎯 Extracted data:');
    console.log('  - Product ID:', productId);
    console.log('  - Product Name:', productName);

    if (!productId) {
      console.log('⚠️  WARNING: No product_id found in request!');
    }

    const response = {
      success: true,
      result: `Displaying ${productName || productId}`,
      productId,
      productName
    };

    console.log('✅ Sending response:', JSON.stringify(response, null, 2));
    console.log('===== END TOOL CALL =====\n');

    // Return success response to Vapi
    // The client-side WebSocket connection will handle the actual image display
    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ ERROR handling tool call:', error);
    console.log('===== END TOOL CALL (ERROR) =====\n');
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process tool call'
      },
      { status: 500 }
    );
  }
}
