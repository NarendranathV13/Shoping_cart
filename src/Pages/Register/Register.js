import React, { useState, useEffect } from 'react';
import api from '../../ApiService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Country from '../../Api/Country';
import Cities from '../../Api/Cities';
import States from '../../Api/States';
import Swal from 'sweetalert2'; 
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';

const InputField = ({ label, id, formik, type = "text", placeholder, list, onChange }) => (
    <div className="mb-4 w-full">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            list={list}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                formik.touched[id] && formik.errors[id] 
                ? 'border-red-500 focus:ring-red-400 bg-red-50' 
                : 'border-gray-300 focus:ring-indigo-500 bg-white hover:bg-gray-50'
            }`}
            onChange={onChange || formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[id]}
        />
        {formik.touched[id] && formik.errors[id] && (
            <p className="mt-1 text-sm text-red-500">{formik.errors[id]}</p>
        )}
    </div>
);

const Register = () => {
    const navigate = useNavigate();
    const [languageOptions, setLanguageOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState(''); 
        formik.setFieldValue('country', e.target.value);
        formik.setFieldValue('state', ''); 
        formik.setFieldValue('city', ''); 
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        formik.setFieldValue('state', e.target.value);
        formik.setFieldValue('city', ''); 
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        formik.setFieldValue('city', e.target.value);
    };

    useEffect(() => {
        api.get('https://65002c0e18c34dee0cd46da3.mockapi.io/Languages')
            .then(response => {
                const languages = response.data.map(item => item.name);
                setLanguageOptions(languages);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        pin: Yup.string()
            .matches(/^\d{5,6}$/, 'Pin code must be 5 to 6 digits')
            .required('Pin code is required'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must have minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character'
            )
            .required('Password is required'),
        cnfpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        language: Yup.string().required('Language is required'),
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            pin: '',
            password: '',
            cnfpassword: '',
            language: '',
            country: '',
            state: '',
            city: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            localStorage.setItem('formData', JSON.stringify(values));
            localStorage.setItem("isAuth", "false");
            setSelectedCity('');
            setSelectedCountry('');
            setSelectedState('');
            resetForm();
            navigate("/Login");
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Your account has been created. Please log in.',
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    popup: 'rounded-2xl'
                }
            });
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-white/40 backdrop-blur-sm">
                <div className="text-center mb-10">
                    <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 mb-6">
                        <i className="fa-solid fa-user-plus text-3xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create an Account</h2>
                    <p className="mt-2 text-sm text-gray-500">Join us and start shopping today</p>
                </div>
                
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        <InputField label="Full Name" id="username" formik={formik} placeholder="Enter your full name" />
                        <InputField label="Email Address" id="email" type="email" formik={formik} placeholder="Enter your email" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        <InputField label="Password" id="password" type="password" formik={formik} placeholder="Create a strong password" />
                        <InputField label="Confirm Password" id="cnfpassword" type="password" formik={formik} placeholder="Confirm your password" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        <InputField label="Pin Code" id="pin" formik={formik} placeholder="Enter your pincode" />
                        
                        <div className="mb-4 w-full">
                            <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-1">Language</label>
                            <input
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                                    formik.touched.language && formik.errors.language 
                                    ? 'border-red-500 focus:ring-red-400 bg-red-50' 
                                    : 'border-gray-300 focus:ring-indigo-500 bg-white hover:bg-gray-50'
                                }`}
                                type="text"
                                id="language"
                                name="language"
                                placeholder="Select a language"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.language}
                                list="languages"
                            />
                            <datalist id="languages">
                                {languageOptions.map((option, index) => (
                                    <option key={index} value={option} />
                                ))}
                            </datalist>
                            {formik.touched.language && formik.errors.language && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.language}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 pb-6 border-b border-gray-100">
                        <div className="mb-4 w-full">
                            <label htmlFor="countryList" className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                            <input
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                                    formik.touched.country && formik.errors.country 
                                    ? 'border-red-500 focus:ring-red-400 bg-red-50' 
                                    : 'border-gray-300 focus:ring-indigo-500 bg-white hover:bg-gray-50'
                                }`}
                                list="datalistOptions"
                                id="countryList"
                                placeholder="Select country..."
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                name="country"
                                onBlur={formik.handleBlur}
                            />
                            <Country apiLink='https://www.universal-tutorial.com/api/countries/' />
                            {formik.touched.country && formik.errors.country && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.country}</p>
                            )}
                        </div>
                        
                        <div className="mb-4 w-full">
                            <label htmlFor="exampleDataList" className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                            <input
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                                    formik.touched.state && formik.errors.state 
                                    ? 'border-red-500 focus:ring-red-400 bg-red-50' 
                                    : 'border-gray-300 focus:ring-indigo-500 bg-white hover:bg-gray-50'
                                }`}
                                list="Statelist"
                                id="exampleDataList"
                                placeholder="Select state..."
                                value={selectedState}
                                onChange={handleStateChange}
                                name="state"
                                onBlur={formik.handleBlur}
                            />
                            <States apiLink={`https://www.universal-tutorial.com/api/states/${selectedCountry}`} />
                            {formik.touched.state && formik.errors.state && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.state}</p>
                            )}
                        </div>
                        
                        <div className="mb-4 w-full">
                            <label htmlFor="cityDataList" className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                            <input
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                                    formik.touched.city && formik.errors.city 
                                    ? 'border-red-500 focus:ring-red-400 bg-red-50' 
                                    : 'border-gray-300 focus:ring-indigo-500 bg-white hover:bg-gray-50'
                                }`}
                                list="Citylist"
                                id="cityDataList"
                                placeholder="Select city..."
                                value={selectedCity}
                                onChange={handleCityChange}
                                name="city"
                                onBlur={formik.handleBlur}
                            />
                            <Cities apiLink={`https://www.universal-tutorial.com/api/cities/${selectedState}`} />
                            {formik.touched.city && formik.errors.city && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.city}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                        <Button text="Login Instead" color="light" onClick={() => navigate('/Login')} className="w-full sm:w-48 !mx-0 py-3" />
                        <button
                            type="submit"
                            className="w-full sm:w-48 flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all duration-200"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
