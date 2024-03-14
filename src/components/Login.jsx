import React, { useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "../assets/styles/login.css";
import image from "../assets/NCC.png";
import { useNavigate, useLocation } from "react-router";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../context/auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { setAuth, userType, setUserType, isLoggedIn, setIsLoggedIn } = context;

  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleClick = async (values) => {
    try {
      const email = values.username;
      const password = values.password;
      console.log(email, password);
      await signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user.user.uid);
          setUserType(user.user.uid);
          setIsLoggedIn(true);
          localStorage.setItem("user", user.user.uid);
          setAuth({ roles: [user.user.uid] });
          // navigate("/dashboard");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
      console.log(isLoggedIn, userType);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <>
      <div className="bg-white mx-auto flex justify-center h-screen items-center max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
        <div className="flex justify-start h-max  gap-10 flex-col  flex-1 max-w-md rounded-3xl bg-gradient-to-t from-teal-400 via-blue-700 to-blue-600 px-8 py-12 text-white   md:mr-8">
          <p className="my-1 font-roboto  text-7xl text-center font-bold md:text-4xl md:leading-snug">
            National Cadet Corps
          </p>
          <div className="bg-white shadow-2xl bg-opacity-10 rounded-2xl px-4 py-8">
            <img className="rounded-md drop-shadow-xl " src={image}></img>
            <div className="">
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-center">
                  "Unity and Discipline" <br /> (Ekta aur Anushasan)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-20 flex justify-start  flex-col gap-10 w-1/3">
          <h1 className="text-5xl">
            Welcome Back to <br />
            <span className="font-bold text-blue-600">
              1(K)NU NCC TRIVANDRUM!
            </span>
          </h1>
          <h2 className="mb-2 text-3xl font-semibold">Login</h2>
          <Form
            layout="vertical"
            name="normal_login"
            className="login-form "
            initialValues={{
              remember: true,
            }}
            onFinish={handleClick}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                name="password"
                size="large"
              />
            </Form.Item>
            <div className="flex my-4 justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </div>

            <div className="flex justify-center flex-col">
              <Button
                htmlType="submit"
                style={{ backgroundColor: "#2563eb", color: "white" }}
                className="login-form-button"
                size="large"
              >
                Log in
              </Button>
              <a href="" className="my-2 text-blue-500">
                Forgot password!
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
