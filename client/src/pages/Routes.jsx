import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import Admin from './Admin'
import Frontend from './Frontend'
import Auth from './Auth'
import PrivateRoute from '../components/PrivateRoute'
import ScrollToTop from '../components/ScrollToTop'

export default function Index() {

    const { isAuthenticated } = useAuthContext()

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='/auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to='/' />} />
                <Route path='/admin/*' element={<PrivateRoute Component={Admin} allowedRoles={['admin']} />} />
            </Routes>
        </>
    )
}