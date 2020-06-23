const request = require('supertest')
const server = require('../api/server')

describe('true', () => {
  it('should return true', () => {
    expect(true).toBe(true)
  })
})
