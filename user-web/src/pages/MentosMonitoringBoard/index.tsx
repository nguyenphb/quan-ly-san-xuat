import React, { FC, ReactNode } from 'react';
import MentosMonitoringBoardComponent from './components/MentosMonitoringBoardComponent';

interface ProductMonitorSystemProps {
  children?: ReactNode;
}

const ProductMonitorSystem: FC<ProductMonitorSystemProps> = ({ children }) => {
  return (
    <>
      <MentosMonitoringBoardComponent />
    </>
  );
};

export default ProductMonitorSystem;
