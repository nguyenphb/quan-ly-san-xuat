import LayoutMonitoring from '@/components/Layouts/LayoutMonitoring';
import dayjs from 'dayjs';
import { FC, ReactNode } from 'react';
import CardGroup from './CardGroup';
import { Col, Flex, Row } from 'antd';
import StatisticsCard from './StatisticsCard';
import { createEmptyArray } from '@/utils/array';
import { StatisticSimpleProps } from '@/components/StatisticSimple';
import { getRandomInt } from '@/utils/common';
import { nanoid } from '@ant-design/pro-components';

interface MentosMonitoringBoardComponentProps {
  children?: ReactNode;
}
type DataType = {
  id: string;
  label?: string;
  target: number;
  actual: number;
  diff: number;
};
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
  const semiData = createEmptyArray(5).map<DataType>((item) => {
    const target = getRandomInt(100, 200);
    const actual = getRandomInt(100, 200);
    return {
      id: nanoid(),
      label: 'D-line',
      target: target,
      actual: actual,
      diff: actual - target,
    };
  });

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
          <CardGroup title="Semi-finished">
            <Row gutter={[16, 16]}>
              {semiData.map((item, index) => (
                <Col key={index} span={24} md={12} lg={8} xl={6}>
                  <StatisticsCard
                    title="D-line"
                    statistics={{
                      ...item,
                    }}
                  />
                </Col>
              ))}
            </Row>
          </CardGroup>
          <CardGroup title="Finished Goods">
            <Row gutter={[16, 16]}>
              {semiData.map((item, index) => (
                <Col key={index} span={24} md={12} lg={8} xl={6}>
                  <StatisticsCard
                    title="D-line"
                    statistics={{
                      ...item,
                    }}
                  />
                </Col>
              ))}
            </Row>
          </CardGroup>
        </Flex>
      </LayoutMonitoring>
    </>
  );
};

export default MentosMonitoringBoardComponent;
