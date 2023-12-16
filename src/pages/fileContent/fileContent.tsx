import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Layout from '../../components/header/layout/layout';
import getRepoFileContent from '../../core/api/get/getRepoFileContent';
import ReactMarkdown from 'react-markdown';

import { useUser } from '../../context/User.context';
import UserCart from '../../components/profile/userCart/userCart';
import FileViewer from '../../components/fileViewer/fileViewer';
import getRepoFileTree from '../../core/api/get/getRepoFileTree.api';
import FileTree from '../../components/fileTree/fileTree';

const FileContent = () => {
    const { user } = useUser();
    const { username, repo } = useParams();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const path = queryParams.get('path');
    const type = queryParams.get('type');

    const [content, setContent] = useState('');
    const [fileLanguage, setFileLanguage] = useState('');
    const [fileTree, setFileTree] = useState<any>([])

    const determineFileLanguage = (filePath: any) => {
        return filePath.split('.').pop();
    };

    const getContentHandler = async () => {
        if (type === 'blob' || type === "file") {
            const res: any = await getRepoFileContent(username!, repo!, path!);
            console.log(res)
            if (res && res.encoding === 'base64') {
                const decodedContent = atob(res.content);
                setContent(decodedContent);
                const language = determineFileLanguage(path);
                setFileLanguage(language);
            }
        } else if (type === 'tree' || type === "dir") {
            const folderContent = await getRepoFileTree(username!, repo!, path!);
            console.log(folderContent)
            setFileTree(folderContent)
        }
    };

    useEffect(() => {
        getContentHandler();
    }, [username, repo, path, type]);

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
                <h2 className='text-xl font-semibold'>📚 Repository</h2>
                <div className='w-[40rem] mt-10'>
                    {type === "blob" || type === "file"  ? <>
                        <FileViewer fileContent={content} language={fileLanguage} />
                    </> : <>
                        <FileTree fileTree={fileTree} repo={repo!} username={username!} />
                    </>

                    }
                </div>

            </div>
        </Layout>
    )
}

export default FileContent;
