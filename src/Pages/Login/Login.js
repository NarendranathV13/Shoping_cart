import React,{useEffect} from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Contain, LoginButton, InputField, Heading, LoginContainer, WelcomeText } from "../../StyledComponent/LoginStyle"; // Update the import path
const Login = ({auth}) => {
    const isAuth = localStorage.getItem("isAuth");
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must have minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character'
            )
            .required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Retrieve data from local storage
            const savedData = JSON.parse(localStorage.getItem("formData"));
            if (savedData && savedData.email === values.email && savedData.password === values.password) {
                alert("Logged in successfully!");
                localStorage.setItem("isAuth", "true");
                navigate("/")
                auth("true");//changing the state of router for navbar visibility
            } else {
                alert("Invalid email or password");
                auth("false");
            }
        },
    });
      // for prevent navigation back to login page
      useEffect(() => {
        if (isAuth === "true") {
            navigate("/");
        } else {
            navigate("/Login");
        }
    }, [isAuth]);
    return (
        <Contain>
            <LoginContainer>
                <Heading>Welcome</Heading>
                <WelcomeText class="text-center">Login</WelcomeText>
                <form onSubmit={formik.handleSubmit}>
                    <div className="login-form">
                        <InputField
                            type="email"
                            placeholder="user email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-center text-danger">{formik.errors.email}</div>
                        ) : null}
                        <InputField
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-center text-danger">{formik.errors.password}</div>
                        ) : null}
                        <LoginButton type="submit">Login</LoginButton>
                    </div>
                    <p className="text-center">New user?</p>
                    <LoginButton type="button">
                    <Link className="nav-link text-white" to="/Register">Register</Link>
                    </LoginButton>
                </form>
            </LoginContainer>
        </Contain>
    );
};
export default Login;
