"use client";

import { useState } from "react";
import LoginLogo from "@/components/login/LoginLogo";
import AddRecordModal from "@/components/record/AddRecordModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const router = useRouter();
  const handleClick = (link) => {
    setActiveLink(link);
  };

  const SignOut = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
    toast.success("Successfully signed out!");
  };

  return (
    <div className="w-full">
      <div className="container max-w-[1260px] m-auto my-8">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <LoginLogo />
            <Link href="/dashboard">
              <div
                onClick={() => handleClick("dashboard")}
                className={`text-base ${
                  activeLink === "dashboard" ? "font-bold" : "font-normal"
                }`}
              >
                Dashboard
              </div>
            </Link>
            <Link href="/records">
              <div
                onClick={() => handleClick("records")}
                className={`text-base ${
                  activeLink === "records" ? "font-bold" : "font-normal"
                }`}
              >
                Records
              </div>
            </Link>
          </div>
          <div className="flex gap-5">
            <button
              className="btn bg-info rounded-full"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              + Records
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-10 top-10">
                    ✕
                  </button>
                </form>
                <AddRecordModal />
              </div>
            </dialog>
            <details className="dropdown relative group">
              <summary className="flex cursor-pointer items-center">
                <div className="avatar w-[50px] h-[50px] relative">
                  <div className=" rounded-full">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt="User Avatar"
                      className="object-cover w-[20px] h-[20px]"
                    />
                  </div>
                </div>
              </summary>

              <ul className="menu mt-1 dropdown-content w-48 p-1 rounded-lg ">
                <li>
                  <button
                    onClick={SignOut}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition ease-in-out duration-150"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
