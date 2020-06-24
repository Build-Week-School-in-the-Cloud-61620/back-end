/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server')

describe('true', () => {
  it('should return true', () => {
    expect(true).toBe(true)
  })
})
describe('admin router', () => {
  describe('testing env', () => {
    it('should set the esting env', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })
  })
  describe('register', () => {
    it('should return 201 on correct admin register', async () => {
      const admin = { username: 'admin1', name: 'admin1', role: 'admin', password: 'password', email: 'admin1@email.com' }
      const res = await request(server).post('/api/auth/register').send(admin)
      expect(res.status).toBe(201)
    })
  })
})
