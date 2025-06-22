export interface LocationBaseLocation {
  _id: string
  city: string
  country: string
  countryCode: string
  coordinates: {
    latitude: number
    longitude: number
  }
  startDate: string
  endDate: string
}

export interface LocationBaseResponse {
  trips: {
    now: LocationBaseLocation
    previous: LocationBaseLocation
    next: LocationBaseLocation
  }
}
