import type { LocationBaseResponse } from './types'

const LOCATIONBASE_API_URL = process.env.LOCATIONBASE_API_URL

export async function getLocationBase() {
  if (!LOCATIONBASE_API_URL)
    throw new Error('Missing LOCATIONBASE_API_URL env variable')

  const response = await fetch(LOCATIONBASE_API_URL)

  if (!response?.ok || response.status !== 200)
    throw new Error("Couldn't fetch data from LocationBase")

  const json = (await response.json()) as LocationBaseResponse
  console.log('LocationBase data fetched:', json)

  // return only parts of the data
  return {
    current: json?.trips?.current[0],
    future: json?.trips?.future[0]
  }
}
