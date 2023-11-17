import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  data: any;
  errorCode?: number;
  message?: string;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { data, errorCode, message: errorMessage } = res as unknown as ResponseStructure;
      if (errorCode !== 1000) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { message: errorMessage, errorCode } = errorInfo;
          switch (errorInfo.errorCode) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        switch (error.response.status) {
          case 403:
            message.error('Permission Denied');
            break;
          case 401:
            //message.error("Unauthorized")
            // localStorage.removeItem('token');
            break;
          case 500:
            message.error(error.response.data.message);
            break;
          case 409:
            break;
          case 417:
            let msg = JSON.parse(error.response.data?._server_messages) || [];
            if (msg.length > 0) {
              let msg_detail = JSON.parse(msg[0]);
              if (msg_detail.message) message.error(msg_detail.message);
            }
            break;
          default:
            // message.error(`Error: ${error.response.data?.message}`);
            break;
        }
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 拦截请求配置，进行个性化处理。
      const url = config.url;
      const userdata = JSON.parse(localStorage.getItem('token') || '{}');
      if (userdata?.token) {
        const decode: any = jwtDecode(userdata?.token);
        // console.log(decode.iat);
        // console.log(moment().unix());
        if (moment().unix() > decode?.exp) {
          localStorage.removeItem('token');
        }
      }
      return {
        ...config,
        url,
        // withCredentials: true,
        headers: {
          ...(config.headers || {}),
          Authorization: `Bearer ${userdata?.token}`,
        },
      };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      if (data.coerrorCodede) {
        message.error('Yêu cầu không thành công!');
      }
      return response;
    },
  ],
};
