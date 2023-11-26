import withTriggerFormModal, { TriggerFormModalProps } from '@/HOC/withTriggerFormModal';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormGroup, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React, { FC, ReactNode } from 'react';

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
    <ModalForm
      title={'Create employee'}
      // width={1000}
      open={open}
      onOpenChange={onOpenChange}
    >
      <ProFormGroup>
        <ProFormText width={'md'} name="firstName" label="First Name" />
        <ProFormText width={'md'} name="lastName" label="Last Name" />
        <ProFormText width={'md'} name="email" label="Email" />
        <ProFormText width={'md'} name="numberPhone" label="Number Phone" />
        <ProFormRadio.Group
          width={'md'}
          name="role"
          label="Role"
          options={[
            {
              label: 'Admin',
              value: 'Admin',
            },
            {
              label: 'Employee',
              value: 'Employee',
            },
          ]}
        />
      </ProFormGroup>
    </ModalForm>
  );
};
const CreateEmployee = withTriggerFormModal({
  defaultTrigger: ({ changeOpen }) => (
    <Button
      onClick={() => {
        changeOpen(true);
      }}
      icon={<PlusOutlined />}
      type='primary'
    >
      Add new employee
    </Button>
  ),
  contentRender: ModalContent,
});
export default CreateEmployee;
