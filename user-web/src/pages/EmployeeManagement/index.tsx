import { PageContainer } from '@ant-design/pro-components';
import React, { FC, ReactNode } from 'react';
import TableEmployee from './components/TableEmployee';
import CreateEmployee from './components/CreateEmployee';

interface EmployeeManagerProps {
  children?: ReactNode;
}

const EmployeeManager: FC<EmployeeManagerProps> = ({ children }) => {
  return (
    <PageContainer extra={<CreateEmployee />}>
      <TableEmployee />
    </PageContainer>
  );
};

export default EmployeeManager;
