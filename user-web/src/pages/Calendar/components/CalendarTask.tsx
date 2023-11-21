import { DEFAULT_PAGE_SIZE_ALL } from '@/common/contanst/constanst';
import CalendarCommon, { CalendarComponentProps, CalendarRef } from '@/components/CalendarCommon';
import { createEmptyArray } from '@/utils/array';
// import { getTaskManagerList, ITaskManagerRes } from '@/services/farming-plan';
import { getTextColor } from '@/utils/color';
import { myLazy } from '@/utils/lazy';
import { nanoid } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import moment from 'moment';
import { FC, ReactNode, Suspense, useCallback, useRef, useState } from 'react';
// import DetailWorkflow from '../Detail';

// const CreateTask = myLazy(() => import('@/pages/FarmingManagement/WorkflowManagement/Create'));
interface CalendarTaskProps {
  children?: ReactNode;
}
function getRandomDate(startDate: Date, endDate: Date) {
  // Calculate the time difference between the two dates
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const timeDiff = endTime - startTime;

  // Generate a random time within the time difference
  const randomTime = startTime + Math.random() * timeDiff;

  // Create a new date using the random time generated
  const randomDate = new Date(randomTime);

  return randomDate;
}
const randomTask = (startDate: Date, endDate: Date, title: string) => {
  const date = getRandomDate(startDate, endDate);
  return {
    id: nanoid(),
    start: dayjs(date).toISOString(),
    end: dayjs(date).add(4, 'hour').toISOString(),
    title: title,
    color: undefined,
  };
};
// // type https://fullcalendar.io/docs/event-source-object
// const taskToCalendarData = (task: ITaskManagerRes) => {
//   return {
//     id: task.name,
//     // start: new Date(t.exp_start_date),
//     // end: new Date(t.exp_end_date),
//     start: moment(task.start_date).toISOString(),
//     end: moment(task.end_date).toISOString(),
//     title: task.label,

//     type: task.status,
//     // site: tas,
//     // resourceId: task.site ? task.site : 'Unknow Site',
//     // url: `/farming-management/workflow-management/detail/${task.name}`,
//     // tar
//     color: task.tag_color || undefined,
//     //  text color dynamically
//     textColor: task.tag_color ? getTextColor(task.tag_color) : undefined,
//   };
// };
type CalendarProps = Required<Pick<CalendarComponentProps, 'calendarProps' | 'onCalendarEvents'>>;
const CalendarTask: FC<CalendarTaskProps> = ({ children }) => {
  const calendarRef = useRef<CalendarRef>(null);
  // const onEditSuccess =
  const reloadCalendar = () => {
    calendarRef.current?.getApi?.()?.refetchEvents?.();
  };

  /**
   * @description create
   */
  const [openCreate, setOpenCreate] = useState(false);
  const [currentSelectTime, setCurrentSelectTime] = useState<{
    start_date: null | moment.Moment;
    end_date: null | moment.Moment;
  }>({
    start_date: null,
    end_date: null,
  });
  const onCalendarSelect = useCallback<Required<CalendarProps['calendarProps']>['select']>(
    (arg) => {
      setCurrentSelectTime({
        start_date: moment(arg.start),
        end_date: moment(arg.end),
      });
      setOpenCreate(true);
    },
    [setCurrentSelectTime, setOpenCreate],
  );
  /**
   * @description detail
   */
  const [openDetail, setOpenDetail] = useState(false);
  const [detailId, setDetailId] = useState<null | string | undefined>(null);
  const onEventClick = useCallback<Required<CalendarProps['calendarProps']>['eventClick']>(
    (arg) => {
      setDetailId(arg.event._def.publicId);
      setOpenDetail(true);
    },
    [setOpenDetail, setDetailId],
  );
  const onCalendarEvents: CalendarProps['onCalendarEvents'] = useCallback(
    (info, successCallback, failureCallback) => {
      const tasks = createEmptyArray(10).map((item, index) =>
        randomTask(info.start, info.end, `Plan example ${index}`),
      );
      successCallback(tasks);
      // const filters = [['Task', 'exp_start_date', 'between', [timeRange[0], timeRange[1]]]];
      // getTaskManagerList({
      //   page: 1,
      //   size: DEFAULT_PAGE_SIZE_ALL,
      //   filters: [
      //     ['iot_farming_plan_task', 'start_date', '>=', info.startStr],
      //     ['iot_farming_plan_task', 'end_date', '<=', info.endStr],
      //   ],
      // })
      //   .then((res) => successCallback(res.data.map((item) => taskToCalendarData(item))))
      //   .catch((error) => failureCallback(error));
    },
    [],
  );

  return (
    <>
      <CalendarCommon
        ref={calendarRef}
        calendarProps={{
          // eventClick: onEventClick,
          // select: onCalendarSelect,
        }}
        onCalendarEvents={onCalendarEvents}
      />
      {/* <Suspense fallback={null}>
        {openCreate && (
          <CreateTask
            defaultValue={currentSelectTime}
            mode="modal"
            open={openCreate}
            onOpenChange={setOpenCreate}
            onCreateSuccess={reloadCalendar}
          />
        )}
        {openDetail && (
          <DetailWorkflow
            onEditSuccess={reloadCalendar}
            mode="modal"
            open={openDetail}
            onOpenChange={setOpenDetail}
            taskIdProps={detailId}
          />
        )}
      </Suspense> */}
    </>
  );
};

export default CalendarTask;
