import { post } from './client.js';

export async function uploadFile(file, folder = 'images') {
  const formData = new FormData();
  formData.append('folder', folder);
  formData.append('file', file);
  return post('/api/admin/upload', formData);
}
