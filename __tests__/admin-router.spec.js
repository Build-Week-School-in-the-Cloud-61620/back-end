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

  it('sould return 200 on successful get', async () => {
    const admin = { username: 'admin', name: 'admin', password: 'password', role: 'admin', email: 'admin@email.com' }
    const adminCreds = { username: 'admin', password: 'password', role: 'admin' }
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })

  it('should return 200 on successful getby id', async () => {
    const admin = { username: 'admin', name: 'admin', password: 'password', role: 'admin', email: 'admin@email.com' }
    const adminCreds = { username: 'admin', password: 'password', role: 'admin' }
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/1').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })

  it('should get all students with status 200', async () => {
    const admin = { username: 'admin', name: 'admin', password: 'password', role: 'admin', email: 'admin@email.com' }
    const adminCreds = { username: 'admin', password: 'password', role: 'admin' }
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/students/all').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })
  it('should get all volunteers with status 200', async () => {
    const admin = { username: 'admin', name: 'admin', password: 'password', role: 'admin', email: 'admin@email.com' }
    const adminCreds = { username: 'admin', password: 'password', role: 'admin' }
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/volunteer/all').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })
  it('should get volunteer by id with status 201', async () => {
    const admin = { username: 'admin', name: 'admin', password: 'password', role: 'admin', email: 'admin@email.com' }
    const adminCreds = { username: 'admin', password: 'password', role: 'admin' }
    await request(server).post('/api/auth/register').send(admin)
    const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
    const res = await request(server).get('/api/admin/volunteer/1').set('authorization', loginRes.body.token)
    expect(res.status).toBe(201)
  })
//   it('should get tasks by admin id with status 200', async () => {
//     const admin = { username: 'admin', name: 'admin', password: 'password', role: 'admin', email: 'admin@email.com' }
//     const adminCreds = { username: 'admin', password: 'password', role: 'admin' }
//     await request(server).post('/api/auth/register').send(admin)
//     const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
//     const res = await request(server).get('/api/admin/1/tasks').set('authorization', loginRes.body.token)
//     expect(res.status).toBe(200)
//   })
//   it('should return 201 on successful tasks get', async () => {
//     const admin = { username: 'admin', name: 'admin', password: 'password', role: 'admin', email: 'admin@email.com' }
//     const adminCreds = { username: 'admin', password: 'password', role: 'admin' }
//     await request(server).post('/api/auth/register').send(admin)
//     const loginRes = await request(server).post('/api/auth/login').send(adminCreds)
//     console.log(loginRes.body)
//     const res = await request(server).get('/api/admin/1/tasks').set('authorization', 'Bearer ' + loginRes.body.token)
//     console.log(res.body)
//     expect(res.status).toBe(201)
//   })
})
