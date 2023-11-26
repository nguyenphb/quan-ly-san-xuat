import TableBase from '@/components/TableBase';
import ValueTag from '@/components/ValueTag';
import { DataTable } from '@/pages/data-demo';
import { formatNumberOrString } from '@/utils/format';
import { Space } from 'antd';
import React, { FC, ReactNode } from 'react';
import ModalChart from './ModalChart';
import Setting from './Setting';

interface TableProductProps {
  children?: ReactNode;
  productName?: string;
  dataSource?: DataTable[];
}

const TableProduct: FC<TableProductProps> = ({ children, productName, dataSource }) => {
  return (
    <TableBase<DataTable>
      dataSource={dataSource}
      rowKey="id"
      columns={[
        {
          title: (
            <span
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              {productName}
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
                entity.actual && entity.hourlyTarget && entity?.actual >= entity?.hourlyTarget
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
            return <ValueTag type={diff >= 0 ? 'success' : 'danger'}>{diff}</ValueTag>;
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
  );
};

export default TableProduct;
