import jwt_decode from 'jwt-decode';

export const getAccessToken = () => {
  try {
    const info = JSON.parse(localStorage.getItem('token') || '{}');
    return (info.token as string) || null;
  } catch {
    return null;
  }
};
export const getInfoFromAccessToken = () => {
  try {
    const token = getAccessToken();
    const info = jwt_decode.jwtDecode(token as string)
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
