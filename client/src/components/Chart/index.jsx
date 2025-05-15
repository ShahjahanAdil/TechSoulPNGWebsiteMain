import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { IoStatsChart } from "react-icons/io5";
import axios from 'axios';

const Chart = () => {
    const [chartData, setChartData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${import.meta.env.VITE_HOST}/admin/dashboard/chart`);
                const data = res.data.data;

                const months = Object.keys(data).sort();
                if (months.length > 0) {
                    setSelectedMonth(months[months.length - 1]);
                    setChartData(data);
                }
            } catch (error) {
                console.error('Error fetching chart data', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <div className="w-full p-4 bg-white rounded-xl shadow mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className='!text-[20px] flex gap-2 items-center'><IoStatsChart /> Analytics</h2>
                <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    {Object.keys(chartData).sort().map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading chart...</div>
            ) : selectedMonth && chartData[selectedMonth] ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData[selectedMonth]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="uploads" stroke="#8884d8" strokeWidth={2} name="Uploads" />
                        <Line type="monotone" dataKey="downloads" stroke="#82ca9d" strokeWidth={2} name="Downloads" />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-gray-500">No data available for selected month.</p>
            )}
        </div>
    );
};

export default Chart;