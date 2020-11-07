import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import Shops from './pages/Shops.js';
import IceCreams from './pages/IceCreams.js';
import { Layout, Menu, Typography, Carousel } from 'antd';
import { ShopOutlined, HomeOutlined, SketchOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function onChange(a, b, c) {
  console.log(a, b, c);
}

const contentStyle = {
  maxHeight: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

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
              <Menu.Item key="homepage" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="products" icon={<SketchOutlined />}><Link to="/ice-creams">Ice creams</Link></Menu.Item>
              <Menu.Item key="shops" icon={<ShopOutlined />}><Link to="/shops">Shops</Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: 'center'}}>
              <Title type="success">Ice creams</Title>
            </Header>
            <Switch>
              <Route path="/ice-creams">
                <IceCreams />
              </Route>
              <Route path="/shops">
                <Shops />
              </Route>
              <Route path="/">
                <Content style={{ margin: '24px 16px 0' }}>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Carousel afterChange={onChange}>
                      <div>
                        <h3 style={contentStyle}>1</h3>
                      </div>
                      <div>
                        <h3 style={contentStyle}>2</h3>
                      </div>
                      <div>
                        <h3 style={contentStyle}>3</h3>
                      </div>
                      <div>
                        <h3 style={contentStyle}>4</h3>
                      </div>
                    </Carousel>
                  </div>
                </Content>
              </Route>
            </Switch>
            <Footer style={{ textAlign: 'center' }}>IceCreams App ©2020 Design by DHCBS team</Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
