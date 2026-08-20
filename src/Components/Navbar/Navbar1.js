import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../Navbar/style.css';

const navItems = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        path: '/',
        icon: 'fa fa-tachometer-alt',
        showInTop: false,
        showBadge: false,
    },
    {
        id: 'products',
        title: 'Products',
        path: '/Products',
        icon: 'fa-solid fa-store',
        showInTop: true,
        showBadge: false,
    },
    {
        id: 'cart',
        title: 'Cart',
        path: '/Cart',
        icon: 'fa-solid fa-cart-shopping',
        showInTop: true,
        showBadge: true,
    },
    {
        id: 'orders',
        title: 'My Orders',
        path: '/Myorders',
        icon: 'fa-solid fa-gift',
        showInTop: true,
        showBadge: false,
    },
];

const Navbar1 = ({ auth }) => {
    const cartCount = useSelector((state) => state.cart.cartCount);
    const savedData = JSON.parse(localStorage.getItem("formData")) || {};
    const Username = savedData.username || "Guest";
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.setItem("isAuth", "false");
        navigate("/Login");
        if(auth) auth("false");
    };

    return (
        <>
            {/* Top Navbar */}
            <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex justify-between shadow-sm">
                <div className="flex items-center space-x-6">
                    {navItems.filter((item) => item.showInTop).map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className="text-gray-700 hover:text-indigo-600 font-medium flex items-center relative transition-colors"
                        >
                            <i className={`${item.icon} mr-2 ${item.showBadge ? 'text-xl' : ''}`}></i>
                            {item.showBadge && cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                            {item.title}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-800 hidden sm:block">{Username}</span>
                    <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors" title="Log out">
                        <i className="fa-solid fa-right-to-bracket text-lg"></i>
                    </button>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-[250px] bg-slate-900 text-white flex flex-col shadow-xl z-50">
                <div className="p-6">
                    <NavLink to="/" className="flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
                        <i className="fa-brands fa-shopify text-3xl mr-3"></i>
                        <h3 className="text-2xl font-bold tracking-wider">Shop Cart</h3>
                    </NavLink>

                    <div className="flex items-center mb-10 bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <div className="relative">
                            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold text-white uppercase shadow-inner">
                                {Username.charAt(0)}
                            </div>
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-slate-800 rounded-full"></div>
                        </div>
                        <div className="ml-4">
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Welcome</p>
                            <h5 className="font-semibold text-lg text-slate-100">{Username}</h5>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg font-medium transition-all ${
                                    isActive
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            <i className={`${item.icon} w-6`}></i>
                            {item.title}
                            {item.showBadge && cartCount > 0 && (
                                <span className="ml-auto bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            
        </>
    );
};

export default Navbar1;