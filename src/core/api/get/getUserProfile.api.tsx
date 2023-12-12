import React from 'react'

import { Octokit } from 'octokit'

const octokit = new Octokit({
    auth: "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",
});

const getUserProfileAPi = async (username: string) => {
    try {
        const response = await octokit.request('GET /users/{username}/repos', {
            username: username
        });
        return response.data
    } catch (error) {
        console.error("Error fetching user repositories:", error);
        return error
    }
}

export default getUserProfileAPi