import React from 'react'

import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: "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",
});

const getUserRepo = async (username: string, repo: string) => {
  try {
    const response = await octokit.request('GET /users/{username}/{repo}', {
      username: username,
      repo: repo
    });
    return response.data
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    return error
  }
}

export default getUserRepo