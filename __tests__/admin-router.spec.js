/* eslint-disable no-undef */
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')

describe('admin router', () => {
  describe('testing env', () => {
    it('should set the esting env', () => {
      expect(process.env.NODE_ENV).toBe('testing')
    })
  })
})
