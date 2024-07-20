import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import { useEffect } from "react";
import { isLoggedIn } from "@redux/auth/authSlice";
import { useDispatch } from "react-redux";
export default function AuthRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/check-user");
      console.log(response.data.success, " success");
      if (response.data.success === true) {
        dispatch(isLoggedIn(true));
        navigate("/home", { replace: true });
      }
      
    } catch (error) {
      console.log(error.error, " error user route");
      dispatch(isLoggedIn(false));
      
    }
  };

  useEffect(() => {
    checkUser();
  }, [navigate]);
  return children;
}
