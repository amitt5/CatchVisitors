#!/bin/bash

# Start ngrok tunnel for Vapi webhook testing
# This creates an HTTPS tunnel to your local dev server

echo "🚀 Starting ngrok tunnel to localhost:3000..."
echo ""
echo "⚠️  Make sure your Next.js dev server is running on port 3000"
echo "   Run: npm run dev (in another terminal)"
echo ""
echo "📋 Once ngrok starts, copy the HTTPS URL and use it in Vapi:"
echo "   Example: https://abc123.ngrok.io/api/navank/show-product-image"
echo ""
echo "Press Ctrl+C to stop the tunnel"
echo ""

ngrok http 3000
