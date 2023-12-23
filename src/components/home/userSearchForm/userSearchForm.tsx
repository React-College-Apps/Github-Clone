import React from 'react';
import Input from '../../common/input';
import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';

interface UserSearchFormProps {
    register: UseFormRegister<FieldValues>;
    errors: any;
    loading: boolean;
    isDisabled: () => boolean;
    onSubmit: () => void;
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({ register, errors, isDisabled, onSubmit, loading }) => (
    <form className='flex'>
        <Input
            labelClassName='text-xl'
            label={'Enter a Username To Search 🔎'}
            type={'search'}
            placeHolder={'search a user, like DesertFoox'}
            register={register("searchQuery")}
        />
        {errors.searchQuery && <span className='text-red-500 text-md block mt-2'>{errors.searchQuery.message}</span>}
        <div className='flex flex-col h-full justify-end'>
            <button
                className={`px-2 py-3 ml-3 rounded-md  ${isDisabled() ? 'bg-gray-400 text-gray-700' : 'bg-[#1F2937] text-white'}`}
                disabled={isDisabled()}
                onClick={onSubmit}
            >
                {loading ? <span className='animate-ping'>🔍</span> : '➡️'}
            </button>
        </div>

    </form>
);

export default UserSearchForm;
