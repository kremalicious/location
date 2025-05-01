export interface Checkin {
  id: string
  createdAt: number
  type: string
  timeZoneOffset: number
  displayGeo: {
    id: string
    name: string
  }
  exactContextLine: string
  venue: {
    id: string
    name: string
    location: {
      address: string
      crossStreet?: string
      lat: number
      lng: number
      labeledLatLngs: Array<{
        label: string
        lat: number
        lng: number
      }>
      postalCode: string
      cc: string
      city: string
      state: string
      country: string
      formattedAddress: string[]
    }
    categories: Array<{
      id: string
      name: string
      pluralName: string
      shortName: string
      icon: {
        prefix: string
        suffix: string
      }
      primary: boolean
    }>
    createdAt: number
  }
  likes: {
    count: number
  }
  like: boolean
  isMayor: boolean
  photos: {
    count: number
  }
  posts: {
    count: number
    textCount: number
  }
  comments: {
    count: number
  }
  source: {
    name: string
    url: string
  }
}

export interface FoursquareApiResponse {
  meta: {
    code: number
    requestId?: string
    errorType?: string
    errorDetail?: string
  }
  response: {
    checkins: {
      count: number
      items: Checkin[]
    }
  }
}

export interface FoursquareErrorResponse {
  meta: {
    code: number
    errorType: string
    errorDetail: string
  }
}
