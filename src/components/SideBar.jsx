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

    getItem("Cadet Registration", "reg", <UserAddOutlined />, [
      getItem(<Link to="/addcadet">Individual Registration</Link>, "add"),
      getItem(<Link to="/dashboard">Import Cadets</Link>, "import"),
    ]),
    getItem("Camp", "camp", <TeamOutlined />, [
      getItem(<Link to="/dashboard">Training 1</Link>, "t1"),
      getItem(<Link to="/dashboard">Training 2</Link>, "t2"),
      getItem(<Link to="/camp">Training 3</Link>, "t3"),
    ]),
    getItem("Finance", "fin", <MoneyCollectOutlined />, [
      getItem(<Link to="/dashboard">Unit Finance</Link>, "income"),
      getItem(<Link to="/finance">Camp Finance</Link>, "expense"),
      getItem(<Link to="/dashboard">Logistics</Link>, "logistics"),
    ]),

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
