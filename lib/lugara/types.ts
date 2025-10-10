export interface LugaraLocation {
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

export interface LugaraResponse {
  trips: {
    current: LugaraLocation[]
    past: LugaraLocation[]
    future: LugaraLocation[]
  }
}
