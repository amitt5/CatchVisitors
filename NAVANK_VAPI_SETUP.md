# Navank Vapi Tool Setup Guide

## Quick Start for Local Testing with Ngrok

### Step 1: Start Your Dev Server
```bash
npm run dev
```
Keep this terminal running.

### Step 2: Start Ngrok Tunnel (in a new terminal)
```bash
./start-ngrok.sh
```

You'll see output like:
```
Forwarding   https://abc123-xyz.ngrok.io -> http://localhost:3000
```

### Step 3: Copy the HTTPS URL
Copy the `https://xxx.ngrok.io` URL from the ngrok output.

### Step 4: Update Vapi Tool Configuration

1. Go to your Vapi dashboard
2. Open your Navank assistant
3. Go to Tools → `show_product_image`
4. Update the **Server URL** field to:
   ```
   https://YOUR-NGROK-URL.ngrok.io/api/navank/show-product-image
   ```
   Example:
   ```
   https://abc123-xyz.ngrok.io/api/navank/show-product-image
   ```

### Step 5: Update Assistant Prompt

Add this to your assistant's system message (see full prompt in main README):

```
IMPORTANT: When discussing specific products, call the show_product_image tool to display images.

OPTICAL FIBER PRODUCTS:
- water blocking tape → product_id: "water-blocking-tape"
- water swellable yarn → product_id: "water-swellable-yarn"
- ECCS tape → product_id: "eccs-tape"
- CJB ECCS tape → product_id: "cjb-eccs-tape"
- PBT compounds → product_id: "pbt-compounds"
- LSZH compounds → product_id: "lszh-compounds-ofc"

POWER CABLE PRODUCTS:
- XLPE compound → product_id: "xlpe-compound"
- semiconductive compound → product_id: "semiconductive-compound"
- LSZH compound → product_id: "lszh-compound-power"
- PE compound → product_id: "pe-compound"
- mica tape → product_id: "mica-tape"
- PVC compound → product_id: "pvc-compound"

Call the tool BEFORE explaining each product.
```

### Step 6: Test It!

1. Go to `http://localhost:3000/navank`
2. Click "Talk to Our AI Product Expert"
3. Ask: "Tell me about water blocking tape"
4. The assistant should:
   - Call the tool (you'll see it in console logs)
   - Display the product image
   - Explain the product

---

## Debugging

### Check Server Logs
In your `npm run dev` terminal, you should see:
```
Vapi tool call received: { ... }
Product to display: { productId: 'water-blocking-tape', ... }
```

### Check Browser Console
Press F12 and look for:
```
Vapi message received: { type: 'tool-calls', ... }
Tool call to show product: water-blocking-tape
```

### Check Ngrok Dashboard
Visit http://127.0.0.1:4040 to see all requests going through ngrok.

---

## Production Deployment

When deploying to production, replace the ngrok URL with your production URL:
```
https://catchvisitors.com/api/navank/show-product-image
```
or
```
https://navank.catchvisitors.com/api/navank/show-product-image
```

---

## Troubleshooting

**Ngrok URL changes every time**
- Free ngrok URLs are temporary
- Get a permanent URL with an ngrok account (free tier available)
- Or use `ngrok http 3000 --domain=your-static-domain.ngrok.io` (requires ngrok account)

**Images not showing**
1. Check both server and browser console logs
2. Verify the tool is being called (check ngrok dashboard at http://127.0.0.1:4040)
3. Ensure product_id exactly matches the IDs in the list
4. Make sure the assistant prompt includes the tool calling instructions

**Tool call fails**
1. Verify the Server URL in Vapi is correct (with https://)
2. Check that ngrok is still running
3. Test the endpoint directly:
   ```bash
   curl -X POST https://YOUR-NGROK-URL.ngrok.io/api/navank/show-product-image \
     -H "Content-Type: application/json" \
     -d '{"message":{"toolCalls":[{"function":{"name":"show_product_image","arguments":{"product_id":"water-blocking-tape","product_name":"Water Blocking Tape"}}}]}}'
   ```
