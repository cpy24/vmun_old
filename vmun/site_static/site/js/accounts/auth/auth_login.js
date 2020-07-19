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

var csrftoken = getCookie('csrftoken');
const CSRFToken = () => {
  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
  );
};

async function postData(url = '', data = {}) {
  let csrftoken = getCookie('csrftoken');

  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'same-origin',
    headers: {'X-CSRFToken': csrftoken,},
    body: formData
  });
  return response.json();
}

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: '', remember: false,
      usernameProps: {}, passwordProps: {}, afterFail: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRememberChange = this.handleRememberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
    if (event.target.value == '') {
      const unLocalState = {...this.state.usernameProps,
        hasFeedback: true, validateStatus: "warning",
        help: "Identity cannot be empty"
      }
      this.setState({usernameProps: unLocalState});
    } else {
      this.setState({usernameProps: {}});
      if (this.state.afterFail) {
        this.setState({passwordProps: {}}); this.afterFail = false;
      }
    }
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
    if (event.target.value == '') {
      const pwLocalState = {...this.state.passwordProps,
        hasFeedback: true, validateStatus: "warning",
        help: "Password cannot be empty"
      }
      this.setState({passwordProps: pwLocalState});
    } else {
      this.setState({passwordProps: {}});
      if (this.state.afterFail) {
        this.setState({usernameProps: {}}); this.afterFail = false;
      }
    }
  }
  
  handleRememberChange(event) {
    this.setState({remember: event.target.checked});
  }

  handleSubmit(event) {
    event => event.preventDefault();
    postData('/account/login', this.state)
    .then(data => {
      if (data.success) {window.location = '/';}
      else {
        const usernameState = {...this.state.usernameProps,
          hasFeedback: true, validateStatus: "error",
        };
        const passwordState = {...this.state.passwordProps,
          hasFeedback: true, validateStatus: "error",
          help: "Login information do not match"
        };
        this.setState({usernameProps: usernameState});
        this.setState({passwordProps: passwordState});
        this.setState({afterFail: true})
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
            <CSRFToken />
            <Form.Item
              name="username"
              {...this.state.usernameProps}
              onChange={this.handleUsernameChange}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon"
                style={{ paddingRight: 8}} />} placeholder="Username or email"/>
            </Form.Item>
            <Form.Item
              name="password"
              {...this.state.passwordProps}
              onChange={this.handlePasswordChange}
            >
              <Input.Password 
                prefix={<LockOutlined className="site-form-item-icon"
                style={{ paddingRight: 8}}/>} type="password" placeholder="Password"/>
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  checked={this.state.checked}
                  onChange={this.handleRememberChange}>
                    Remember me
                </Checkbox>
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
