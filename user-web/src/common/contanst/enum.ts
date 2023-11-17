export enum USER_TYPE {
  AXCELA_ACADEMIC_LEADER = 'Axcela Academic Leader',
  AXCELA_ACADEMIC = 'Axcela Academic',
  AXCELA_COACH_LEADER = 'Axcela Coach Leader',
  AXCELA_COACH_FULLTIME = 'Axcela Coach Fulltime',
  AXCELA_COACH_MEMBER = 'Axcela Coach Member',
  CUSTOMER_BUSINESS_HR = 'Customer Business HR',
  AXCELA_SALE = 'Axcela Sale',
  AXCELA_SALE_LEADER = 'Axcela Sale Leader',
  AXCELA_STUDENT = 'Axcela Student',
  AXCELA_TEACHER = 'Axcela Teacher',
  AXCELA_HR = 'Axcela HR',
  AXCELA_SYSTEM_ADMIN = 'Axcela admin',
}

export enum ACTION_PERMISSION {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  DOWNLOAD_FILE = 'DOWNLOAD_FILE',
  UPLOAD_FILE = 'UPLOAD_FILE',
}

export enum TASK_STATUS_COLOR {
  OPEN = '#A3E4D7',
  SCHEDULING = '#F9E79F',
  UPCOMING = '#7D3C98',
  COMPLETED = '#3498DB',
  RESCHEDULED = '#F9E79F',
  CANCELLED = '#E74C3C',
}

export enum TASK_STATUS {
  OPEN = 'Open',
  SCHEDULING = 'Scheduling',
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
  RESCHEDULED = 'Rescheduled',
  CANCELLED = 'Cancelled',
}
