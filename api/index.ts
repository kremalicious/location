import type { LugaraLocation } from '../lib/lugara'
// import { getLastCheckin } from '../lib/foursquare'
import { getLugara } from '../lib/lugara'

export const config = {
  runtime: 'edge'
}

interface Location extends LugaraLocation {
  lastCheckin?: string
}

export declare type LocationResponse = {
  now: Location
  next: Location
}

export async function GET() {
  try {
    const lugara = await getLugara()
    // const foursquare = await getLastCheckin()
    const foursquare = 'disabled'

    const response = {
      now: {
        ...lugara.current,
        ...(foursquare && { lastCheckin: foursquare })
      },
      next: { ...lugara.future }
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
