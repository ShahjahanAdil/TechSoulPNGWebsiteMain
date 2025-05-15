import React from 'react'
import './App.css'
import Routes from './pages/Routes'
import Loader from './components/Loader'
import { useAuthContext } from './contexts/AuthContext'

function App() {

    const { loading } = useAuthContext()

    return (
        <>
            {
                loading ? <Loader /> : <Routes />
            }
        </>
    )
}

export default App