import React from 'react';
import { Card, Row, Col } from 'antd';
import { Analysis, MiniArea } from './components';
import { PieArea } from '@/components/Charts';

class DashBoard extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Row gutter={24}>
          <Col lg={12} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
                margin: '0 0 24px 0',
              }}>
              <Analysis />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
                margin: '0 0 24px 0',
              }}>
              `5`
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card
              title="转化率"
              style={{ height: '360px' }}
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
                margin: '0 0 24px 0',
              }}>
              <MiniArea />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              title="访问来源"
              style={{ height: '360px' }}
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
                margin: '0 0 24px 0',
              }}>
              <MiniArea />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              title="成交占比"
              style={{ height: '360px' }}
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
                margin: '0 0 24px 0',
              }}>
              <PieArea />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card
              title="转化率"
              style={{ height: '360px' }}
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
                margin: '0 0 24px 0',
              }}>
              <MiniArea />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              title="访问来源"
              style={{ height: '360px' }}
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
                margin: '0 0 24px 0',
              }}>
              <MiniArea />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              title="成交占比"
              style={{ height: '360px' }}
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
                margin: '0 0 24px 0',
              }}>
              <PieArea />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default DashBoard;
