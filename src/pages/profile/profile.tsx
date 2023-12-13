import Layout from '../../components/header/layout/layout'
import { useUser } from '../../context/User.context'

const Profile = () => {
    const { user } = useUser()
    
    return (
        <Layout>
            <div className='h-screen flex justify-center items-center container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3'>
                <div className='border border-[#ccc] p-5 rounded '><h2>s</h2></div>
                <div className='ml-10'><h2>s</h2></div>
            </div>
            
        </Layout>
    )
}

export default Profile