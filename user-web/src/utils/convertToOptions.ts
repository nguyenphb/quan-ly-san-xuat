import { EmployeeTypes } from '@/types';

export const convertClassValueToOption = (item: any) => {
  if (Array.isArray(item)) {
    return item.map((i) => ({
      label: `${i.name} ${i.class_label || ''}  ${i.company_id || ''}`,
      value: i.name,
    }));
  }
  return {
    label: `${item.name} ${item.class_label || ''}  ${item.company_id || ''}`,
    value: item.name,
  };
};

export const convertStudentValueToOption = (item: any) => {
  if (Array.isArray(item)) {
    return item.map((i) => ({
      label: i.name + ' - ' + i.student_first_name + ' ' + i.student_last_name,
      value: i.name,
    }));
  }
  return {
    label: item.name + ' - ' + item.student_first_name + ' ' + item.student_last_name,
    value: item.name,
  };
};

export const convertEmployeeValueToOption = (item: any) => {
  if (Array.isArray(item)) {
    return item.map((i) => ({
      label: `${i.name} - ${i.employee_first_name || ''}  ${i.employee_last_name || ''}`,
      value: i.name,
    }));
  }
  return {
    label: `${item.name} - ${item.employee_first_name || ''}  ${item.employee_last_name || ''}`,
    value: item.name,
  };
};

export const convertEmployeeValueToBookingOption = (item: EmployeeTypes | EmployeeTypes[]) => {
  if (Array.isArray(item)) {
    return item.map((i: EmployeeTypes) => ({
      value: `${i.employee_id}|${i.department}+${i?.employee_first_name} ${i?.employee_last_name}`,
      label: `${i.department}(${i?.employee_first_name} ${i?.employee_last_name})`,
    }));
  }
  return {
    value: `${item.employee_id}|${item.department}+${item?.employee_first_name} ${item?.employee_last_name}`,
    label: `${item.department}(${item?.employee_first_name} ${item?.employee_last_name})`,
  };
};

export const convertEmployeeValueToSelect = (item: EmployeeTypes | EmployeeTypes[]) => {
  if (Array.isArray(item)) {
    return item.map((i: EmployeeTypes) => ({
      value: `${i.employee_id}`,
      label: `${i.department}-${i.name}(${i?.employee_first_name} ${i?.employee_last_name})`,
    }));
  }
  return {
    value: `${item.employee_id}`,
    label: `${item.department}-${item.name}(${item?.employee_first_name} ${item?.employee_last_name})`,
  };
};
