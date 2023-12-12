import React from 'react'

interface IInputProps {
    label: string,
    type: string,
    className?: string,
    labelClassName?: string,
    placeHolder: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
const Input: React.FC<IInputProps> = ({ label, type, className, placeHolder, onChange, labelClassName }) => {
    return (
        <div>
            <label htmlFor={type} className={`${labelClassName} block text-sm font-medium leading-6 text-gray-900`}
            >{label}</label>
            <div className="mt-2">
                <input
                    type={type}
                    name={type}
                    id={type}
                    onChange={onChange}
                    className={`px-3 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
                    placeholder={placeHolder}
                />
            </div>
        </div>

    )
}

export default Input