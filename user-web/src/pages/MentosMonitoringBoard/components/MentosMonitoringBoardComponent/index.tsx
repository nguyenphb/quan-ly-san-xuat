import LayoutMonitoring from '@/components/Layouts/LayoutMonitoring';
import { StatisticSimpleProps } from '@/components/StatisticSimple';
import { dataDemoMentosMonitoringBoard } from '@/pages/data-demo';
import { ProCard } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Flex } from 'antd';
import dayjs from 'dayjs';
import { FC, ReactNode, useMemo, useState } from 'react';
import CardGroup from './CardGroup';
import StatisticsCard from './StatisticsCard';
import { useInterval } from 'ahooks';

interface MentosMonitoringBoardComponentProps {
  children?: ReactNode;
}

const MentosMonitoringBoardComponent: FC<MentosMonitoringBoardComponentProps> = ({ children }) => {
  const time = dayjs();
  const [data, setData] = useState(dataDemoMentosMonitoringBoard);
  const { loading } = useRequest(
    async () => {
      return {
        data: dataDemoMentosMonitoringBoard,
      };
    },
    {
      onSuccess(data) {
        setData(data);
      },
    },
  );
  const target = useMemo(
    () =>
      data.reduce((prev, zone) => {
        let res = prev;
        zone.data.forEach((item) => {
          res = res + item.target;
        });
        return res;
      }, 0),
    [data],
  );
  const actual = useMemo(
    () =>
      data.reduce((prev, zone) => {
        let res = prev;
        zone.data.forEach((item) => {
          res = res + item.actual;
        });
        return res;
      }, 0),
    [data],
  );
  const statistics: StatisticSimpleProps[] = useMemo(
    () => [
      {
        label: {
          text: 'Target',
        },
        value: {
          text: target,
        },
      },
      {
        label: {
          text: 'Actual',
        },
        value: {
          text: actual,
          color: actual >= target ? 'success' : 'danger',
        },
      },
      {
        label: {
          text: 'Diff',
        },
        value: {
          text: actual - target,
          color: actual - target >= 0 ? 'success' : 'danger',
        },
      },
    ],
    [target, actual],
  );
  useInterval(() => {
    setData((prev) =>
      prev.map((zone) => ({
        ...zone,
        data: zone.data.map((item) => ({
          ...item,
          actual: item.actual + 1,
        })),
      })),
    );
  }, 1000 * 30); // 30 seconds
  return (
    <>
      <LayoutMonitoring
        loading={loading}
        title={'Product Monitoring System'.toUpperCase()}
        subTitle={[
          time.format('DD - MMM - YYYY').toUpperCase(),
          time.format('hh:mm:ss'),
          'Shift 1'.toUpperCase(),
        ]}
        statistics={statistics}
      >
        <Flex vertical gap="middle">
          {data?.map((zoneItem) => (
            <CardGroup title={zoneItem.zone} key={zoneItem.zone}>
              <ProCard wrap direction="row" gutter={[16, 16]}>
                {zoneItem.data.map((item, index) => (
                  <ProCard
                    bodyStyle={{
                      padding: 0,
                    }}
                    colSpan={{
                      xs: 24,
                      md: 12,
                      lg: 8,
                      xl: 6,
                      xxl: '20%',
                    }}
                    key={index}
                  >
                    <StatisticsCard title={item.label} statistics={item} />
                  </ProCard>
                ))}
              </ProCard>
            </CardGroup>
          ))}
        </Flex>
      </LayoutMonitoring>
    </>
  );
};

export default MentosMonitoringBoardComponent;
