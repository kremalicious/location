import type {
  GitHubApiError,
  GitHubUser,
  GitHubUserUpdateParams
} from './types'

const baseUrl = 'https://api.github.com'

/**
 * Update the authenticated user's location on GitHub
 * @param token - GitHub personal access token
 * @param location - The new location string
 * @returns The updated user profile
 */
export async function updateLocation(
  token: string,
  location: string
): Promise<GitHubUser> {
  return updateUserProfile(token, { location })
}

/**
 * Update the authenticated user's profile on GitHub
 * @param token - GitHub personal access token
 * @param params - Parameters to update in the user profile
 * @returns The updated user profile
 */
export async function updateUserProfile(
  token: string,
  params: GitHubUserUpdateParams
): Promise<GitHubUser> {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'PATCH',
      headers: {
        // biome-ignore lint/style/useNamingConvention: Fetch API
        Accept: 'application/vnd.github+json',
        // biome-ignore lint/style/useNamingConvention: Fetch API
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      const errorData = (await response.json()) as GitHubApiError
      throw new Error(`GitHub API error: ${errorData.message}`)
    }

    return (await response.json()) as GitHubUser
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`Failed to update GitHub profile: ${String(error)}`)
  }
}

/**
 * Get the authenticated user's profile from GitHub
 * @param token - GitHub personal access token
 * @returns The user profile
 */
export async function getAuthenticatedUser(token: string): Promise<GitHubUser> {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: {
        // biome-ignore lint/style/useNamingConvention: Fetch API
        Accept: 'application/vnd.github+json',
        // biome-ignore lint/style/useNamingConvention: Fetch API
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    if (!response.ok) {
      const errorData = (await response.json()) as GitHubApiError
      throw new Error(`GitHub API error: ${errorData.message}`)
    }

    return (await response.json()) as GitHubUser
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`Failed to get GitHub profile: ${String(error)}`)
  }
}
