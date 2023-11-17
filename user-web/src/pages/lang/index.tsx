import { Button, Card, Col, Image, Row } from 'antd';
import React from 'react';
import ChartData from './ChartData';
import ChartData2 from './ChartData2';
import ControlModal from './ControlModal';

const MainPage = () => {
  return (
    <>
      <Row gutter={[25, 25]}>
        <Col md={24}>
          <Row gutter={[25, 25]}>
            <Col md={16}>
              <Card
                className="dashboardLayout"
                style={{
                  backgroundImage: 'url(/lang.svg)',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  minHeight: '100%'
                }}
                bordered={false}
              >
                <ControlModal styles={{
                  position: 'absolute',
                  top: '30%',
                  left: '18%',
                  width: '8%',
                  height: '8%',
                }} ></ControlModal>

                <ControlModal styles={{
                  position: 'absolute',
                  top: '4%',
                  left: '18%',
                  width: '8%',
                  height: '8%',
                }} ></ControlModal>

                <ControlModal styles={{
                  position: 'absolute',
                  top: '53%',
                  left: '18%',
                  width: '8%',
                  height: '8%',
                }} ></ControlModal>

                <ControlModal styles={{
                  position: 'absolute',
                  top: '78%',
                  left: '18%',
                  width: '8%',
                  height: '8%',
                }} ></ControlModal>
              </Card>
            </Col>
            <Col md={8}>
              <Card>
                <ChartData />
                <ChartData2 />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={24}>
          <Row gutter={[25, 25]}>
            <Col md={6}>
              <Image preview={false} src='/lang-control.png'></Image>
            </Col>
            <Col md={10}>
              <Image preview={false} src='/lang-logs.png'></Image>
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
