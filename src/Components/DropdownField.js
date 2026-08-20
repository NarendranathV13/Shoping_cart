import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const DropdownField = ({
  label,
  id,
  formik,
  options = [],
  placeholder = 'Select an option',
  customOnChange,
  hideLabel = false,
}) => {
  const selectedValue = formik ? formik.values[id] : '';
  const isTouched = formik ? formik.touched[id] : false;
  const error = formik ? formik.errors[id] : null;

  const handleSelect = (option) => {
    if (customOnChange) {
      customOnChange(option);
    } else if (formik) {
      formik.setFieldValue(id, option);
      formik.setFieldTouched(id, true);
    }
  };

  return (
    <div className="mb-4 w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-semibold text-gray-700 mb-1 ${
            hideLabel ? 'sr-only' : ''
          }`}
        >
          {label}
        </label>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            id={id}
            className={`w-full px-4 py-3 border rounded-xl flex items-center justify-between focus:outline-none focus:ring-2 focus:border-transparent transition-all text-left ${
              isTouched && error
                ? 'border-red-500 focus:ring-red-400 bg-red-50'
                : 'border-gray-300 focus:ring-indigo-500 bg-white hover:bg-gray-50'
            }`}
          >
            <span
              className={selectedValue ? 'text-gray-900 font-medium' : 'text-gray-400'}
            >
              {selectedValue || placeholder}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-1">
          <div className="max-h-60 overflow-y-auto space-y-1" style={{ maxHeight: '240px', overflowY: 'auto' }}>
            {options.length > 0 ? (
              options.map((option, index) => {
                const optionValue = typeof option === 'object' ? option.value || option.name : option;
                const optionLabel = typeof option === 'object' ? option.label || option.name : option;
                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleSelect(optionValue)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg cursor-pointer transition-colors"
                  >
                    {optionLabel}
                  </DropdownMenuItem>
                );
              })
            ) : (
              <div className="px-4 py-2 text-sm text-gray-400">No options available</div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {isTouched && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default DropdownField;
