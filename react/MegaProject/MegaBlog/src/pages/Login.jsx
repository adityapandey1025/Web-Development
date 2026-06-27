import React from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600')",
            }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full px-4">
                <LoginComponent />
            </div>
        </div>
    )
}

export default Login