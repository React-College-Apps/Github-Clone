import React from 'react';
import { useAppContext } from '../../context/App.context';
import Layout from '../../components/header/layout/layout';
import githubImage from '../../assets/images/githubl.png';
import UserSearchForm from '../../components/home/userSearchForm/userSearchForm';
import { useUserSearchForm } from '../../customHooks/useUserSearchForm';

const Home: React.FC = () => {
    const { setUser } = useAppContext();
    const { register, errors, isDisabled, loading, handleSubmit } = useUserSearchForm(setUser);

    return (
        <Layout noLayoutContent={true}>
            <div className='flex flex-col justify-center items-center h-screen'>
                <img className='w-[300px] rounded-md' src={githubImage} alt="Github" />
                <UserSearchForm register={register} errors={errors} isDisabled={isDisabled} loading={loading} onSubmit={handleSubmit} />
            </div>
        </Layout>
    );
};

export default Home;
