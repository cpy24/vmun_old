import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Input, Tooltip, Select, Checkbox, Button, DatePicker, Row, Col } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Navbar from "../../components/core/navbar";

const { Option } = Select;

const formItemLayout = {
  labelCol: {xs: {span: 24}, sm: {span: 4}},
  wrapperCol: {xs: {span: 24}, sm: {span: 20}}
};

const tailFormItemLayout = {
  wrapperCol: {xs: {span: 24, offset: 0}, sm: {span: 20, offset: 4}}
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row justify="center">
      <Col span={24} style={{ maxWidth: 525, paddingTop: 25 }}>
        <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
          <Form.Item label="Name" style={{ marginBottom: 0 }}>
            <Form.Item
              name="firstname"
              rules={[
                {required: true, message: "Enter first name", whitespace: true}
              ]}
              style={{ display: "inline-block", width: "calc(50% - 4px)" }}
            >
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[
                { required: true, message: "Enter last name", whitespace: true }
              ]}
              style={{
                display: "inline-block", width: "calc(50% - 4px)", marginLeft: 8
              }}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label={
              <span>
                Username&nbsp;
                <Tooltip title="How others will identify you"><QuestionCircleOutlined /></Tooltip>
              </span>
            }
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="username"
              rules={[
                {required: true, message: "Choose an username", whitespace: true}
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="E-mail" style={{ marginBottom: 0 }}>
            <Form.Item
              name="email"
              rules={[
                {type: "email", message: "Enter a valid email address"},
                {required: true, message: "Choose an email address"}
              ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Password" style={{ marginBottom: 0 }}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Enter a password" }]}
              hasFeedback
              style={{ display: "inline-block", width: "calc(50% - 4px)" }}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {required: true, message: "Confirm the password", whitespace: true
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match");
                  }
                })
              ]}
              style={{
                display: "inline-block", width: "calc(50% - 4px)", marginLeft: 8
              }}
            >
              <Input.Password placeholder="Confirm" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Gender" style={{ marginBottom: 0 }}>
            <Form.Item
              name="gender"
              rules={[{required: true, message: "Select a gender" }]}
              style={{ width: "calc(50% - 4px)" }}
            >
              <Select placeholder="Gender" allowClear>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="others">Non-binary</Option>
                <Option value="none">Prefer not to say</Option>
              </Select>
            </Form.Item>
          </Form.Item>

          <Form.Item label="Birthday" style={{ marginBottom: 0 }}>
            <Form.Item
              name="date-picker"
              rules={[{required: true, message: "Select a date"}]}
            >
              <DatePicker />
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject("Accept the agreement to proceed")
              }
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>I have read the <a href="#">agreement</a></Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

ReactDOM.render(<RegistrationForm />, document.getElementById("root"));
ReactDOM.render(<Navbar />, document.getElementById("navbar"));
