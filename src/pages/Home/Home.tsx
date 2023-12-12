import React from 'react';
import githubImage from '../../assets/images/githubl.png';
import Layout from '../../components/header/layout/layout';
import Input from '../../components/common/input';

const Home = () => {
    return (
        <Layout>
            <div className='flex flex-col justify-center items-center h-screen'> 
                <div>
                    <img className='w-[300px] rounded-md' src={githubImage} alt="Github" />
                </div>
                <div className='mt-4'>
                    <Input labelClassName='text-xl' label={'Enter a Username To Search 🔎'} type={'search'} placeHolder={'search a user, like DesertFoox'} />
                    <button className='px-2 py-2 bg-[#1F2937] text-white rounded-md mt-3'>Search</button>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
