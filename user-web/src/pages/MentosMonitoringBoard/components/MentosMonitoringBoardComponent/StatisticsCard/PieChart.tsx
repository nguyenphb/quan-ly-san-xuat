import HighChartComponent from '@/components/HighChartComponent';
import { ThemeConfig } from '@/config/theme.config';
import { formatNumber } from '@/utils/common';
import { FC } from 'react';

interface PieChartProps {
  data: {
    target: number;
    actual: number;
  };
}

const PieChart: FC<PieChartProps> = ({ data }) => {
  const present = data.actual >= data.target ? 100 : (data.actual / data.target) * 100;
  return (
    <div>
      <HighChartComponent
        chartProps={{
          navigator: {
            enabled: false,
            height: 0,
          },
          rangeSelector: {
            enabled: false,
          },
          chart: {
            type: 'pie',
            height: 230,
          },
          // title: {
          //   text: 'Countries compared by population density and total area, 2022.',
          //   align: 'center'
          // },
          subtitle: {
            text: `<span style="font-size: 25px"> ${formatNumber(present || 0, {
              digits: 2,
            })}%</span>`,
            useHTML: true,
            floating: true,
            verticalAlign: 'middle',
            align: 'center',
            y: 0,
          },
          legend: {
            enabled: false,
          },

          // tooltip: {
          //   headerFormat: '',
          //   pointFormat:
          //     '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          //     'Area (square km): <b>{point.y}</b><br/>' +
          //     'Population density (people per square km): <b>{point.z}</b><br/>',
          // },
          plotOptions: {
            series: {
              borderWidth: 0,
              size: '100%',
              // innerSize: '80%',
            },
          },
          series: [
            {
              innerSize: '70%',
              size: '110%',
              name: 'Value',
              borderRadius: 5,

              data: !data
                ? []
                : [
                    {
                      name: 'Diff',
                      y: data.target - data.actual,
                      z: 92,
                      color: ThemeConfig.color.danger,
                    },
                    {
                      name: 'Actual',
                      y: data.actual,
                      z: 119,
                      color: ThemeConfig.color.success,
                    },
                  ].map((item) => ({
                    ...item,
                    name: undefined,
                  })),
              // colors: [],
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
