#!/usr/bin/env node

//
// Get all checkins from Foursquare API and save to checkins.json.
// Paginated requests are made until no more checkins are returned.
//
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Checkin, FoursquareApiResponse } from '@/lib/foursquare'
import { config } from 'dotenv'

config()

const LIMIT = 250
const FOURSQUARE_KEY = process.env.FOURSQUARE_KEY
const checkins: Checkin[] = []

const start = async (offset = 0) => {
  console.log(`Requesting checkins at offset: ${offset}`)
  const url = `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${FOURSQUARE_KEY}&limit=${LIMIT}&offset=${offset}&v=20221201&m=swarm`

  try {
    const response = await fetch(url)
    const json = (await response.json()) as FoursquareApiResponse

    if (!json || json?.meta?.code !== 200)
      throw new Error(json?.meta?.errorDetail)

    const { items } = json.response.checkins

    if (!items || !items.length) {
      console.log('No more items.')
      const file = resolve(__dirname, '../checkins.json')
      console.log(`DONE: writing file ${file}`)
      writeFileSync(file, JSON.stringify(checkins, null, '\t'))
      return
    }

    const firstCreatedAt = items[0].createdAt
    const date = new Date(firstCreatedAt * 1000)
    console.log(`Batch #${offset}: ${date.toDateString()}`)

    for (const item of items as Checkin[]) {
      try {
        checkins.push(item)
      } catch (_e) {
        console.error(item)
      }
    }

    start(offset + LIMIT)
  } catch (error: unknown) {
    console.error('Error fetching data:', (error as Error).message)
  }
}

start()
