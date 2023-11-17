/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import { intersection } from 'lodash';
import { RoleEnum, SECTION_PERMISSION } from './types/auth.type';
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
const getRoleAccessPage = (role?: RoleEnum | RoleEnum[]): RoleEnum[] => {
  const result = [RoleEnum.CUSTOMER_ADMIN];
  if (role) {
    if (Array.isArray(role)) {
      result.push(...role);
    } else {
      result.push(role);
    }
  }
  return result;
};
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  let tokenPayload = getInfoFromAccessToken();
  // Use optional chaining and nullish coalescing to safely handle tokenPayload
  if (!tokenPayload?.hasOwnProperty('sections') || !tokenPayload.sections) {
    if (tokenPayload) {
      tokenPayload.sections = ''; // Initialize sections as an empty array
    }
  }
  console.log('tokenPayload', tokenPayload);
  return {
    isIoTUser: currentUser && canAccessAdminDashboard(currentUser.user_type),
    isAdmin: currentUser && onlyAdminAdmin(currentUser.user_type),

    /**
     * @description role
     */

    IS_ROLE_TECHNICIAN_EMPLOYEE:
      currentUser && tokenPayload && tokenPayload.user_role.includes(RoleEnum.TECHNICIAN_EMPLOYEE),
    IS_ROLE_CUSTOMER_ADMIN:
      (currentUser && tokenPayload && tokenPayload.user_role.includes(RoleEnum.CUSTOMER_ADMIN)) ||
      tokenPayload?.is_admin,
    IS_ROLE_ADMIN_WAREHOUSE:
      currentUser && tokenPayload && tokenPayload.user_role.includes(RoleEnum.ADMIN_WAREHOUSE),

    /**
     * @description access page
     */
    canAccessPageFarmingManagement: () => {
      return (
        currentUser &&
        intersection(getRoleAccessPage([RoleEnum.TECHNICIAN_EMPLOYEE]), tokenPayload?.user_role)
          .length
      );
    },
    canAccessPageProjectManagement: () => {
      return (
        currentUser &&
        intersection(getRoleAccessPage([RoleEnum.TECHNICIAN_EMPLOYEE]), tokenPayload?.user_role)
          .length
      );
    },
    canAccessPageCategory: () => {
      return (
        currentUser &&
        intersection(getRoleAccessPage([RoleEnum.ADMIN_WAREHOUSE]), tokenPayload?.user_role).length
      );
    },
    canAccessPageStorageManagement: () => {
      return (
        currentUser &&
        intersection(getRoleAccessPage([RoleEnum.ADMIN_WAREHOUSE]), tokenPayload?.user_role).length
      );
    },
    canAccessPageIotDeviceManagement: () => {
      return (
        currentUser &&
        intersection(getRoleAccessPage([RoleEnum.TECHNICIAN_EMPLOYEE]), tokenPayload?.user_role)
          .length
      );
    },
    canAccessPageEmployeeManagement: () => {
      return currentUser && intersection(getRoleAccessPage([]), tokenPayload?.user_role).length;
    },

    /**
     * @description access actions
     */
    canDeleteAllInPageAccess: () => {
      return Boolean(
        currentUser &&
          intersection(getRoleAccessPage([RoleEnum.ADMIN_WAREHOUSE]), tokenPayload?.user_role)
            .length,
      );
    },

    /**
     * @description ACCESS PAGE (DYNAMIC ROLE)
     */
    //TASK
    canAccessPageWorkFlowManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.TASK_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInWorkFlowManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.TASK_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInWorkFlowManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.TASK_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInWorkFlowManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.TASK_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    //CROP
    canAccessPageSeasonalManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CROP_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInSeasonalManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CROP_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInSeasonalManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CROP_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInSeasonalManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CROP_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    //PLAN
    canAccessPagePlanManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PLAN_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInPlanManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PLAN_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInPlanManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PLAN_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInPlanManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PLAN_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    //STATE
    canAccessPageStateManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.STATE_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInStateManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.STATE_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInStateManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.STATE_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInStateManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.STATE_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    //PLANT
    canAccessPagePlantManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PLANT_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInPlantManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PLANT_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInPlantManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PLANT_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInPlantManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PLANT_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    //PROJECT
    canAccessPageProjectNewManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PROJECT_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInProjectManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PROJECT_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInProjectManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PROJECT_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInProjectManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PROJECT_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    // canAccessPageProjectNewManagement2: () => {
    //   const condition = tokenPayload
    //     ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_READ) ||
    //       tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
    //     : false;
    //   return Boolean(currentUser && condition);
    // },
    //CATEGORY
    canAccessPageCategoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInCategoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInCategoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInCategoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    //PRODUCT
    canAccessPageProductManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PRODUCT_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInProductManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PRODUCT_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInProductManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PRODUCT_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInProductManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PRODUCT_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    //STORAGE
    canAccessPageStorageNewManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.STORAGE_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInStorageNewManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.STORAGE_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInStorageNewManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.STORAGE_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInStorageNewManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.STORAGE_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    //CATEGORY_INVENTORY
    canAccessPageCategoryInventoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_INVENTORY_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInCategoryInventoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_INVENTORY_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canCreateInCategoryInventoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_INVENTORY_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInCategoryInventoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.CATEGORY_INVENTORY_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    //PRODUCT_INVENTORY
    canAccessPageProductInventoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PRODUCT_INVENTORY_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canUpdateInProductInventoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PRODUCT_INVENTORY_UPDATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    canCreateInProductInventoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PRODUCT_INVENTORY_CREATE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },
    canDeleteInProductInventoryManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.PRODUCT_INVENTORY_DELETE) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    canAccessPageEmployeeNewManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.EMPLOYEE_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    canAccessPageRoleManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.ROLE_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    canAccessPageTimeKeepingManagement: () => {
      const condition = tokenPayload
        ? tokenPayload.sections.includes(SECTION_PERMISSION.TIMEKEEPING_READ) ||
          tokenPayload.sections.includes(SECTION_PERMISSION.SYSTEM_ADMIN)
        : false;
      return Boolean(currentUser && condition);
    },

    canAccessAny: () => {
      const condition = true;
      return Boolean(currentUser && condition);
    },
  };
}
