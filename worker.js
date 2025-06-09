addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const cache = caches.default;
  let response = await cache.match(request);
  
  if (response) {
    return response;
  }
  
  const apiPath = url.pathname;
  const hfApiUrls = {
    '/text_generation': 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
    '/sentiment': 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
    '/qa': 'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2'
  };
  
  const targetUrl = hfApiUrls[apiPath];
  if (!targetUrl) {
    return new Response('Invalid API endpoint', { status: 404 });
  }
  
  const hfToken = await env.HUGGINGFACE_TOKEN;
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: {
      'Authorization': `Bearer ${hfToken}`,
      'Content-Type': 'application/json'
    },
    body: request.body
  });
  
  response = await fetch(newRequest);
  const cacheResponse = response.clone();
  event.waitUntil(cache.put(request, cacheResponse));
  
  return response;
}