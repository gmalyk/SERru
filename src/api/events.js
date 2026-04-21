import { get, post, put, del } from './client.js';

// Normalize API snake_case fields to camelCase for frontend compatibility
function normalizeEvent(e) {
  return {
    ...e,
    showBuyButton: e.show_buy_button ?? e.showBuyButton,
    isPast: e.is_past ?? e.isPast,
    isFree: e.is_free ?? e.isFree,
    internalLink: e.internal_link ?? e.internalLink,
  };
}

export const getEvents = async (year) => {
  const data = await get(year ? `/api/events?year=${year}` : '/api/events');
  // If grouped by year (object), normalize each event
  if (!Array.isArray(data)) {
    const normalized = {};
    for (const [yr, events] of Object.entries(data)) {
      normalized[yr] = events.map(normalizeEvent);
    }
    return normalized;
  }
  return data.map(normalizeEvent);
};

export const getEvent = (id) => get(`/api/events/${id}`);
export const createEvent = (data) => post('/api/events', data);
export const updateEvent = (id, data) => put(`/api/events/${id}`, data);
export const deleteEvent = (id) => del(`/api/events/${id}`);
