import type { NomadListLocation, NomadListLocationResponse } from './types'

const NOMADLIST_PROFILE = process.env.NOMADLIST_PROFILE
const NOMADLIST_KEY = process.env.NOMADLIST_KEY

function removeUnwantedKeys(location: NomadListLocation) {
  const { place_photo, latitude, longitude, epoch_start, epoch_end, ...rest } =
    location
  return rest
}

export async function getNomadList() {
  if (!NOMADLIST_PROFILE)
    throw new Error('Missing NOMADLIST_PROFILE env variable')
  if (!NOMADLIST_KEY) throw new Error('Missing NOMADLIST_KEY env variable')

  const url = `https://nomadlist.com/@${NOMADLIST_PROFILE}.json?key=${NOMADLIST_KEY}`
  const response = await fetch(url)

  if (!response?.ok || response.status !== 200)
    throw new Error("Couldn't fetch data from NomadList")

  const json = (await response.json()) as NomadListLocationResponse

  // return only parts of the data
  return {
    now: removeUnwantedKeys(json?.location?.now),
    next: removeUnwantedKeys(json?.location?.next)
  }
}
