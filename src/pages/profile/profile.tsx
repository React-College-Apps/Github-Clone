import { useEffect } from 'react'
import Layout from '../../components/header/layout/layout'
import { useUser } from '../../context/User.context'
import { useParams } from 'react-router-dom'
import getUserProfileApi from '../../core/api/get/getUserProfile.api'

const Profile = () => {
    const { user, setUser } = useUser()
    const { username } = useParams()
    console.log(user)

    const getUserReposHandler = async () => {
        const res: any = await getUserProfileApi(username || "");
        setUser(res)
    }
    useEffect(() => {
        getUserReposHandler()

    }, [])

    return (
        <Layout>
            <div className='h-screen flex justify-center items-center container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3'>
                <div className='border border-[#ccc] p-5 rounded w-[20rem]'>
                    <div>
                        <img className='rounded' src={user.userProfile.avatar_url} />
                        <h2 className='text-xl mt-2'>{user.userProfile.name}</h2>
                        <p className='mt-1'>@{user.userProfile.login}</p>
                        <p className='mt-1'>{user.userProfile.bio}</p>
                    </div>
                    <div className="grid grid-cols-2 mt-3 items-center">
                        <div className='text-center'>
                            <p >{user.userProfile.followers}</p>
                            Followers 👣
                        </div>
                        <div className='text-center'>
                            <p >{user.userProfile.following}</p>
                            Following 👥
                        </div>
                    </div>
                    <div className='mt-2'>
                        <p>📍 {user.userProfile.location}</p>
                        <p>🌐{user.userProfile.blog}</p>
                    </div>
                </div>
                <div className='ml-10'><h2>s</h2></div>
            </div>

        </Layout>
    )
}

export default Profile