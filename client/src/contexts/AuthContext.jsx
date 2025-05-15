import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const initialState = { isAuthenticated: false, userData: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN":
            return { isAuthenticated: true, userData: payload.user }
        case "SET_PROFILE":
            return { isAuthenticated: true, userData: payload.user }
        case "SET_LOGGED_OUT":
            return { ...initialState }
        default:
            return state
    }
}

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getUserProfile = useCallback(async (token) => {
        if (!token) return
        const config = { headers: { Authorization: `Bearer ${token}` } }

        await axios.get(`${import.meta.env.VITE_HOST}/auth/user`, config)
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    dispatch({ type: "SET_PROFILE", payload: { user: data.user } })
                }
            })
            .catch((err) => {
                dispatch({ type: "SET_LOGGED_OUT" })
                localStorage.removeItem("pngjwt")
                console.error("Error fetching user profile:", err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem("pngjwt")
        if (!token) {
            dispatch({ type: "SET_LOGGED_OUT" })
            setLoading(false)
            return
        }
        getUserProfile(token)
    }, [getUserProfile])

    const handleLogout = () => {
        dispatch({ type: "SET_LOGGED_OUT" })
        localStorage.removeItem("pngjwt")
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loading, setLoading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)