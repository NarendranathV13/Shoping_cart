import React from 'react';

const InputField = ({ label, id, formik, type = "text", placeholder, list, customOnChange, hideLabel = false }) => {
    const fieldProps = formik.getFieldProps(id);
    const handleChange = customOnChange || fieldProps.onChange;

    return (
        <div className="mb-4 w-full">
            <label htmlFor={id} className={`block text-sm font-semibold text-gray-700 mb-1 ${hideLabel ? 'sr-only' : ''}`}>{label}</label>
            <input
                type={type}
                id={id}
                list={list}
                placeholder={placeholder}

                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    formik.touched[id] && formik.errors[id] 
                    ? 'border-red-500 focus:ring-red-400 bg-red-50' 
                    : 'border-gray-300 focus:ring-indigo-500 bg-white hover:bg-gray-50'
                }`}
                {...fieldProps}
                onChange={handleChange}
            />
            {formik.touched[id] && formik.errors[id] && (
                <p className="mt-1 text-sm text-red-500">{formik.errors[id]}</p>
            )}
        </div>
    );
};

export default InputField;
