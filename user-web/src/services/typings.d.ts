// @ts-ignore

declare namespace API {
  type ResponseResult<T> = {
    result: T;
  };
  type PaginationResponseResult<T> = {
    result: {
      data: T;
      pagination: {
        pageNumber: number;
        pageSize: number;
        totalElements: number;
        totalPages: number;
        order_by: string;
      };
    };
  };
  type ListParamsReq = {
    page?: number;
    size?: number;
    fields?: string[];
    filters?: any;
    or_filters?: any;
    order_by?: string;
    group_by?: string;
  };
  type RequestLogin = {
    usr: string;
    pwd: string;
    device: string;
  };
  export interface User {
    id: string;
    address: string;
    email: string;
    image_url: string;
    name: string;
    phone: string;
    resource_id: string;
    role: string;
    status: boolean;
    username: string;
  }


}
