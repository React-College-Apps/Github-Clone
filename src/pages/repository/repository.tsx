import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/header/layout/layout';
import getUserRepo from '../../core/api/get/getUserRepo.api';
import { useUser } from '../../context/User.context';
import UserCart from '../../components/profile/userCart/userCart';
import getUserProfileApi from '../../core/api/get/getUserProfile.api';
import getRepoFileTree from '../../core/api/get/getRepoFileTree.api';

const Repository = () => {
    const { user, setUser } = useUser()
    const { username, repo } = useParams();
    const [repository, setRepository] = useState<any>({});
    const [contributors, setContributors] = useState<any>([]);
    const [fileTree, setFileTree] = useState<any>([]);

    const fetchRepoDetails = async () => {
        const repoDetails: any = await getUserRepo(username!, repo!);
        const userDatas: any = await getUserProfileApi(username!);
        const getRepoTree: any = await getRepoFileTree(username!, repo!);

        // Sort file tree: directories first, then files
        const sortedFileTree = getRepoTree.tree.sort((a: any, b: any) => {
            if (a.type === b.type) {
                return 0; // No change if both are of the same type
            }
            return a.type === 'tree' ? -1 : 1; // 'tree' (directories) come first
        });

        setUser({ userProfile: userDatas.userProfile, repository: repoDetails });
        setRepository(repoDetails);
        setFileTree(sortedFileTree);
    };

    useEffect(() => {
        if (username && repo) {
            fetchRepoDetails();
        }
    }, [username, repo]);

    return (
        <Layout>
            <div className='flex justify-center mt-[6rem] container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3'>
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
                    <h2 className='text-xl font-semibold'>📚 {repository.name}</h2>
                    <div className='grid grid-cols-1 mt-3 gap-4'>
                        {fileTree && fileTree.length > 0 && fileTree.map((item:any, index:any) => (
                            <h2 key={index}>{item.type === "blob" ? `📄 ${item.path}` : `📁 ${item.path}`}</h2>
                        ))}
                    </div>


                </div>
            </div>
        </Layout>
    );
};

export default Repository;
