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
        title="Van đầu vào nước thô" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      >
        <Row gutter={[15, 15]}>
          <Col md={12}>
            <Card title="Trạng thái">
              <Row gutter={[5, 5]}>
                <Col md={24}>
                  <Image style={{ width: '100%', marginLeft: '30%' }} src='/valve-status.png' preview={false}></Image>
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
            <Card title="Điều khiển đóng/mở">
              <Row gutter={[5, 5]}>
                <Col md={24}>
                  <Checkbox checked={true}>
                    Khoá mở một thời gian
                  </Checkbox>
                  <Checkbox checked={false}>
                    Khoá đóng một thời gian
                  </Checkbox>
                </Col>

                <Col md={24}>
                  <Button type='primary' block>Mở</Button>
                </Col>
                <Col md={24}>
                  <Button type='dashed' danger block>Dừng</Button>
                </Col>
                <Col md={24}>
                  <Button type='primary' danger block>Đóng</Button>
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
                <Col md={8}>
                  <h4>Cài đặt</h4>
                </Col>

                <Col md={16}>
                  Thời gian phải hồi đóng/mở (s)
                </Col>
                <Col md={8}>
                  <InputNumber size='small' value={5}></InputNumber>
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
              <Image src='/valveWarning.png' preview={false}></Image>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ControlModal;
