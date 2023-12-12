import { useState } from 'react';

import { Octokit } from 'octokit'

import githubImage from '../../assets/images/githubl.png';
import Layout from '../../components/header/layout/layout';
import Input from '../../components/common/input';

const octokit = new Octokit({
    auth: "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",
});

const Home = () => {
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const getUserData = async () => {
        setLoading(true)
        try {
            const response = await octokit.request('GET /users/{username}/repos', {
                username: username
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching user repositories:", error);
        }
        setLoading(false)
    }



    return (
        <Layout>
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        className='px-2 py-2 bg-[#1F2937] text-white rounded-md mt-3'
                        disabled={loading}
                        onClick={getUserData}
                    >

                        {loading ? <span className='animate-ping'>🔍</span> : 'Search'}
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
