import { get, post, put, del } from './client.js';

export const getBoardMembers = () => get('/api/structure/board');
export const createBoardMember = (data) => post('/api/structure/board', data);
export const updateBoardMember = (id, data) => put(`/api/structure/board/${id}`, data);
export const deleteBoardMember = (id) => del(`/api/structure/board/${id}`);

export const getUnionMembers = () => get('/api/structure/members');
export const createUnionMember = (data) => post('/api/structure/members', data);
export const updateUnionMember = (id, data) => put(`/api/structure/members/${id}`, data);
export const deleteUnionMember = (id) => del(`/api/structure/members/${id}`);
