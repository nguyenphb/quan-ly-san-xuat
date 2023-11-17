import { history, request } from '@umijs/max';
import { stringify } from 'querystring';
import { generateAPIPath } from './utils';


export async function login(
  body: { usr: string; pwd: string, device: string },
  options?: Record<string, any>,
) {
  return request(generateAPIPath('api/v2/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export const loginOut = async () => {
  return request(generateAPIPath('api/auth/logout'), {
    method: 'GET'
  });
};

export async function forgotPassword(body: { email: string }, options?: Record<string, any>) {
  return request(generateAPIPath('api/v2/auth/reset-by-email-uuid'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function resetPasswordByToken(
  body: { key: string; new_password: string },
  options?: Record<string, any>,
) {
  return request(generateAPIPath('api/v2/auth/reset-password-uuid'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function userResetPassword(
  body: { new_password: string },
  options?: Record<string, any>,
) {
  return request(generateAPIPath('api/auth/user-change-password'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}