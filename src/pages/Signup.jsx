import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!signupData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!validateMobile(signupData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
      isValid = false;
    } else {
      newErrors.mobile = "";
    }

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!validatePassword(signupData.password.trim())) {
      newErrors.password =
        "Password must be at least 8 characters and contain at least 1 uppercase, 1 lowercase, and 1 special character";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (signupData.password.trim() !== signupData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    if (isValid) {
      console.log("Signing Up...", signupData);

      localStorage.setItem("signupData", JSON.stringify(signupData));

      navigate("/login");
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    setSignupData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen relative pb-40">
      <h2 className="text-2xl font-bold mb-8 absolute top-5 left-1/2 transform -translate-x-1/2">
        Signup
      </h2>

      <div className="bg-gray-200 mt-52 w-[40%] h-[100%] flex flex-col items-center p-8">
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              className={`w-full border p-2 rounded ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              className={`w-full border p-2 rounded ${
                errors.mobile ? "border-red-500" : ""
              }`}
              placeholder="Enter your mobile number"
              onChange={handleChange}
            />
            {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full border p-2 rounded ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`w-full border p-2 rounded ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full border p-2 rounded ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="Confirm your password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 mb-11 rounded hover:bg-blue-600"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
