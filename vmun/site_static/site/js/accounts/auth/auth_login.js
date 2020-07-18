import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Row, Col, Spin } from "antd";
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

  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {'X-CSRFToken': csrftoken,},
    body: formData
  });
  return response.json();
}

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: '',
      usernameProps: {}, passwordProps: {}
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
    if (event.target.value == '') {
      this.usernameProps = {
        hasFeedback: true, validateStatus: "warning",
        help: "Username cannot be empty"
      }
    } else {this.usernameProps = {}}
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
    if (event.target.value == '') {
      this.passwordProps = {
        hasFeedback: true, validateStatus: "warning",
        help: "Password cannot be empty"
      }
    } else {this.passwordProps = {}}
  }

  handleSubmit(event) {
    event => event.preventDefault();
    postData('/account/login', this.state)
    .then(data => {
      if (data.success) {window.location = '/';}
      else {
        this.usernameProps = this.passwordProps = {
          hasFeedback: true, validateStatus: "error",
          help: "Username and Password do not match"
        }
        console.log('updating props');
      }
    });
  }

  render () {
    return (
      <Row justify="center">
        <Col span={24} style={{ maxWidth: 315, paddingTop: 100 }}>
          <Form
            style={{ width: "100%" }} onFinish={this.handleSubmit}
            noValidate 
          >
            <Form.Item
              name="username"
              {...this.usernameProps}
              onChange={this.handleUsernameChange}
            >
              <Input placeholder="Username"/>
            </Form.Item>
            <Form.Item
              name="password"
              {...this.passwordProps}
              onChange={this.handlePasswordChange}
            >
              <Input.Password type="password" placeholder="Password"/>
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
