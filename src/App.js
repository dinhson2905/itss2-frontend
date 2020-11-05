import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout, Menu, Typography } from 'antd';
import 'antd/dist/antd.css';
import { ShopOutlined, UserOutlined, SketchOutlined} from '@ant-design/icons';
import './App.css';

import Shops from './pages/Shops.js'

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

function App() {
  return (
    <Router>
      <div>
        <Layout>
          <Sider
            breakpoint="lg"
            collapseWidth="0"
            onBreakpoint={broken => {
              console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type)
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['homepage']}>
              <Menu.Item key="homepage" icon={<UserOutlined />}>Home</Menu.Item>
              <Menu.Item key="products" icon={<SketchOutlined />}>Ice creams</Menu.Item>
              <Menu.Item key="shops" icon={<ShopOutlined />}>Shops</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: 'center'}}>
              <Title type="success">Ice creams</Title>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                content
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
