import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Menu,
  Row,
  Space,
  Spin,
} from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import Icon, {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  LogoutOutlined,
  LoginOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import Loading from "./Loading";
import Blank from "./Blank";

export interface CLayoutProps {
  asynchronous?: boolean;
  ready?: boolean;
  path?: string[];
}

const CLayout: React.FC<CLayoutProps> = ({
  children,
  ready,
  asynchronous,
  path,
}) => {
  const history = useHistory();

  if (asynchronous && !ready) {
    return (
      <Blank>
        <Loading />
      </Blank>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Row align="middle" justify="space-between" gutter={20}>
          <Col flex={1}></Col>
          <Col>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="horizontal">
              <Menu.Item
                key="1"
                icon={<DesktopOutlined />}
                onClick={() => {
                  history.push("/websites");
                }}
              >
                웹사이트 관리
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                유저 관리
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Button size="large">로그아웃</Button>
          </Col>
        </Row>
      </Header>
      {/* <Layout className="site-layout"> */}
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {path?.map((text) => {
            return <Breadcrumb.Item>{text}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Cursor ©2021</Footer>
      {/* </Layout> */}
    </Layout>
  );
};

export default CLayout;
