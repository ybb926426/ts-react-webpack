import React, { PureComponent } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  TagsOutlined,
  ContainerOutlined,
  ProfileOutlined,
  ShopOutlined,
  PayCircleOutlined,
  MoneyCollectOutlined,
  ShareAltOutlined,
  RobotOutlined,
} from '@ant-design/icons';

const menus:Array<Menus> = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '大盘分析',
    icon: 'team',
    key: '/market',
    subs: [
      {key: '/market/market-analysis', title: '数据分析', icon: ''},
    ]
  },
  {
    title: '前端大盘',
    icon: 'tags',
    key: '/front-end',
    subs: [
      {key: '/front-end/app-access', title: '应用访问', icon: ''},
      {key: '/front-end/front-end-error', title: '前端错误', icon: ''},
      {key: '/front-end/api-access', title: 'API 访问', icon: ''},
    ]
  },
  {
    title: '后端大盘',
    icon: 'container',
    key: '/backend',
    subs: [
      {key: '/backend/backend-access', title: '后端访问', icon: ''},
      {key: '/backend/backend-error', title: '后端错误', icon: ''},
    ]
  },
  {
    title: '前端异常管理',
    icon: 'profile',
    key: '/abnormal',
    subs: [
      {key: '/abnormal/issue-kanban', title: 'issue 看板', icon: ''},
      {key: '/abnormal/issue-list', title: 'issue 列表', icon: ''},
      {key: '/abnormal/api-request-error', title: 'api 请求错误列表', icon: ''},
      {key: '/abnormal/front-task-list', title: '报警任务列表', icon: ''},
      {key: '/abnormal/front-error-report', title: '错误报告', icon: ''},
    ]
  },
  {
    title: '我的',
    icon: 'shop',
    key: '/mine',
    subs: [
      {key: '/mine/setting', title: '设置', icon: ''},
    ]
  },
  {
    title: '应用管理',
    icon: 'edit',
    key: '/application',
    subs: [
      {key: '/application/frontend-frame', title: '前端框架模板', icon: ''},
      {key: '/application/frontend-project-manage', title: '项目管理', icon: ''},
    ]
    // subs: [
    //   {key: '/commodity/store-setting', title: '店铺设置', icon: ''},
    //   {
    //     key: '/home/entry/form',
    //     title: '表单',
    //     icon: '',
    //     subs: [
    //       {key: '/home/entry/form/basic-form', title: '基础表单', icon: ''},
    //       {key: '/home/entry/form/step-form', title: '分步表单', icon: ''}
    //     ]
    //   },
    // ]
  }
]

interface BaseMenuState {
}
interface BaseMenuProps extends RouteComponentProps {
  theme?: string;
  style?: string;
}
interface Menus {
  title: string;
  icon: string;
  key: string;
  subs?: Array<Subs>
}
interface Subs {
  key: string;
  title: string;
  icon: string;
  subs?: Array<Subs>
}

class BaseMenu extends PureComponent<BaseMenuProps, BaseMenuState> {
  state = {
    openKeys: [],
    selectedKeys: []
  }

  componentDidMount() {
    // 防止页面刷新侧边栏又初始化了
    const pathname = this.props.location.pathname
    //获取当前所在的目录层级
    const rank = pathname.split('/')
    switch (rank.length) {
      case 2 :  //一级目录
        this.setState({
          selectedKeys: [pathname]
        })
        break;
      case 5 : //三级目录，要展开两个subMenu
        this.setState({
          selectedKeys: [pathname],
          openKeys: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]
        })
        break;
      default :
        this.setState({
          selectedKeys: [pathname],
          openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))]
        })
    }
  }

  onOpenChange = (openKeys:any) => {
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      })
      return
    }

    //最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1]
    //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    //只适用于3级菜单
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      })
    }
  }

  menuIcon =(icon: string) => {
    let iconD = <HomeOutlined/>
    switch (icon) {
      case 'team':
        iconD = <TeamOutlined/>
        break;
      case 'tags':
        iconD = <TagsOutlined/>
        break;
      case 'container':
        iconD = <ContainerOutlined/>
        break;
      case 'profile':
        iconD = <ProfileOutlined/>
        break;
      case 'shop':
        iconD = <ShopOutlined/>
        break;
      case 'pay-circle':
        iconD = <PayCircleOutlined/>
        break;
      case 'money-collect':
        iconD = <MoneyCollectOutlined/>
        break;
      case 'share-alt':
        iconD = <ShareAltOutlined/>
        break;
      case 'robot':
        iconD = <RobotOutlined/>
        break;
      default:
        break;
    }
    return iconD;
  }

  renderMenuItem = ({key, icon, title}: Subs) => {
    let iconD =  this.menuIcon(icon);
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {icon && iconD}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }
  renderSubMenu = ({key, icon, title, subs}: Subs) => {
    let iconD =  this.menuIcon(icon);
    return (
      <Menu.SubMenu key={key}
        title={<span>{icon && iconD}<span>{title}</span></span>}
      >
        {
          subs && subs.map(item => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
          })
        }
      </Menu.SubMenu>
    )
  }

  render() {
    const {openKeys, selectedKeys} = this.state;
    // const { style } = this.props;
    return (
      <Menu
        onOpenChange={this.onOpenChange}
        onClick={({key}) => this.setState({selectedKeys: [key]})}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        // theme={this.props.theme ? this.props.theme : 'dark'}
        // style={style}
        mode='inline'>
        {
          menus && menus.map(item => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
          })
        }
      </Menu>
    )
  }
}

export default withRouter(BaseMenu);
