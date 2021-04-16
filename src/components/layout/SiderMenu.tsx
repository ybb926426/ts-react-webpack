import React, { PureComponent, Suspense } from 'react';
import { Link } from 'react-router-dom';
import PageLoading from './PageLoading';
import logo from '@/assets/images/logo.svg';


import './index.less';

const BaseMenu = React.lazy(() => import('./BaseMenu'))

interface SiderMenuProps {
  hello?: string;
}
interface SiderMenuState {
  openKeys: string;
}

export default class SiderMenu extends PureComponent<SiderMenuProps, SiderMenuState> {
  constructor(props: SiderMenuProps) {
    super(props);
    this.state = {
      openKeys: ''
    }
  }

  render() {
    // const { collapsed, theme, onThemeChange } = this.props;
    return (
      <Suspense fallback={<PageLoading />}>
        <div style={{height: '100vh',overflowY:'auto'}}>
          <div id="logo" className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1>数据分析</h1>
            </Link>
          </div>
          <div className="sider-menu">
            <BaseMenu />
          </div>
          <div className="sider-footer">
          </div>
        </div>
      </Suspense>
    )
  }
}
