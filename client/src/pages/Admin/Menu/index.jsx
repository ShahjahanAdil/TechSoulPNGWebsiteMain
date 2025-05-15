import React, { useEffect, useState } from 'react'
import { BiInfoCircle, BiSend } from 'react-icons/bi'
import { CgEditExposure, CgTrashEmpty } from 'react-icons/cg'
import { FiPlus } from 'react-icons/fi'
import { MdEdit } from 'react-icons/md'
import { useAuthContext } from '../../../contexts/AuthContext'
import Loader from '../../../components/Loader'
import axios from 'axios'

export default function Menu() {

    const { userData } = useAuthContext()
    const [items, setItems] = useState([])
    const [openModel, setOpenModel] = useState(false)
    const [createItemInput, setCreateItemInput] = useState("")
    const [openItemModel, setOpenItemModel] = useState(false)
    const [updatingItem, setUpdatingItem] = useState({})
    const [openSubItemsModel, setOpenSubItemsModel] = useState(false)
    const [subItemsDetails, setSubItemsDetails] = useState({})
    const [subItem, setSubItem] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (userData?.userID) {
            fetchItems()
        }
    }, [userData])

    const fetchItems = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/items`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setItems(data.items)
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

    const handleCreateMenuItem = () => {
        const newItem = {
            item: createItemInput.toLowerCase(),
            subItems: [],
            order: items.length + 1
        }

        setLoading(true)
        axios.post(`${import.meta.env.VITE_HOST}/admin/create-item`, newItem)
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    setItems([...items, data.newitem])
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
                setCreateItemInput("")
            })
    }

    const handleUpdateItem = (itemDetails) => {
        setOpenItemModel(true)
        setUpdatingItem(itemDetails)
    }

    const handleUpdateItemFunction = () => {
        if (!updatingItem.item || !updatingItem.order) {
            return window.toastify("Please fill all fields!", "warning")
        }

        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/update-item`, updatingItem)
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedItems = items.map(itm => itm._id === updatingItem._id ? { ...itm, item: updatingItem.item, order: updatingItem.order } : itm)
                    setItems(updatedItems)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
                setOpenItemModel(false)
                setUpdatingItem({})
            })
    }

    const handleItemDelete = (delItemID) => {
        setLoading(true)
        axios.delete(`${import.meta.env.VITE_HOST}/admin/delete-item/${delItemID}`)
            .then(res => {
                const { status, data } = res
                if (status === 203) {
                    const updatedItems = items.filter(cat => cat._id !== delItemID)
                    setItems(updatedItems.map((item, i) => ({ ...item, order: i + 1 })))
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

    const handleSubItem = (itemDetails) => {
        setSubItemsDetails(itemDetails)
        setOpenSubItemsModel(true)
    }

    const handleAddSubitem = () => {
        const { _id } = subItemsDetails

        setLoading(true)
        axios.post(`${import.meta.env.VITE_HOST}/admin/add-subitem`, { _id, subItem })
            .then(res => {
                const { status, data } = res
                if (status === 201) {
                    const updatedSubItems = items.map(itm => itm._id === _id ? { ...itm, subItems: [...itm.subItems, subItem] } : itm)
                    setItems(updatedSubItems)
                    setSubItemsDetails({ ...subItemsDetails, subItems: [...subItemsDetails.subItems, subItem] })
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
                setSubItem("")
                setOpenSubItemsModel(false)
            })
    }

    const handleSubItemDelete = (subItm) => {
        const { _id } = subItemsDetails

        setLoading(true)
        axios.patch(`${import.meta.env.VITE_HOST}/admin/delete-subitem`, { _id, subItm })
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    const updatedItems = items.map(itm =>
                        itm._id === _id
                            ? { ...itm, subItems: itm.subItems.filter(sub => sub !== subItm) }
                            : itm
                    );
                    setItems(updatedItems);

                    setSubItemsDetails(prev => ({ ...prev, subItems: prev.subItems.filter(sub => sub !== subItm) }));
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
                    <h3 className='flex gap-2 items-center'><BiSend /> Naivgation Menu</h3>
                    <p className='px-2 py-1 bg-[var(--md-light)] inline-block rounded-[8px] !text-[var(--dark)] mt-2'>Manage navigation menu items and their sub-items</p>
                </div>
                <button className='flex gap-2 items-center bg-[var(--dark)] text-[var(--x-light)] px-[20px] py-[8px] rounded-[12px] transition-all duration-200 ease-in hover:bg-[var(--md-dark)]'
                    onClick={() => setOpenModel(true)}
                >
                    Add Menu Item <FiPlus />
                </button>
            </div>

            <div className="w-full overflow-x-auto mt-8 rounded-[12px]">
                <table className="min-w-[600px] w-full text-sm text-left bg-white">
                    <thead className="text-xs uppercase bg-[var(--md-light)] text-[var(--dark)] border-b border-gray-200">
                        <tr>
                            <th className="p-4 whitespace-nowrap">Order</th>
                            <th className="p-4 whitespace-nowrap">Name</th>
                            <th className="p-4 whitespace-nowrap">Submenu Items</th>
                            <th className="p-4 whitespace-nowrap text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.length > 0 ?
                                items.map(itm => {
                                    return (
                                        <tr key={itm._id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="p-4 text-[#333]">{itm.order}</td>
                                            <td className="p-4 text-[#333] capitalize">{itm.item}</td>
                                            <td className="p-4 text-[#333]">
                                                <div className='flex gap-2 items-center'>
                                                    {itm.subItems.length} <CgEditExposure className='text-[16px] cursor-pointer text-[var(--dark)] hover:text-[var(--secondary)]' onClick={() => handleSubItem(itm)} />
                                                </div>
                                            </td>
                                            <td className="p-4 text-[#333] flex justify-end">
                                                <div className='flex gap-3 items-center'>
                                                    <MdEdit className='text-[16px] text-blue-500 cursor-pointer hover:text-blue-300' onClick={() => handleUpdateItem(itm)} />
                                                    <CgTrashEmpty className='text-[16px] text-red-500 cursor-pointer hover:text-red-300' onClick={() => handleItemDelete(itm._id)} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr className="hover:bg-gray-50">
                                    <td colSpan={4} className='text-center p-4'>
                                        <p className='!text-red-400'>There are no items</p>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>

            {/* Models */}

            <div className={`category-model fixed top-0 left-0 bg-[#9393931c] w-full h-full px-2 py-10 z-100 transition-all p-5 duration-200 ease-linear ${openModel ? 'category-model-open opacity-100' : 'category-model-close opacity-50'}`}>
                <div className={`category-model-box w-full max-w-[500px] bg-white p-5 rounded-[12px] transition-all duration-200 ease-linear ${openModel ? 'scale-100' : 'scale-75'}`}>
                    <p className='font-bold !text-[#333] flex gap-1 items-center'><BiInfoCircle /> Add New Menu Item</p>
                    <p className='mb-4'>Create a new menu item for navigation</p>
                    <input type="text" name="item" id="item" value={createItemInput} placeholder='Enter menu item to add' className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={(e) => setCreateItemInput(e.target.value)} />
                    <div className='flex gap-3 justify-end mt-6'>
                        <button className='px-[20px] py-[8px] bg-[#ddd] rounded-[10px] transition-all duration-200 ease-in hover:bg-[#d2d2d2]'
                            onClick={() => setOpenModel(false)}
                        >
                            Cancel
                        </button>
                        <button className='px-[20px] py-[8px] text-[var(--x-light)] bg-[var(--dark)] rounded-[10px] flex gap-2 items-center transition-all duration-200 ease-in hover:bg-[var(--md-dark)]' onClick={handleCreateMenuItem}>
                            Add Item
                        </button>
                    </div>
                </div>
            </div>

            <div className={`category-model fixed top-0 left-0 bg-[#9393931c] w-full h-full px-2 py-10 z-100 transition-all duration-200 ease-linear ${openItemModel ? 'category-model-open opacity-100' : 'category-model-close opacity-50'}`}>
                <div className={`category-model-box w-full max-w-[500px] bg-white p-5 rounded-[12px] transition-all duration-200 ease-linear ${openItemModel ? 'scale-100' : 'scale-75'}`}>
                    <p className='font-bold !text-[#333] mb-5 flex gap-1 items-center'><BiInfoCircle /> Update Menu Item</p>
                    <div>
                        <label className='mb-2 font-bold'>Name</label>
                        <input type="text" name="item" id="item" value={updatingItem?.item} placeholder='Enter item to update' className='w-full px-3 py-2 bg-white rounded-[12px] mb-4' onChange={(e) => setUpdatingItem({ ...updatingItem, item: e.target.value.toLowerCase() })} />
                    </div>
                    <div>
                        <label className='mb-2 font-bold'>Order</label>
                        <input type="number" name="order" id="order" value={updatingItem?.order} placeholder='Enter order of item' className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={(e) => setUpdatingItem({ ...updatingItem, order: parseInt(e.target.value) })} />
                    </div>
                    <div className='flex gap-3 justify-end mt-6'>
                        <button className='px-[20px] py-[8px] bg-[#ddd] rounded-[10px] transition-all duration-200 ease-in hover:bg-[#d2d2d2]'
                            onClick={() => setOpenItemModel(false)}
                        >
                            Cancel
                        </button>
                        <button className='px-[20px] py-[8px] text-[var(--x-light)] bg-[var(--dark)] rounded-[10px] flex gap-2 items-center transition-all duration-200 ease-in hover:bg-[var(--md-dark)]' onClick={handleUpdateItemFunction}>
                            Update Item
                        </button>
                    </div>
                </div>
            </div>

            <div className={`category-model fixed top-0 left-0 bg-[#9393931c] w-full h-full px-2 py-10 z-100 transition-all duration-200 ease-linear ${openSubItemsModel ? 'category-model-open opacity-100' : 'category-model-close opacity-50'}`}>
                <div className={`category-model-box w-full max-w-[500px] bg-white p-5 rounded-[12px] transition-all duration-200 ease-linear ${openSubItemsModel ? 'scale-100' : 'scale-75'}`}>
                    <p className='font-bold !text-[#333] mb-5 flex gap-1 items-center'><BiInfoCircle /> Add New Sub-items</p>
                    <input type="text" name="subItem" id="subItem" value={subItem} placeholder='Enter subitem to add' className='w-full px-3 py-2 bg-white rounded-[12px]' onChange={(e) => setSubItem(e.target.value.toLowerCase())} />
                    <div className='flex gap-3 justify-end mt-6'>
                        <button className='px-[20px] py-[8px] bg-[#ddd] rounded-[10px] transition-all duration-200 ease-in hover:bg-[#d2d2d2]'
                            onClick={() => setOpenSubItemsModel(false)}
                        >
                            Cancel
                        </button>
                        <button className='px-[20px] py-[8px] text-[var(--x-light)] bg-[var(--dark)] rounded-[10px] flex gap-2 items-center transition-all duration-200 ease-in hover:bg-[var(--md-dark)]' onClick={handleAddSubitem}>
                            Add Sub-item
                        </button>
                    </div>

                    <div>
                        <p className='font-bold !text-[#333] mb-5 flex gap-1 items-center mt-8'><BiInfoCircle /> Manage Sub-Items</p>
                        <div className='flex flex-col gap-3'>
                            {
                                subItemsDetails?.subItems?.length > 0 ?
                                    subItemsDetails?.subItems?.map((subItm, i) => {
                                        return (
                                            <div key={i} className='flex justify-between bg-[var(--md-light)] p-2 rounded-[12px]'>
                                                <li className='text-[var(--secondary)] capitalize'>{subItm}</li>
                                                <div className='flex gap-2 items-center'>
                                                    <CgTrashEmpty className='text-[16px] text-red-500 cursor-pointer hover:text-red-300' onClick={() => handleSubItemDelete(subItm)} />
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <p className='bg-red-100 !text-red-400 !text-[14px] px-2 py-1 w-fit rounded-[8px]'>There is no Sub-item</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}