import React from 'react';
import Input from '../../components/common/input';
import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';

interface SearchFormProps {
    register: UseFormRegister<FieldValues>;
    errors: any;
    loading: boolean;
    onSubmit: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ register, errors, loading, onSubmit }) => (
    <form className='flex mt-3'>
        <Input
            labelClassName='text-xl mt-3'
            label={'Enter a Repository To Search 🔎'}
            type={'search'}
            placeHolder={'search a user, like Quera'}
            register={register("searchQuery")}
        />
        {errors.searchQuery && <span className='text-red-500 text-md block mt-2'>{errors.searchQuery.message}</span>}
        <div className='flex flex-col h-full justify-end'>
            <button
                className={`px-2 py-3 ml-2 bg-[#1F2937] text-white rounded-md mt-3 ${loading ? ' bg-gray-400 text-gray-700' : 'bg-[#1F2937]'}`}
                disabled={loading}
                onClick={onSubmit}
            >
                {loading ? <span className='animate-ping'>🔍</span> : 'Search'}
            </button>
        </div>
    </form>
);

export default SearchForm;
