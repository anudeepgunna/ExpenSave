import toast from "react-hot-toast";

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Flex,
  Box,
  LoadingOverlay,
} from "@mantine/core";

import { Link, useNavigate} from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../../config/axios";
import { useState } from "react";
import {setToken} from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
  
const schema = yup.object().shape({
  name: yup.string().required("Enter your name"),
  email: yup
    .string()
    .required("Enter your email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm,
      "Enter a valid email"
    ),
  password: yup
    .string()
    .required("Enter your password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("api/auth/signup", data, {
        withCredentials: true,
      });

      dispatch(setToken(res.data.token));
  
      toast.success(res.data.message);
      setLoading(false);
      axiosInstance.defaults.headers.common["Authorization"] =  `Bearer ${res.data.token}`;
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Flex
      gap="xs"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
      style={{
        minHeight: "90svh",
      }}
    >
      <Box pos="relative">
        <LoadingOverlay
          zIndex={1000}
          overlayProps={{ radius: "xl", blur: 1 }}
          visible={loading}
          loaderProps={{ color: "blue", type: "bars" }}
        />
        <Paper radius="xl" p="xl" withBorder shadow="xl" w={{ md: 400 }}>
          <Text size="xl" fw={600} mb={10} c="blue" ta={"center"}>
            Sign Up
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Your name"
                radius="xl"
                {...register("name")}
                error={errors.name && errors.name.message}
              />

              <TextInput
                label="Email"
                placeholder=" Your email"
                radius="xl"
                {...register("email")}
                error={errors.email && errors.email.message}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                radius="xl"
                {...register("password")}
                error={errors.password && errors.password.message}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                radius="xl"
                {...register("confirmPassword")}
                error={errors.confirmPassword && errors.confirmPassword.message}
              />
            </Stack>

            <Group justify="space-between" mt="xl">
              <Anchor
                type="button"
                c="dimmed"
                size="xs"
                component={Link}
                to="/login"
              >
                Already have an account? Login
              </Anchor>
              <Button type="submit" radius="xl">
                Sign Up
              </Button>
            </Group>
          </form>
        </Paper>
      </Box>
    </Flex>
  );
}
