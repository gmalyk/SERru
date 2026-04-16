import { get, post, put, del } from './client.js';

export const getCarouselSeminars = () => get('/api/carousel-seminars');
export const createCarouselSeminar = (data) => post('/api/admin/carousel-seminars', data);
export const updateCarouselSeminar = (id, data) => put(`/api/admin/carousel-seminars/${id}`, data);
export const deleteCarouselSeminar = (id) => del(`/api/admin/carousel-seminars/${id}`);
