import { Form, Button, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import openNotificationWithIcon from "../../components/animations";
import { useUserAuth } from "../../Hooks/UserAuthContext";

const Signup = () => {
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await signUp(values.email, values.password);
      navigate("/login");
      openNotificationWithIcon("success", "SignUp in successfully!");
    } catch (err) {
      openNotificationWithIcon("warning", err.message);
    }
  };

  return (
    <div className="container">
      {" "}
      <Form
        name="basic"
        className="form-login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <h1 className="login-title">Register</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <div>
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 16,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
