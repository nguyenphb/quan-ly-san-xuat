/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import { intersection } from 'lodash';
import { getInfoFromAccessToken } from './utils/localStorage';

const ALL_USER_TYPE_LIST = {
  'Viis IoT User': 'Viis IoT User',
  'System User': 'System User',
};

const canAccessAdminDashboard = (user_type: string) => {
  const user_type_value = Object.values(ALL_USER_TYPE_LIST);
  const match = user_type_value.filter((u) => u === user_type);
  if (match.length > 0) {
    return true;
  } else {
    return false;
  }
};

const onlyAdminAdmin = (user_type: string) => {
  return user_type === 'System User';
};
/**
 * @description default admin is access all page and all actions
 */

export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  let tokenPayload = getInfoFromAccessToken();
  // Use optional chaining and nullish coalescing to safely handle tokenPayload
  // if (!tokenPayload?.hasOwnProperty('sections') || !tokenPayload.sections) {
  //   if (tokenPayload) {
  //     tokenPayload.sections = ''; // Initialize sections as an empty array
  //   }
  // }
  // console.log('tokenPayload', tokenPayload);
  return {
    isIoTUser: currentUser && canAccessAdminDashboard(currentUser.user_type),
    isAdmin: currentUser && onlyAdminAdmin(currentUser.user_type),


  };
}
