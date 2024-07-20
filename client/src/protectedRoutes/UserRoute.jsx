import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import { useEffect } from "react";
import { isLoggedIn } from "@redux/auth/authSlice";
import { useDispatch } from "react-redux";

export default function UserRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/check-user");
      console.log(response.data.success, " success");
      if (response.data.success === false) {
        dispatch(isLoggedIn(false));
        navigate("/login", { replace: true });
        return;
      }
      dispatch(isLoggedIn(true));
    } catch (error) {
      console.log(error.error, " error user route");
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    checkUser();
  }, [navigate]);
  return children;
}
