import { post } from './client.js';

export async function uploadFile(file, folder = 'images') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  return post('/api/admin/upload', formData);
}
