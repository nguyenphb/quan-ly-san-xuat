import { ProCard,ProCardProps } from '@ant-design/pro-components';
import { Spin } from 'antd';
import { FC,ReactNode } from 'react';
import TitleIcon from '../TitleIcon';



export type ProCardCommonProps = Omit<ProCardProps, 'title'> & {
  title?: {
    text?: ReactNode;
    icon?: ReactNode;
  };
  spinning?: boolean
};

const ProCardCommon: FC<ProCardCommonProps> = ({ children, title, spinning, ...rest }) => {
  return (
    <ProCard headerBordered title={<TitleIcon title={title?.text} icon={title?.icon} />} {...rest}>
      <Spin spinning={!!spinning}>{children}</Spin>
    </ProCard>
  );
};

export default ProCardCommon;
