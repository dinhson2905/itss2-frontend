import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import Shops from './pages/Shop/Shops.js';
import IceCreams from './pages/IceCream/IceCreams.js';
import { Layout, Menu, Typography, Carousel } from 'antd';
import { ShopOutlined, SketchOutlined,MailOutlined} from '@ant-design/icons';
import Feedback from "./pages/Feedback";
import DetailProduct from "./pages/DetailProduct";
import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer/Footer";

// const { Header, Footer, Sider } = Layout;
const { Title } = Typography;



function App() {
  return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Switch>
              <Route path="/ice-creams">
                <IceCreams />
              </Route>
              <Route exact path="/ice-cream/:id" render={(props) => <DetailProduct{...props} />}>
                {/*<DetailProduct />*/}
              </Route>
              <Route path="/shops">
                <Shops />
              </Route>
              <Route path="/feedback">
                <Feedback />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Switch>
          <Footer />
        </Router>
      </>
  );
  // return (
  //   <Router>
  //     <div>
  //       <Layout>
  //         <Sider
  //           breakpoint="lg"
  //           collapseWidth="0"
  //           onBreakpoint={broken => {
  //             console.log(broken)
  //           }}
  //           onCollapse={(collapsed, type) => {
  //             console.log(collapsed, type)
  //           }}
  //         >
  //           <div className="logo" />
  //           <Menu theme="dark" mode="inline">
  //             <Menu.Item key="products" icon={<SketchOutlined />}><Link to="/ice-creams">Ice creams</Link></Menu.Item>
  //             <Menu.Item key="shops" icon={<ShopOutlined />}><Link to="/shops">Shops</Link></Menu.Item>
  //             <Menu.Item key="feedback" icon={<MailOutlined />}><Link to="/feedback">Feedback</Link></Menu.Item>
  //
  //           </Menu>
  //         </Sider>
  //         <Layout>
  //           <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: 'center'}}>
  //             <Title type="success">Ice creams</Title>
  //           </Header>
  //           <Switch>
  //             <Route path="/ice-creams">
  //               <IceCream />
  //             </Route>
  //             <Route exact path="/ice-cream/:id" render={(props) => <DetailProduct{...props} />}>
  //               {/*<DetailProduct />*/}
  //             </Route>
  //             <Route path="/shops">
  //               <Shops />
  //             </Route>
  //             <Route path="/feedback">
  //               <Feedback />
  //             </Route>
  //             <Route path="/">
  //               <IceCream />
  //             </Route>
  //           </Switch>
  //           <Footer style={{ textAlign: 'center' }}>IceCream App ©2020 Design by DHCBS team</Footer>
  //         </Layout>
  //       </Layout>
  //     </div>
  //   </Router>
  // );
}

export default App;
