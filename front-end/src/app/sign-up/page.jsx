"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoginLogo from "@/components/login/LoginLogo";
import { BACKEND_ENDPOINT } from "@/constant/constant";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /^[a-zA-Z\s]+$/,
          "Invalid name, only alphabets and spaces are allowed"
        )
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        const response = await fetch(`${BACKEND_ENDPOINT}/sign-up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();

        if (response.ok) {
          router.push("/");
        } else {
          setErrorMessage(data.message || "Error occurred");
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
              <h1 className="leading-8 text-[24px] font-bold">
                Create Geld account...
              </h1>
              <p className="text-lg text-[#334155]">
                Sign up below to create your Wallet account
              </p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <input
              type="name"
              name="name"
              placeholder="Name"
              className="input w-full border bg-[#F3F4F6] rounded-lg h-[48px] pl-5"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              className="input w-full border bg-[#F3F4F6] rounded-lg h-[48px] pl-5"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
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
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}

            {errorMessage && (
              <div className="mb-4 text-red-600">{errorMessage}</div>
            )}

            <input
              type="password"
              placeholder="Re-Password"
              className="input w-full border bg-[#F3F4F6] rounded-lg h-[48px] pl-5"
            />
            <button className="w-full border bg-[#0166FF] text-white rounded-2xl h-[48px] pl-5 text-[20px]">
              Sign up
            </button>
            <div className="flex justify-center gap-3 mt-8 text-base">
              <p className=" text-[#0F172A]">Already have account?</p>
              <Link href={"/"}>
                <button className="text-[#0166FF]">Log in</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[50%] bg-[#0166FF]"></div>
    </div>
  );
};
export default Signup;
