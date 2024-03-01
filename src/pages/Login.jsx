import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    const storedSignupData = JSON.parse(localStorage.getItem("signupData"));

    if (
      storedSignupData &&
      LoginData.email === storedSignupData.email &&
      LoginData.password === storedSignupData.password
    ) {
      localStorage.setItem("loginData", JSON.stringify(LoginData));
      signIn();
      navigate("/");
      console.log("Login Done");
    } else {
      console.log("Invalid credentials");
    }
  };

  const handleChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen relative pb-56">
      <h2 className="text-2xl font-bold mb-4 absolute top-10 left-1/2 transform -translate-x-1/2">
        Login
      </h2>

      <div className="bg-gray-200 p-8 w-[40%] h-[60%] flex flex-col items-center">
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 rounded"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 mb-11 rounded hover:bg-blue-600"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
