import {
  UserOutlined,
  HomeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import useNavigate
import { useLogout } from "../hooks/useLogout";

export const sidebarItems = () => {
  const { logout } = useLogout();

  return [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "3",
      icon: <CloseCircleOutlined />,
      label: (
        <Link to="/login" onClick={logout}>
          Exit
        </Link>
      ),
    },
  ];
};
