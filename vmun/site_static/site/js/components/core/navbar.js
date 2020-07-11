import React from "react";
import "antd/dist/antd.css";
import "../../../css/components/core/navbar.css"
import { PageHeader, Menu, Button, Tag, Dropdown, Row, Col, Typography } from "antd";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import ProfileCard from "./profilecard";

const { Title, Link } = Typography;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/help">Help</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/send_feedback">Send Feedback</a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="/admin">Admin</a>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => {
  return (
    <Dropdown key="more" overlay={menu} placement="bottomRight" trigger={["click"]}>
      <Button style={{ border: "none", padding: 0 }}>
        <QuestionCircleOutlined
          style={{ fontSize: 20, verticalAlign: "middle" }}
        />
      </Button>
    </Dropdown>
  );
};

const AccountDropdown = () => {
  if (user_auth) {
    return (
      <Dropdown key="more" overlay={<ProfileCard />} placement="bottomRight" trigger={["click"]}>
        <Button style={{ border: "none", padding: 0 }}>
          <UserOutlined style={{ fontSize: 20, verticalAlign: "middle" }}/>
        </Button>
      </Dropdown>
    )
  } else {
    return (
      <Button type="primary" href={ login_url }>Sign In</Button>
    )
  };
};

const CardTitle = () => {
  return (
    <Link href={ index_url }><Title level={4} style={{ margin: 0 }}>vMun</Title></Link>
  )
}

export default function Navbar() {
  return (
    <div className="site-page-header-ghost-wrapper">
      <Row>
        <Col xs={0} sm={24} md={24} lg={24} xl={24}>
          <PageHeader
            title={<CardTitle/>}
            ghost={false}
            className="site-page-header"
            subTitle="An online experience for MUN"
            tags={<Tag color="red">Testing</Tag>}
            extra={[ <DropdownMenu key="more" />, <AccountDropdown key="account" /> ]}
          />
        </Col>
        <Col xs={24} sm={0} md={0} lg={0} xl={0}>
          <PageHeader
            title={<CardTitle/>}
            ghost={false}
            className="site-page-header"
            extra={[ <DropdownMenu key="more" />, <AccountDropdown key="account" /> ]}
          />
        </Col>
      </Row>
    </div>
  );
}
