import { formatNumberSummary } from '@/utils/format';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import Highcharts, { Chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { cloneDeep, merge } from 'lodash';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';

require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/stock')(Highcharts);
require('highcharts/modules/variable-pie')(Highcharts);
require('highcharts/modules/full-screen')(Highcharts);
HighchartsMore(Highcharts);
dayjs.extend(localeData);
Highcharts.setOptions({
  lang: {
    months: dayjs.months(),
    weekdays: dayjs.weekdays(),
    shortMonths: dayjs.monthsShort(),
    shortWeekdays: dayjs.weekdaysShort(),
  },
});
type HighChartComponentPropsType = {
  chartProps: Highcharts.Options;
  chartCb?: (chart: Chart) => void;
};

const defaultChartProps: Highcharts.Options = {
  exporting: {
    enabled: true,
    buttons: {
      contextButton: {
        menuItems: ['downloadPNG', 'downloadSVG'],
      },
    },
    // sourceWidth: 4000,
    // sourceHeight: 400,
    chartOptions: {
      xAxis: [
        {
          min: 0,
          max: null,
        },
      ],
    },
  },
  tooltip: {
    shared: false, //https://github.com/highcharts/highcharts/issues/12287
  },
  chart: {
    // events: {
    //   render: function () {
    //     this.reflow();
    //   },
    // },
  },
  // title: {
  //   text: '',
  // },
  // xAxis: {
  //   labels: {
  //     autoRotation: undefined,
  //   },
  scrollbar: {
    liveRedraw: false, // Tắt vẽ lại liên tục để tối ưu hóa hiệu suất
  },
  //   events: {
  //     afterSetExtremes: function (e) {
  //       (this.chart?.scrollingContainer as HTMLDivElement)?.scrollTo({
  //         left: 0,

  //         behavior: 'instant',
  //       });
  //     },
  //   },
  // },
  credits: {
    enabled: false,
  },
  yAxis: {
    // title: {
    //   text: '',
    // },
    startOnTick: true,
    endOnTick: true,
    gridLineDashStyle: 'Dash',
    stackLabels: {
      enabled: false,
    },
    scrollbar: {
      liveRedraw: false, // Tắt vẽ lại liên tục để tối ưu hóa hiệu suất
    },
    events: {
      afterSetExtremes: function (e) {
        (this.chart?.scrollingContainer as HTMLDivElement)?.scrollTo({
          top: 0,

          behavior: 'instant',
        });
      },
    },
  },
  plotOptions: {
    series: {
      allowPointSelect: false,
    },
    column: {
      borderColor: undefined,
      // stacking: 'normal',
      pointWidth: 10,
      dataLabels: {
        enabled: true,
        formatter() {
          return formatNumberSummary(this.y || 0);
        },
        style: {
          fontWeight: '400',
          textOutline: 'none',
        },
      },
    },
  },
  legend: {
    align: 'center',
    verticalAlign: 'top',
  },
};

const HighChartComponent: FC<HighChartComponentPropsType> = (
  props: HighChartComponentPropsType,
) => {
  const { chartProps, chartCb } = props;
  const ref = useRef<HTMLElement>();
  const [exportState, setExportState] = useState<{
    sourceWidth: undefined | number;
    sourceHeight: undefined | number;
  }>({
    sourceWidth: undefined,
    sourceHeight: undefined,
  });

  const chartPropsMerge: Highcharts.Options = useMemo(
    () =>
      merge(cloneDeep(defaultChartProps), {
        ...chartProps,
        exporting: {
          ...chartProps.exporting,
          ...exportState,
        },
      }),
    [chartProps, exportState],
  );

  const cb = (chart: Chart) => {
    if (chart.container) {
      ref.current = chart.container;
    }
    if (chartCb) {
      chartCb(chart);
    }
  };

  // auto export width and height
  useEffect(() => {
    const myObserver = new ResizeObserver(() => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;
        setExportState({
          sourceWidth: width,
          sourceHeight: height,
        });
      }
    });

    if (ref.current) myObserver.observe(ref.current as any); // Start watching
    return () => {
      if (ref.current) myObserver.unobserve(ref.current as any); // Stop watching
    };
  }, [ref.current]);

  if (!chartProps) return null;

  return (
    <div className="chart-common-wrapper">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartPropsMerge}
        callback={cb}
        constructorType={'stockChart'}
      />
    </div>
  );
};

export default HighChartComponent;
