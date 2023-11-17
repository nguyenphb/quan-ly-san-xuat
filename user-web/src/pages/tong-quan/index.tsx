import { Card, Col, Image, Row } from 'antd';
import React from 'react';
import ChartData from './ChartData';
import ChartData2 from '../nuoc-tho/ChartData2';

const MainPage = () => {
  return (
    <>
      <Row gutter={[25, 25]}>
        <Col md={24}>
          <Row gutter={[25, 25]}>
            <Col md={24}>
              <Card title="Tổng quan dữ liệu">
                <Image preview={false} src='/tong-quan-data.png'></Image>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={24}>
          <Card>
            <Row gutter={[25, 25]}>
              <Col md={12}>
                <ChartData></ChartData>
              </Col>
              <Col md={12}>
                <ChartData2></ChartData2>
              </Col>
            </Row>
          </Card>
        </Col>

      </Row>
    </>
  )
}

export default MainPage;
