import { get, post, put, del } from './client.js';

export const getNews = () => get('/api/news');
export const getNewsById = (id) => get(`/api/news/${id}`);
export const createNews = (data) => post('/api/news', data);
export const updateNews = (id, data) => put(`/api/news/${id}`, data);
export const deleteNews = (id) => del(`/api/news/${id}`);
