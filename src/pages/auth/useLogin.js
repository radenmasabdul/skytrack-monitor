import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function useLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            if (email === "admin@gmail.com" && password === "123456") {
                localStorage.setItem("user", JSON.stringify({ name: "Admin" }));

                Swal.fire({
                    icon: "success",
                    title: "Login Berhasil",
                    text: "Selamat datang kembali!",
                    timer: 1500,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1300);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Gagal",
                    text: "Email atau password salah",
                });
            }
        }, 1000);
    };

    return {
        email,
        password,
        isLoading,
        setEmail,
        setPassword,
        handleSubmit,
    };
}
