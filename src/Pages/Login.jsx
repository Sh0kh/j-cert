import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Swal from "sweetalert2";

const Login = () => {
  const [phone, setPhone] = useState(""); // Только цифры
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`/sdg/uz/login`, {}, {
        params: {
          login: `+998${phone}`,
          password: password
        }
      });

      localStorage.setItem("token", response.data.token);
      navigate("/admin/home");

      Swal.fire({
        title: "Success!",
        text: "You have successfully logged in.",
        icon: "success",
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: true,
        toast: true,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred.",
        icon: "error",
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: true,
        toast: true,
        showConfirmButton: false,
      });
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <div className="w-full max-w-md p-8 bg-gray-50 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h1>

        <Input
          label="Phone Number"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Оставляем только цифры
            setPhone(value.slice(0, 9)); // Ограничиваем 
          }}
          type="text"
          required
          className="border-gray-300 focus:border-indigo-500"
        />

        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <Button
          fullWidth
          color="indigo"
          onClick={handleLogin}
          className="bg-[#009970] text-white hover:bg-[#009970cd] transition duration-300"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
