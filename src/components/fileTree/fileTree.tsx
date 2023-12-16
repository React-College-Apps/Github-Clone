import React from 'react';
import { Link } from 'react-router-dom';

interface FileTreeProps {
    fileTree: Array<{
        path: string;
        type: string;
    }>;
    repo: string;
    username: string
}

const FileTree: React.FC<FileTreeProps> = ({ fileTree, repo, username }) => {
    return (
        <div className='grid grid-cols-1 mt-3 gap-4'>
            {fileTree.map((item, index) => (
                <Link
                    className='cursor-pointer'
                    to={`/${username}/${repo}/content?path=${item.path}&type=${item.type}`}
                    key={index}
                >
                    {item.type === "blob" ? `📄 ${item.path}` : `📁 ${item.path}`}
                </Link>
            ))}

        </div>
    );
};

export default FileTree;
