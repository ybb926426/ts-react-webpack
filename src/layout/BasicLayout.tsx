import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import SiderMenu from '../components/layout/SiderMenu';
import BaseRouter from '@/route/base';
import './BasicLayout.less';

const { Sider, Header, Content } = Layout;

const BasicLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toogle = () => {
    setCollapsed(!collapsed);
  }
  return (
    <div className="basicLayout">
      <Layout style={{height: 'calc(100vh - 60px)'}}>
        <Sider collapsible collapsed={collapsed} theme="light">
          <SiderMenu />
        </Sider>
        <Layout>
          <Header className="my-header" style={{padding: 0}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger middle-icon',
              onClick: toogle,
            })}
          </Header>
          <Content className="basic-main">
            <BaseRouter />
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </div>
  )
}

export default BasicLayout;
