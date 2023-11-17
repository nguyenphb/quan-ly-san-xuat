import React, { useState } from 'react';
import { Button, Card, Checkbox, Col, DatePicker, Image, Input, InputNumber, Modal, Row, TimePicker } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: 'Lưu lượng từng loại hoá chất xử lý',
    },
  },
  elements: {
    point: {
      radius: 0
    },
    line: {
      borderWidth: 1
    }
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,

    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const ChartPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let labels: any = [];

  for (let i = 20; i > 0; i--) {
    labels.push(moment().add(-15 * i, 'minute').format("HH:mm"))
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Dữ liệu hoạt động',
        data: labels.map(() => Math.random() * 10),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      }
    ],
  };
  return (
    <>
      <Button
        block
        type='primary'
        onClick={showModal}
        icon={<BarChartOutlined />}
      >
        Đồ thị
      </Button>
      <Modal
        width={"800px"}
        footer={false}
        title="Đồ thị" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      >
        <Row gutter={[15, 15]}>
          <Col md={12}>
            <DatePicker.RangePicker value={[dayjs().add(-1, 'd'), dayjs()]} />
          </Col>
          <Col md={24}>
            <Line options={options} data={data} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ChartPopup;
