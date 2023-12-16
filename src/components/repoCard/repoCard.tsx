import React from 'react';
import { Link } from 'react-router-dom';

// Define a type or interface for the repo prop
interface Repo {
    name: string;
    owner: {
        login: string;
    };
    stargazers_count: number;
    topics: string[];
    language?: string; // language might be optional
}

interface RepoCardProps {
    repo: Repo;
}

const getLanguageColor = (language: string) => {
    switch (language) {
      case 'C#':
        return 'bg-purple-600';
      case 'JavaScript':
        return 'bg-yellow-400';
      case 'TypeScript':
        return 'bg-blue-800'
      case 'SCSS':
        return 'bg-purple-500'
      default:
        return 'bg-gray-400';
    }
  };
const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
    return (
        <div className='border border-gray-300 p-3 mt-4 focus:outline-none focus:shadow-lg rounded-md'>
            <Link to={`/${repo.owner.login}/${repo.name}`} className='text-xl font-bold'>{repo.name}</Link>
            <p className='text-gray-600 mt-1'>{repo.owner.login}</p>
            <div className='text-lg mt-1'>
                ⭐ {repo.stargazers_count}
            </div>
            <div className='flex flex-wrap gap-2 mt-3'>
                {repo.topics.map((topic, index) => (
                    <span key={index} className='bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded'>
                        {topic}
                    </span>
                ))}
            </div>
            {repo.language && (
                <span className={`inline-block rounded ${repo.topics.length > 0 ? "mt-3" : ""} px-3 py-1 text-sm font-semibold text-white mr-2 ${getLanguageColor(repo.language)}`}>
                    {repo.language}
                </span>
            )}
        </div>
    );
};

export default RepoCard;
