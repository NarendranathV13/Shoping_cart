import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Register/style.css'
import Country from '../../Api/Country';
import Cities from '../../Api/Cities';
import States from '../../Api/States';
import { Link, useNavigate } from 'react-router-dom';
import { Heading, LoginContainer } from '../../StyledComponent/LoginStyle';
const Register = () => {
    const navigate = useNavigate();
    const [languageOptions, setLanguageOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState(''); // Reset selected state when country changes
        formik.setFieldValue('country', e.target.value);
        formik.setFieldValue('state', ''); // Reset state
        formik.setFieldValue('city', ''); // Reset city
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        formik.setFieldValue('state', e.target.value);
        formik.setFieldValue('city', ''); // Reset city
    };
    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        console.log(`Selected City: ${e.target.value}`); //selected city
        formik.setFieldValue('city', e.target.value);
    };
    //Language fetching api
    useEffect(() => {
        // Fetch data from the API using axios
        axios.get('https://65002c0e18c34dee0cd46da3.mockapi.io/Languages')
            .then(response => {
                // name of the language is stored in languages 
                const languages = response.data.map(item => item.name);
                setLanguageOptions(languages);// stated is updated
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    //yup library validation 
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
        validationSchema: validationSchema,// yup library 
        onSubmit: (values, { resetForm }) => {
            // Save form data in local storage
            localStorage.setItem('formData', JSON.stringify(values));
            localStorage.setItem("isAuth", "false")// initial value for authentication
            setSelectedCity('');
            setSelectedCountry('');
            setSelectedState('');
            resetForm();
            navigate("/Login");
            alert('Form submitted successfully!');
        }
    });
    return (
        <div className='container'>
            <form id="form" className="form" name="form" onSubmit={formik.handleSubmit}>
                <div className=' container-fluid'>
                    <div class="row">
                        <div class="col-lg-12">
                            <Heading>Registration Form</Heading>
                            <LoginContainer width="100%" padding="40px" height="85%">
                                <div className="row">
                                    <div className="col-lg-6 my-2">
                                        <div className="form-val text-start ">
                                            <label htmlFor="username">Name</label><br />
                                            <input
                                                class=" form-control w-100"
                                                type="text"
                                                id="username"
                                                name="username"
                                                placeholder="Enter your name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.username}
                                            />
                                            {formik.touched.username && formik.errors.username ? (
                                                <div class="text-start text-danger">{formik.errors.username}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 my-2">
                                        <div className="form-val text-start">
                                            <label htmlFor="Lname">Email</label><br />
                                            <input
                                                class=" form-control w-100"
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your Email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div class="text-start text-danger">{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-lg-6 my-2">
                                        <div className="form-val text-start">
                                            <label htmlFor="phone">Password</label><br />
                                            <input
                                                class=" form-control w-100"
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                            />
                                            {formik.touched.password && formik.errors.password ? (
                                                <div class="text-start text-danger">{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 my-2">
                                        <div className="form-val text-start">
                                            <label htmlFor="cnfPassword">Confirm password</label><br />
                                            <input
                                                class=" form-control w-100"
                                                type="password"
                                                id="cnfpassword"
                                                name="cnfpassword"
                                                placeholder="Confirm Password"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.cnfpassword}
                                            />
                                            {formik.touched.cnfpassword && formik.errors.cnfpassword ? (
                                                <div class="text-start text-danger">{formik.errors.cnfpassword}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-lg-6 my-2">
                                        <div className="form-val text-start">
                                            <label htmlFor="pin">Pin code</label><br />
                                            <input
                                                class="form-control w-100"
                                                type="text"
                                                id="pin"
                                                name="pin"
                                                placeholder="Enter the Pincode"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.pin}
                                            />
                                            {formik.touched.pin && formik.errors.pin ? (
                                                <div class="text-start text-danger">{formik.errors.pin}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 my-2">
                                        <div className="form-val text-start">
                                            <label htmlFor="pin">Language</label><br />
                                            <input
                                                className="form-control w-100"
                                                type="text"
                                                id="language"
                                                name="language"
                                                placeholder="Enter the language"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.language}
                                                list="languages" // Use the datalist for autocomplete
                                            />
                                            <datalist id="languages">
                                                {languageOptions.map((option) => (//mapping the fetched values 
                                                    <option value={option} />
                                                ))}
                                            </datalist>
                                            {formik.touched.language && formik.errors.language ? (
                                                <div className="text-start text-danger">{formik.errors.language}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-4 my-2">
                                            <div className="form-val text-start">
                                                <label htmlFor="countryList" className="form-label">Country</label><br />
                                                <input
                                                    className="form-control w-100"
                                                    list="datalistOptions"
                                                    id="countryList"
                                                    placeholder="Type to search..."
                                                    value={selectedCountry}
                                                    onChange={handleCountryChange}
                                                    name="country"
                                                />
                                                <Country apiLink='https://www.universal-tutorial.com/api/countries/' />
                                                {formik.touched.country && formik.errors.country ? (
                                                    <div className="text-start text-danger">{formik.errors.country}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className='col-lg-4 my-2'>
                                            <div className="form-val text-start">
                                                <label htmlFor="exampleDataList" className="form-label">State</label>
                                                <input
                                                    className="form-control w-100"
                                                    list="Statelist"
                                                    id="exampleDataList"
                                                    placeholder="Type to search..."
                                                    value={selectedState}
                                                    onChange={handleStateChange}
                                                    name="state"
                                                />
                                                <States apiLink={`https://www.universal-tutorial.com/api/states/${selectedCountry}`} />
                                                {formik.touched.state && formik.errors.state ? (
                                                    <div className="text-start text-danger">{formik.errors.state}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className='col-lg-4 my-2'>
                                            <div className="form-val text-start">
                                                <label htmlFor="exampleDataList" className="form-label">City</label>
                                                <input
                                                    className="form-control w-100"
                                                    list="Citylist"
                                                    id="exampleDataList"
                                                    placeholder="Type to search..."
                                                    value={selectedCity}
                                                    onChange={handleCityChange}
                                                    name="city"
                                                />
                                                <Cities apiLink={`https://www.universal-tutorial.com/api/cities/${selectedState}`} />
                                                {formik.touched.city && formik.errors.city ? (
                                                    <div className="text-start text-danger">{formik.errors.city}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 my-2">
                                        <div class="d-flex justify-content-center">
                                            <button
                                                className="btn btn-warning mt-2 mx-2"
                                                id="loginbtn"
                                                type="button" // Set type to button, as this won't be a form submission
                                            >
                                                <Link className="nav-link text-white" to="/Login">Login</Link>
                                            </button>
                                            <button
                                                className="btn btn-success mt-2"
                                                id="submitbtn"
                                                type="submit"
                                            >
                                                Register
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </LoginContainer>
                        </div>
                    </div>

                </div>
            </form >
        </div >
    );
};

export default Register;
