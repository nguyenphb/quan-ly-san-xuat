import LayoutMonitoring from '@/components/Layouts/LayoutMonitoring';
import { StatisticSimpleProps } from '@/components/StatisticSimple';
import { dataDemoMentosMonitoringBoard } from '@/pages/data-demo';
import { ProCard } from '@ant-design/pro-components';
import { Flex } from 'antd';
import dayjs from 'dayjs';
import { FC, ReactNode } from 'react';
import CardGroup from './CardGroup';
import StatisticsCard from './StatisticsCard';

interface MentosMonitoringBoardComponentProps {
  children?: ReactNode;
}

const MentosMonitoringBoardComponent: FC<MentosMonitoringBoardComponentProps> = ({ children }) => {
  const time = dayjs();
  const statistics: StatisticSimpleProps[] = [
    {
      label: {
        text: 'Target',
      },
      value: {
        text: 2890,
      },
    },
    {
      label: {
        text: 'Actual',
      },
      value: {
        text: 2990,
        color: 'success',
      },
    },
    {
      label: {
        text: 'Diff',
      },
      value: {
        text: 100,
        color: 'success',
      },
    },
  ];

  return (
    <>
      <LayoutMonitoring
        title={'Product Monitoring System'.toUpperCase()}
        subTitle={[
          time.format('DD - MMM - YYYY').toUpperCase(),
          time.format('hh:mm:ss'),
          'Shift 1'.toUpperCase(),
        ]}
        statistics={statistics}
      >
        <Flex vertical gap="middle">
          {dataDemoMentosMonitoringBoard.map((zoneItem) => (
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
