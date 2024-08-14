import { createServer } from '../src/server'
import Hapi from '@hapi/hapi'

describe('regions endpoints', () => {
  let server: Hapi.Server

  beforeAll(async () => {
    server = await createServer()
  })

  afterAll(async() => {
    await server.stop()
  })

  test('get regions returns regions', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/regions',
    })
    expect(response.statusCode).toEqual(200)
    const regions = JSON.parse(response.payload)

    expect(Array.isArray(regions)).toBeTruthy()
    expect(regions[0]?.id).toBeTruthy()
  })
})