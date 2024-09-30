import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import logo from "../assets/light-icon.png";
import { sidebarItems } from "../utils/sidebar";
const { Header, Sider, Content } = Layout;
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  const onMenu = (e) => {
    if (e.key) {
      setPath(e.key);
    }
  };

  const openFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    const doc = document.documentElement;

    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) {
      doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      doc.msRequestFullscreen();
    }

    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  return (
    <Layout onClick={onMenu} style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img src={logo} style={{ width: "100%", padding: "10px 5px" }} alt="" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={onMenu}
          selectedKeys={[path]}
          items={sidebarItems()}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: " space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="text"
            onClick={openFullScreen}
            icon={
              isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
            }
            style={{
              marginRight: "20px",
              fontSize: "16px",
              width: 50,
              height: 50,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "10px",
            padding: 20,
            background: "#fff",
            borderRadius: "#001529",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Navbar;
