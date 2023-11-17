import { API_URL_DEV } from '@/common/contanst';

export const genDownloadUrl = (fileUrl: string) => {
  return `${API_URL_DEV}/api/v2/file/download?file_url=${fileUrl}`;
};
