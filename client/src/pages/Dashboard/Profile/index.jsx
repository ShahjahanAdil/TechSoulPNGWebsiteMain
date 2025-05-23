import React, { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useAuth0 } from '@auth0/auth0-react'
import axios from "axios";
import ButtonLoader from "../../../components/ButtonLoader";

export default function Profile() {

    const { userData, dispatch } = useAuthContext()
    const { user } = useAuth0()

    const { userID, username, email, address, phone } = userData
    const initialState = { userID, username, email, address, phone, oldPassword: "", newPassword: "" }

    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const handleOnChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleUpdateProfile = () => {
        if (!state?.username || !state?.email) {
            return window.toastify("Username and email fields are required!", "warning")
        }

        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/dashboard/profile/update-profile`, state)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    window.toastify(data.message, "success")
                    setState(prev => ({ ...prev, oldPassword: "", newPassword: "" }))
                    dispatch({ type: "SET_PROFILE", payload: { user: { ...userData, ...state } } })
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify(err.response?.data?.message || "Something went wrong", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <div className="p-4 md:p-8 bg-white rounded-[20px]  h-full shadow">
                <h5 className="text-xl  !text-[#55AF7C] font-semibold mb-8">My Profile</h5>

                {/* <h6 className="font-semibold mb-5">User Details</h6> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={state?.username}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div>
                                <label className="font-semibold mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={state?.email}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>

                            {
                                !user &&
                                <div>
                                    <label className="font-semibold mb-2">
                                        Enter Old Password
                                    </label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        placeholder="Enter your old password"
                                        value={state?.oldPassword}
                                        className="w-full border px-4 py-2 rounded-[10px]"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            }
                        </div>
                    </div>

                    <div>
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter your address"
                                    value={state?.address}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div>
                                <label className="font-semibold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="123456789"
                                    value={state?.phone}
                                    className="w-full border px-4 py-2 rounded-[10px]"
                                    onChange={handleOnChange}
                                />
                            </div>

                            {
                                !user &&
                                <div>
                                    <label className="font-semibold mb-2">
                                        Enter New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        placeholder="Enter your new password"
                                        value={state?.newPassword}
                                        className="w-full border px-4 py-2 rounded-[10px]"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="bg-[#55AF7C] text-white flex items-center gap-2 px-6 py-2 rounded-[12px] hover:bg-[#55af7cb7] transition" disabled={loading} onClick={handleUpdateProfile}>
                        {loading ? 'Saving' : 'Save'} changes {loading && <ButtonLoader />}
                    </button>
                </div>
            </div>
        </>
    );
}
