import React from "react";
import "antd/dist/antd.css";
import { Typography, Card, Avatar, Button, Row, Col, Tooltip } from "antd";
import {
  UserOutlined,
  BookOutlined,
  LogoutOutlined,
  SettingOutlined
} from "@ant-design/icons";

const { Text } = Typography;

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {},
    };
  }

  componentDidMount() {
    fetch(api_url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Card
            size="small"
            style={{ width: 300 }}
            actions={[
              <Tooltip placement="bottom" title="Settings">
                <Button
                  type="text"
                  icon={<SettingOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }}/>}
                  href="#"
                />
              </Tooltip>,
              <Tooltip placement="bottom" title="Sign out">
                <Button
                  type="text"
                  icon={<LogoutOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }}/>}
                  href={ logout_url }
                />
              </Tooltip>,
              <Tooltip placement="bottom" title="Terms">
                <Button
                  type="text"
                  icon={<BookOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }}/>}
                  href="#"
                />
              </Tooltip>
            ]}
          >
            <div style={{ margin: "auto" }} />
            <Row justify="center" style={{ paddingTop: 6, paddingBottom: 10 }}>
              <Col>
                <Avatar size={80} icon={<UserOutlined />} />
              </Col>
            </Row>
            <Row justify="center" style={{ marginBottom: -3 }}>
              <Col>
                <Text strong style={{ fontSize: 17 }}>
                  John Doe
                </Text>
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <Text style={{ color: "#a3a3a3" }}>testemailaddress12@gmail.com</Text>
              </Col>
            </Row>
          </Card>
        </div>
      )
    }
  }
}

export default ProfileCard;