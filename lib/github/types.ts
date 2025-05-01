export interface GitHubUserUpdateParams {
  name?: string
  email?: string
  blog?: string
  // biome-ignore lint/style/useNamingConvention: API response
  twitter_username?: string
  company?: string
  location?: string
  bio?: string
  hireable?: boolean
}

export interface GitHubUser {
  login: string
  id: number
  name: string | null
  email: string | null
  location: string | null
  bio: string | null
  // biome-ignore lint/style/useNamingConvention: API response
  twitter_username: string | null
  company: string | null
  blog: string | null
  hireable: boolean | null
  // biome-ignore lint/style/useNamingConvention: API response
  created_at: string
  // biome-ignore lint/style/useNamingConvention: API response
  updated_at: string
}

export interface GitHubApiError {
  message: string
  // biome-ignore lint/style/useNamingConvention: API response
  documentation_url?: string
}
