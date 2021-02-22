import { Breadcrumb, Button, DatePicker, Menu, Space } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import Icon, {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

function CLayout({ children }) {
  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <Header
        className="header"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="logo">Some Logo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Menu.Item key="1">웹사이트 관리</Menu.Item>
          <Menu.Item key="2">세션 관리</Menu.Item>
          <Button size="large" style={{ marginLeft: 20 }}>
            <b>로그아웃</b>
          </Button>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="웹사이트 관리">
              <Menu.Item key="1">웹사이트 등록/삭제</Menu.Item>
              <Menu.Item key="2">세션 보아보기</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default CLayout;
