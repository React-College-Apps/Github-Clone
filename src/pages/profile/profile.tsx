import React from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../../components/header/layout/layout'

const Profile = () => {
    const location = useLocation()
    console.log(location.state)
    return (
        <Layout>
            <h1>UserProfile</h1>
        </Layout>
    )
}

export default Profile