import React from 'react'

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
const UserCart:React.FC<IUserCartProps> = ({ avatar,bio,blog,followers,following,location,login,name}) => {
    return (
        <div className='border border-[#ccc] p-5 rounded w-[20rem]'>
            <div>
                <img className='rounded' src={avatar} />
                <h2 className='text-xl mt-2'>{name}</h2>
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
                <p>📍 {location}</p>
                <p>🌐{blog}</p>
            </div>
        </div>
    )
}

export default UserCart