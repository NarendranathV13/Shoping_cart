import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import Button from "../../Components/Button";
import InputField from "../../Components/InputField";
import { loginValidationSchema } from "./LoginSchema";

const Login = ({ auth }) => {
    const isAuth = localStorage.getItem("isAuth");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            const savedData = JSON.parse(localStorage.getItem("formData"));
            if (savedData && savedData.email === values.email && savedData.password === values.password) {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in successfully!',
                    timer: 1500,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-2xl'
                    }
                });
                localStorage.setItem("isAuth", "true");
                navigate("/");
                if (auth) auth("true"); 
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid email or password',
                    customClass: {
                        popup: 'rounded-2xl',
                        confirmButton: 'bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg text-white font-medium transition-colors border-none'
                    }
                });
                if (auth) auth("false");
            }
        },
    });

    useEffect(() => {
        if (isAuth === "true") {
            navigate("/");
        }
    }, [isAuth, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-white/40 backdrop-blur-sm">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <i className="fa-brands fa-shopify text-3xl text-white"></i>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Please sign in to your account
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <InputField label="Email address" id="email" type="email" formik={formik} placeholder="Email address" hideLabel={true} />
                        <InputField label="Password" id="password" type="password" formik={formik} placeholder="Password" hideLabel={true} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Forgot your password?
                            </button>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            color="primary"
                            className="group relative w-full flex justify-center py-3 px-4 !mx-0 border border-transparent shadow-md transition-all duration-200"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <i className="fa-solid fa-lock text-indigo-400 group-hover:text-indigo-300 transition-colors"></i>
                            </span>
                            Sign In
                        </Button>
                    </div>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        New user?{' '}
                        <Link to="/Register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
