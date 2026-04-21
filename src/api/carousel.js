import { get, post, put, del } from './client.js';

export const getCarouselSeminars = () => get('/api/carousel-seminars');
export const createCarouselSeminar = (data) => post('/api/carousel-seminars', data);
export const updateCarouselSeminar = (id, data) => put(`/api/carousel-seminars/${id}`, data);
export const deleteCarouselSeminar = (id) => del(`/api/carousel-seminars/${id}`);
