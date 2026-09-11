import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '819qznh7',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2026-02-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function runSeed() {
  console.log('🚀 Starting Sanity seed import for HappyFlying...')
  const filePath = path.join(__dirname, '../seed-data.ndjson')
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n').filter((line) => line.trim().length > 0)

  const transaction = client.transaction()

  for (const line of lines) {
    try {
      const doc = JSON.parse(line)
      console.log(`Adding document: ${doc._type} (${doc._id || doc.title || doc.name})`)
      transaction.createOrReplace(doc)
    } catch (err) {
      console.error('Failed to parse line:', line, err)
    }
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.log('⚠️  SANITY_API_TOKEN not provided in environment.')
    console.log('You can import the seed data into your Sanity dataset anytime with:')
    console.log('  npx sanity dataset import apps/studio/seed-data.ndjson production --replace')
    return
  }

  console.log('Committing transaction to Sanity Content Lake...')
  const res = await transaction.commit()
  console.log('✅ Seed import completed successfully!', res)
}

runSeed().catch(console.error)
