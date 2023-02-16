import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../Hooks/UserAuthContext";
const { Header } = Layout;

export default function HeaderCP() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  function getItem(label, key, icon, onClick, children, type) {
    return {
      key,
      icon,
      onClick,
      children,
      label,
      type,
    };
  }
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const items = [
    getItem(
      <Link to="/account">{user?.email}</Link>,
      "account",
      <UserOutlined />
    ),
    getItem("Logout", "logout", <LoginOutlined />, () => handleLogout()),
  ];

  return (
    <Header className="header">
      <Menu
        key="menu-header"
        theme="dark"
        className="header-actions"
        items={items}
      ></Menu>
    </Header>
  );
}
