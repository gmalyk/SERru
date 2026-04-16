const BASE = '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {})
    },
    credentials: 'same-origin'
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export function get(path) {
  return request(path);
}

export function post(path, body) {
  return request(path, {
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
}

export function put(path, body) {
  return request(path, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

export function del(path) {
  return request(path, { method: 'DELETE' });
}
