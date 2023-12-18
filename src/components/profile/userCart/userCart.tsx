import React from 'react'
import { Link } from 'react-router-dom'

interface IUserCartProps {
    avatar: string,
    name: string,
    login: string,
    bio: string,
    followers: number,
    following: number
    location: string,
    blog: string
}
const UserCart: React.FC<IUserCartProps> = ({ avatar, bio, blog, followers, following, location, login, name }) => {
    return (
        <div className='border border-[#ccc] p-5 rounded-lg w-[20rem] shadow-lg'> {/* Removed any fixed height settings */}
            <div>
                <img className='rounded-lg h-auto w-full mb-2' src={avatar} alt={name} /> {/* Responsive image */}
                <Link to={`/profile/${login}`} className='text-xl mt-3'>{name}</Link>
                <p className='mt-1'>@{login}</p>
                <p className='mt-1'>{bio}</p>
            </div>
            <div className="grid grid-cols-2 mt-3 items-center">
                <div className='text-center'>
                    <p >{followers}</p>
                    Followers 👣
                </div>
                <div className='text-center'>
                    <p >{following}</p>
                    Following 👥
                </div>
            </div>
            <div className='mt-2'>
                {location && <p>📍 {location}</p>}
                {blog && <a href={blog}>🌐 {blog}</a>}
            </div>
        </div>
    )
}


export default UserCart