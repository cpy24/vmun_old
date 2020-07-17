import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import jQuery from 'jquery';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}

async function postData(url = '', data = {}) {
  let csrftoken = getCookie('csrftoken');

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify(data)
  });
  return response.text();
}

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event => event.preventDefault();
    postData('/account/login', { answer: 42 })
    .then(data => {console.log(data);});  // JSON data parsed by `data.json()` call
  }

  render () {
    return (
      <Row justify="center">
        <Col span={24} style={{ maxWidth: 300, paddingTop: 100 }}>
          <Form
            style={{ width: "100%" }}
            onFinish={this.handleSubmit}
            noValidate 
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" }
              ]}
              onChange={this.handleUsernameChange}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" }
              ]}
              onChange={this.handlePasswordChange}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a style={{ float: "right" }} href="">Forgot password</a>
            </Form.Item>
            <Form.Item>
              <Button type="submit" htmlType="submit" style={{ width: "100%" }}>
                Log in
              </Button>
              Or <a href={ signup_url }>register now!</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }
};

ReactDOM.render(<NormalLoginForm />, document.getElementById("root")); 