export interface NomadListLocation {
  city: string
  country: string
  country_code: string
  latitude: number
  longitude: number
  epoch_start: number
  epoch_end: number
  date_start: string
  date_end: string
  place_photo: string
}

export interface NomadListLocationResponse {
  location: {
    now: NomadListLocation
    previous: NomadListLocation
    next: NomadListLocation
  }
}

function removeUnwantedKeys(location: NomadListLocation) {
  const { place_photo, latitude, longitude, epoch_start, epoch_end, ...rest } =
    location
  return rest
}

export async function getNomadList() {
  if (!process.env.NOMADLIST_PROFILE) {
    throw new Error('Missing NOMADLIST_PROFILE env variable')
  }
  if (!process.env.NOMADLIST_KEY) {
    throw new Error('Missing NOMADLIST_KEY env variable')
  }

  const response = await fetch(
    `https://nomadlist.com/@${process.env.NOMADLIST_PROFILE}.json?key=${process.env.NOMADLIST_KEY}`
  )
  if (!response || !response.ok || response.status !== 200) {
    throw new Error("Couldn't fetch data from NomadList")
  }
  const json = (await response.json()) as NomadListLocationResponse

  // return only parts of the data
  return {
    now: removeUnwantedKeys(json?.location?.now),
    next: removeUnwantedKeys(json?.location?.next)
  }
}
