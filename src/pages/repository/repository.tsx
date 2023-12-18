import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/header/layout/layout';
import getUserRepo from '../../core/api/get/getUserRepo.api';
import { useAppContext } from '../../context/App.context';
import UserCart from '../../components/profile/userCart/userCart';
import getUserProfileApi from '../../core/api/get/getUserProfile.api';
import getRepoFileTree from '../../core/api/get/getRepoFileTree.api';
import FileTree from '../../components/fileTree/fileTree';

const Repository = () => {
    const { user, setUser } = useAppContext()
    const { username, repo } = useParams();
    const [repository, setRepository] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true)
    const [fileTree, setFileTree] = useState<any>([]);
    const [buttonText, setButtonText] = useState("Clone with HTTP🔽");

    const fetchRepoDetails = async () => {
        setUser({})
        const repoDetails: any = await getUserRepo(username!, repo!);
        const userDatas: any = await getUserProfileApi(username!);
        const getRepoTree: any = await getRepoFileTree(username!, repo!);
        console.log(getRepoTree)
        const sortedFileTree = getRepoTree.sort((a: any, b: any) => {
            if (a.type === b.type) {
                return 0;
            }
            return a.type === 'tree' ? -1 : 1;
        });

        setUser({ userProfile: userDatas.userProfile, repository: repoDetails });
        setRepository(repoDetails);
        setFileTree(sortedFileTree);
        setLoading(false)
    };

    const copyCloneUrlToClipboard = async () => {
        const cloneUrl = `https://github.com/${username}/${repo}.git`;
        try {
            await navigator.clipboard.writeText(cloneUrl);
            setButtonText("Copied!");
            setTimeout(() => {
                setButtonText("Clone with HTTP🔽");
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    useEffect(() => {
        if (username && repo) {
            fetchRepoDetails();
        }
    }, [username, repo]);

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
            {loading ?
                <div className="flex justify-center items-center">
                    <div className="loader"></div>
                </div> : <div className='ml-10 border border-gray-300 p-5 rounded w-[200rem]'>
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-semibold'>📚 {repository.name}</h2>
                        <button
                            className='bg-[#1F2937] text-white py-2 px-3 text-center rounded'
                            onClick={copyCloneUrlToClipboard}
                        >
                            {buttonText}
                        </button>
                    </div>
                    <FileTree fileTree={fileTree} repo={repo!} username={username!} />
                </div>
            }


        </Layout>
    );
};

export default Repository;
