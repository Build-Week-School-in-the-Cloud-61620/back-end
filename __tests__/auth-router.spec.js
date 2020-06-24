/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')

describe('auth-router', () => {
  describe('register', () => {
    beforeEach(async () => { await db('admin').truncate() })
    beforeEach(async () => { await db('student').truncate() })
    beforeEach(async () => { await db('volunteer').truncate() })
    it('should return 201 on correct admin register', async () => {
      const admin = { username: 'admin1', name: 'admin1', role: 'admin', password: 'password', email: 'admin1@email.com' }
      const res = await request(server).post('/api/auth/register').send(admin)
      expect(res.status).toBe(201)
    })
    it('should return admin object when successful', async () => {
      const admin = { username: 'admin1', name: 'admin1', role: 'admin', password: 'password', email: 'admin1@email.com' }
      const resAdmin = await request(server).post('/api/auth/register').send(admin)
      expect(resAdmin.body.data).toHaveProperty('username', 'name', 'role', 'email')
    })
    it('should return student object when successful', async () => {
      const student = { username: 'student1', name: 'student1', email: 'studenemail@email.com', role: 'student', password: 'password' }
      const resStudent = await request(server).post('/api/auth/register').send(student)
      expect(resStudent.body.data).toHaveProperty('username', 'name', 'role', 'email')
    })
    it('should return volunteer object when successful', async () => {
      const volunteer = { username: 'volunteer1', name: 'volunteer1', email: 'volunteer@email.com', role: 'volunteer', password: 'password', location: 'here' }
      const resVolunteer = await request(server).post('/api/auth/register').send(volunteer)
      expect(resVolunteer.body.data).toHaveProperty('username', 'name', 'role', 'email', 'location')
    })
  })
  describe('login', () => {
    beforeEach(async () => { await db('admin').truncate() })
    beforeEach(async () => { await db('student').truncate() })
    beforeEach(async () => { await db('volunteer').truncate() })
    it('should return 200 on admin login success', async () => {
      const user = { username: 'admin1', name: 'admin1', role: 'admin', password: 'password', email: 'admin1@email.com' }
      const userLogin = { username: 'admin1', password: 'password', role: 'admin' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.status).toBe(200)
    })
    it('should return token on successful admin login', async () => {
      const user = { username: 'admin1', name: 'admin1', role: 'admin', password: 'password', email: 'admin1@email.com' }
      const userLogin = { username: 'admin1', password: 'password', role: 'admin' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.body).toHaveProperty('token')
    })
    it('should return user object on successful admin login', async () => {
      const user = { username: 'admin1', name: 'admin1', role: 'admin', password: 'password', email: 'admin1@email.com' }
      const userLogin = { username: 'admin1', password: 'password', role: 'admin' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.body).toHaveProperty('user')
    })
    it('should return 200 on student login success', async () => {
      const user = { username: 'student', name: 'student', role: 'student', password: 'password', email: 'student@email.com' }
      const userLogin = { username: 'student', password: 'password', role: 'student' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.status).toBe(200)
    })
    it('should return token on successful student login', async () => {
      const user = { username: 'student', name: 'student', role: 'student', password: 'password', email: 'student@email.com' }
      const userLogin = { username: 'student', password: 'password', role: 'student' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.body).toHaveProperty('token')
    })
    it('should return user object on successful student login', async () => {
      const user = { username: 'student', name: 'student', role: 'student', password: 'password', email: 'student@email.com' }
      const userLogin = { username: 'student', password: 'password', role: 'student' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.body).toHaveProperty('user')
    })
    it('should return 200 on volunteer login success', async () => {
      const user = { username: 'volunteer', name: 'volunteer', role: 'volunteer', password: 'password', email: 'volunteer@email.com', location: 'here' }
      const userLogin = { username: 'volunteer', password: 'password', role: 'volunteer' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.status).toBe(200)
    })
    it('should return token on successful volunteer login', async () => {
      const user = { username: 'volunteer', name: 'volunteer', role: 'volunteer', password: 'password', email: 'volunteer@email.com', location: 'here' }
      const userLogin = { username: 'volunteer', password: 'password', role: 'volunteer' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.body).toHaveProperty('token')
    })
    it('should return user object on successful volunteer login', async () => {
      const user = { username: 'volunteer', name: 'volunteer', role: 'volunteer', password: 'password', email: 'volunteer@email.com', location: 'here' }
      const userLogin = { username: 'volunteer', password: 'password', role: 'volunteer' }
      await request(server).post('/api/auth/register').send(user)
      const res = await request(server).post('/api/auth/login').send(userLogin)
      expect(res.body).toHaveProperty('user')
    })
  })
})
