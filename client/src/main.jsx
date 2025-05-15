import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import '@ant-design/v5-patch-for-react-19';
import './configs/global.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Auth0Provider
                domain={import.meta.env.VITE_AUTH0_DOMAIN}
                clientId={import.meta.env.VITE_AUTH0_CLIENTID}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                }}
            >
                <AuthContextProvider>
                    <App />
                </AuthContextProvider>
            </Auth0Provider>
        </BrowserRouter>
    </StrictMode>,
)
