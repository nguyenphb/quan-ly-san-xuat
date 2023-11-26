import { DeleteOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';
import React, { FC, ReactNode } from 'react';

interface DeleteEmployeeProps {
  children?: ReactNode;
}

const DeleteEmployee: FC<DeleteEmployeeProps> = ({ children }) => {
  const { modal } = App.useApp();
  return (
    <Button
      icon={<DeleteOutlined />}
      danger
      size='small'
      onClick={async () => {
        modal.confirm({
          title: 'Are you sure you want to delete this employee',
          okButtonProps:{
            danger: true,
          }
        });
      }}
    />
  );
};

export default DeleteEmployee;
