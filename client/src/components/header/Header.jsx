import { Group, Button, Text, Box } from "@mantine/core";
import classes from "./Header.module.css";
import ThemeSwitch from "../theme/ThemeSwitch";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, isLoggedIn } from "@redux/auth/authSlice";
import axiosInstance from "../../config/axios";

export default function Header() {
  const navigate = useNavigate();
  const isAuth = useSelector((store) => store.auth.isAuth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(isLoggedIn(false));
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/", { replace: true });
    axiosInstance.defaults.headers.common["Authorization"] = "";
  };
  return (
    <Box pb={5}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text
            fz={{ base: "md", lg: "xl" }}
            fw={700}
            tt="uppercase"
            component={Link}
            to="/"
          >
            ExpenSave
          </Text>
          <Group justify="space-end" h="100%">
            <ThemeSwitch />

            {isAuth ? (
              <Button size="md" radius="xl" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button size="md" radius="xl" component={Link} to="/login">
                Login
              </Button>
            )}
          </Group>
        </Group>
      </header>
    </Box>
  );
}
