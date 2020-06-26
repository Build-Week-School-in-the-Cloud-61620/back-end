/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')

describe('testing env', () => {
  it('should set the esting env', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('admin router', () => {
  beforeEach(async () => { await db('admin').truncate() })
  const admin = { username: 'admin', name: 'admin', password: 'password', role: 'admin', email: 'admin@email.com' }
  const adminCreds = { username: 'admin', password: 'password', role: 'admin' }

  it('sould return 200 on successful GET', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })

  it('should return 200 on successful getby id', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/1').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })

  it('should GET all students with status 200', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/students/all').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })

  it('should GET all volunteers with status 200', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/volunteer/all').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })

  it('should GET volunteer by id with status 201', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/volunteer/1').set('authorization', loginRes.body.token)
    expect(res.status).toBe(201)
  })

  it('should GET tasks by admin id with status 201', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/1/tasks').set('authorization', loginRes.body.token)
    expect(res.status).toBe(201)
  })

  it('should POST task by admin and volunteer id', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).post('/api/admin/1/tasks/1').set('authorization', loginRes.body.token).send({ description: 'new task for testing', completed: false })
    expect(res.status).toBe(200)
  })

  it('should PUT to edit a task and respond with 200', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).put('/api/admin/1/tasks').set('authorization', loginRes.body.token).send({ completed: true })
    expect(res.status).toBe(200)
  })

  it('should DELTE task successfully and respond with 200', async () => {
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).delete('/api/admin/1/tasks').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })
})
