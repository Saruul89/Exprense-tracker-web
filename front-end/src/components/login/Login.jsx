"use client";
import Link from "next/link";
import LoginLogo from "./LoginLogo.jsx";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        const response = await fetch("http://localhost:8100/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Login successful!");
          localStorage.setItem("isLoggedIn", "true");
          router.push("/dashboard");
        } else {
          setErrorMessage(data.message || "Invalid credentials");
        }
      } catch (error) {
        setErrorMessage("Network error");
      }
    },
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      toast.success("you already login");
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="w-full flex justify-center h-screen">
      <div className="w-[50%] flex justify-center items-center">
        <div className="w-[384px] h-[426px]">
          <div className="flex justify-center flex-col items-center">
            <div className="flex justify-center items-center gap-2 mb-11">
              <LoginLogo />
              <p className="font-bold text-[24px]">Geld</p>
            </div>
            <div className="flex flex-col items-center gap-2 mb-11">
              <h1 className="leading-8 text-[24px] font-bold">Welcome Back</h1>
              <p className="text-lg text-[#334155]">
                Welcome back, Please enter your details
              </p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <input
              name="email"
              type="text"
              placeholder="Email"
              className="input w-full border bg-[#F3F4F6] rounded-lg h-[48px] pl-5"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="text-red-500 text-base">
                {formik.errors.email}
              </div>
            ) : null}

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input w-full border bg-[#F3F4F6] rounded-lg h-[48px] pl-5"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <div className="text-red-500 text-base">
                {formik.errors.password}
              </div>
            ) : null}

            <button className="w-full border bg-[#0166FF] text-white rounded-2xl h-[48px] pl-5 text-[20px]">
              Log in
            </button>

            <div className="flex justify-center gap-3 mt-8 text-base">
              <p className=" text-[#0F172A]">don't have account?</p>
              <Link href="/sign-up">
                <button className="text-[#0166FF]">Sign up</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[50%] bg-[#0166FF]"></div>
    </div>
  );
};
export default Login;
