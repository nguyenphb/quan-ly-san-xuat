import LayoutMonitoring from '@/components/Layouts/LayoutMonitoring';
import ProCardCommon from '@/components/ProCardCommon';
import TableBase from '@/components/TableBase';
import { createEmptyArray } from '@/utils/array';
import { nanoid } from '@ant-design/pro-components';
import { Col, Divider, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { FC, ReactNode } from 'react';
import { StatisticSimpleProps } from '../../../../components/StatisticSimple';
import ValueTag from '../../../../components/ValueTag';
import ModalChart from './ModalChart';
import { getRandomInt } from '@/utils/common';
import { dataDemoProduct } from '@/pages/data-demo';
import Setting from './Setting';

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
          {dataDemoProduct.map((zone, index) => (
            <ProCardCommon
              style={{
                marginBlockEnd: 20,
              }}
              key={index}
              title={{
                text: zone.zone,
              }}
            >
              <Row gutter={[16, 16]}>
                {zone.data.map((item, index) => (
                  <Col span={24} md={12} lg={8} xl={6} key={index}>
                    <TableBase<DataTable>
                      dataSource={item.data}
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
                              {item.productName}
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
                          render: (dom, entity) => {
                            return (
                              <Space>
                                <ModalChart />
                                <Setting
                                  modalProps={{
                                    label: entity.label,
                                    targetHourly: entity.totalTarget,
                                  }}
                                />
                              </Space>
                            );
                          },
                        },
                      ]}
                    />
                  </Col>
                ))}
              </Row>
            </ProCardCommon>
          ))}

          <Divider />
        </>
      </LayoutMonitoring>
    </>
  );
};

export default ProductMonitorSystemComponent;
