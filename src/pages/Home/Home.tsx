import { useState } from 'react';


import githubImage from '../../assets/images/githubl.png';
import Layout from '../../components/header/layout/layout';
import Input from '../../components/common/input';
import getUserProfileAPi from '../../core/api/get/getUserProfile.api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/User.context';


const Home = () => {
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const { setUser } = useUser()
    const navigate = useNavigate()

    const getUserData = async () => {
        setLoading(true);
        try {
            const res:any = await getUserProfileAPi(username);
            setUser(res);
            if (res.status === 404) {
                setError('User Not Found');
                return;
            }
            navigate(`/profile/${username.toLowerCase()}`);

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
                        label={'Enter a Username To Search 🔎'}
                        type={'search'}
                        placeHolder={'search a user, like DesertFoox'}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {error !== "" && <span className='text-red-500 text-md block mt-2'>{error}</span>}
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
