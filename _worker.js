/**
 * Cloudflare Pages Worker
 * Handles routing and basic server-side logic
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle root path
    if (path === '/') {
      // Return index.html
      return new Response(await env.ASSETS.fetch(request));
    }

    // Handle all other paths
    return new Response(await env.ASSETS.fetch(request));
  }
};
