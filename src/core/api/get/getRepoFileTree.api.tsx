import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: "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", // Replace with your actual GitHub token
});

const getRepoFileTree = async (username: string, repo: string) => {
    try {
        const branch = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
            owner: username,
            repo: repo,
            branch: 'master' // or 'main', depending on the repository
        });

        // Fetch the file tree using the SHA of the default branch
        const tree = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
            owner: username,
            repo: repo,
            tree_sha: branch.data.commit.sha
        });

        return tree.data;
    } catch (error) {
        console.error("Error fetching repository file tree:", error);
        return null;
    }
};

export default getRepoFileTree;
