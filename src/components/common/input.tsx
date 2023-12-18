import React from 'react';

import IInputProps from '../../core/interfaces/props/Iinput.prop';



const Input: React.FC<IInputProps> = ({ label, type, className, placeHolder, onChange, labelClassName, value, register }) => {
    return (
        <div>
            <label htmlFor={type} className={`${labelClassName} block text-sm font-medium leading-6 text-gray-900`}>{label}</label>
            <div className="mt-2">
                <input
                    value={value}
                    type={type}
                    id={type}
                    onChange={onChange}
                    className={`px-3 block w-full outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${className}`}
                    placeholder={placeHolder}
                    {...register} 
                />
            </div>
        </div>
    )
}

export default Input;
