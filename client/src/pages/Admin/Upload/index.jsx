import React, { useEffect, useRef, useState } from 'react'
import './upload.css'
import { useNavigate } from 'react-router-dom'
import { IoImages } from 'react-icons/io5'
import { FiUpload } from 'react-icons/fi'
import { FaX } from 'react-icons/fa6'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import Loader from '../../../components/Loader'

const initialState = { title: "", description: "", category: "", subcategory: "", tags: [], license: "" }

export default function Upload() {

    const { userData } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [tagInput, setTagInput] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fileInputRef = useRef(null)
    const [preview, setPreview] = useState(null)
    const [fileName, setFileName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

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

    const handleOnChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleCategoryChange = e => {
        const newCategory = e.target.value.toLowerCase()
        setSelectedCategory(newCategory)
        setState(prev => ({
            ...prev,
            category: newCategory,
            subcategory: ""
        }))
    }

    const handleAddTag = e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const newTag = tagInput.trim().toLowerCase()

            if (newTag && !state.tags.includes(newTag)) {
                setState(prev => ({
                    ...prev,
                    tags: [...prev.tags, newTag]
                }))
            }

            setTagInput("")
        }
    }

    const handleRemoveTag = (t) => {
        setState(prev => ({ ...prev, tags: state.tags.filter(tag => tag.toLowerCase() !== t.toLowerCase()) }))
    }

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
            if (!allowedTypes.includes(file.type)) {
                return window.toastify("Only PNG, JPG or WEBP files are allowed!", "error")
            }
            setFileName(file.name)
            setPreview(URL.createObjectURL(file))
            setSelectedFile(file)
        }
    }

    const handleImageUpload = async () => {
        const { title, description, category, subcategory, tags, license } = state;

        if (!title || !description || !categories || !tags, !license) {
            return window.toastify("Please fill all fields!", "info")
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("subcategory", subcategory);
        formData.append("tags", JSON.stringify(tags));
        formData.append("license", license);
        formData.append("userEmail", userData.email);

        try {
            setLoading(true);

            const res = await axios.post(
                `${import.meta.env.VITE_HOST}/admin/upload-image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.status === 201) {
                window.toastify(res.data.message, "success");
            }
        } catch (err) {
            console.error("Frontend POST error", err.message);
            window.toastify("Something went wrong. Please try again!", "error");
        } finally {
            setLoading(false);
            setState(initialState);
            setSelectedCategory("");
            setPreview(null);
            setFileName("");
            setSelectedFile(null);
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='main-container'>
            <h3 className='flex gap-2 items-center'><IoImages /> Upload New Image</h3>
            <p className='px-2 py-1 bg-[var(--md-light)] inline-block rounded-[8px] !text-[var(--dark)] mt-2'>Add a new image to your stock platform</p>

            <div className='upload-container pb-12 border-b-2 border-gray-200'>
                <div className='flex flex-col gap-5'>
                    <div>
                        <label className='mb-2 font-bold !text-[#333]'>Image Title</label>
                        <input type="text" name="title" id="title" value={state.title} placeholder='Enter a descriptive title' className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={handleOnChange} />
                    </div>

                    <div>
                        <label className='mb-2 font-bold !text-[#333]'>Description</label>
                        <textarea name="description" id="description" rows="8" value={state.description} placeholder='Describe your image' className='w-full px-3 py-2 bg-white rounded-[12px] resize-none overflow-y-auto' onChange={handleOnChange}></textarea>
                    </div>

                    <div className='flex gap-5 flex-1'>
                        <div className='w-full'>
                            <label className='mb-2 font-bold !text-[#333]'>Category</label>
                            <select name="category" id="category" value={state.category} className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={handleCategoryChange}>
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
                            <select name="license" id="license" value={state.license} className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={handleOnChange}>
                                <option value="" disabled>Select a license</option>
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>
                    </div>

                    {
                        selectedCategory &&
                        (
                            <div className='w-full'>
                                <label className='mb-2 font-bold !text-[#333]'>Subcategory</label>
                                <select name="subcategory" id="subcategory" value={state.subcategory} className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={handleOnChange}>
                                    <option value="" disabled>Select a subcategory</option>
                                    {
                                        categories.find(cat => cat.category === selectedCategory)?.subcategories?.map((sub, i) => {
                                            return (
                                                <option key={i} value={sub} className='capitalize'>{sub}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        )
                    }

                    <div>
                        <label className='mb-2 font-bold !text-[#333]'>Tags</label>
                        <div className='flex flex-wrap gap-2 mb-3'>
                            {
                                state.tags.map((t, i) => {
                                    return (
                                        <div key={i} className='flex gap-2 items-center text-[var(--x-light)] bg-[var(--md-dark)] !text-[12px] rounded-full px-3 py-1'>
                                            {t}
                                            <FaX className='rounded-full p-[2px] cursor-pointer hover:bg-[#fff] hover:text-[#333]' size={12} onClick={() => handleRemoveTag(t)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <input type="text" name="tags" id="tags" value={tagInput} placeholder='Press Enter to add each tag' className='w-full px-3 py-2 bg-white rounded-[12px]' onKeyDown={handleAddTag} onChange={(e) => setTagInput(e.target.value)} />
                        <p className='mt-3'>Press Enter to add each tag</p>
                    </div>
                </div>

                <div>
                    <div className='w-full'>
                        <label className='mb-2 block font-bold text-[#333]'>Upload Image</label>

                        <div
                            onClick={handleClick}
                            className='w-full px-5 py-10 border-2 border-dashed border-[var(--dark)] rounded-[12px] text-center cursor-pointer hover:bg-[var(--x-light)] transition-all'
                        >
                            <FiUpload className='mx-auto text-[var(--dark)] bg-[var(--md-light)] p-3 w-[50px] h-[50px] mb-5 rounded-full' size={30} />
                            <p className='text-sm mt-2 text-[#666]'>Click or drag to upload an image</p>
                            <p className='text-sm mt-2 text-[#666]'>PNG, JPG or WEBP</p>
                        </div>

                        <input type='file' name='image' id='image' ref={fileInputRef} className='hidden' accept='image/jpeg, image/png, image/webp' onChange={handleFileChange} />

                        {preview && (
                            <div className='mt-5'>
                                <p className='text-sm font-medium !text-[#333]'>Selected: {fileName}</p>
                                <img src={preview} alt='Preview' className='mt-2 max-w-[200px] rounded-lg border border-gray-200' />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='flex gap-3 justify-end mt-5 pb-5 sm:pb-0'>
                <button className='px-[20px] py-[8px] bg-[#ddd] rounded-[10px] transition-all duration-200 ease-in hover:bg-[#d2d2d2]' onClick={() => navigate("/admin/images")}>Cancel</button>
                <button className='px-[20px] py-[8px] text-[var(--x-light)] bg-[var(--dark)] rounded-[10px] flex gap-2 items-center transition-all duration-200 ease-in hover:bg-[var(--md-dark)]' onClick={handleImageUpload}>Upload <FiUpload /></button>
            </div>
        </div>
    )
}