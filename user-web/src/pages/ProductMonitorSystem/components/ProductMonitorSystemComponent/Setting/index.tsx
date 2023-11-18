import withTriggerFormModal, { TriggerFormModalProps } from '@/HOC/withTriggerFormModal';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { ModalForm, ProFormDigit, ProFormGroup, ProFormItem } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React, { FC, ReactNode } from 'react';

interface SettingContentProps
  extends TriggerFormModalProps<{
    targetHourly?: number;
    label?: string;
  }> {
  children?: ReactNode;
}

const SettingContent: FC<SettingContentProps> = ({
  children,
  open,
  trigger,
  onOpenChange,
  onSuccess,
  modalProps,
}) => {
  return (
    <ModalForm
      trigger={trigger}
      initialValues={{
        targetHourly: modalProps?.targetHourly,
      }}
      title={`Setting ${modalProps?.label || ''}`}
      open={open}
      onOpenChange={onOpenChange}
    >
      <ProFormGroup>
        <ProFormDigit
          name="targetHourly"
          label="Target Hourly"
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
        />
        <ProFormItem label="Reset Target Hourly">
          <Button type="primary">Reset Target Hourly</Button>
        </ProFormItem>
      </ProFormGroup>
    </ModalForm>
  );
};
const Setting = withTriggerFormModal({
  defaultTrigger: ({ changeOpen }) => (
    <Button
      onClick={() => {
        changeOpen(true);
      }}
      icon={<SettingOutlined />}
    />
  ),
  contentRender: SettingContent,
});
export default Setting;
