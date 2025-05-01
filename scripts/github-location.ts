#!/usr/bin/env node

//
// Update GitHub profile location
// Fetches the current location from an API and updates the GitHub profile
// location if it has changed.
//
import type { LocationResponse } from '@/api'
import { getAuthenticatedUser, updateLocation } from '@/lib/github'
import { config } from 'dotenv'

config()

// Configuration
const API_ENDPOINT = 'https://location.kretschmann.io'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

/**
 * Format location data into a string suitable for GitHub profile
 */
function formatLocation(locationData: { city?: string; country?: string }) {
  if (!locationData.city || !locationData.country) return null
  return `${locationData.city}, ${locationData.country}`
}

/**
 * Main function to update GitHub location
 */
async function updateGitHubLocation() {
  if (!GITHUB_TOKEN) {
    console.error('Error: GITHUB_TOKEN environment variable is not set')
    process.exit(1)
  }

  try {
    console.log('Fetching current location from API...')
    const response = await fetch(API_ENDPOINT)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const locationData = (await response.json()) as LocationResponse
    const currentLocation = formatLocation(locationData.now)

    if (!currentLocation) {
      console.log('No valid location data found')
      return
    }

    console.log(`Current location: ${currentLocation}`)

    // Get current GitHub profile
    console.log('Fetching current GitHub profile...')
    const githubProfile = await getAuthenticatedUser(GITHUB_TOKEN)
    console.log(
      `Current GitHub location: ${githubProfile.location || 'Not set'}`
    )

    // Only update if the location has changed
    if (githubProfile.location !== currentLocation) {
      console.log('Location has changed, updating GitHub profile...')
      const updatedProfile = await updateLocation(GITHUB_TOKEN, currentLocation)
      console.log(`GitHub location updated to: ${updatedProfile.location}`)
    } else {
      console.log('GitHub location is already up to date')
    }
  } catch (error) {
    console.error('Error updating GitHub location:', error)
    process.exit(1)
  }
}

// Execute
updateGitHubLocation()
