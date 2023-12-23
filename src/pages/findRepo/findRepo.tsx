import React from 'react';
import { useAppContext } from '../../context/App.context';
import Layout from '../../components/header/layout/layout';
import githubImage from '../../assets/images/searchrepo.png';
import SearchForm from '../../components/findRepo/findRepo';
import { useSearchForm } from '../../customHooks/useSearchForm';

const FindRepo: React.FC = () => {
    const { setRepositories } = useAppContext();
    const { register, errors, loading, handleSubmit } = useSearchForm(setRepositories);

    return (
        <Layout noLayoutContent={true}>
            <div className='flex flex-col justify-center items-center h-screen '>
                <img className='w-[370px] rounded-lg' src={githubImage} alt="Github" />
                <SearchForm register={register} errors={errors} loading={loading} onSubmit={handleSubmit} />
            </div>
        </Layout>
    );
};

export default FindRepo;
