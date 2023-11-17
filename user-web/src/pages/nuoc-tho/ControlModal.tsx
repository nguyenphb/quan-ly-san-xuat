import React, { useState } from 'react';
import { Button, Card, Checkbox, Col, Image, Input, InputNumber, Modal, Row, Switch } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import ChartPopup from './ChartPopup';

const ControlModal = ({ styles }: { styles: any }) => {
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

  return (
    <>
      <Button
        style={styles}
        type='link'
        onClick={showModal}
      />
      <Modal
        width={"800px"}
        footer={false}
        title="Bơm hút bùn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      >
        <Row gutter={[15, 15]}>
          <Col md={12}>
            <Card title="Trạng thái">
              <Row gutter={[5, 5]}>
                <Col md={24}>
                  <Image style={{ width: '100%', marginLeft: '50%' }} src='/pump.png' preview={false}></Image>
                </Col>
                <Col md={12}>
                  <Button type='dashed' danger block>Bảo trì</Button>
                </Col>
                <Col md={12}>
                  <Button block>Mô phỏng</Button>
                </Col>
                <Col md={24}>
                  <ChartPopup />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={12}>
            <Card title="Điều khiển chạy/dừng">
              <Row gutter={[5, 12]}>
                <Col md={24}>
                  <Checkbox checked={true}>
                    Khoá liên động theo quy trình
                  </Checkbox>
                  <Checkbox checked={false}>
                    Khoá khởi động liên tiếp
                  </Checkbox>
                  <Checkbox checked={false}>
                    Khoá chạy khởi động
                  </Checkbox>
                </Col>
                <Col md={24}>
                  <Switch
                    checkedChildren="Chế độ tự động"
                    unCheckedChildren="Chế độ thủ công"
                  ></Switch>
                </Col>
                <Col md={12}>
                  <Button type='primary' block>Chạy</Button>
                </Col>
                <Col md={12}>
                  <Button type='primary' danger block>Dừng</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={24}>
            <Card >
              <Row gutter={[5, 5]}>
                <Col md={16}>
                  <h4>Thông số</h4>
                </Col>
                <Col md={4}>
                  <h4>Cài đặt</h4>
                </Col>
                <Col md={4}>
                  <h4>Giá trị</h4>
                </Col>

                <Col md={16}>
                  Số lần khởi động
                </Col>
                <Col md={4}>

                </Col>
                <Col md={4}>
                  <Input size='small' disabled value={20}></Input>
                </Col>

                <Col md={16}>
                  Tổng thời gian chạy/ngày (h)
                </Col>
                <Col md={4}>

                </Col>
                <Col md={4}>
                  <Input size='small' disabled value={20}></Input>
                </Col>

                <Col md={16}>
                  Tổng thời gian chạy (h)
                </Col>
                <Col md={4}>

                </Col>
                <Col md={4}>
                  <Input size='small' disabled value={20}></Input>
                </Col>

                <Col md={16}>
                  Tổng thời gian chạy/ngày (h)
                </Col>
                <Col md={4}>
                </Col>
                <Col md={4}>
                  <Input size='small' disabled value={20}></Input>
                </Col>

                <Col md={16}>
                  Khoảng thời gian tối thiểu giữa 1 lần khởi động (s)
                </Col>
                <Col md={4}>
                  <InputNumber size='small' value={5}></InputNumber>
                </Col>
                <Col md={4}>
                  <Input size='small' disabled value={20}></Input>
                </Col>

                <Col md={16}>
                  Thời gian dừng tối thiểu (s)
                </Col>
                <Col md={4}>
                  <InputNumber size='small' value={5}></InputNumber>
                </Col>
                <Col md={4}>
                  <Input size='small' disabled value={20}></Input>
                </Col>

                <Col md={16}>
                  Thời gian phản hồi (s)
                </Col>
                <Col md={4}>
                  <InputNumber size='small' value={5}></InputNumber>
                </Col>
                <Col md={4}>
                  <Input size='small' disabled value={20}></Input>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={24}>
            <Card title="Cảnh báo"
              actions={[
                <Checkbox checked={true} title='Tự động xoá lỗi'>Tự động xoá lỗi</Checkbox>,
                <Button danger>Xoá lỗi bằng tay</Button>
              ]}
            >
              <Image src='/nuoc-tho-warning-popup.png' preview={false}></Image>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ControlModal;
