import React, { useState } from "react";
import {
  LogoutOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import { Link } from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/">login</Link>, "link", <MailOutlined />),
  getItem("Navigation Two", "2", <CalendarOutlined />),

  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design
    </a>,
    "link3",
    <LinkOutlined />
  ),
  getItem(<Link to="/">Logout</Link>, "link2", <LogoutOutlined />),
];
const App = () => {
  return (
    <>
      <Menu
        style={{
          width: 256,
          height: "100vh",
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </>
  );
};
export default App;
