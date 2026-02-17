import { NextRequest, NextResponse } from 'next/server';

// This endpoint handles the Vapi tool call for showing product images
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('Vapi tool call received:', body);

    // Extract the message object which contains the tool call details
    const message = body.message;

    // Get product_id and product_name from the tool call arguments
    const productId = message?.toolCalls?.[0]?.function?.arguments?.product_id;
    const productName = message?.toolCalls?.[0]?.function?.arguments?.product_name;

    console.log('Product to display:', { productId, productName });

    // Return success response to Vapi
    // The client-side WebSocket connection will handle the actual image display
    return NextResponse.json({
      success: true,
      result: `Displaying ${productName || productId}`,
      productId,
      productName
    });
  } catch (error) {
    console.error('Error handling tool call:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process tool call'
      },
      { status: 500 }
    );
  }
}
