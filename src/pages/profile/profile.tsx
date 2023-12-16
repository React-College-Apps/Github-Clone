import { useEffect, useState } from 'react'
import Layout from '../../components/header/layout/layout'
import { useUser } from '../../context/User.context'
import { useParams } from 'react-router-dom'
import getUserProfileApi from '../../core/api/get/getUserProfile.api'
import UserCart from '../../components/profile/userCart/userCart'
import RepositoryCart from '../../components/profile/repositoryCart/repositoryCart'
import Pagination from '../../components/pagination/pagination'

const Profile = () => {
    const { user, setUser } = useUser();
    const { username } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const reposPerPage = 8;

    const getUserReposHandler = async () => {
        const res: any = await getUserProfileApi(username || "");
        if (res.status !== 404) {
            setUser(res);
        }
    };

    const indexOfLastRepo = currentPage * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos = user.userRepos?.slice(indexOfFirstRepo, indexOfLastRepo);

    const totalPages = Math.ceil(user.userRepos?.length / reposPerPage);

    const changePage = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        getUserReposHandler();
    }, [username]);

    return (
        <Layout>
 
                <div className='flex flex-col align-self-start'>
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
                        {currentRepos && currentRepos.length > 0 ? (
                            currentRepos.map((repo: any, key: any) => (
                                <RepositoryCart key={key} name={repo.name} full_name={repo.full_name} language={repo.language} to={`/${repo.owner.login}/${repo.name}`} />
                            ))
                        ) : (
                            <p>No repositories found.</p>
                        )}
                    </div>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        changePage={changePage}
                    />
                </div>

        </Layout>
    );
};

export default Profile;
