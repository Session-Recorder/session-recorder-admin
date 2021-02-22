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
import CLayout from "components/CLayout";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import WebsitesPage from "pages/WebsitesPage";
import WebsiteOverviewPage from "pages/WebsiteOverviewPage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/websites" exact>
            <WebsitesPage />
          </Route>
          <Route path="/websites/:id">
            <WebsiteOverviewPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
