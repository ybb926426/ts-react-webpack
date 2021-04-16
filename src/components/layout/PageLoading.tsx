import React from 'react';
import { Spin } from 'antd';

const PageLoading = () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    {/* <Button>加载中...</Button> */}
    <Spin size="large"/>
    {/* 加载中... */}
  </div>
)

export default PageLoading;
