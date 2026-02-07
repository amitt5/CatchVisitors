// CatchVisitors Voice Widget
(async function() {
  const WIDGET_ID = 'data-widget-id';
  const SCRIPT_ID = 'catch-visitors-widget';
  
  // Prevent multiple loads
  if (document.getElementById(SCRIPT_ID)) return;
  
  console.log('🚀 CatchVisitors Widget: Initializing...');
  
  // Create widget container
  const widget = document.createElement('div');
  widget.id = 'catch-visitors-widget';
  widget.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: system-ui, -apple-system, sans-serif;
  `;
  
  // Create floating button
  const button = document.createElement('button');
  button.style.cssText = `
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #3b82f6;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    transition: all 0.3s ease;
  `;
  button.innerHTML = '🎙️';
  button.title = 'Talk to AI Assistant';
  
  // Add hover effects
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
    button.style.background = '#2563eb';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
    button.style.background = '#3b82f6';
  });
  
  widget.appendChild(button);
  document.body.appendChild(widget);
  
  // Get widget ID from script tag
  const scripts = document.getElementsByTagName('script');
  let widgetId = null;
  for (let script of scripts) {
    if (script.hasAttribute(WIDGET_ID)) {
      widgetId = script.getAttribute(WIDGET_ID);
      break;
    }
  }
  
  console.log('📋 Widget ID:', widgetId);
  
  if (!widgetId) {
    console.error('❌ No widget ID found');
    return;
  }
  
  try {
    // Load VAPI SDK as ES module
    console.log('📦 Loading VAPI SDK...');
    const VapiModule = await import('https://cdn.jsdelivr.net/npm/@vapi-ai/web@2.5.2/+esm');
    
    // The actual Vapi constructor is at default.default
    const Vapi = VapiModule.default.default;
    
    console.log('✅ VAPI SDK loaded successfully');
    await initializeWidget(Vapi);
    
  } catch (error) {
    console.error('❌ Failed to load VAPI SDK:', error);
  }
  
  async function initializeWidget(Vapi) {
    try {
      console.log('📡 Fetching widget config...');
      
      // Dynamically determine the API URL
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : 'https://www.catchvisitors.com';
      
      const response = await fetch(`${apiUrl}/api/widgets/${widgetId}`);
      
      if (!response.ok) {
        console.error('❌ API Error:', response.status);
        return;
      }
      
      const data = await response.json();
      console.log('📦 Widget config received');
      
      if (!data.success) {
        console.error('❌ Failed to load configuration');
        return;
      }
      
      console.log('✅ Creating VAPI instance...');
      const vapi = new Vapi(data.widget.vapi_api_key);
      window.vapiInstance = vapi;
      
      console.log('✅ VAPI instance created! Widget is ready.');
      console.log('🎤 Click the button to start a voice call!');
      
      let isCallActive = false;
      
      button.addEventListener('click', async () => {
        console.log('🖱️ Button clicked');
        
        if (isCallActive) {
          console.log('🛑 Stopping call...');
          vapi.stop();
          isCallActive = false;
          button.innerHTML = '🎙️';
          button.style.background = '#3b82f6';
          return;
        }
        
        try {
          button.innerHTML = '📞';
          button.style.background = '#ef4444';
          
          vapi.on('call-start', () => {
            console.log('�� Call started!');
            isCallActive = true;
          });
          
          vapi.on('call-end', () => {
            console.log('📴 Call ended');
            isCallActive = false;
            button.innerHTML = '🎙️';
            button.style.background = '#3b82f6';
          });
          
          vapi.on('error', (error) => {
            console.error('❌ VAPI error:', error);
          });
          
          vapi.on('message', (message) => {
            console.log('💬 VAPI message:', message);
          });
          
          console.log('🎤 Starting call with assistant:', data.widget.vapi_assistant_id);
          await vapi.start(data.widget.vapi_assistant_id);
          
        } catch (error) {
          console.error('❌ Call failed:', error);
          button.innerHTML = '🎙️';
          button.style.background = '#3b82f6';
        }
      });
      
    } catch (error) {
      console.error('❌ Initialization failed:', error);
    }
  }
  
})();
