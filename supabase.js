const SUPABASE_URL = 'https://jlunlauuugokqqtgrdhz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdW5sYXV1dWdva3FxdGdyZGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5Nzc2NzQsImV4cCI6MjA5MjU1MzY3NH0.mJerXjdhWVBirtMnyp-MbuVG31Y5EyDoxWAIQNLmSwg';

const sb = {
  async req(method, path, body) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal'
      },
      body: body ? JSON.stringify(body) : undefined
    });
    if (res.status === 204) return true;
    return res.json().catch(() => []);
  },
  get: (path) => sb.req('GET', path),
  post: (path, body) => sb.req('POST', path, body),
  patch: (path, body) => sb.req('PATCH', path, body),
  del: (path) => sb.req('DELETE', path),
};
