import React from "react";

const colorMap = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  success: "bg-emerald-500 hover:bg-emerald-600 text-white",
  danger: "bg-rose-500 hover:bg-rose-600 text-white",
  warning: "bg-amber-500 hover:bg-amber-600 text-white",
  info: "bg-sky-500 hover:bg-sky-600 text-white",
  light: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  dark: "bg-slate-800 hover:bg-slate-900 text-white",
};

const Button = ({ text, children, color = "primary", onClick, className = "", type = "button" }) => {
  const colorClass = colorMap[color] || colorMap.primary;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mx-3 mt-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md ${colorClass} ${className}`}
    >
      {children || text}
    </button>
  );
};

export default Button;
