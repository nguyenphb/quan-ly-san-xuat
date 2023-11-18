import LayoutMonitoring from '@/components/Layouts/LayoutMonitoring';
import ProCardCommon from '@/components/ProCardCommon';
import TableBase from '@/components/TableBase';
import { createEmptyArray } from '@/utils/array';
import { nanoid } from '@ant-design/pro-components';
import { Col, Divider, Row } from 'antd';
import dayjs from 'dayjs';
import { FC, ReactNode } from 'react';
import { StatisticSimpleProps } from '../../../../components/StatisticSimple';
import ValueTag from '../../../../components/ValueTag';
import ModalChart from './ModalChart';
import { getRandomInt } from '@/utils/common';

interface ProductMonitorSystemComponentProps {
  children?: ReactNode;
}
type DataTable = {
  id: string;
  label?: string;
  totalTarget?: number;
  hourlyTarget?: number;
  actual?: number;
  diff?: number;
};
const ProductMonitorSystemComponent: FC<ProductMonitorSystemComponentProps> = ({ children }) => {
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
  const tableData = createEmptyArray(5);

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
        <>
          <ProCardCommon
            title={{
              text: 'Semi-finished Goods',
            }}
          >
            <Row gutter={[16, 16]}>
              {tableData.map((item, index) => (
                <Col span={24} md={12} lg={8} xl={6} key={index}>
                  <TableBase<DataTable>
                    dataSource={createEmptyArray(5).map<DataTable>((item) => {
                      const hourlyTarget = getRandomInt(100, 200);
                      const actual = getRandomInt(100, 200);
                      return {
                        id: nanoid(),
                        label: 'Random',
                        totalTarget: getRandomInt(1000, 2000),
                        hourlyTarget: hourlyTarget,
                        actual: actual,
                        diff: actual - hourlyTarget,
                      };
                    })}
                    key="id"
                    columns={[
                      {
                        title: (
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}
                          >
                            Metos
                          </span>
                        ),
                        dataIndex: 'label',
                      },
                      {
                        title: 'Total Target',
                        dataIndex: 'totalTarget',
                        render: (dom) => <ValueTag>{dom}</ValueTag>,
                        width: 50,
                      },
                      {
                        title: 'Hourly Target',
                        dataIndex: 'hourlyTarget',
                        render: (dom) => <ValueTag>{dom}</ValueTag>,
                        width: 60,
                      },
                      {
                        title: 'Actual',
                        dataIndex: 'actual',
                        width: 50,

                        render: (dom, entity) => (
                          <ValueTag
                            type={
                              entity.actual &&
                              entity.hourlyTarget &&
                              entity?.actual >= entity?.hourlyTarget
                                ? 'success'
                                : 'danger'
                            }
                          >
                            {dom}
                          </ValueTag>
                        ),
                      },
                      {
                        title: 'Diff',
                        dataIndex: 'diff',
                        width: 50,

                        render: (dom, entity) => {
                          const diff = entity.diff || 0;
                          return (
                            <ValueTag type={diff >= 0 ? 'success' : 'danger'}>{diff}</ValueTag>
                          );
                        },
                      },
                      {
                        title: 'Actions',
                        width: 50,
                        render: () => {
                          return <ModalChart />;
                        },
                      },
                    ]}
                  />
                </Col>
              ))}
            </Row>
          </ProCardCommon>
          <Divider />
          <ProCardCommon
            title={{
              text: 'Finished Goods',
            }}
          >
            <Row gutter={[16, 16]}>
              {tableData.map((item, index) => (
                <Col span={24} md={12} lg={8} xl={6} key={index}>
                  <TableBase<DataTable>
                    dataSource={createEmptyArray(5).map<DataTable>((item) => {
                      const hourlyTarget = getRandomInt(100, 200);
                      const actual = getRandomInt(100, 200);
                      return {
                        id: nanoid(),
                        label: 'Random',
                        totalTarget: getRandomInt(1000, 2000),
                        hourlyTarget: hourlyTarget,
                        actual: actual,
                        diff: actual - hourlyTarget,
                      };
                    })}
                    key="id"
                    columns={[
                      {
                        title: (
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}
                          >
                            Metos
                          </span>
                        ),
                        dataIndex: 'label',
                      },
                      {
                        title: 'Total Target',
                        dataIndex: 'totalTarget',
                        render: (dom) => <ValueTag>{dom}</ValueTag>,
                        width: 50,
                      },
                      {
                        title: 'Hourly Target',
                        dataIndex: 'hourlyTarget',
                        render: (dom) => <ValueTag>{dom}</ValueTag>,
                        width: 60,
                      },
                      {
                        title: 'Actual',
                        dataIndex: 'actual',
                        width: 50,

                        render: (dom, entity) => (
                          <ValueTag
                            type={
                              entity.actual &&
                              entity.hourlyTarget &&
                              entity?.actual >= entity?.hourlyTarget
                                ? 'success'
                                : 'danger'
                            }
                          >
                            {dom}
                          </ValueTag>
                        ),
                      },
                      {
                        title: 'Diff',
                        dataIndex: 'diff',
                        width: 50,

                        render: (dom, entity) => {
                          const diff = entity.diff || 0;
                          return (
                            <ValueTag type={diff >= 0 ? 'success' : 'danger'}>{diff}</ValueTag>
                          );
                        },
                      },
                      {
                        title: 'Actions',
                        width: 50,
                        render: () => {
                          return <ModalChart />;
                        },
                      },
                    ]}
                  />
                </Col>
              ))}
            </Row>
          </ProCardCommon>
        </>
      </LayoutMonitoring>
    </>
  );
};

export default ProductMonitorSystemComponent;
