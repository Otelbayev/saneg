import React from "react";
import { Button, Form, Grid, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import { useSignup } from "./../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Signup() {
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const onFinish = async ({ name, surname, email, password }) => {
    const res = await signup(name, surname, email, password);
    if (res) {
      navigate("/");
    }
  };

  return (
    <section className="s-bg">
      <div className="s-component">
        <div>
          <img src={logo} className="logo" alt="" />
          <Title style={{ textAlign: "center" }}>Sign Up</Title>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          {/* Name Input */}
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          {/* Surname Input */}
          <Form.Item
            name="surname"
            rules={[
              {
                required: true,
                message: "Please input your Surname!",
              },
            ]}
          >
            <Input placeholder="Surname" />
          </Form.Item>

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Submit Button */}
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              block={true}
              disabled={isLoading}
              type="primary"
              htmlType="submit"
            >
              Sign up
            </Button>
          </Form.Item>

          {/* Error Message */}
          {error && <p className="error">{error}</p>}
        </Form>
      </div>
    </section>
  );
}
