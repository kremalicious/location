import type { LugaraResponse } from './types'

const LUGARA_API_URL = process.env.LUGARA_API_URL

export async function getLugara() {
  if (!LUGARA_API_URL) throw new Error('Missing LUGARA_API_URL env variable')

  const response = await fetch(LUGARA_API_URL)

  if (!response?.ok || response.status !== 200)
    throw new Error("Couldn't fetch data from Lugara")

  const json = (await response.json()) as LugaraResponse
  console.log('Lugara data fetched:', json)

  // return only parts of the data
  return {
    current: json?.trips?.current[0],
    future: json?.trips?.future[0]
  }
}
