import React from 'react'
import './tableLoader.css'

export default function TableLoader({ value }) {
    return (
        <tr>
            <td colSpan={`${value ? value : "9"}`} className='px-3 py-5'>
                <div className='flex items-center justify-center py-10'>
                    <div className="spinner"></div>
                </div>
            </td>
        </tr>
    )
}