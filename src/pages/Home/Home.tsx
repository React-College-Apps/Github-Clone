import { useState } from 'react';
import { useAppContext } from '../../context/App.context';

import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import githubImage from '../../assets/images/githubl.png';
import Layout from '../../components/header/layout/layout';
import Input from '../../components/common/input';
import getUserProfileAPi from '../../core/api/get/getUserProfile.api';

import searchValidation from '../../core/validations/searchForm.validation'
import useToast from '../../customHooks/useToast';

const Home = () => {
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)

    const { setUser } = useAppContext()
    const { showError } = useToast();

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(searchValidation)
    });

    const getUserData = async (data: any) => {
        setLoading(true);
        try {
            const res = await getUserProfileAPi(data.searchQuery);
            console.log(res)
            setUser(res);
            if (res.status === 404) {
                showError('user with this username does not exist');
                return;
            }
            navigate(`/profile/${data.username.toLowerCase()}`);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <Layout noLayoutContent={true}>
            <div className='flex flex-col justify-center items-center h-screen'>
                <div>
                    <img className='w-[300px] rounded-md' src={githubImage} alt="Github" />
                </div>
                <div className='mt-4'>
                    <Input
                        labelClassName='text-xl'
                        label={'Enter a Username To Search 🔎'}
                        type={'search'}
                        placeHolder={'search a user, like DesertFoox'}
                        register={register("searchQuery")}
                    />
                    {errors.searchQuery && <span className='text-red-500 text-md block mt-2'>{errors.searchQuery.message}</span>}
                    <button
                        className='px-2 py-2 bg-[#1F2937] text-white rounded-md mt-3'
                        disabled={loading}
                        onClick={handleSubmit(getUserData)}
                    >
                        {loading ? <span className='animate-ping'>🔍</span> : 'Search'}
                    </button>

                </div>
            </div>
        </Layout>
    );
}

export default Home;
