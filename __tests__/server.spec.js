/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server')

describe('true', () => {
  it('should return true', () => {
    expect(true).toBe(true)
  })
})

describe('server', () => {
  it('should respond with code 200', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
  })
  it('should respond with {api: server running}', async () => {
    const res = await request(server).get('/')
    expect(res.body).toEqual({ api: 'server running' })
  })
})
