import {
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormGroup,
  ProFormSelect,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import React, { FC, ReactNode } from 'react';
import { dataDemoProduct } from '../data-demo';
import { App, Card } from 'antd';
import { downloadExcelData } from '@/services/utils';

interface ExportDataProps {
  children?: ReactNode;
}
const now = dayjs();
const defaultStartTime = now.subtract(1, 'day');
const defaultEndTime = now.subtract(1, 'day');

const ExportData: FC<ExportDataProps> = ({ children }) => {
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  return (
    <Card title="Export data">
      <ProForm
        form={form}
        initialValues={{
          dateRange: [defaultStartTime, defaultEndTime],
        }}
        onFinish={async (values) => {
          const data = dataDemoProduct
            .find((item) => item.zone === values.zone)
            ?.data.find((item) => item.productName === values.product)
            ?.data.map((item) => ({
              Product: item.label,
              Id: item.id,
              totalTarget: item.totalTarget,
              hourlyTarget: item.hourlyTarget,
              actual: item.actual,
              diff: item.diff,
            }));
          const fileName = dayjs().format('YYYY_MM_DD hh_mm_ss');
          downloadExcelData(data, fileName);
          message.success('Export completed successfully!');
        }}
      >
        <ProFormGroup>
          <ProFormDateTimeRangePicker
            rules={[{ required: true }]}
            label="Chon thời gian"
            name="dateRange"
            width={'lg'}
          />

          <ProFormSelect
            rules={[{ required: true }]}
            label="Chọn khu vực"
            onChange={() => {
              // reset when change
              form.setFieldValue('product', undefined);
            }}
            name="zone"
            options={dataDemoProduct.map((item) => ({
              label: item.zone,
              value: item.zone,
            }))}
            width={'lg'}
          />
          <ProFormDependency name={['zone']}>
            {({ zone }) => {
              return (
                <ProFormSelect
                  rules={[{ required: true }]}
                  width={'lg'}
                  label="Chọn Sản phẩm"
                  name="product"
                  options={dataDemoProduct
                    .find((item) => item.zone === zone)
                    ?.data.map((item) => ({
                      label: item.productName,
                      value: item.productName,
                    }))}
                />
              );
            }}
          </ProFormDependency>
        </ProFormGroup>
      </ProForm>
    </Card>
  );
};

export default ExportData;
