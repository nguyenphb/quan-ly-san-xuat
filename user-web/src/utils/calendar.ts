import { EmployeeWorkTimeType } from '@/types/employeeWorkTime.type';
import { endOfWeek, startOfWeek } from 'date-fns';
import moment from 'moment';

const minuteOfDay = (moment: moment.Moment) => moment.get('hours') * 60 + moment.get('minutes');

export const getCurrentWeek = () => {
  const _startOfWeek = moment(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const _endOfWeek = moment(endOfWeek(new Date(), { weekStartsOn: 1 }));

  const days = [];
  let day = _startOfWeek;

  while (day <= _endOfWeek) {
    days.push(day.toDate());
    day = day.clone().add(1, 'd');
  }
  return days;
};

export const checkWorkingTime = (
  employeeWorkingTime: EmployeeWorkTimeType[],
  date: Date,
  resourceId?: string | number | undefined,
) => {
  if (!resourceId) {
    return {
      style: {},
      className: '',
    };
  }
  let isFree = false;
  const currentResource = employeeWorkingTime.filter((e) => e.employee_id === resourceId);
  if (!currentResource.length) {
    return {
      style: { backgroundColor: 'rgba(0, 0, 0, 0.16)' },
      className: '',
    };
  }
  const currentWeek = getCurrentWeek();
  const interval = currentResource.filter((e) => e.type === 'Interval');
  const temporary = currentResource.filter(
    (e) =>
      e.type === 'Temporary' &&
      moment(e.valid_from_datetime).isAfter(moment(currentWeek[0])) &&
      moment(e.valid_end_datetime).isBefore(moment(currentWeek[currentWeek.length - 1])),
  );
  if (currentResource) {
    const workTime = interval.concat(temporary);

    if (workTime && workTime.length) {
      workTime.forEach((t) => {
        if (moment(date).get('day') !== moment(t.work_time_start).get('day')) {
          return;
        }
        const currentMinuteOfDay = minuteOfDay(moment(date));

        const startMinutes = minuteOfDay(moment(t.work_time_start));
        const endMinutes = minuteOfDay(moment(t.work_time_end));
        if (currentMinuteOfDay >= startMinutes && currentMinuteOfDay < endMinutes) {
          isFree = true;
        }
      });
    }
  }

  if (isFree) {
    return {
      style: {},
      className: '',
    };
  }

  return {
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.16)',
    },
    className: '',
  };
};
