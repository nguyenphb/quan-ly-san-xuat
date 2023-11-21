import { ReloadOutlined } from '@ant-design/icons';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import {
CalendarOptions,
EventClickArg,
EventSourceFunc,
EventSourceInput
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getLocale,useModel } from '@umijs/max';
import { Button,Card,CardProps,notification,Spin,theme } from 'antd';
import React,{ memo,useCallback,useMemo,useRef,useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import './index.scss';

// type https://fullcalendar.io/docs/event-source-object
export interface CalendarComponentProps {
  calendarProps?: Omit<CalendarOptions, 'ref'>;
  eventClick?: (event?: EventClickArg | undefined) => void;
  onLoadingChange?: (loading: boolean) => void;
  cardProps?: CardProps;
  /**
   * @description for get data
   * @example
   * getPlanByTimeRange({
   *      timeRange: [
   *         moment(info.startStr).format('YYYY-MM-DD HH:mm:ss'),
   *         moment(info.endStr).format('YYYY-MM-DD HH:mm:ss'),
   *      ],
   *     })
   *      .then((res) => successCallback(res))
   *      .catch((err) => failureCallback(err));
   *  },
   */
  onCalendarEvents?: EventSourceFunc;
  /**
   * @description for get data error
   */
  onCalendarFailure?: (error: Error) => void;
}
export type CalendarRef = FullCalendar & {
  currentEventClick?: EventClickArg;
};
const CalendarPlansComponent = React.forwardRef<CalendarRef, CalendarComponentProps>((props, ref) => {
  const calendarProps = props.calendarProps;
  const locale = getLocale() as string;
  const fullCalendarRefLocal = useRef<CalendarRef>(null);

  const plugins = useMemo(
    () => [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      listPlugin,
      bootstrap5Plugin,
      multiMonthPlugin,
    ],
    [],
  );

  const headerToolbar = useMemo(
    () => ({
      left: 'prev,next today',
      center: 'title',
      // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    }),
    [],
  );

  // memo event not change state loading
  const [loading, setLoading] = useState(false);

  /**
   * @description
   * for get current event click
   * to mutate and remove current click
   */
  const onEventClick = useCallback(
    (event: EventClickArg) => {
      if (fullCalendarRefLocal.current?.currentEventClick) {
        // set current event click
        fullCalendarRefLocal.current.currentEventClick = event;
      }
      calendarProps?.eventClick?.(event);
    },
    [fullCalendarRefLocal.current],
  );

  const events = useMemo<EventSourceInput>(
    () => ({
      events: props.onCalendarEvents,
      failure(error) {
        if (props.onCalendarFailure) {
          props.onCalendarFailure(error);
          return;
        }
        if (error.message === 'Network Error') {
          notification.error({
            message: 'Network Error',
          });
        }
      },
    }),
    [props.onCalendarEvents, props.onCalendarFailure],
  );
  // for refreshing button
  const onRefresh = useCallback(() => {
    fullCalendarRefLocal.current?.getApi().refetchEvents();
  }, [fullCalendarRefLocal]);

  const onLoadingChange = useCallback(
    (isLoading: boolean) => {
      props.onLoadingChange?.(isLoading);
      setLoading(isLoading);
    },
    [props.onLoadingChange, setLoading],
  );
  // theme
  const { initialState } = useModel('@@initialState');
  const tokenTheme = theme.useToken().token;
  const isDarkMode = initialState?.settings?.navTheme !== 'light';

  return (
    <>
      <Card
        extra={<Button key="reload" onClick={onRefresh} icon={<ReloadOutlined />} />}
        {...props.cardProps}
      >
        <Spin spinning={loading}>
          <div
            className={'fc-calendar-plan-bs'}
            style={{
              backgroundColor: isDarkMode ? tokenTheme.colorBgContainer : undefined,
              color: isDarkMode ? tokenTheme.colorText : undefined,
            }}
          >
            <FullCalendar
              ref={mergeRefs([fullCalendarRefLocal, ref])}
              firstDay={1} // start week monday https://fullcalendar.io/docs/firstDay
              themeSystem={isDarkMode ? 'Darkly' : 'bootstrap5'}
              plugins={plugins}
              headerToolbar={headerToolbar}
              initialView="timeGridWeek"
              buttonText={{
                today: 'Hôm nay',
              }}
              views={{
                multiMonthYear: { buttonText: 'Năm' },
                dayGridMonth: { buttonText: 'Tháng' },
                timeGridWeek: { buttonText: 'Tuần' },
                timeGridDay: { buttonText: 'Ngày' },
                list: { buttonText: 'Danh sách' },
              }}
              // editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              weekNumbers={true}
              // time zone
              timeZone="ISO8601"
              displayEventTime
              loading={onLoadingChange}
              locale={locale}
              nowIndicator={true}
              events={events} //https://fullcalendar.io/docs/event-source
              {...calendarProps}
              eventClick={onEventClick}
            />
          </div>
        </Spin>
      </Card>
    </>
  );
});
export default memo(CalendarPlansComponent);
