import React from 'react'

interface IRepositoryCart {
    key: number,
    name: string,
    full_name: string,
    language: string
}
const RepositoryCart: React.FC<IRepositoryCart> = ({ key, name, full_name, language }) => {
    return (
        <div key={key} className='border border-gray-300 hover:border-gray-400 rounded p-2 hover:shadow-lg transition-all w-[22rem]'> {/* Fixed width */}
            <h3 className='text-lg font-medium'>{name}</h3>
            <p className='text-sm mt-2'>📍{full_name}</p>
            <p className='text-sm mt-2'>🤖{language ? language : "something"}</p>
        </div>
    )
}

export default RepositoryCart