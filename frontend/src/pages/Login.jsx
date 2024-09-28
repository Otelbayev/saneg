import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await login(values.email, values.password);
    if (res) {
      navigate("/");
    }
  };

  return (
    <section className="s-bg">
      <div className="s-component">
        <div>
          <img src={logo} className="logo" alt="" />
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              block="true"
              disabled={isLoading}
              type="primary"
              htmlType="submit"
            >
              Log in
            </Button>
          </Form.Item>
          {error && <p className="error">{error}</p>}
        </Form>
      </div>
    </section>
  );
}
