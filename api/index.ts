import { VercelRequest, VercelResponse } from '@vercel/node'

interface NomadListLocation {
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

interface NomadListLocationResponse {
  location: {
    now: NomadListLocation
    previous: NomadListLocation
    next: NomadListLocation
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
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

    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    // return only the location part of the data
    res.status(200).json(json.location)
  } catch (error) {
    res.status(500).send(error)
  }
}
