import React, { useState } from 'react';
import { useAppContext } from '../../context/App.context';
import Layout from '../../components/header/layout/layout';
import githubImage from '../../assets/images/githubl.png';
import UserSearchForm from '../../components/home/userSearchForm/userSearchForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import getUserProfileAPi from '../../core/api/get/getUserProfile.api';
import searchValidation from '../../core/validations/searchForm.validation';
import { useNavigate } from 'react-router-dom';
import useToast from '../../customHooks/useToast';


const Home: React.FC = () => {
    const { setUser } = useAppContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [lastSearchedQuery, setLastSearchedQuery] = useState<string>("");
    const { showError } = useToast();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(searchValidation),
    });



    const onSubmit: SubmitHandler<any> = async (data) => {
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

    const isDisabled = () => loading
    return (
        <Layout noLayoutContent={true}>
            <div className='flex flex-col justify-center items-center h-screen'>
                <img className='w-[337px] rounded-md' src={githubImage} alt="Github" />
                <UserSearchForm isDisabled={isDisabled} register={register} errors={errors} loading={loading} onSubmit={handleSubmit(onSubmit)} />
            </div>
        </Layout>
    );
};

export default Home;
