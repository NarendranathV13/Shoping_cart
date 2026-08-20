import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
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
