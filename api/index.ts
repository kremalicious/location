// import { getLastCheckin } from '../lib/foursquare'
import { type LocationBaseLocation, getLocationBase } from '../lib/locationbase'

export const config = {
  runtime: 'edge'
}

interface Location extends LocationBaseLocation {
  lastCheckin?: string
}

export declare type LocationResponse = {
  now: Location
  next: Location
}

export async function GET() {
  try {
    const locationbase = await getLocationBase()
    // const foursquare = await getLastCheckin()
    const foursquare = 'disabled'

    const response = {
      now: {
        ...locationbase.now,
        ...(foursquare && { lastCheckin: foursquare })
      },
      next: { ...locationbase.next }
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
