// import { getLastCheckin } from '../lib/foursquare'
import { type NomadListLocation, getNomadList } from '../lib/nomadlist'

export const config = {
  runtime: 'edge'
}

interface Location extends NomadListLocation {
  lastCheckin?: string
}

export declare type LocationResponse = {
  now: Location
  next: Location
}

export async function GET() {
  try {
    const nomadlist = await getNomadList()
    // const foursquare = await getLastCheckin()
    const foursquare = 'disabled'

    const response = {
      now: { ...nomadlist.now, ...(foursquare && { lastCheckin: foursquare }) },
      next: { ...nomadlist.next }
    } as LocationResponse

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify(error, null, 2), { status: 500 })
  }
}
