import { useState } from 'react'
import { useAppContext } from '../../context/App.context';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '../../components/header/layout/layout'
import githubImage from '../../assets/images/searchrepo.png';
import Input from '../../components/common/input';
import searchRepos from '../../core/api/get/searchRepos';
import searchFormValidation from '../../core/validations/searchForm.validation'

const FindRepo = () => {
    const { setRepositories } = useAppContext()

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(searchFormValidation)
    });

    const getReposData = async (data: any) => {
        console.log(data)
        setLoading(true);
        try {
            const res = await searchRepos(data.searchQuery)
            navigate(`/repositories/search?query=${data.searchQuery}`)
            setRepositories(res)
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
                        label={'Enter a Repository To Search 🔎'}
                        type={'search'}
                        placeHolder={'search a user, like Quera'}
                        register={register("searchQuery")}
                    />
                    {errors.searchQuery && <span className='text-red-500 text-md block mt-2'>{errors.searchQuery.message}</span>}
                    <button
                        className='px-2 py-2 bg-[#1F2937] text-white rounded-md mt-3'
                        disabled={loading}
                        onClick={handleSubmit(getReposData)}
                    >
                        {loading ? <span className='animate-ping'>🔍</span> : 'Search'}
                    </button>

                </div>
            </div>
        </Layout>
    )
}

export default FindRepo