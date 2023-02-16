import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  AlignLeftOutlined,
  PlusSquareOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import React from "react";

export default function SiteBarCP() {
  const location = useLocation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem(
      <NavLink to="/">
        <img
          src="https://www.icons101.com/icon_ico/id_31985/fish.ico"
          alt="logo"
        />
      </NavLink>
    ),
    getItem(<NavLink to="/">DashBoard</NavLink>, "/", <BarChartOutlined />),
    getItem(
      <NavLink to="/products">Products List</NavLink>,
      "/products",
      <AlignLeftOutlined />
    ),
    getItem(
      <NavLink to="/products/add">Add Product</NavLink>,
      "/products/add",
      <PlusSquareOutlined />
    ),
    getItem(
      <NavLink to="/account">Account</NavLink>,
      "/account",
      <UserOutlined />
    ),
  ];

  return (
    <Sider className="site-layout-background">
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["/"]}
        selectedKeys={[location.pathname]}
        className="menu-site-bar"
        items={items}
      />
    </Sider>
  );
}
