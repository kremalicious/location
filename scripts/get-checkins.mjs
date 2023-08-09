#!/usr/bin/env node

//
// Get all checkins from Foursquare API and save to checkins.json.
// Paginated requests are made until no more checkins are returned.
//
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import dotenv from 'dotenv'
dotenv.config()

const LIMIT = 250
const checkins = []

const start = async (offset = 0) => {
  console.log('Requesting checkins at offset: ' + offset)
  const url = `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${process.env.FOURSQUARE_KEY}&limit=${LIMIT}&offset=${offset}&v=20221201&m=swarm`

  try {
    const response = await fetch(url)
    const json = await response.json()
    if (!json || json?.meta?.code !== 200)
      throw new Error(json?.meta?.errorDetail)

    const { items } = json.response.checkins

    if (!items || !items.length) {
      console.log('No more items.')
      const FILE = resolve(__dirname, '../checkins.json')
      console.log('DONE: writing file ' + FILE)
      writeFileSync(FILE, JSON.stringify(checkins, null, '\t'))
      return
    }

    const firstCreatedAt = items[0].createdAt
    const date = new Date(firstCreatedAt * 1000)
    console.log(`Batch #${offset}: ${date.toDateString()}`)

    items.forEach((item, i) => {
      try {
        checkins.push(item)
      } catch (e) {
        console.error(item)
      }
    })

    start(offset + LIMIT)
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

start()
