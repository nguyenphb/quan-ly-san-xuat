import React, { FC, ReactNode } from 'react';
import ProductMonitorSystemComponent from './components/ProductMonitorSystemComponent';

interface ProductMonitorSystemProps {
  children?: ReactNode;
}

const ProductMonitorSystem: FC<ProductMonitorSystemProps> = ({ children }) => {
  return (
    <>
      <ProductMonitorSystemComponent />
    </>
  );
};

export default ProductMonitorSystem;
