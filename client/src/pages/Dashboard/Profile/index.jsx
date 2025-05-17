import React from "react";

export default function Profile() {
  return (
    <>
      <div className="p-4 md:p-8 bg-white rounded-[20px]  h-full shadow">
        <h5 className="text-xl  !text-[#55AF7C] text-center font-semibold mb-6">My Profile</h5>

        {/* Form Sections */}
        <h6 className="font-semibold mb-4">User Details</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <label className="text-black font-semibold my-1 block">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="User Name"
                  className="w-full border px-4 py-2 rounded-[10px]"
                />
              </div>

              <div>
                <label className="text-black font-semibold my-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border px-4 py-2 rounded-[10px]"
                />
              </div>

              
              <div>
                <label className="text-black font-semibold my-1 block">
                  Enter Old Password
                </label>
                <input
                  type="password"
                  placeholder="Old password"
                  className="w-full border px-4 py-2 rounded-[10px]"
                />
              </div>

              

            </div>
          </div>
          {/* Personal Data */}
          <div>
            <div className="space-y-4">
              <div>
                <label className="text-black font-semibold my-1 block">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Your Location"
                  className="w-full border px-4 py-2 rounded-[10px]"
                />
              </div>

              <div>
                <label className="text-black font-semibold my-1 block">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="12345678"
                  className="w-full border px-4 py-2 rounded-[10px]"
                />
              </div>

              <div>
                <label className="text-black font-semibold my-1 block">
                  Enter New Password
                </label>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full border px-4 py-2 rounded-[10px]"
                />
              </div>
            </div>
          </div>

        
        </div>

      
        <div className="mt-6 sm:text-right text-center">
          <button className="bg-[#55AF7C] text-white px-6 py-2 rounded-[12px] hover:bg-[#55af7cb7] transition">
            Save changes
          </button>
        </div>
      </div>
    </>
  );
}
