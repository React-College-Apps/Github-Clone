import { useEffect } from 'react'
import Layout from '../../components/header/layout/layout'
import { useUser } from '../../context/User.context'
import { useParams } from 'react-router-dom'
import getUserProfileApi from '../../core/api/get/getUserProfile.api'
import UserCart from '../../components/profile/userCart/userCart'

const Profile = () => {
    const { user, setUser } = useUser()
    const { username } = useParams()
    console.log(user)

    const getUserReposHandler = async () => {
        const res: any = await getUserProfileApi(username || "");
        if (res.status !== 404) {
            setUser(res)
        }
        return
    }
    useEffect(() => {
        getUserReposHandler()

    }, [])

    return (
        <Layout>
            <div className='h-screen flex justify-center items-center container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3'>
                {user.userProfile && <UserCart
                    avatar={user.userProfile.avatar_url}
                    name={user.userProfile.name}
                    login={user.userProfile.login}
                    bio={user.userProfile.bio}
                    followers={user.userProfile.followers}
                    following={user.userProfile.following}
                    location={user.userProfile.location}
                    blog={user.userProfile.blog}
                />}
                <div className='ml-10'><h2>s</h2></div>
            </div>

        </Layout>
    )
}

export default Profile