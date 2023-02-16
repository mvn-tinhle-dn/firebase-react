import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import openNotificationWithIcon from "../../components/animations";
import { useUserAuth } from "../../Hooks/UserAuthContext";

export default function Login() {
  const { logIn, googleSignIn, facebookSignIn, user } = useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/");
  }, [user, navigate]);

  //Login Email
  const handleSubmit = async (values) => {
    try {
      await logIn(values.email, values.password);
      openNotificationWithIcon("success", "Logged in successfully!");
      navigate("/");
    } catch (err) {
      openNotificationWithIcon("warning", err.message);
    }
  };

  //Login Google
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      openNotificationWithIcon("success", "Logged in successfully!");
      navigate("/");
    } catch (error) {
      openNotificationWithIcon("warning", error.message);
    }
  };

  //Login Facebook
  const handleFaceSignIn = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn();
      openNotificationWithIcon("success", "Logged in successfully!");
      navigate("/");
    } catch (error) {
      openNotificationWithIcon("warning", error.message);
    }
  };

  return (
    <div className="container">
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
        <h1 className="login-title">Login</h1>
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
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 16,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 8,
          }}
        >
          <Button type="link" htmlType="button" onClick={handleGoogleSignIn}>
            SignIn Google
          </Button>
          <Button type="link" htmlType="submit" onClick={handleFaceSignIn}>
            SignIn Facebook
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
