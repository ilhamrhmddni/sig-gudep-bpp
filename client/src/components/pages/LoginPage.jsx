import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../atoms/TextInput";
import FormLabel from "../atoms/FormLabel";
import PrimaryButton from "../atoms/PrimaryButton";
import { login } from "../../services/AuthService";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      // Pastikan ada token dan role
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/kwarran", { replace: false });
        } else if (role === "operator") {
          navigate("/operator/gugusdepan", { replace: false });
        }
      }, 100);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Input Tidak Valid",
        text: "Username dan password harus diisi.",
      });
      return;
    }

    setLoading(true); // Set loading to true

    try {
      const response = await login(username, password);
      if (response && response.token) {
        // Save important data in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user_id", response.user.id);
        localStorage.setItem("username", response.user.username);
        localStorage.setItem("email", response.user.email);
        localStorage.setItem("role", response.user.role);
        localStorage.setItem("gudep_id", response.gudep_id);
        localStorage.setItem("geografis_id", response.geografis_id);

        // Show success notification
        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: response.message,
        });

        // Redirect to the URL provided by the server
        navigate(response.redirectUrl, { replace: true });
      } else {
        // If token is not present, login failed
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: response.message || "Login gagal. Coba lagi.",
        });
      }
    } catch (error) {
      // Handle any errors that may occur during login
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Terjadi kesalahan saat login: " + error.message,
      });
      console.error(error);
    } finally {
      setLoading(false); // Reset loading after the request
    }
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#9500FF] bg-[length:60%] md:bg-[length:50%] bg-no-repeat bg-center "
      style={{
        backgroundImage: "url('/bg-siluet.png')",
      }}
    >
      <div className="w-full max-w-md flex flex-col md:space-y-24 my-8">
        <div className="flex flex-col items-center ">
          <div className="w-24 h-24 bg-[url('/logo.png')] bg-contain bg-no-repeat bg-center"></div>
          <h2 className="text-2xl font-bold text-center text-white">
            Sistem Informasi Geografis <br />
            Pegudep Balikpapan
          </h2>
        </div>
        <br />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-12 md:space-y-24"
        >
          <div className="flex flex-col gap-4 items-center sm:items-stretch">
            <div>
              <FormLabel htmlFor="username" text="Username" />
              <TextInput
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
              />
            </div>
            <div>
              <FormLabel htmlFor="password" text="Password" />
              <TextInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <PrimaryButton text="Login" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
