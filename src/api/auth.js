import { get, post } from './client.js';

export const login = (email, password) => post('/api/auth/login', { email, password });
export const logout = () => post('/api/auth/logout', {});
export const checkAuth = () => get('/api/auth/me');
