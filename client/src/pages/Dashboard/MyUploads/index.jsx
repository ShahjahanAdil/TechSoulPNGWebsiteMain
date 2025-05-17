import React from "react";
// import ccomingSoon from "../../../assets/images/coming soon.svg";

export default function MyUploads() {
  return (
    <div className="p-4 md:p-8 bg-white rounded-[20px] h-fit shadow">
      <h5 className="my-4 p-[20px] md:text-center ">My Uploads</h5>
      <div className="flex flex-col justify-center items-center sm:p-5">
        <img
          src="https://js.pngtree.com/a5/static/10lslky.Dn_TdEHJ.svg"
          alt="Coming Soon"
        />
        <p className="font-semibold !text-[18px] py-4">Coming Soon</p>
      </div>
    </div>
  );
}
