import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login as authLogin } from '../app/features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Input, Logo, Button } from './index'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [error, setError] = useState('');

    const login = async (data) => {
        setError("");

        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin(userData));
                }

                navigate("/");
            }
        } catch (error) {
            setError(error.message);
            console.log("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 px-4">

            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200 p-10">

                <div className="flex justify-center mb-5">
                    <Logo width="90px" />
                </div>

                <h2 className="text-center text-3xl font-bold text-gray-800">
                    Welcome Back 👋
                </h2>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Sign in to continue
                </p>

                <p className="text-center text-gray-600 mb-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="mb-4 text-center text-red-600 font-medium">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(login)} className="space-y-5">

                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                validate: value =>
                                    /\S+@\S+\.\S+/.test(value) ||
                                    "Invalid email"
                            })}
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-3 rounded-xl text-lg font-semibold"
                    >
                        Login
                    </Button>

                </form>

            </div>
        </div>
    );
}

export default Login;