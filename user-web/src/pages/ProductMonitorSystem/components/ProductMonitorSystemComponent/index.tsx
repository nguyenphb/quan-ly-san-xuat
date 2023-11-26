import LayoutMonitoring from '@/components/Layouts/LayoutMonitoring';
import ProCardCommon from '@/components/ProCardCommon';
import TableBase from '@/components/TableBase';
import { DataTable, dataDemoProduct } from '@/pages/data-demo';
import { useRequest } from '@umijs/max';
import { useInterval } from 'ahooks';
import { Col, Divider, Flex, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { FC, ReactNode, useMemo, useState } from 'react';
import { StatisticSimpleProps } from '../../../../components/StatisticSimple';
import ValueTag from '../../../../components/ValueTag';
import ModalChart from './ModalChart';
import Setting from './Setting';
import { useProductMonitorData } from './hooks/useProductMonitorData';
import { formatNumberOrString } from '@/utils/format';
import { createStyles } from 'antd-use-styles';
import TableProduct from './TableProduct';

interface ProductMonitorSystemComponentProps {
  children?: ReactNode;
}

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    backgroundColor: token.colorBgBase,
    padding: token.padding,
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    // gap: token.padding,
    gap: 16,
  },
  title: {
    fontSize: token.fontSizeHeading4,
    fontWeight: token.fontWeightStrong,
  },
  rowProduct: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gap: token.padding,
  },
}));
const ProductMonitorSystemComponent: FC<ProductMonitorSystemComponentProps> = ({ children }) => {
  const time = dayjs();

  const { totalActual, totalTarget, totalDiff, data, loading } = useProductMonitorData();
  const statistics: StatisticSimpleProps[] = useMemo(
    () => [
      {
        label: {
          text: 'Target',
        },
        value: {
          text: totalTarget,
        },
      },
      {
        label: {
          text: 'Actual',
        },
        value: {
          text: totalActual,
          color: totalDiff >= 0 ? 'success' : 'danger',
        },
      },
      {
        label: {
          text: 'Diff',
        },
        value: {
          text: totalDiff,
          color: totalDiff >= 0 ? 'success' : 'danger',
        },
      },
    ],
    [totalTarget, totalActual],
  );
  const styles = useStyles();
  const findFinishedGoodsByProductName = (productName: string) => {
    return data
      .find((item) => item.zone === data[1].zone)
      ?.data?.find((item) => item.productName === productName);
  };
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
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {data?.map((item) => (
              <div key={item.zone} className={styles.title}>
                {item.zone}
              </div>
            ))}
          </div>
          <Divider />
          <Row gutter={[16, 16]}>
            {data[0].data.map((item) => (
              <Col span={24} key={item.productName}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <TableProduct productName={item.productName} dataSource={item.data} />
                  </Col>
                  <Col span={12}>
                    <TableProduct
                      productName={item.productName}
                      dataSource={findFinishedGoodsByProductName(item.productName)?.data}
                    />
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </div>
        {/* <div>
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
                            const diff = formatNumberOrString(entity.actual - entity.hourlyTarget, {
                              default: 0,
                              digits: 2,
                            }) as number;
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
        </div> */}
      </LayoutMonitoring>
    </>
  );
};

export default ProductMonitorSystemComponent;
