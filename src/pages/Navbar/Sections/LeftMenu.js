import React from 'react';
import {Menu} from 'antd';
import {Link} from "react-router-dom";
import {ShopOutlined, SketchOutlined, MailOutlined} from '@ant-design/icons';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="products"><Link to="/ice-creams">Products</Link></Menu.Item>
            <Menu.Item key="shops"><Link to="/shops">Shops</Link></Menu.Item>
            <Menu.Item key="feedback"><Link to="/feedback">Feedback</Link></Menu.Item>
        </Menu>
    )
}

export default LeftMenu
