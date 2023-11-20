import LayoutMonitoring from '@/components/Layouts/LayoutMonitoring';
import ProCardCommon from '@/components/ProCardCommon';
import TableBase from '@/components/TableBase';
import { DataTable, dataDemoProduct } from '@/pages/data-demo';
import { useRequest } from '@umijs/max';
import { useInterval } from 'ahooks';
import { Col, Divider, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { FC, ReactNode, useMemo, useState } from 'react';
import { StatisticSimpleProps } from '../../../../components/StatisticSimple';
import ValueTag from '../../../../components/ValueTag';
import ModalChart from './ModalChart';
import Setting from './Setting';

interface ProductMonitorSystemComponentProps {
  children?: ReactNode;
}

const ProductMonitorSystemComponent: FC<ProductMonitorSystemComponentProps> = ({ children }) => {
  const time = dayjs();

  const [data, setData] = useState(dataDemoProduct);
  const { loading } = useRequest(
    async () => {
      return {
        data: dataDemoProduct,
      };
    },
    {
      onSuccess(data) {
        setData(data);
      },
    },
  );

  useInterval(() => {
    setData((prev) =>
      prev.map((zone) => ({
        ...zone,
        data: zone.data.map((zoneItem) => ({
          ...zoneItem,
          data: zoneItem.data.map((product) => ({
            ...product,
            actual: product.actual + 1,
          })),
        })),
      })),
    );
  }, 1000 * 30); // 30 seconds
  const target = useMemo(
    () =>
      data.reduce((prev, zone) => {
        let res = prev;
        zone.data.forEach((zoneItem) =>
          zoneItem.data.forEach((product) => {
            res = res + product.hourlyTarget;
          }),
        );
        return res;
      }, 0),
    [data],
  );
  const actual = useMemo(
    () =>
      data.reduce((prev, zone) => {
        let res = prev;
        zone.data.forEach((zoneItem) =>
          zoneItem.data.forEach((product) => {
            res = res + product.actual;
          }),
        );
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
        <>
          {data?.map((zone, index) => (
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
                  <Col span={24} md={8} lg={8} xl={8} key={index}>
                    <TableBase<DataTable>
                      dataSource={item.data}
                      key="id"
                      columns={[
                        {
                          title: (
                            <span
                              style={{
                                fontSize: 15,
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
                            const diff = entity.actual - entity.hourlyTarget;
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
