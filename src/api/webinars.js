import { get, post, put, del } from './client.js';

export const getWebinars = () => get('/api/webinars');
export const getWebinar = (slug) => get(`/api/webinars/${slug}`);
export const createWebinar = (data) => post('/api/webinars', data);
export const updateWebinar = (slug, data) => put(`/api/webinars/${slug}`, data);
export const deleteWebinar = (slug) => del(`/api/webinars/${slug}`);
