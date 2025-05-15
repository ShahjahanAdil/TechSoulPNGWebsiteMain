import React, { useEffect, useState } from 'react'
import './images.css'
import { IoImages } from 'react-icons/io5'
import { FiUpload } from 'react-icons/fi'
import { GrFilter } from 'react-icons/gr'
import { MdEdit } from 'react-icons/md'
import { CgTrashEmpty } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { BiSearch, BiX } from 'react-icons/bi'
import Loader from '../../../components/Loader'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'

export default function Images() {

    const { userData } = useAuthContext()
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [searchPage, setSearchPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchInput, setSearchInput] = useState("")
    const [searchedImages, setSearchedImages] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [categories, setCategories] = useState([])
    const [updatingImage, setUpdatingImage] = useState({})
    const [openUpdateModel, setOpenUpdateModel] = useState(false)
    const [tagInput, setTagInput] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (userData?.userID) {
            fetchCategories()
        }
    }, [userData])

    const fetchCategories = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/categories`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setCategories(data.cats)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (userData?.userID) {
            if (isSearching) {
                fetchSearchedImages(searchPage)
            } else {
                fetchImages(page)
            }
        }
    }, [userData, page, searchPage, isSearching])

    const fetchImages = (page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/fetch-images?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setImages(data.imgs)
                    setTotalPages(Math.ceil(data.totalImages / 20))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const fetchSearchedImages = (searchPage) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/search-images?page=${searchPage}&searchInput=${searchInput}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setSearchedImages(data.searchedImages || [])
                    setTotalPages(Math.ceil(data.totalSearchedImages / 20))
                }
            })
            .catch(err => {
                const { status, data } = err.response || {}
                if (status === 404) {
                    setSearchedImages([])
                    setTotalPages(1)
                    return window.toastify(data.message, "error")
                } else {
                    console.error("Error fetching searched images:", err.message)
                    return window.toastify("An unexpected error occurred. Please try again.", "error")
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleSearchImages = (e) => {
        e.preventDefault()
        if (!searchInput.trim()) {
            setIsSearching(false)
            setSearchedImages([])
            return
        }
        setIsSearching(true)
        setSearchPage(1)
        fetchSearchedImages(1)
    }

    const handleOnChange = e => setUpdatingImage(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleCategoryChange = e => {
        const newCategory = e.target.value
        setUpdatingImage(prev => ({
            ...prev,
            category: newCategory,
            subcategory: ""
        }))
    }

    const handleImageUpdate = (img) => {
        setUpdatingImage(img)
        setOpenUpdateModel(true)
    }

    const handleUpdate = () => {
        const { imageID } = updatingImage

        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/update-image/${imageID}`, updatingImage)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedList = (isSearching ? searchedImages : images).map(image => image.imageID === imageID ? updatingImage : image)
                    if (isSearching) {
                        setSearchedImages(updatedList)
                    } else {
                        setImages(updatedList)
                    }
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error("Error deleting image:", err.message)
                window.toastify("An unexpected error occurred. Please try again.", "error")
            })
            .finally(() => {
                setLoading(false)
                setOpenUpdateModel(false)
                setUpdatingImage({})
            })
    }

    const handleAddTag = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const newTag = tagInput.trim().toLowerCase()

            if (newTag && !updatingImage?.tags?.includes(newTag)) {
                setUpdatingImage(prev => ({
                    ...prev,
                    tags: [...prev.tags, newTag]
                }))
            }

            setTagInput("")
        }
    }

    const handleRemoveTag = (t) => {
        setUpdatingImage(prev => ({ ...prev, tags: updatingImage?.tags?.filter(tag => tag.toLowerCase() !== t.toLowerCase()) }))
    }

    const handleImageDelete = (img) => {
        const { imageID } = img

        setLoading(true)
        axios.delete(`${import.meta.env.VITE_HOST}/admin/delete-image/${imageID}`)
            .then(res => {
                const { status, data } = res
                if (status === 203) {
                    const updatedList = (isSearching ? searchedImages : images).filter(image => image.imageID !== imageID)

                    if (isSearching) {
                        setSearchedImages(updatedList)
                    } else {
                        setImages(updatedList)
                    }

                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error("Error deleting image:", err.message)
                window.toastify("An unexpected error occurred. Please try again.", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-[5px] cursor-pointer hover:!bg-[#666] hover:!text-white ${((isSearching ? searchPage : page) === i) ? 'bg-[var(--dark)] text-white' : 'bg-[#e8e8e8] !text-[#666]'}`}
                    onClick={() => isSearching ? setSearchPage(i) : setPage(i)}
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
        <div className='main-container'>
            <div className='images-top flex gap-5 justify-between items-center'>
                <div>
                    <h3 className='flex gap-2 items-center'><IoImages /> Images</h3>
                    <p className='px-2 py-1 bg-[var(--md-light)] inline-block rounded-[8px] !text-[var(--dark)] mt-2'>Manage your images stock</p>
                </div>
                <button className='flex gap-2 items-center bg-[var(--dark)] !text-[var(--x-light)] px-[20px] py-[8px] rounded-[12px] transition-all duration-200 ease-in hover:bg-[var(--md-dark)]' onClick={() => navigate('/admin/upload')}>
                    Upload New Image <FiUpload />
                </button>
            </div>

            <div className='flex flex-col-reverse gap-5 justify-between mt-8 sm:flex-row'>
                <form className='relative' onSubmit={handleSearchImages}>
                    <input type="text" name="searchInput" id="searchInput" value={searchInput} placeholder='Search images...' className='px-3 py-2 bg-white rounded-[12px] w-[100%] md:w-[250px]' onChange={(e) => setSearchInput(e.target.value)} />
                    <BiSearch className='absolute right-[10px] top-1 text-[#666] bg-white h-[90%]' />
                </form>
                <div>
                    <p className='flex w-fit gap-2 items-center border border-gray-200 bg-white px-[10px] py-[8px] rounded-[10px]'><GrFilter /> Filter</p>
                </div>
            </div>

            <div className="w-full overflow-x-auto mt-8 rounded-[12px]">
                <table className="min-w-[600px] w-full text-sm text-left bg-white">
                    <thead className="text-xs uppercase bg-[var(--md-light)] text-[var(--dark)] border-b border-gray-200">
                        <tr>
                            <th className="p-4 whitespace-nowrap">Image</th>
                            <th className="p-4 whitespace-nowrap">Title</th>
                            <th className="p-4 whitespace-nowrap">Category</th>
                            <th className="p-4 whitespace-nowrap">Licensing</th>
                            <th className="p-4 whitespace-nowrap">Status</th>
                            <th className="p-4 whitespace-nowrap">Upload Date</th>
                            <th className="p-4 whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (isSearching ? searchedImages : images)?.length > 0 ?
                                (isSearching ? searchedImages : images).map(img => {
                                    const { imageID, imageURL, title, category, license, status, createdAt } = img
                                    return (
                                        <tr key={imageID} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="p-4 text-[#333]">
                                                <img src={`${import.meta.env.VITE_HOST}${imageURL}`} alt={title} className='w-[40px] h-[40px] rounded-full' />
                                            </td>
                                            <td className="p-4 text-[#333] capitalize">{title}</td>
                                            <td className="p-4 text-[#333] capitalize">{category}</td>
                                            <td className="p-4 text-[#333] capitalize">
                                                <span className={`px-2 rounded-full ${license === 'premium' && 'bg-[#e6d737] text-[#fff] !text-[14px]'}`}>{license}</span>
                                            </td>
                                            <td className="p-4 text-[#333] capitalize">
                                                <span className={`px-2 rounded-full ${status === 'published' && 'bg-[#1fcd2bd8] text-[#fff] !text-[14px]'}
                                            ${status === 'pending' && 'bg-[#daec14] text-[#fff] !text-[14px]'}
                                            ${status === 'rejected' && 'bg-[#f05735] text-[#fff] !text-[14px]'}`}>{status}</span>
                                            </td>
                                            <td className="p-4 text-[#333]">{new Date(createdAt).toLocaleDateString()}</td>
                                            <td className="p-4 text-[#333]">
                                                <div className='flex gap-3 items-center'>
                                                    <MdEdit className='text-[16px] text-blue-500 cursor-pointer hover:text-blue-300' onClick={() => handleImageUpdate(img)} />
                                                    <CgTrashEmpty className='text-[16px] text-red-500 cursor-pointer hover:text-red-300' onClick={() => handleImageDelete(img)} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                : (
                                    <tr>
                                        <td colSpan="7" className='text-center py-4 text-red-400 bg-red-50'>
                                            No matching images found!
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
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

            {/* Update Model */}
            <div className={`fixed top-0 left-0 flex justify-center items-center w-full min-h-[100vh] bg-[#9393931c] px-5 py-10 z-[99] transition-all duration-200 ease-linear ${openUpdateModel ? 'update-model-open opacity-100' : 'update-model-close opacity-50'}`}>
                <div className={`bg-white p-5 rounded-[12px] w-full max-w-[600px] max-h-[90vh] overflow-auto shadow-lg transition-all duration-200 ease-linear ${openUpdateModel ? 'scale-100' : 'scale-75'}`}>
                    <div className='flex justify-between mb-3'>
                        <p className='font-bold !text-[18px] !text-[var(--dark)]'>Image Details</p>
                        <BiX className='text-[20px] text-red-500 cursor-pointer transition-all duration-200 ease-linear hover:text-[#888]' onClick={() => setOpenUpdateModel(false)} />
                    </div>
                    <div>
                        <label className='mb-2 font-bold'>Title</label>
                        <input type="text" name="title" id="title" value={updatingImage?.title} className='w-full px-3 py-2 mb-4 bg-white rounded-[12px]' onChange={handleOnChange} />
                    </div>
                    <div>
                        <label className='mb-2 font-bold'>Description</label>
                        <textarea name="description" id="description" rows={5} value={updatingImage?.description} className='w-full px-3 py-2 mb-4 bg-white rounded-[12px] resize-none overflow-y-auto' onChange={handleOnChange}></textarea>
                    </div>
                    <div className='flex gap-5 flex-1 mb-4'>
                        <div className='w-full'>
                            <label className='mb-2 font-bold !text-[#333]'>Category</label>
                            <select name="category" id="category" value={updatingImage?.category} className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={handleCategoryChange}>
                                <option value="" disabled>Select a category</option>
                                {
                                    categories.map((cat, i) => {
                                        return (
                                            <option key={i} value={cat.category} className='capitalize'>{cat.category}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='w-full'>
                            <label className='mb-2 font-bold !text-[#333]'>License</label>
                            <select name="license" id="license" value={updatingImage?.license} className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={handleOnChange}>
                                <option value="" disabled>Select a license</option>
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full mb-4'>
                        <label className='mb-2 font-bold !text-[#333]'>Subcategory</label>
                        <select name="subcategory" id="subcategory" value={updatingImage?.subcategory} className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={handleOnChange}>
                            <option value="" disabled>Select a subcategory</option>
                            {
                                categories.find(cat => cat.category === updatingImage?.category)?.subcategories?.map((sub, i) => {
                                    return (
                                        <option key={i} value={sub} className='capitalize'>{sub}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <label className='mb-2 font-bold !text-[#333]'>Tags</label>
                        <div className='flex flex-wrap gap-2 mb-3'>
                            {
                                updatingImage?.tags?.map((t, i) => {
                                    return (
                                        <div key={i} className='flex gap-2 items-center bg-[var(--dark)] text-[#faf5ff] !text-[12px] rounded-full px-3 py-1'>
                                            {t}
                                            <BiX className='rounded-full p-[2px] cursor-pointer hover:bg-[#fff] hover:text-[#333]' size={12} onClick={() => handleRemoveTag(t)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <input type="text" name="tags" id="tags" value={tagInput} placeholder='Press Enter to add each tag' className='w-full px-3 py-2 bg-white rounded-[12px]' onKeyDown={handleAddTag} onChange={(e) => setTagInput(e.target.value)} />
                        <p className='mt-3'>Press Enter to add each tag</p>
                    </div>

                    <div className='flex justify-end'>
                        <button className='mt-5 bg-[var(--dark)] text-[#fff] px-[20px] py-[8px] rounded-[12px] transition-all duration-200 ease-linear hover:bg-[var(--md-dark)]' onClick={handleUpdate}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}