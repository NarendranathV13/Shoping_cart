import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import '../Navbar/style.css'

const Navbar1 = ({ auth }) => {
    const cartCount = useSelector((state) => state.cart.cartCount);
    const savedData = JSON.parse(localStorage.getItem("formData"));
    const Username = savedData.username;
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem("isAuth", "false");
        console.log("logout", localStorage.getItem("isAuth"));
        navigate("/Login");
        auth("false")
    };
    return (
        <>
            {/* Navbar starts */}
            <nav className="navbar navbar-expand navBg sticky-top px-4 py-0" style={{ backgroundColor: "rgba(20, 24, 24, 0) !important" }}>
                <div className="navbar-nav align-items-center ms-auto">
                    <div className="nav-item">
                        <NavLink to="/Products" className="nav-item mx-2 nav-link ">
                            <i class="fa-solid fa-store me-2"></i>Products
                        </NavLink>
                    </div>
                    <div className="nav-item dropdown">
                        <NavLink to="/Cart" className="nav-item m-0 nav-link ">
                            <i class="fa-solid fa-cart-shopping me-3  mx-2"> <p className=' mx-1 cartNum text-danger d-flex'>{cartCount}</p></i>Cart 
                        </NavLink>
                        <div className="dropdown-menu dropdown-menu-end bg-dark border-0 rounded-0 rounded-bottom m-0">
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <NavLink to="/Myorders" className="nav-item m-0 nav-link ">
                        <i class="fa-solid fa-gift me-2 mx-3"></i>My orders
                        </NavLink>
                        <div className="dropdown-menu dropdown-menu-end bg-dark border-0 rounded-0 rounded-bottom m-0">
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <span className="d-none d-lg-inline-flex">{Username}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end bg-dark border-0 rounded-0 rounded-bottom m-0">
                            <a href="" className="dropdown-item">Settings</a>
                            <button className="dropdown-item " onClick={handleLogout}>
                                <i class="fa-solid fa-arrow-right-to-bracket "></i>
                                <span className="mx-1">Log out</span>
                            </button>
                        </div>
                    </div>
                    <div className="nav-item">
                        <button className="nav-link log" onClick={handleLogout}>
                            <i class="fa-solid fa-right-to-bracket" id="log1"></i>
                        </button>
                    </div>
                </div>
            </nav>
            {/* sidebar starts */}
            <div className="sidebar pe-4 pb-3">
                <nav className="navbar  navbar-dark">
                    <a href="" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-warning"><i class="fa-brands fa-shopify me-2"></i>Shop Cart</h3>
                    </a>
                    <div className="d-flex align-items-center ms-4 mb-4">
                        <div className="position-relative">
                            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                        </div>
                        <div className="ms-3 text-light ">
                        <span>Welcome</span>
                            <h5 className="text-light mb-0">{Username}</h5>
                        </div>
                    </div>
                    <div className="navbar-nav m-0 w-100">
                        <NavLink to="/" className="nav-item m-0 nav-link ">
                            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                        </NavLink>
                        <NavLink to="/Products" className="nav-item m-0 nav-link ">
                            <i class="fa-solid fa-store me-2"></i>Products
                        </NavLink>
                        <NavLink to="/Cart" className="nav-item m-0 nav-link ">
                            <i class="fa-solid fa-cart-shopping me-2"></i>Cart <span className=' text-danger text-bg-info mx-2 rounded-circle p-2 h6 mx-3'>{cartCount}</span>
                        
                        </NavLink>
                        <NavLink to="/Myorders" className="nav-item m-0 nav-link ">
                            <i class="fa-solid fa-gift me-2"></i>Myorders
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default Navbar1