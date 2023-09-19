import React,{useState,useEffect} from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Navbar1 from "../Components/Navbar/Navbar1";
import ProtectedRouter from "./Protectedrouter";
import Dashboard from "../Pages/Dashboard";
import Products from "../Pages/Products/Products";
import Myorders from "../Pages/Myorders";
import Cart from "../Pages/Cart/Cart";

const Router = ({auth}) =>{
    const [isAuth, setAuth] = useState(localStorage.getItem("isAuth"))
    useEffect(() => {
        auth(isAuth)
    }, [isAuth])
    return(
        <>
        
        {isAuth == "true" ? <Navbar1 auth={setAuth} /> : null}
          <Routes>
                <Route path="/Login" index element={<Login auth={setAuth} />} />
                <Route path="Register" element={<Register />} />
                <Route path="/" element={<ProtectedRouter auth={localStorage.getItem("isAuth")} />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Myorders" element={<Myorders />} />
                    <Route path="/Cart" element={<Cart />} />
                </Route>
            </Routes>
        </>
    )
}
export default Router
