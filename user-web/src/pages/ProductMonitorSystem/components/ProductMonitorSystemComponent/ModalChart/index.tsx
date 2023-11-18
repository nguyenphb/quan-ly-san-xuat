import withTriggerFormModal, { TriggerFormModalProps } from '@/HOC/withTriggerFormModal';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { FC, ReactNode } from 'react';
import LineChartHistory from './LineChartHistory';

interface ModalContentProps extends TriggerFormModalProps<any> {
  children?: ReactNode;
}

const ModalContent: FC<ModalContentProps> = ({
  children,
  open,
  trigger,
  onOpenChange,
  onSuccess,
}) => {
  return (
    <Modal title="History" width={1000} open={open} onCancel={() => onOpenChange?.(false)}>
      <LineChartHistory />
    </Modal>
  );
};
const ModalChart = withTriggerFormModal({
  defaultTrigger: ({ changeOpen }) => (
    <Button
      onClick={() => {
        changeOpen(true);
      }}
      icon={<EyeOutlined />}
    />
  ),
  contentRender: ModalContent,
});
export default ModalChart;
