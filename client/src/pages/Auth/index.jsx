import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

export default function Auth() {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
        </Routes>
    )
}