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

  it('returns status 200 on get tasks by id', async () => {
    await request(server).post('/api/auth/register').send(newVolunteer)
    const loginRes = await request(server).post('/api/auth/login').send(newVolunteerCreds)
    const res = await request(server).get('/api/volunteer/1/tasks').set('authorization', loginRes.body.token)
    expect(res.status).toBe(201)
  })

  it('returns status 201 on put time', async () => {
    await request(server).post('/api/auth/register').send(newVolunteer)
    const loginRes = await request(server).post('/api/auth/login').send(newVolunteerCreds)
    const res = await request(server).put('/api/volunteer/1/time').set('authorization', loginRes.body.token).send({ day: 'monday', start: '12am', end: '1am' })
    console.log(res.status)
    expect(res.status).toBe(201)
  })

  it('deletes volunteer task successfully', async () => {
    await request(server).post('/api/auth/register').send(newVolunteer)
    const loginRes = await request(server).post('/api/auth/login').send(newVolunteerCreds)
    const res = await request(server).delete('/api/volunteer/1/tasks').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })
})
