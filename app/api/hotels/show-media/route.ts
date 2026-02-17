import { NextRequest, NextResponse } from 'next/server';

// This endpoint handles the Vapi tool call for showing hotel media
export async function POST(req: NextRequest) {
  console.log('\n🏨 ===== VAPI HOTEL MEDIA TOOL CALL RECEIVED =====');
  console.log('⏰ Timestamp:', new Date().toISOString());

  try {
    const body = await req.json();

    console.log('📦 Full request body:', JSON.stringify(body, null, 2));

    // Extract the message object which contains the tool call details
    const message = body.message;
    console.log('📨 Message object:', JSON.stringify(message, null, 2));

    // Get media_id and media_name from the tool call arguments
    const mediaId = message?.toolCalls?.[0]?.function?.arguments?.media_id;
    const mediaName = message?.toolCalls?.[0]?.function?.arguments?.media_name;

    console.log('🎯 Extracted data:');
    console.log('  - Media ID:', mediaId);
    console.log('  - Media Name:', mediaName);

    if (!mediaId) {
      console.log('⚠️  WARNING: No media_id found in request!');
    }

    // Validate media_id
    const validMediaIds = [
      // Attractions
      'rembrandt-square', 'anne-frank-house', 'rijksmuseum',
      // Rooms
      'canal-suite', 'classic-king',
      // Amenities
      'rooftop', 'spa', 'gym',
      // Booking
      'calendar'
    ];
    if (mediaId && !validMediaIds.includes(mediaId)) {
      console.log('⚠️  WARNING: Invalid media_id:', mediaId);
      console.log('Valid IDs:', validMediaIds);
    }

    // Vapi server tools expect just the "result" field
    const response = {
      result: `Displaying ${mediaName || mediaId}`
    };

    console.log('✅ Sending response:', JSON.stringify(response, null, 2));
    console.log('===== END HOTEL MEDIA TOOL CALL =====\n');

    // Return success response to Vapi
    // The client-side WebSocket connection will handle the actual media display
    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ ERROR handling tool call:', error);
    console.log('===== END HOTEL MEDIA TOOL CALL (ERROR) =====\n');
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process tool call'
      },
      { status: 500 }
    );
  }
}
