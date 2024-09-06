import { createServer } from '../src/server'
import Hapi from '@hapi/hapi'

describe('l4Markets endpoints', () => {
  let server: Hapi.Server

  beforeAll(async () => {
    server = await createServer()
  })

  afterAll(async() => {
    await server.stop()
  })

  test('get l4Markets returns l4Markets', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/l4Markets/1',
    })
    expect(response.statusCode).toEqual(200)
    const l4Markets = JSON.parse(response.payload)

    expect(Array.isArray(l4Markets)).toBeTruthy()
    expect(l4Markets[0]?.id).toBeTruthy()
  })

  test('get l4Markets fails with invalid id', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/l4Markets/dog',
    })
    expect(response.statusCode).toEqual(400)
  })
})