import React, { useState, useEffect } from "react";
const colorMap = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-gray-600 text-white",
  success: "bg-emerald-500 text-white",
  danger: "bg-rose-500 text-white",
  warning: "bg-amber-500 text-white",
  info: "bg-sky-500 text-white",
  light: "bg-gray-100 text-gray-800",
  dark: "bg-slate-800 text-white",
};

const Customtoast = ({ show, message, color = "primary", onClose }) => {
  const [visible, setVisible] = useState(show);
  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // Auto-hide after 3 seconds (adjust as needed)
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const colorClass = colorMap[color] || colorMap.primary;

  return (
    visible && (
      <div className={`fixed bottom-4 right-4 w-80 max-w-[90vw] shadow-lg rounded-xl overflow-hidden transition-all duration-300 transform translate-y-0 opacity-100 z-50 ${colorClass}`}>
        <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
          <strong className="font-semibold tracking-wide">Notification</strong>
          <button
            type="button"
            className="text-white hover:text-gray-200 focus:outline-none transition-colors"
            onClick={() => {
              setVisible(false);
              onClose();
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="px-4 py-3 text-sm opacity-90">{message}</div>
      </div>
    )
  );
};

export default Customtoast;
