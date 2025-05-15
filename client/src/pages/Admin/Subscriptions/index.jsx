import React from 'react'
import { IoWallet } from 'react-icons/io5'

export default function Subscriptions() {
    return (
        <div className='main-container'>
            <h3 className='flex gap-2 items-center'><IoWallet /> Subscriptions</h3>
            <p className='px-2 py-1 bg-[var(--md-light)] inline-block rounded-[8px] !text-[var(--dark)] mt-2'>Manage subscriptions history</p>

            <div className="w-full overflow-x-auto mt-8 rounded-[12px]">
                <table className="min-w-[600px] w-full text-sm text-left bg-white">
                    <thead className="text-xs uppercase bg-[var(--md-light)] text-[var(--dark)] border-b border-gray-200">
                        <tr>
                            <th className="p-4 whitespace-nowrap">Username</th>
                            <th className="p-4 whitespace-nowrap">Email</th>
                            <th className="p-4 whitespace-nowrap">Plan</th>
                            <th className="p-4 whitespace-nowrap">Amount</th>
                            <th className="p-4 whitespace-nowrap">Date</th>
                            <th className="p-4 whitespace-nowrap">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-4 text-[#333]">Shah Jahan</td>
                            <td className="p-4 text-[#333]">sj@gmail.com</td>
                            <td className="p-4 text-[#333]">Premium</td>
                            <td className="p-4 text-[#333]">$9.99</td>
                            <td className="p-4 text-[#333]">2025-04-27</td>
                            <td className="p-4 text-[#333]">Succesful</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}