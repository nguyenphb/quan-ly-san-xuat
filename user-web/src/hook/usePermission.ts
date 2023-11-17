import { ACTION_PERMISSION, USER_TYPE } from '@/common/contanst';
import {
  CLASS_PERMISSIONS,
  COACH_LESSON_PERMISSIONS,
  COMPANY_PERMISSIONS,
  COURSE_PERMISSIONS,
  DYNED_APP_PERMISSIONS,
  EMPLOYEE_PERMISSIONS,
  STUDENT_PERMISSIONS,
  TEACHER_LESSON_PERMISSIONS,
} from '@/common/contanst/variables';
import { useModel } from '@umijs/max';

const usePermission = (docname: string) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const hasActionPermission = (listAction: ACTION_PERMISSION[]) => {
    const hasPermission: { [key in ACTION_PERMISSION]: boolean } = {
      [ACTION_PERMISSION.CREATE]: false,
      [ACTION_PERMISSION.READ]: false,
      [ACTION_PERMISSION.DELETE]: false,
      [ACTION_PERMISSION.UPDATE]: false,
      [ACTION_PERMISSION.DOWNLOAD_FILE]: false,
      [ACTION_PERMISSION.UPLOAD_FILE]: false,
    };
    if (currentUser) {
      const userType = currentUser.user_type as USER_TYPE;

      switch (docname) {
        case 'Students':
          STUDENT_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;

        case 'Company HR':
          COMPANY_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;

        case 'Customer Company':
          COMPANY_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;

        case 'Axcela English Course':
          COURSE_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;

        case 'Coach Lesson':
          COACH_LESSON_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;

        case 'Teacher Lesson':
          TEACHER_LESSON_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;

        case 'Axcela Dyned Account':
          DYNED_APP_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;
        case 'Class':
          CLASS_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;
        case 'Employees':
          EMPLOYEE_PERMISSIONS[userType].actions.forEach((action) => {
            hasPermission[action as ACTION_PERMISSION] = listAction.some((a) => a === action);
          });
          break;
        default:
          break;
      }
    }

    return hasPermission;
  };
  return {
    hasActionPermission,
  };
};
export default usePermission;
