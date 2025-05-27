import React, { useEffect, useState } from 'react'
import './admin.css'
import { NavLink, Route, Routes } from 'react-router-dom'
// import Dashboard from './Dashboard'
import AdminDashboard from './AdminDashboard'
import { BsArrowRight } from 'react-icons/bs'
import { GrAnalytics } from 'react-icons/gr'
import { CiUser } from 'react-icons/ci'
import { FiLogOut } from 'react-icons/fi'
import Images from './Images'
import { IoImages, IoWallet } from 'react-icons/io5'
import Categories from './Categories'
import { TbCategory2 } from 'react-icons/tb'
import { FaUsers } from 'react-icons/fa'
import Users from './Users'
import Subscriptions from './Subscriptions'
import Upload from './Upload'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuthContext } from '../../contexts/AuthContext'
import Menu from './Menu'
import { BiSend } from 'react-icons/bi'

export default function Admin() {

    const { user, logout } = useAuth0()
    const { handleLogout } = useAuthContext()
    const [open, setOpen] = useState(false)

    const logoutFunctions = () => {
        if (!user) {
            return handleLogout()
        }
        logout()
        handleLogout()
    }

    useEffect(() => {
        if (window.innerWidth <= 991) {
            setOpen(true)
        }
    }, [])

    return (
        <>
            <div className='flex'>
                <div className={`sider ${open ? 'sider-open' : 'sider-closed'}`}>
                    <h6 className={`border-b-2 border-gray-100 !text-[var(--dark)] px-5 py-4 ${open && '!hidden'}`}>PNG Site</h6>

                    <div className={`flex flex-col flex-1 justify-between p-2 ${open && 'items-center'}`}>
                        <div className={`flex flex-col gap-2 mt-5 ${open && 'mt-15'}`}>
                            <NavLink to="/admin/dashboard" className={({ isActive }) => `sider-link hover:bg-[var(--md-light)] ${open && '!p-[12px] w-fit'} ${isActive && 'sider-link-active'}`}><GrAnalytics /> <span className={`sider-text ${open && '!hidden'}`}>Dashboard</span></NavLink>
                            <NavLink to="/admin/images" className={({ isActive }) => `sider-link hover:bg-[var(--md-light)] ${open && '!p-[12px] w-fit'} ${isActive && 'sider-link-active'}`}><IoImages /> <span className={`sider-text ${open && '!hidden'}`}>Images</span></NavLink>
                            <NavLink to="/admin/categories" className={({ isActive }) => `sider-link hover:bg-[var(--md-light)] ${open && '!p-[12px] w-fit'} ${isActive && 'sider-link-active'}`}><TbCategory2 /> <span className={`sider-text ${open && '!hidden'}`}>Categories</span></NavLink>
                            <NavLink to="/admin/menu" className={({ isActive }) => `sider-link hover:bg-[var(--md-light)] ${open && '!p-[12px] w-fit'} ${isActive && 'sider-link-active'}`}><BiSend /> <span className={`sider-text ${open && '!hidden'}`}>Menu</span></NavLink>
                            <NavLink to="/admin/users" className={({ isActive }) => `sider-link hover:bg-[var(--md-light)] ${open && '!p-[12px] w-fit'} ${isActive && 'sider-link-active'}`}><FaUsers /> <span className={`sider-text ${open && '!hidden'}`}>Users</span></NavLink>
                            <NavLink to="/admin/subscriptions" className={({ isActive }) => `sider-link hover:bg-[var(--md-light)] ${open && '!p-[12px] w-fit'} ${isActive && 'sider-link-active'}`}><IoWallet /> <span className={`sider-text ${open && '!hidden'}`}>Subscriptions</span></NavLink>
                        </div>

                        <div className='border-t-2 border-gray-100 pt-5'>
                            <div className='flex gap-2 items-center p-2'>
                                <CiUser className='bg-[#e8e8e8] p-2 w-8 h-8 rounded-full' />
                                <div className={`${open && '!hidden'}`}>
                                    <div>Admin</div>
                                    <div className='text-[#666] text-[12px]'>admin@gmail.com</div>
                                </div>
                            </div>

                            <div className='flex justify-center py-5'>
                                <button className='flex gap-2 items-center !text-red-500 hover:!text-red-400' onClick={logoutFunctions}><FiLogOut /> <span className={`sider-text ${open && '!hidden'}`}>Logout</span></button>
                            </div>
                        </div>
                    </div>

                    <div className={`sider-arrow bg-[var(--md-light)] !text-[var(--dark)] cursor-pointer p-3 rounded-full transition-all duration-200 ease-out ${open ? 'rotate-0' : 'rotate-180'}`} onClick={() => setOpen(prev => !prev)}>
                        <BsArrowRight />
                    </div>
                </div>

                <div className={`content overflow-x-hidden ${open ? '!ml-[50px] md:!ml-[65px]' : '!ml-[220px]'}`}>
                    <Routes>
                        <Route index element={<AdminDashboard />} />
                        <Route path='/dashboard' element={<AdminDashboard />} />
                        <Route path='/images' element={<Images />} />
                        <Route path='/upload' element={<Upload />} />
                        <Route path='/categories' element={<Categories />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/users' element={<Users />} />
                        <Route path='/subscriptions' element={<Subscriptions />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}