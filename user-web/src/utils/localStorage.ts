import { jwtDecode } from 'jwt-decode';

export const getAccessToken = () => {
  try {
    const info = JSON.parse(localStorage.getItem('token') || '{}');
    // return (info.token as string) || null;
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjk2NTQyNTQ2MDEsInVzZXJuYW1lIjoibXl1c2VyIiwiYWNsIjp7InB1YiI6W10sInN1YiI6WyJtZWlncm91cC90aGluZ3MvdjIvN2IxMTg2MjAtOGMzNy0xMWVlLWFhNjQtMzU5NDVlMjQ1NTIzL3RlbGVtZXRyeSIsIm1laWdyb3VwL3RoaW5ncy92Mi83YWY5ZGY3MC04YzM3LTExZWUtYWE2NC0zNTk0NWUyNDU1MjMvdGVsZW1ldHJ5IiwibWVpZ3JvdXAvdGhpbmdzL3YyLzdhZjRkNjYwLThjMzctMTFlZS1hYTY0LTM1OTQ1ZTI0NTUyMy90ZWxlbWV0cnkiLCJtZWlncm91cC90aGluZ3MvdjIvN2FlZjBhMDAtOGMzNy0xMWVlLWFhNjQtMzU5NDVlMjQ1NTIzL3RlbGVtZXRyeSIsIm1laWdyb3VwL3RoaW5ncy92Mi83YWU0NWJhMC04YzM3LTExZWUtYWE2NC0zNTk0NWUyNDU1MjMvdGVsZW1ldHJ5IiwibWVpZ3JvdXAvdGhpbmdzL3YyLzdhZTNlNjcyLThjMzctMTFlZS1hYTY0LTM1OTQ1ZTI0NTUyMy90ZWxlbWV0cnkiLCJtZWlncm91cC90aGluZ3MvdjIvN2FlM2U2NzEtOGMzNy0xMWVlLWFhNjQtMzU5NDVlMjQ1NTIzL3RlbGVtZXRyeSIsIm1laWdyb3VwL3RoaW5ncy92Mi83YWUzZTY3MC04YzM3LTExZWUtYWE2NC0zNTk0NWUyNDU1MjMvdGVsZW1ldHJ5Il0sImFsbCI6WyJ0ZXN0YWxsIl19fQ.Jv2WGGumyPhfJfui5qHCUhe2tYKFuY-3YAfbIr68UC4';
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
