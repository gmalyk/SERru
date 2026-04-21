import { get, post, put, del } from './client.js';

export const getAboutDocuments = (section) =>
  get(section ? `/api/about/documents?section=${section}` : '/api/about/documents');
export const createAboutDocument = (data) => post('/api/about/documents', data);
export const updateAboutDocument = (id, data) => put(`/api/about/documents/${id}`, data);
export const deleteAboutDocument = (id) => del(`/api/about/documents/${id}`);
