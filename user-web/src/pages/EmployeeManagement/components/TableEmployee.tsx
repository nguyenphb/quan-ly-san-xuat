import { createEmptyArray } from '@/utils/array';
import { getRandomInt } from '@/utils/common';
import { ProTable, nanoid } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import React, { FC, ReactNode } from 'react';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';

interface TableEmployeeProps {
  children?: ReactNode;
}

const TableEmployee: FC<TableEmployeeProps> = ({ children }) => {
  return (
    <ProTable
      size="small"
      dataSource={createEmptyArray(20).map((item, index) => ({
        id: nanoid(),
        firstName: `First Name ${index}`,
        lastName: `Last Name ${index}`,
        email: `email${index}@gmail.com`,

        numberPhone: `012345678${index}`,
        role: ['Admin', 'Employee'][getRandomInt(0, 2)],
      }))}
      key="id"
      columns={[
        {
          title: 'First Name',
          dataIndex: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Number phone',
          dataIndex: 'numberPhone',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          render(dom) {
            return <Tag>{dom}</Tag>;
          },
        },
        {
          title: 'Action',
          render() {
            return (
              <Space>
                <EditEmployee />
                <DeleteEmployee />
              </Space>
            );
          },
        },
      ]}
    />
  );
};

export default TableEmployee;
