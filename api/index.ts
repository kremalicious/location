import { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosResponse } from 'axios'

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
  if (!process.env.NOMADLIST_PROFILE) return

  try {
    const response: AxiosResponse<NomadListLocationResponse> = await axios(
      `https://nomadlist.com/@${process.env.NOMADLIST_PROFILE}.json?key=${process.env.NOMADLIST_KEY}`
    )
    if (!response?.data) return

    // return only the location part of the data
    res.json(response.data.location)
  } catch (error) {
    res.status(500).send(error)
  }
}
