import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login as authLogin } from '../app/features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Input, Logo, Button } from './index'

function Signup() {
    const [error, setError] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const create = async (data) => {
        setError("")

        try {
            const session = await authService.createAccount(data)

            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(authLogin(userData))
                }

                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 px-4 py-8">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 p-10">

                <div className="flex justify-center mb-5">
                    <Logo width="90px" />
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Create your account 🚀
                </h2>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Join us and start writing blogs today.
                </p>

                <p className="text-center text-gray-600 mb-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && (
                    <p className="text-center text-red-600 font-medium mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className="space-y-5">

                    <div>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                validate: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Please enter a valid email address",
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-3 rounded-xl text-lg font-semibold"
                    >
                        Create Account
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default Signup