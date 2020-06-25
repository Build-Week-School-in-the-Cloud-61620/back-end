/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')

describe('student-router', () => {
  beforeEach(async () => { await db('student').truncate() })
  const newStudent = { username: 'student001', name: 'student001', password: 'password', email: 'student001@mail.com', role: 'student' }
  const newStudentCreds = { username: 'student001', password: 'password', role: 'student' }

  it('should return 200 on get by id', async () => {
    await request(server).post('/api/auth/register').send(newStudent)
    const loginRes = await request(server).post('/api/auth/login').send(newStudentCreds)
    const res = await request(server).get('/api/students/1').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })

  it('should return 200 on get all', async () => {
    await request(server).post('/api/auth/register').send(newStudent)
    const loginRes = await request(server).post('/api/auth/login').send(newStudentCreds)
    const res = await request(server).get('/api/students/all').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })

  it('should return 200 on get by id with volunteer', async () => {
    await request(server).post('/api/auth/register').send(newStudent)
    const loginRes = await request(server).post('/api/auth/login').send(newStudentCreds)
    const res = await request(server).get('/api/students/1/volunteer').set('authorization', loginRes.body.token)
    expect(res.status).toBe(200)
  })
  
})
