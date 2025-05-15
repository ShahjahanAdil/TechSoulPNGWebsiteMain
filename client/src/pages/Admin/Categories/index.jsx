import React, { useEffect, useState } from 'react'
import './categories.css'
import { FiPlus } from 'react-icons/fi'
import { TbCategory2 } from 'react-icons/tb'
import { CgEditExposure, CgTrashEmpty } from 'react-icons/cg'
import { BiInfoCircle } from 'react-icons/bi'
import { MdEdit } from 'react-icons/md'
import Loader from '../../../components/Loader'
import axios from 'axios'
import { useAuthContext } from '../../../contexts/AuthContext'

export default function Categories() {

    const { userData } = useAuthContext()
    const [categories, setCategories] = useState([])
    const [openModel, setOpenModel] = useState(false)
    const [createCategoryInput, setCreateCategoryInput] = useState("")
    const [openCatModel, setOpenCatModel] = useState(false)
    const [updatingCategory, setUpdatingCategory] = useState({})
    const [openSubCatModel, setOpenSubCatModel] = useState(false)
    const [subCategoriesDetails, setSubCategoriesDetails] = useState({})
    const [subcategory, setSubcategory] = useState("")
    const [loading, setLoading] = useState(false)

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

    const handleCreateCategory = () => {
        const newCategory = {
            category: createCategoryInput.toLowerCase(),
            subcategories: []
        }

        setLoading(true)
        axios.post(`${import.meta.env.VITE_HOST}/admin/create-category`, newCategory)
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    setCategories([...categories, data.newCat])
                    setOpenModel(false)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                if (err.response.status === 400) {
                    window.toastify(err.response.data.message, "error")
                }
                else {
                    window.toastify("Something went wrong. Please try again!", "error")
                }
            })
            .finally(() => {
                setLoading(false)
                setCreateCategoryInput("")
            })
    }

    const handleUpdateCategory = (categoryDetails) => {
        setOpenCatModel(true)
        setUpdatingCategory(categoryDetails)
    }

    const handleUpdateCategoryFunction = () => {
        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/update-category`, updatingCategory)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedCategories = categories.map(cat => cat._id === updatingCategory._id ? { ...cat, category: updatingCategory.category } : cat)
                    setCategories(updatedCategories)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
                setOpenCatModel(false)
                setUpdatingCategory({})
            })
    }

    const handleCategoryDelete = (delCatID) => {
        setLoading(true)
        axios.delete(`${import.meta.env.VITE_HOST}/admin/delete-category/${delCatID}`)
            .then(res => {
                const { status, data } = res
                if (status === 203) {
                    const updatedCategories = categories.filter(cat => cat._id !== delCatID)
                    setCategories(updatedCategories)
                    window.toastify(data.message, "success")
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

    const handleSubCategory = (categoryDetails) => {
        setSubCategoriesDetails(categoryDetails)
        setOpenSubCatModel(true)
    }

    const handleAddSubcategory = () => {
        const { _id } = subCategoriesDetails

        setLoading(true)
        axios.post(`${import.meta.env.VITE_HOST}/admin/add-subcategory`, { _id, subcategory })
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    const updatedCategories = categories.map(cat => cat._id === _id ? { ...cat, subcategories: [...cat.subcategories, subcategory] } : cat)
                    setCategories(updatedCategories)
                    setSubCategoriesDetails({ ...subCategoriesDetails, subcategories: [...subCategoriesDetails.subcategories, subcategory] })
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                if (err.response.status === 400) {
                    window.toastify(err.response.data.message, "error")
                }
                else {
                    window.toastify("Something went wrong. Please try again!", "error")
                }
            })
            .finally(() => {
                setLoading(false)
                setSubcategory("")
                setOpenSubCatModel(false)
            })
    }

    const handleSubcategoryDelete = (subCat) => {
        const { _id } = subCategoriesDetails

        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/delete-subcategory`, { _id, subCat })
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedCategories = categories.map(cat =>
                        cat._id === _id
                            ? { ...cat, subcategories: cat.subcategories.filter(sub => sub !== subCat) }
                            : cat
                    );
                    setCategories(updatedCategories);

                    setSubCategoriesDetails(prev => ({
                        ...prev,
                        subcategories: prev.subcategories.filter(sub => sub !== subCat)
                    }));
                    window.toastify(data.message, "success")
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

    if (loading) {
        return <Loader />
    }

    return (
        <div className='main-container'>
            <div className='categories-top flex gap-5 justify-between items-center'>
                <div>
                    <h3 className='flex gap-2 items-center'><TbCategory2 /> Categories</h3>
                    <p className='px-2 py-1 bg-[var(--md-light)] inline-block rounded-[8px] !text-[var(--dark)] mt-2'>Manage categories of images</p>
                </div>
                <button className='flex gap-2 items-center bg-[var(--dark)] text-[var(--x-light)] px-[20px] py-[8px] rounded-[12px] transition-all duration-200 ease-in hover:bg-[var(--md-dark)]'
                    onClick={() => setOpenModel(true)}
                >
                    Add New Category <FiPlus />
                </button>
            </div>

            <div className='categories-container'>
                {
                    categories.map((cat, i) => {
                        return (
                            <div key={i} className='category-box'>
                                <div>
                                    <p className='font-bold capitalize !text-[#333]'>{i + 1}. {cat.category}</p>
                                    <div className="flex flex-wrap justify-start gap-2 mt-2">
                                        {
                                            cat.subcategories.length > 0 ?
                                                cat.subcategories?.map((sub, j) => (
                                                    <span
                                                        key={j}
                                                        className="px-3 py-1 bg-[var(--md-light)] text-[var(--primary)] !text-[12px] text-sm rounded-full capitalize"
                                                    >
                                                        {sub}
                                                    </span>
                                                ))
                                                :
                                                <p className='!text-[14px]'>There is no subcategory</p>
                                        }
                                    </div>
                                </div>
                                <div className='flex justify-end gap-5 mt-5'>
                                    <CgEditExposure className='text-[16px] text-blue-500 cursor-pointer hover:text-blue-300' onClick={() => handleSubCategory(cat)} />
                                    <MdEdit className='text-[16px] text-blue-500 cursor-pointer hover:text-blue-300' onClick={() => handleUpdateCategory(cat)} />
                                    <CgTrashEmpty className='text-[16px] text-red-500 cursor-pointer hover:text-red-300' onClick={() => handleCategoryDelete(cat._id)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Models */}

            <div className={`category-model fixed top-0 left-0 bg-[#9393931c] w-full min-h-full px-2 py-10 z-100 transition-all duration-200 ease-linear ${openModel ? 'category-model-open opacity-100' : 'category-model-close opacity-50'}`}>
                <div className={`category-model-box w-full max-w-[500px] bg-white p-5 rounded-[12px] transition-all duration-200 ease-linear ${openModel ? 'scale-100' : 'scale-75'}`}>
                    <p className='font-bold !text-[#333] flex gap-1 items-center'><BiInfoCircle /> Add New Category</p>
                    <p className='mb-4'>Create a new category for organizing images</p>
                    <input type="text" name="category" id="category" value={createCategoryInput} placeholder='Enter category to add' className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={(e) => setCreateCategoryInput(e.target.value)} />
                    <div className='flex gap-3 justify-end mt-6'>
                        <button className='px-[20px] py-[8px] bg-[#ddd] rounded-[10px] transition-all duration-200 ease-in hover:bg-[#d2d2d2]'
                            onClick={() => setOpenModel(false)}
                        >
                            Cancel
                        </button>
                        <button className='px-[20px] py-[8px] text-[var(--x-light)] bg-[var(--dark)] rounded-[10px] flex gap-2 items-center transition-all duration-200 ease-in hover:bg-[var(--md-dark)]' onClick={handleCreateCategory}>
                            Create category
                        </button>
                    </div>
                </div>
            </div>

            <div className={`category-model fixed top-0 left-0 bg-[#9393931c] w-full min-h-full px-2 py-10 z-100 transition-all duration-200 ease-linear ${openCatModel ? 'category-model-open opacity-100' : 'category-model-close opacity-50'}`}>
                <div className={`category-model-box w-full max-w-[500px] bg-white p-5 rounded-[12px] transition-all duration-200 ease-linear ${openCatModel ? 'scale-100' : 'scale-75'}`}>
                    <p className='font-bold !text-[#333] mb-5 flex gap-1 items-center'><BiInfoCircle /> Update Category</p>
                    <input type="text" name="category" id="category" value={updatingCategory?.category} placeholder='Enter category to update' className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={(e) => setUpdatingCategory({ ...updatingCategory, category: e.target.value.toLowerCase() })} />
                    <div className='flex gap-3 justify-end mt-6'>
                        <button className='px-[20px] py-[8px] bg-[#ddd] rounded-[10px] transition-all duration-200 ease-in hover:bg-[#d2d2d2]'
                            onClick={() => setOpenCatModel(false)}
                        >
                            Cancel
                        </button>
                        <button className='px-[20px] py-[8px] text-[var(--x-light)] bg-[var(--dark)] rounded-[10px] flex gap-2 items-center transition-all duration-200 ease-in hover:bg-[var(--md-dark)]' onClick={handleUpdateCategoryFunction}>
                            Update category
                        </button>
                    </div>
                </div>
            </div>

            <div className={`category-model fixed top-0 left-0 bg-[#9393931c] w-full min-h-[100vh] px-2 py-10 z-100 transition-all duration-200 ease-linear ${openSubCatModel ? 'category-model-open opacity-100' : 'category-model-close opacity-50'}`}>
                <div className={`category-model-box w-full max-w-[500px] max-h-[90vh] overflow-y-scroll bg-white p-5 rounded-[12px] transition-all duration-200 ease-linear ${openSubCatModel ? 'scale-100' : 'scale-75'}`}>
                    <p className='font-bold !text-[#333] mb-5 flex gap-1 items-center'><BiInfoCircle /> Add New Subcategory</p>
                    <input type="text" name="category" id="category" value={subcategory} placeholder='Enter subcategory to add' className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={(e) => setSubcategory(e.target.value.toLowerCase())} />
                    <div className='flex gap-3 justify-end mt-6'>
                        <button className='px-[20px] py-[8px] bg-[#ddd] rounded-[10px] transition-all duration-200 ease-in hover:bg-[#d2d2d2]'
                            onClick={() => setOpenSubCatModel(false)}
                        >
                            Cancel
                        </button>
                        <button className='px-[20px] py-[8px] text-[var(--x-light)] bg-[var(--dark)] rounded-[10px] flex gap-2 items-center transition-all duration-200 ease-in hover:bg-[var(--md-dark)]' onClick={handleAddSubcategory}>
                            Add subcategory
                        </button>
                    </div>

                    <div>
                        <p className='font-bold !text-[#333] mb-5 flex gap-1 items-center mt-8'><BiInfoCircle /> Manage Subcategories</p>
                        <div className='flex flex-col gap-3'>
                            {
                                subCategoriesDetails?.subcategories?.length > 0 ?
                                    subCategoriesDetails?.subcategories?.map((subCat, i) => {
                                        return (
                                            <div key={i} className='flex justify-between bg-[var(--md-light)] p-2 rounded-[12px]'>
                                                <li className='text-[var(--secondary)] capitalize'>{subCat}</li>
                                                <div className='flex gap-2 items-center'>
                                                    <CgTrashEmpty className='text-[16px] text-red-500 cursor-pointer hover:text-red-300' onClick={() => handleSubcategoryDelete(subCat)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <p className='bg-red-100 !text-red-400 !text-[14px] px-2 py-1 w-fit rounded-[8px]'>There is no subcategory</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}