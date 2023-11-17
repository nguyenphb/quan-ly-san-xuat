import { history } from '@umijs/max';
import { Spin } from 'antd';
import { FC, ReactNode, useEffect } from 'react';

interface LogoutProps {
  children?: ReactNode;
}

const Logout: FC<LogoutProps> = ({ children }) => {
  useEffect(() => {
    localStorage.clear();
    window.location.href = '/user/login';
  }, []);
  return <Spin spinning />;
};

export default Logout;
