import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Country from '../../Api/Country';
import Cities from '../../Api/Cities';
import States from '../../Api/States';
import { fetchLanguages } from '../../Api/Endpoints';
import Swal from 'sweetalert2'; 
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import InputField from '../../Components/InputField';

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
        fetchLanguages()
            .then(response => {
                const languages = response.data.map(item => item.name);
                setLanguageOptions(languages);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                            <InputField label="Language" id="language" formik={formik} placeholder="Select a language" list="languages" />
                            <datalist id="languages">
                                {languageOptions.map((option, index) => (
                                    <option key={index} value={option} />
                                ))}
                            </datalist>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 pb-6 border-b border-gray-100">
                        <div className="mb-4 w-full">
                            <InputField label="Country" id="country" formik={formik} placeholder="Select country..." list="datalistOptions" customOnChange={handleCountryChange} />
                            <Country apiLink='https://www.universal-tutorial.com/api/countries/' />
                        </div>
                        
                        <div className="mb-4 w-full">
                            <InputField label="State" id="state" formik={formik} placeholder="Select state..." list="Statelist" customOnChange={handleStateChange} />
                            <States apiLink={`https://www.universal-tutorial.com/api/states/${selectedCountry}`} />
                        </div>
                        
                        <div className="mb-4 w-full">
                            <InputField label="City" id="city" formik={formik} placeholder="Select city..." list="Citylist" customOnChange={handleCityChange} />
                            <Cities apiLink={`https://www.universal-tutorial.com/api/cities/${selectedState}`} />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                        <Button text="Login Instead" color="light" onClick={() => navigate('/Login')} className="w-full sm:w-48 !mx-0 py-3" />
                        <Button
                            type="submit"
                            text="Register"
                            color="primary"
                            className="w-full sm:w-48 flex justify-center py-3 px-4 !mx-0 border border-transparent shadow-md transition-all duration-200"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
