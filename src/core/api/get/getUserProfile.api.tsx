import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: "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", // Replace with your actual GitHub token
});

const getUserProfileApi = async (username: string) => {
    try {
        // Fetch user profile
        const userProfileResponse = await octokit.request('GET /users/{username}', {
            username: username
        });

        // Fetch user repositories
        const userReposResponse = await octokit.request('GET /users/{username}/repos', {
            username: username
        });

        return {
            userProfile: userProfileResponse.data,
            userRepos: userReposResponse.data
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return error;
    }
};

export default getUserProfileApi;
