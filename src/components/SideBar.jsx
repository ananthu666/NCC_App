import React, { useState } from "react";
import {
  LogoutOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  MoneyCollectOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <div className="" onClick={toggleCollapsed}>
        Menu
      </div>,
      "1",
      <MenuUnfoldOutlined onClick={toggleCollapsed} />
    ),
    getItem(
      <Link to="/dashboard">
        <div className="">Dashboard</div>
      </Link>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <Link to="/masterdata">
        <div className="">Master Data</div>
      </Link>,
      "master",
      <ContainerOutlined />
    ),

    getItem(
      <Link to="/addcadet">New Cadet</Link>,
      "newcadet",
      <UserAddOutlined />
    ),
    getItem(<Link to="/camp">Camp</Link>, "camp", <TeamOutlined />),
    getItem(
      <Link to="/finance">Finance</Link>,
      "fin",
      <MoneyCollectOutlined />
    ),

    getItem(
      <div onClick={logOut}>Logout</div>,
      "link2",
      <LogoutOutlined style={{ color: "crimson" }} />
    ),
  ];

  return (
    <>
      <Menu
        style={{
          height: "100vh",
          maxWidth: "200px",
        }}
        mode="inline"
        theme="dark"
        items={items}
        inlineCollapsed={collapsed}
      />
    </>
  );
};
export default SideBar;
