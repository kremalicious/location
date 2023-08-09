//
// Get last checkin from foursquare
//
const url = `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${process.env.FOURSQUARE_KEY}&v=20221201&limit=1`

export async function getLastCheckin() {
  try {
    const response = await fetch(url)
    const json = await response.json()
    if (!json || json?.meta?.code !== 200)
      throw new Error(json?.meta?.errorDetail)

    const checkin = json?.response?.checkins?.items?.[0]

    return checkin
      ? {
          // convert date from UNIX timestamp to JS Date
          date: new Date(checkin.createdAt * 1000),
          venue: {
            name: checkin.venue.name,
            location: checkin.venue.location
          }
        }
      : null
  } catch (error: any) {
    console.error('Error fetching data:', error.message)
  }
}
