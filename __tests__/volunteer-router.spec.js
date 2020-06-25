/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')

describe('volunteer-router', () => {
  beforeEach(async () => { await db('volunteer').truncate() })
  const newVolunteer = { username: 'volunteer001', name: 'volunteer001', password: 'password', email: 'volunteer001@mail.com', role: 'volunteer', location: 'Bermuda Triangle' }
  const newVolunteerCreds = { username: 'volunteer001', password: 'password', role: 'volunteer' }

  it('return status 200 on get all', async () => {
    await request(server).post('/api/auth/register').send(newVolunteer)
    const loginRes = await request(server).post('/api/auth/login').send(newVolunteerCreds)
    const res = await request(server).get('/api/volunteer/all').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })
  it('return status 200 on get by id', async () => {
    await request(server).post('/api/auth/register').send(newVolunteer)
    const loginRes = await request(server).post('/api/auth/login').send(newVolunteerCreds)
    const res = await request(server).get('/api/volunteer/1').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })
})
