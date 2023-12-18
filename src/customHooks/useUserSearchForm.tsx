import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import getUserProfileAPi from '../core/api/get/getUserProfile.api';
import searchValidation from '../core/validations/searchForm.validation';
import { useNavigate } from 'react-router-dom';
import useToast from './useToast';

interface IFormData {
    searchQuery: string;
}

export const useUserSearchForm = (setUser) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [lastSearchedQuery, setLastSearchedQuery] = useState<string>("");
    const { showError } = useToast();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(searchValidation),
    });

    const isDisabled = () => loading || getValues("searchQuery") === lastSearchedQuery;

    const onSubmit: SubmitHandler<IFormData> = async (data) => {
        if (data.searchQuery === lastSearchedQuery) return;
        setLoading(true);
        setLastSearchedQuery(data.searchQuery);

        try {
            const res = await getUserProfileAPi(data.searchQuery);
            setUser(res);
            if (res.status === 404) {
                showError('User with this username does not exist');
                return;
            }
            navigate(`/profile/${res.userProfile.login.toLowerCase()}`);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    return { register, handleSubmit: handleSubmit(onSubmit), errors, isDisabled, loading };
};
