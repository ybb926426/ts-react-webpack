import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import SiderMenu from '../components/layout/SiderMenu';
import BaseRouter from '@/route/base';
import './BasicLayout.less';
import classNames from 'classnames';

const { Sider, Header, Content } = Layout;

const BasicLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toogle = () => {
    setCollapsed(!collapsed);
  }
  const getHiddenDomStyle = () => {
    const width = `${ collapsed ? 80 : 200 }px`;
    return {
      width: width,
      overflow: 'hidden',
      flex: `0 0 ${width}`,
      maxWidth: width,
      minWidth: width,
      transition: 'all 0.2s',
    };
  }
  const getHeaderDomStyle = () => {
    const width = `${ collapsed ? 80 : 200 }px`;
    const height = '64px';
    // return {
    //   padding: '0px',
    //   height: height,
    //   flex: `0 0 ${width}`,
    //   maxWidth: width,
    //   minWidth: width,
    //   transition: 'all 0.2s',
    // };
    return {
      padding: '0px',
      height: height,
      lineHeight: height,
      width: `calc(100% - ${width})`,
      zIndex: 19,
      right: '0px',
      transition: 'all 0.2s',
    };
  }
  const headerFixed = true;
  return (
    <div className="basicLayout">
      {/* style={{height: 'calc(100vh - 60px)'}} */}
      <Layout>
        <div
          style={getHiddenDomStyle()}
        ></div>
        <Sider collapsible collapsed={collapsed} theme="light" className="ant-sider-fixed">
          <SiderMenu />
        </Sider>
        <Layout className="container">
          {
            headerFixed ? <Header style={{height: '64px'}}></Header>:null
          }
          <Header className={classNames(
            'my-header',
            {
              'multiple-header--fixed': headerFixed,
            }
          )} style={getHeaderDomStyle()}>
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
