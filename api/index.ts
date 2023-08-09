import { getLastCheckin } from '../lib/foursquare'
import { NomadListLocation, getNomadList } from '../lib/nomadlist'

export const config = {
  runtime: 'experimental-edge'
}

interface Location extends NomadListLocation {
  lastCheckin?: string
}

declare type LocationResponse = {
  now: Location
  next: Location
}

export default async function handler() {
  try {
    const nomadlist = await getNomadList()
    const foursquare = await getLastCheckin()

    const response = {
      now: { ...nomadlist.now, ...(foursquare && { lastCheckin: foursquare }) },
      next: { ...nomadlist.next }
    } as LocationResponse

    return new Response(JSON.stringify(response, null, 2), {
      headers: { 'content-type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify(error, null, 2), { status: 500 })
  }
}
