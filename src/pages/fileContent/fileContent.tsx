import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Layout from '../../components/header/layout/layout';
import getRepoFileContent from '../../core/api/get/getRepoFileContent';
import ReactMarkdown from 'react-markdown';

import { useUser } from '../../context/User.context';
import UserCart from '../../components/profile/userCart/userCart';
import FileViewer from '../../components/fileViewer/fileViewer';

const FileContent = () => {
    const { user } = useUser();
    const { username, repo } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const path = queryParams.get('path');
    const [content, setContent] = useState('');
    const [fileLanguage, setFileLanguage] = useState<any>('');

    const determineFileLanguage = (filePath: any) => {
        return filePath.split('.').pop();

    };
    const getFileContentHandler = async () => {
        const res: any = await getRepoFileContent(username!, repo!, path!);
        if (res && res.encoding === 'base64') {
            const decodedContent = atob(res.content); // Decode Base64 content
            setContent(decodedContent);
            const language = determineFileLanguage(path);
            setFileLanguage(language);
        }
    };

    useEffect(() => {
        getFileContentHandler();
    }, [username, repo, path]);

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
                <div className='w-[40rem] mt-10'>
                    <FileViewer fileContent={content} language={fileLanguage} />
                </div>

            </div>
        </Layout>
    )
}

export default FileContent;
