import { request } from '@umijs/max';
import { jwtDecode } from "jwt-decode";
import { generateAPIPath } from './utils';



export async function getUserInfo(): Promise<{
  data: API.CurrentUser | undefined;
}> {
  // return request(generateAPIPath('api/auth/me'), {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  try {
    const allToken = JSON.parse(localStorage.getItem('token') || '{}');
    const token = allToken?.token;
    if (token) {
      const decoded = jwtDecode(token);
      return {
        data: decoded as any,
      };
    }
  } catch (error) {
    console.log('error: ', error);
  }
  return {
    data: {},
  };
}

export async function toogleUserStatus() {
  return request(generateAPIPath('api/auth/me'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getAllResources() {
  return request(generateAPIPath('api/pyriot/resource/all'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function upload(file: any, options?: any) {
  const formData = new FormData();
  formData.append('file', file);
  return request(generateAPIPath(`/api/auth/upload-image`), {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

export async function createUser(body: any, options?: any) {
  if (body.file) {
    const resUpload = await upload(body.file);
    body.image_url = resUpload.data;
  }
  delete body.file;
  return request(generateAPIPath('/api/enterprise/user/create'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteUser(id: string) {
  return request(generateAPIPath(`/api/enterprise/user/${id}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateUser(body: any, id: string) {
  return request(generateAPIPath(`/api/enterprise/user/${id}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
