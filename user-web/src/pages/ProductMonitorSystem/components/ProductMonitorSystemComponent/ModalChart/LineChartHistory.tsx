import HighChartComponent from '@/components/HighChartComponent';
import ProCardCommon from '@/components/ProCardCommon';
import { createEmptyArray } from '@/utils/array';
import { getRandomInt } from '@/utils/common';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { ProFormDateTimeRangePicker } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { useFullscreen } from 'ahooks';
import { Badge, Button, Result, Space, message } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { Chart } from 'highcharts';
import { random } from 'lodash';
import { FC, ReactNode, useEffect, useId, useRef, useState } from 'react';

dayjs.extend(duration);

interface ChartMonitorProps {
  children?: ReactNode;
}

const defaultStartTime = dayjs().subtract(1, 'month').valueOf();
const defaultEndTime = dayjs().valueOf();
const dateTime = 24 * 60 * 60 * 100;

const LineChartHistory: FC<ChartMonitorProps> = ({ children }) => {
  const [charProps, setChartProps] = useState<any>(null);
  const chartRef = useRef<Chart | null>(null);

  const [dateRange, setDateRange] = useState({
    startTs: defaultStartTime,
    endTs: defaultEndTime,
  });
  const dataChart = createEmptyArray(400).map((item, index) => ({
    total: random(100, 1000),
    target: getRandomInt(100, 1000),
    ts: dayjs().add(index, 'hour').valueOf(),
  }));
  const { loading, error } = useRequest(
    async (
      { startTs, endTs }: { startTs: number; endTs: number } = {
        startTs: dateRange.startTs,
        endTs: dateRange.endTs,
      },
    ) => {
      /**
       * @description
       *  nếu không có data từ api thì lấy data latest device
       */
      // if (!data) {
      //   data = (dataDevice?.latest_data || []).filter(
      //     (item) => item.key === dataFunction?.identifier,
      //   );
      // }

      return {
        data: {},
      };
    },
    {
      // refreshDeps: [deviceId, deviceKey, dateRange],
      debounceInterval: 300,
      onSuccess(data, params) {
        try {
          // Add a null value for the end date
          // dataChart.push([params[0]?.endTs || defaultStartTime, null as any]);

          // create the chart
          const chartProps: Highcharts.Options = {
            chart: {
              events: {
                // load: function () {
                //   // set up the updating of the chart each second
                //   let series = this.series[0];
                //   setInterval(function () {
                //     let x = new Date().getTime(), // current time
                //       y = Math.round(Math.random() * 100);
                //     series.addPoint([x, y], true, true);
                //   }, 30000); // 30 seconds
                // },
              },
              // zoomType: 'x',
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: true,
                  width: 10,
                  height: 10,
                },
              },
            },
            navigator: {
              // enabled: false,
              adaptToUpdatedData: false,

              series: {
                data: dataChart.map((item) => [item.ts, item.target, item.total]),
              },
            },

            // scrollbar: {
            //   liveRedraw: false,
            // },
            accessibility: {
              enabled: false,
            },

            time: {
              useUTC: false,
            },

            rangeSelector: {
              buttons: [
                {
                  count: 30,
                  type: 'minute',
                  text: '30m',
                },
                {
                  count: 1,
                  type: 'hour',
                  text: '1h',
                },
                {
                  count: 6,
                  type: 'hour',
                  text: '6h',
                },
                {
                  count: 1,
                  type: 'day',
                  text: '1d',
                },
                {
                  type: 'all',
                  text: '1Mth',
                },
              ],
              buttonTheme: {
                // width: 60,
              },
              inputEnabled: false,

              selected: 0,
              verticalAlign: 'top',
              x: 0,
              y: 0,
              inputPosition: {
                align: 'right',
                x: 0,
                y: 0,
              },
            },
            xAxis: {

              // events: {
              //   afterSetExtremes: async function (e) {
              //     const { chart } = e.target;
              //     chart.showLoading('Đang tải dữ liệu...');
              //     const newStartTime = Math.round(e.min);
              //     const newEndTime = Math.round(e.max);
              //     const res = await getDataTimeSeries({
              //       device_id_thingsboard: deviceId,
              //       startTs: newStartTime,
              //       endTs: newEndTime,
              //       keys: deviceKey,
              //       ...getParamsRequest({
              //         startTime: newStartTime,
              //         endTime: newEndTime,
              //         maxPoint: maxPoint,
              //       }),
              //     });
              //     const data = res?.[deviceKey];
              //     if (!data) {
              //       // message.error('Tìm nạp dữ liệu không thành công');
              //       // return;
              //     } else {
              //       chart.series[0].setData(formatDataChart(data));
              //     }
              //     chart.hideLoading();
              //   },
              // },
              // minRange: 60 * 1000 * 30, // 30 minute
              // // maxRange: 3600 * 1000 * 24,
            },
            yAxis: {
              floor: 0,
            },
            title: {
              // text: `History`,
            },

            exporting: {
              enabled: true,
            },

            // series: [
            //   {
            //     name: `Giá trị (${dataFunction?.unit})`,
            //     data: dataChart,
            //     dataGrouping: {
            //       enabled: false,
            //     },
            //   },
            // ],
            series: [
              {
                type: 'column',
                id: 'volume',
                // yAxis: 1,
                name: 'Total',
                data: dataChart.map((item) => [item.ts, item.total]),
                dataGrouping:{
                  enabled:true
                }
              },
              {
                name: 'Target',
                data: dataChart.map((item) => [item.ts, item.target]),
                dataGrouping:{
                  enabled:true
                },
                type: 'line',
              },
            ],
          };
          setChartProps(chartProps);
        } catch (error) {
          throw new Error();

          console.log('error: ', error);
        }
      },
    },
  );
  /**
   * @description realtime data chart
   */
  // const { mqttClient } = useModel('MQTTNotification');
  const [isRealtime, setIsRealtime] = useState(false);
  useEffect(() => {
    if (loading) {
      // change to realtime
      setIsRealtime(false);
    }
  }, [loading]);
  // const handleMessageMQTT: OnMessageCallback = (topic, msg) => {
  //   try {
  //     const data: any[] = JSON.parse(msg.toString());
  //     if (Array.isArray(data)) {
  //       const deviceIdThingsBoard = topic.split('/')[topic.split('/').length - 2];

  //       if (deviceIdThingsBoard === deviceId && chartRef.current) {
  //         if (!isRealtime) {
  //           setIsRealtime(true);
  //         }
  //         let deviceData = data.filter((d) => {
  //           return d.key !== 'deviceId' && d.key === deviceKey;
  //         });
  //         deviceData = deviceData.map((d) => {
  //           d.ts = parseInt(d.ts.toString());
  //           return d;
  //         });
  //         // kiểm tra data có timestamp có lớn hơn data hiện tai của  chart không

  //         const currentDataChart = chartRef.current?.series[0].data;
  //         let latestTimestamp = 0;
  //         if (currentDataChart) {
  //           latestTimestamp = currentDataChart[currentDataChart.length - 1].x;
  //         }
  //         deviceData = deviceData.filter((item) => item.ts >= latestTimestamp);
  //         // add data
  //         formatDataChart(deviceData).forEach((item) => {
  //           chartRef.current?.series[0].addPoint(item, true, true);
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  // const handleDisconnect = useCallback(() => {
  //   setIsRealtime(false);
  // }, [setIsRealtime]);
  // useEffect(() => {
  //   if (mqttClient.connected && !loading) {
  //     mqttClient.on('message', handleMessageMQTT);
  //     // disconnect
  //     mqttClient.on('disconnect', handleDisconnect);
  //     mqttClient.on('close', handleDisconnect);
  //     mqttClient.on('offline', handleDisconnect);
  //   }
  //   return () => {
  //     mqttClient.off('message', handleMessageMQTT);
  //     mqttClient.off('disconnect', handleDisconnect);
  //     mqttClient.off('close', handleDisconnect);
  //     mqttClient.off('offline', handleDisconnect);
  //   };
  // }, [deviceId, deviceKey, mqttClient, loading]);
  /**
   * @description fullscreen
   *
   */
  const idWrapper = useId();
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(() =>
    document.getElementById(idWrapper),
  );

  return (
    <ProCardCommon
      id={idWrapper}
      spinning={loading}
      bordered
      headerBordered={false}
      title={{
        icon: <Badge status={isRealtime ? 'success' : 'default'} />,
        // text: `${dataFunction?.label} (${dataFunction?.unit})`,
      }}
      extra={
        <Space>
          <ProFormDateTimeRangePicker
            disabled={loading}
            allowClear={false}
            fieldProps={{
              value: [dayjs(dateRange.startTs), dayjs(dateRange.endTs)],
              onChange(values, formatString) {
                const startTime = values?.[0];
                const endTime = values?.[1];
                if (startTime && endTime) {
                  // Tính toán khoảng thời gian giữa "start time" và "end time"
                  const timeDifference = endTime.diff(startTime);

                  // Tính số mili giây tương ứng với một tháng
                  const oneMonthInMilliseconds = dayjs.duration(1, 'month').asMilliseconds();

                  // So sánh khoảng thời gian với một tháng
                  if (timeDifference > oneMonthInMilliseconds) {
                    // console.log('Khoảng thời gian lớn hơn một tháng.');
                    message.error('Khoảng thời gian nhỏ hơn hoặc bằng một tháng.');
                  } else {
                    //  console.log('Khoảng thời gian không lớn hơn một tháng.');
                    setDateRange({
                      startTs: startTime.valueOf(),
                      endTs: endTime.valueOf(),
                    });
                  }
                }
              },
            }}
            noStyle
            key=""
            width={400}
          />
          ,
          <Button
            key="fullscreen"
            onClick={() => {
              toggleFullscreen();
            }}
            icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          />
        </Space>
      }
    >
      {error ? (
        <Result status="info" title="Thiết bị hiện chưa có dữ liệu" />
      ) : (
        charProps && (
          <HighChartComponent
            chartCb={(chart) => (chartRef.current = chart)}
            chartProps={charProps}
          />
        )
      )}
    </ProCardCommon>
  );
};

export default LineChartHistory;
