import { DEFAULT_DATE_FORMAT } from '@/common/contanst/constanst';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isBetween);
dayjs.extend(isoWeek);

export function getMondayFromWeekOfYear({
  year,
  weekOfYear,
}: {
  year: number;
  weekOfYear: number;
}) {
  const firstDayOfYear = dayjs().year(year).startOf('year');
  const targetMonday = firstDayOfYear.isoWeek(weekOfYear).startOf('isoWeek');
  return targetMonday.toISOString();
}

export const isDateBetween = ({
  start,
  end,
  date,
  format,
}: {
  start: string;
  end: string;
  date: string;
  format?: string;
}) => {
  if (!dayjs(start).isValid() || !dayjs(end).isValid() || !dayjs(date).isValid()) {
    console.error(`isDateBetween - Invalid date - date:${date} - start:${start} - end:${end}`);
    return false;
  }

  const compareDate = dayjs(date, format);
  const startDate = dayjs(start, format);
  const endDate = dayjs(end, format);

  // omitting the optional third parameter, 'units'
  return compareDate.isBetween(startDate, endDate);
};

export const formatDateDefault = (date: any) => {
  try {
    const day = dayjs(date);
    if (day.isValid()) return day.format(DEFAULT_DATE_FORMAT);
    return date;
  } catch (error) {
    return date;
  }
};
