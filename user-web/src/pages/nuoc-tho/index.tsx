import { Button, Card, Col, Image, Row } from 'antd';
import React, { useState } from 'react';
import ChartData from './ChartData';
import ChartData2 from './ChartData2';
import ControlModal from './ControlModal';

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Row gutter={[25, 25]}>
        <Col md={24}>
          <Row gutter={[25, 25]}>
            <Col md={16}>
              <Card
                className="dashboardLayout"
                style={{
                  backgroundImage: 'url(/nuoc-tho.svg)',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  minHeight: '700px'
                }}
                bordered={false}
              >
                <ControlModal styles={{
                  position: 'absolute',
                  top: '40%',
                  left: '25%',
                  width: '8%',
                  height: '8%',
                }} ></ControlModal>

                <ControlModal styles={{
                  position: 'absolute',
                  top: '58%',
                  left: '25%',
                  width: '8%',
                  height: '8%'
                }} ></ControlModal>
              </Card>
            </Col>
            <Col md={8}>
              <Card style={{ minHeight: '700px' }}>
                <ChartData />
                <ChartData2 />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={24}>
          <Row gutter={[25, 25]}>
            <Col md={6}>
              <Image preview={false} src='/nuoc-tho-control-table.png'></Image>
            </Col>
            <Col md={10}>
              <Image preview={false} src='/nuoc-tho-setting.png'></Image>
            </Col>
            <Col md={8}>
              <Image preview={false} src='/nuoc-tho-alarm.png'></Image>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default MainPage;
