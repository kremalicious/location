export interface NomadListLocation {
  city: string
  country: string
  // biome-ignore lint/style/useNamingConvention: API response
  country_code: string
  latitude: number
  longitude: number
  // biome-ignore lint/style/useNamingConvention: API response
  epoch_start: number
  // biome-ignore lint/style/useNamingConvention: API response
  epoch_end: number
  // biome-ignore lint/style/useNamingConvention: API response
  date_start: string
  // biome-ignore lint/style/useNamingConvention: API response
  date_end: string
  // biome-ignore lint/style/useNamingConvention: API response
  place_photo: string
}

export interface NomadListLocationResponse {
  location: {
    now: NomadListLocation
    previous: NomadListLocation
    next: NomadListLocation
  }
}
