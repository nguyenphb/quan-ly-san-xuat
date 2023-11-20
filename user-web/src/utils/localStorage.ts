import { jwtDecode } from 'jwt-decode';

export const getAccessToken = () => {
  try {
    const info = JSON.parse(localStorage.getItem('token') || '{}');
    // return (info.token as string) || null;
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjk2NTQyNTQ2MDEsInVzZXJuYW1lIjoibXl1c2VyIiwiYWNsIjp7InB1YiI6W10sInN1YiI6WyJtZWlncm91cC90aGluZ3MvdjIvOGQ0NzI0NDAtODc0Zi0xMWVlLWIyODEtMDdkYzQ5NzEwMTU2L3RlbGVtZXRyeSIsIm1laWdyb3VwL3RoaW5ncy92Mi8zMjM3NTgwMC04NzA4LTExZWUtYjI4MS0wN2RjNDk3MTAxNTYvdGVsZW1ldHJ5Il0sImFsbCI6WyJ0ZXN0YWxsIl19fQ.tXU-HrQPp3krKe0989xKklZ22fPSaNtBjOWBuKWRuVQ';
  } catch {
    return null;
  }
};
export const getInfoFromAccessToken = () => {
  try {
    const token = getAccessToken();
    const info = jwtDecode(token as string);
    // if (info.is_admin) {
    //   info.user_role.push(RoleEnum.CUSTOMER_ADMIN);
    // }
    // return {
    //   ...info,
    //   // user_role:Object.keys(RoleEnum)
    //   // user_role: [RoleEnum.TECHNICIAN_EMPLOYEE],
    //   user_role:[...info.user_role,]
    // } as ITokenInfo;
    return info;
  } catch (error) {
    return null;
  }
};
