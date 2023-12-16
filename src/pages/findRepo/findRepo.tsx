import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import Layout from '../../components/header/layout/layout'
import githubImage from '../../assets/images/githubl.png';
import Input from '../../components/common/input';
import searchRepos from '../../core/api/get/searchRepos';
import { useAppContext } from '../../context/App.context';

const FindRepo = () => {
    const { setRepositories } = useAppContext()
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const getReposData = async () => {
        setLoading(true);
        try {
            const res = await searchRepos(searchQuery)
            navigate(`/repositories/search?query=${searchQuery}`)
            setRepositories(res)
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError('User Not Found');
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {error !== "" && <span className='text-red-500 text-md block mt-2'>{error}</span>}
                    <button
                        className='px-2 py-2 bg-[#1F2937] text-white rounded-md mt-3'
                        disabled={loading}
                        onClick={getReposData}
                    >
                        {loading ? <span className='animate-ping'>🔍</span> : 'Search'}
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default FindRepo