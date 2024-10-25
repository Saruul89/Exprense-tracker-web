"use client";

import LoginLogo from "@/components/login/LoginLogo";
import AddRecordModal from "@/components/record/AddRecordModal";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full">
      <div className="container max-w-[1260px] m-auto my-8">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <LoginLogo />
            <Link href="/dashboard">
              <div className="text-base">Dashboard </div>
            </Link>
            <Link href="/records">
              <div className="text-base">Records</div>
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
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="profile img"
              className="w-[40px] h-[40px] rounded-full border"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
