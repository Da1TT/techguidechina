// Cloudflare Worker for visitor counting
// This worker increments and returns the visitor count

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle visitor count API
    if (url.pathname === '/api/visitor') {
      try {
        // Increment visitor count
        let count = await env.VISITORS.get('count') || '0';
        count = (parseInt(count) + 1).toString();
        
        // Store new count
        await env.VISITORS.put('count', count);
        
        // Return JSON response
        return new Response(JSON.stringify({ count: parseInt(count) }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          },
        });
      } catch (error) {
        console.error('Error handling visitor count:', error);
        return new Response(JSON.stringify({ error: 'Failed to increment visitor count' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Return 404 for other paths
    return new Response('Not Found', { status: 404 });
  }
};
