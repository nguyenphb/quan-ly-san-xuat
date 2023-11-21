import { PageContainer } from '@ant-design/pro-components';
import React, { FC, ReactNode } from 'react';
import CalendarTask from './components/CalendarTask';

interface CalendarPageProps {
  children?: ReactNode;
}

const CalendarPage: FC<CalendarPageProps> = ({ children }) => {
  return (
    <PageContainer>
      <CalendarTask />
    </PageContainer>
  );
};

export default CalendarPage;
