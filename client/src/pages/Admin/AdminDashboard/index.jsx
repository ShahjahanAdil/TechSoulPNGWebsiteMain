import React, { useEffect, useState } from 'react'
import './dashboard.css'
import userImg from '../../../assets/images/user.png'
import { GrAnalytics, GrDownload } from 'react-icons/gr'
import { IoImages } from 'react-icons/io5'
import { FaArrowUp, FaDollarSign } from 'react-icons/fa6'
import { FaUsers } from 'react-icons/fa'
import { MdHistory } from 'react-icons/md'
import Loader from '../../../components/Loader'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import Chart from '../../../components/Chart'

export default function AdminDashboard() {

    const { userData } = useAuthContext()
    const [imagesCount, setImagesCount] = useState(0)
    const [usersCount, setUsersCount] = useState(0)
    const [premiumDownloadsCount, setPremiumDownloadsCount] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [recentUploads, setRecentUploads] = useState([])
    const [topUsers, setTopUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (userData?.userID) {
            fetchData()
        }
    }, [userData])

    const fetchData = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/dashboard`)
            .then(res => {
                const { status, data } = res
                const { allData } = data
                if (status === 200) {
                    setImagesCount(allData.imagesCount)
                    setUsersCount(allData.usersCount)
                    setPremiumDownloadsCount(allData.premiumDownloadsCount)
                    setTotalRevenue(allData.totalRevenue)
                    setRecentUploads(allData.recentUploads)
                    setTopUsers(allData.topUsers)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong!", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='main-container'>
            <h3 className='flex gap-2 items-center'><GrAnalytics />Dashboard</h3>
            <p className='px-2 py-1 bg-[var(--md-light)] inline-block rounded-[8px] !text-[var(--dark)] mt-2'>Overview of your stock images platform</p>

            <div className='dashboard-boxes'>
                <div className="dashboard-box">
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='!text-[14px]'>Total Images</p>
                            <h4>{imagesCount}</h4>
                        </div>
                        <IoImages className='bg-[#f3e9fe] text-[var(--dark)] w-10 h-10 p-3 rounded-full' />
                    </div>
                    <p className='mt-4 flex gap-2 items-center !text-[#32c345] !text-[13px]'><FaArrowUp /> 12% from last month</p>
                </div>
                <div className="dashboard-box">
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='!text-[14px]'>Active Users</p>
                            <h4>{usersCount}</h4>
                        </div>
                        <FaUsers className='bg-[#e9f5fe] text-[#378ce6] w-10 h-10 p-3 rounded-full' />
                    </div>
                    <p className='mt-4 flex gap-2 items-center !text-[#32c345] !text-[13px]'><FaArrowUp /> 12% from last month</p>
                </div>
                <div className="dashboard-box">
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='!text-[14px]'>Premium Downloads</p>
                            <h4>{premiumDownloadsCount}</h4>
                        </div>
                        <GrDownload className='bg-[#fbf6e1df] text-[#e6af37] w-10 h-10 p-3 rounded-full' />
                    </div>
                    <p className='mt-4 flex gap-2 items-center !text-[#32c345] !text-[13px]'><FaArrowUp /> 12% from last month</p>
                </div>
                <div className="dashboard-box">
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='!text-[14px]'>Revenue</p>
                            <h4>${totalRevenue}</h4>
                        </div>
                        <FaDollarSign className='bg-[#e2f9e2b4] text-[#5de637] w-10 h-10 p-3 rounded-full' />
                    </div>
                    <p className='mt-4 flex gap-2 items-center !text-[#32c345] !text-[13px]'><FaArrowUp /> 12% from last month</p>
                </div>
            </div>

            <Chart />

            <div className='dashboard-analytics'>
                <div className='analytics-box'>
                    <h6 className='flex gap-2 items-center'>Recent Uploads <MdHistory /></h6>
                    <p>Latest images  uploaded to platform</p>
                    <div className='flex flex-col gap-6 mt-6'>
                        {
                            recentUploads.map(img => {
                                return (
                                    <div key={img.imageID} className='flex gap-5 items-center'>
                                        <img src={`${import.meta.env.VITE_HOST}${img.imageURL}`} alt={img.title} className='w-[50px] h-[50px] rounded-full' />
                                        <div>
                                            <p className='font-bold !text-[#333]'>{img.title}</p>
                                            <p className='!text-[13px] !text-[#888]'>Uploaded on {new Date(img.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='analytics-box'>
                    <h6 className='flex gap-2 items-center'>Top Users <FaUsers /></h6>
                    <p>Users with most contribution</p>
                    <div className='flex flex-col gap-6 mt-6'>
                        {
                            topUsers.map(user => {
                                return (
                                    <div key={user.userID} className='flex gap-5 items-center'>
                                        <img src={userImg} alt={user.username} className='w-[50px] h-[50px] rounded-full bg-[#f3e9fe] p-2' />
                                        <div className='user-analytics-div flex gap-5 items-center justify-between flex-1'>
                                            <div>
                                                <p className='font-bold !text-[#333]'>{user.username}</p>
                                                <p className='!text-[13px] !text-[#888]'>{user.uploads} uploads</p>
                                            </div>
                                            <p className='font-bold !text-[13px] !text-[#333]'>{user.downloads} downloads</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}