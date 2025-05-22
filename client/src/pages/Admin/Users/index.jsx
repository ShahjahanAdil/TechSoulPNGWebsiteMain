import React, { useState, useRef, useEffect } from 'react'
import { BiInfoCircle, BiSearch, BiShield, BiUser, BiX } from 'react-icons/bi'
import { CgTrashEmpty } from 'react-icons/cg'
import { FaUsers } from 'react-icons/fa'
import { GrFilter } from 'react-icons/gr'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import Loader from '../../../components/Loader'

export default function Users() {

    const { userData } = useAuthContext()
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchEmail, setSearchEmail] = useState("")
    const [searchedUser, setSearchedUser] = useState({})
    const [makeAdminID, setMakeAdminID] = useState("")
    const [makeRegUserID, setMakeRegUserID] = useState("")
    const [delUserID, setDelUserID] = useState("")
    const [userDetails, setUserDetails] = useState({})
    const [showDetails, setShowDetails] = useState(false)
    const [loading, setLoading] = useState(true)

    const [actionPos, setActionPos] = useState({ top: 0, left: 0 })
    const [showActions, setShowActions] = useState(false)
    const buttonRef = useRef(null)

    const handleActionClick = (e, user) => {
        // const rect = e.currentTarget.getBoundingClientRect()
        // const dropdownWidth = 220

        // setActionPos({
        //     top: rect.bottom + window.scrollY + 8,
        //     left: rect.right + window.scrollX - dropdownWidth,
        // })
        // setShowActions(!showActions)

        // const { userID } = user

        // setMakeAdminID(userID)
        // setMakeRegUserID(userID)
        // setUserDetails(user)
        // setDelUserID(userID)

        setShowActions(prev => !(userDetails.userID === user.userID && showActions))
        setUserDetails(user)
        setMakeAdminID(user.userID)
        setMakeRegUserID(user.userID)
        setDelUserID(user.userID)
    }

    useEffect(() => {
        if (userData?.userID) {
            fetchUsers(page)
        }
    }, [userData, page])

    const fetchUsers = (page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/fetch-users?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setUsers(data?.users || [])
                    setTotalPages(Math.ceil(data?.totalUsers / 20))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleSearchUser = e => {
        e.preventDefault()

        setLoading(true)
        setSearchedUser({})
        axios.get(`${import.meta.env.VITE_HOST}/admin/fetch-users/${searchEmail}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setSearchedUser(data?.user || {})
                }
            })
            .catch(err => {
                const { status, data } = err.response
                if (status === 404) {
                    return window.toastify(data.message, "error")
                } else {
                    console.error("Error fetching user:", err.message)
                    return window.toastify("An unexpected error occurred. Please try again.", "error")
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleMakeAdmin = () => {
        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/make-admin/${makeAdminID}`)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedUsers = users.map(user => user.userID === makeAdminID ? { ...user, role: "admin" } : user)
                    setUsers(updatedUsers)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
                setShowActions(false)
            })
    }

    const handleMakeRegUser = () => {
        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/make-regular-user/${makeRegUserID}`)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedUsers = users.map(user => user.userID === makeRegUserID ? { ...user, role: "user" } : user)
                    setUsers(updatedUsers)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
                setShowActions(false)
            })
    }

    const handleShowDetails = () => {
        setShowDetails(!showDetails)
        setShowActions(false)
    }

    const handleDeleteUser = () => {
        setLoading(true)
        axios.delete(`${import.meta.env.VITE_HOST}/admin/delete-user/${delUserID}`)
            .then(res => {
                const { status, data } = res
                if (status === 203) {
                    const updatedUsers = users.filter(user => user.userID !== delUserID)
                    setUsers(updatedUsers)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
                setShowActions(false)
            })
    }

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-[5px] cursor-pointer hover:!bg-[#666] hover:!text-white ${page === i ? 'bg-[var(--dark)] text-white' : 'bg-[#e8e8e8] !text-[#666]'}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='main-container relative'>
            <h3 className='flex gap-2 items-center'><FaUsers /> Users</h3>
            <p className='px-2 py-1 bg-[var(--md-light)] inline-block rounded-[8px] !text-[var(--dark)] mt-2'>Manage users and their permissions</p>

            <div className='flex gap-5 justify-between mt-8'>
                <form className='relative' onSubmit={handleSearchUser}>
                    <input type="text" name="searchEmail" id="searchEmail" value={searchEmail} placeholder='Search user by email' className='px-3 py-2 bg-white rounded-[12px] w-[100%] md:w-[250px]' onChange={(e) => setSearchEmail(e.target.value.trim())} />
                    <BiSearch className='absolute right-[10px] top-1 text-[#666] bg-white h-[90%]' />
                </form>
                <div>
                    <p className='flex gap-2 items-center border border-gray-200 bg-white px-[10px] py-[8px] rounded-[10px]'><GrFilter /> Filter</p>
                </div>
            </div>

            <div className="w-full overflow-visible mt-8 rounded-[12px]">
                <div className='overflow-x-auto rounded-[12px]'>
                    <table className="min-w-[600px] w-full text-sm text-left bg-white">
                        <thead className="text-xs uppercase bg-[var(--md-light)] text-[var(--dark)] border-b border-gray-200">
                            <tr>
                                <th className="p-4 whitespace-nowrap">Username</th>
                                <th className="p-4 whitespace-nowrap">Email</th>
                                <th className="p-4 whitespace-nowrap">Role</th>
                                <th className="p-4 whitespace-nowrap">Subscription</th>
                                <th className="p-4 whitespace-nowrap">Registered Date</th>
                                <th className="p-4 whitespace-nowrap text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 ? (
                                    !searchedUser.email ?
                                        users.map(user => {
                                            const { userID, username, email, role, plan, createdAt } = user;
                                            return (
                                                <tr key={userID} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="p-4 text-[#333]">{username}</td>
                                                    <td className="p-4 text-[#333]">{email}</td>
                                                    <td className={`p-4 text-[#333] capitalize`}>
                                                        <span className={`px-2 rounded-full ${role === 'admin' && 'bg-[var(--secondary)] text-[#fff] !text-[14px]'} ${role === 'content manager' && 'bg-[#5d74da] text-[#fff] !text-[14px]'}`}>{role}</span>
                                                    </td>
                                                    <td className="p-4 text-[#333] capitalize">
                                                        <span className={`px-2 rounded-full ${plan === 'premium' && 'bg-[#e6d737] text-[#fff] !text-[14px]'}`}>{plan}</span>
                                                    </td>
                                                    <td className="p-4 text-[#333]">{new Date(createdAt).toLocaleDateString()}</td>
                                                    {/* <td className="relative p-4 text-[#333] text-end">
                                                        <button
                                                            ref={buttonRef}
                                                            className='text-[18px] font-bold px-2 pb-2 rounded-[8px] hover:bg-[var(--md-light)]'
                                                            onClick={(e) => handleActionClick(e, user)}
                                                        >
                                                            ...
                                                        </button>
                                                    </td> */}
                                                    <td className="relative p-4 text-[#333] text-end">
                                                        <button
                                                            ref={buttonRef}
                                                            className='text-[18px] font-bold px-2 pb-2 rounded-[8px] hover:bg-[var(--md-light)]'
                                                            onClick={(e) => handleActionClick(e, user)}
                                                        >
                                                            ...
                                                        </button>

                                                        {showActions && userDetails.userID === user.userID && (
                                                            <div
                                                                className='absolute right-0 mt-2 flex flex-col gap-3 items-start w-[220px] min-h-[100px] p-3 bg-white rounded-[12px] shadow-md z-50'
                                                            >
                                                                <button className='flex gap-2 items-center hover:text-gray-600' onClick={handleMakeAdmin}><BiShield /> Make Admin</button>
                                                                <button className='flex gap-2 items-center hover:text-gray-600' onClick={handleMakeRegUser}><BiUser /> Make Regular User</button>
                                                                <button className='flex gap-2 items-center text-blue-500 hover:text-blue-300' onClick={handleShowDetails}><BiInfoCircle /> View Details</button>
                                                                <button className='flex gap-2 items-center text-red-500 hover:text-red-300' onClick={handleDeleteUser}><CgTrashEmpty /> Delete User</button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        }) :
                                        <tr key={searchedUser.userID} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="p-4 text-[#333]">{searchedUser.username}</td>
                                            <td className="p-4 text-[#333]">{searchedUser.email}</td>
                                            <td className={`p-4 text-[#333] capitalize`}>
                                                <span className={`px-2 rounded-full ${searchedUser.role === 'admin' && 'bg-[var(--dark)] text-[#fff] !text-[14px]'} ${searchedUser.role === 'content manager' && 'bg-[#5d74da] text-[#fff] !text-[14px]'}`}>{searchedUser.role}</span>
                                            </td>
                                            <td className="p-4 text-[#333] capitalize">
                                                <span className={`px-2 rounded-full ${searchedUser.plan === 'premium' && 'bg-[#e6d737] text-[#fff] !text-[14px]'}`}>{searchedUser.plan}</span>
                                            </td>
                                            <td className="p-4 text-[#333]">{new Date(searchedUser.createdAt).toLocaleDateString()}</td>
                                            {/* <td className="relative p-4 text-[#333] text-end">
                                                <button
                                                    ref={buttonRef}
                                                    className='text-[18px] font-bold px-2 pb-2 rounded-[8px] hover:bg-[#e9d6fe]'
                                                    onClick={(e) => handleActionClick(e, user)}
                                                >
                                                    ...
                                                </button>
                                            </td> */}
                                            <td className="relative p-4 text-[#333] text-end">
                                                <button
                                                    ref={buttonRef}
                                                    className='text-[18px] font-bold px-2 pb-2 rounded-[8px] hover:bg-[var(--md-light)]'
                                                    onClick={(e) => handleActionClick(e, searchedUser)}
                                                >
                                                    ...
                                                </button>

                                                {showActions && userDetails.userID === searchedUser.userID && (
                                                    <div
                                                        className='absolute right-0 mt-2 flex flex-col gap-3 items-start w-[220px] min-h-[100px] p-3 bg-white rounded-[12px] shadow-md z-50'
                                                    >
                                                        <button className='flex gap-2 items-center hover:text-gray-600' onClick={handleMakeAdmin}><BiShield /> Make Admin</button>
                                                        <button className='flex gap-2 items-center hover:text-gray-600' onClick={handleMakeRegUser}><BiUser /> Make Regular User</button>
                                                        <button className='flex gap-2 items-center text-blue-500 hover:text-blue-300' onClick={handleShowDetails}><BiInfoCircle /> View Details</button>
                                                        <button className='flex gap-2 items-center text-red-500 hover:text-red-300' onClick={handleDeleteUser}><CgTrashEmpty /> Delete User</button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="9" className='px-3 py-5 text-center'>
                                            <p>No users available!</p>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {
                !loading &&
                (
                    totalPages > 1 &&
                    <div className='flex flex-wrap my-10 items-center justify-center gap-1'>
                        {renderPageNumbers()}
                    </div>
                )
            }

            {/* {
                showActions && (
                    <div
                        className='absolute flex flex-col gap-3 items-start w-[220px] min-h-[100px] p-3 bg-white rounded-[12px] shadow-md z-50'
                        style={{ top: `${actionPos.top}px`, left: `${actionPos.left}px` }}
                    >
                        <button className='flex gap-2 items-center transition-all duration-150 ease-linear hover:text-gray-600' onClick={handleMakeAdmin}><BiShield /> Make Admin</button>
                        <button className='flex gap-2 items-center transition-all duration-150 ease-linear hover:text-gray-600' onClick={handleMakeRegUser}><BiUser /> Make Regular User</button>
                        <button className='flex gap-2 items-center transition-all duration-150 ease-linear text-blue-500 hover:text-blue-300' onClick={handleShowDetails}><BiInfoCircle /> View Details</button>
                        <button className='flex gap-2 items-center transition-all duration-150 ease-linear text-red-500 hover:text-red-300' onClick={handleDeleteUser}><CgTrashEmpty /> Delete User</button>
                    </div>
                )
            } */}

            {
                showDetails && (
                    <div className='absolute top-0 left-0 flex justify-center items-center w-full h-screen p-5 z-[99]'>
                        <div className='bg-white p-5 rounded-[12px] shadow-lg'>
                            <div className='flex justify-between mb-3'>
                                <p className='font-bold !text-[18px] !text-[var(--dark)]'>User Details</p>
                                <BiX className='text-[20px] text-red-500 cursor-pointer transition-all duration-200 ease-linear hover:text-[#888]' onClick={() => setShowDetails(false)} />
                            </div>
                            <p><span className='font-bold'>ID:</span> {userDetails.userID}</p>
                            <div className='flex gap-5'>
                                <p><span className='font-bold'>Username:</span> {userDetails.username}</p>
                                <p><span className='font-bold'>Email:</span> {userDetails.email}</p>
                            </div>
                            <p className='capitalize'><span className='font-bold'>Role:</span> <span className={`px-2 rounded-full ${userDetails.role === 'admin' && 'bg-[var(--dark)] text-[#fff] !text-[12px]'} ${userDetails.role === 'content manager' && 'bg-[#5d74da] text-[#fff] !text-[12px]'}`}>{userDetails.role}</span></p>
                            <p className='capitalize'><span className='font-bold'>Plan:</span> <span className={`px-2 rounded-full ${userDetails.plan === 'premium' && 'bg-[#e6d737] text-[#fff] !text-[12px]'}`}>{userDetails.plan}</span></p>
                            <p className='capitalize'><span className='font-bold'>Status</span>: {userDetails.status}</p>
                            <p><span className='font-bold'>Joined At:</span> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
                            <div className='flex gap-5'>
                                <p><span className='font-bold'>Address:</span> {userDetails.address === "" ? "Undefined" : userDetails.address}</p>
                                <p><span className='font-bold'>Phone:</span> {userDetails.phone === "" ? "Undefined" : userDetails.phone}</p>
                            </div>
                            <div className='flex gap-5'>
                                <p><span className='font-bold'>Downloads:</span> {userDetails.downloads}</p>
                                <p><span className='font-bold'>Uploads:</span> {userDetails.uploads}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}