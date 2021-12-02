import { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosResponse, Method } from 'axios'

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!process.env.NOMADLIST_PROFILE) return

  try {
    const response = await axios(
      `https://nomadlist.com/@${process.env.NOMADLIST_PROFILE}.json?key=${process.env.NOMADLIST_KEY}`
    )
    if (!response?.data) return

    // return only the location part of the data
    res.json(response.data.location)
  } catch (error) {
    res.status(500).send(error)
  }
}
