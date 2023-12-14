import { useEffect } from 'react'
import Layout from '../../components/header/layout/layout'
import { useUser } from '../../context/User.context'
import { useParams } from 'react-router-dom'
import getUserProfileApi from '../../core/api/get/getUserProfile.api'
import UserCart from '../../components/profile/userCart/userCart'

const Profile = () => {
    const { user, setUser } = useUser();
    const { username } = useParams();

    const getUserReposHandler = async () => {
        const res: any = await getUserProfileApi(username || "");
        if (res.status !== 404) {
            setUser(res);
        }
    };

    useEffect(() => {
        getUserReposHandler();
    }, [username]);

    return (
        <Layout>
            <div className='flex justify-center mt-[6rem] container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3'>
                <div className='flex flex-col align-self-start'> {/* Adjusted for independent height control */}
                    {user.userProfile && (
                        <UserCart
                            avatar={user.userProfile.avatar_url}
                            name={user.userProfile.name}
                            login={user.userProfile.login}
                            bio={user.userProfile.bio}
                            followers={user.userProfile.followers}
                            following={user.userProfile.following}
                            location={user.userProfile.location}
                            blog={user.userProfile.blog}
                        />
                    )}
                </div>

                <div className='ml-10 border border-gray-300 p-5 rounded'>
                    <h2 className='text-xl font-semibold'>📚 Repositories</h2>
                    <div className='grid grid-cols-2 mt-3 gap-4'>
                        {user.userRepos && user.userRepos.length > 0 ? (
                            user.userRepos.map((repo: any, key: number) => (
                                <div className='border border-gray-300 hover:border-gray-400 rounded p-2 hover:shadow-lg transition-all'>
                                    <h3 className='text-lg font-medium'>{repo.name}</h3>
                                    <p className='text-sm mt-2'>📍{repo.full_name}</p>
                                    <p className='text-sm mt-2'>🤖{repo.language ? repo.language : "something"}</p>
                                </div>
                            ))
                        ) : (
                            <p>No repositories found.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
