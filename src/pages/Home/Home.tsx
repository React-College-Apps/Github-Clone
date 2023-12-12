import { useState } from 'react';


import githubImage from '../../assets/images/githubl.png';
import Layout from '../../components/header/layout/layout';
import Input from '../../components/common/input';
import getUserProfileAPi from '../../core/api/get/getUserProfile.api';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [user, setuser] = useState<any>()
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const getUserData = async () => {
        setLoading(true)
        const res: any = await getUserProfileAPi(username)
        if (res.status === 404) {
            console.log("user not found")
        }
        else {
            setuser(res)
            navigate(`/profile/${username.toLowerCase()}`)
            setLoading(false)
        }
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
