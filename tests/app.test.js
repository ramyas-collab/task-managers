const request = require('supertest')
const app = require('../src/app')

describe('Task Manager API', () => {

  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      const res = await request(app).get('/tasks')
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('tasks')
      expect(Array.isArray(res.body.tasks)).toBe(true)
    })
  })

  describe('GET /tasks/:id', () => {
    it('should return a single task', async () => {
      const res = await request(app).get('/tasks/1')
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('id', 1)
    })

    it('should return 404 for unknown task', async () => {
      const res = await request(app).get('/tasks/999')
      expect(res.statusCode).toBe(404)
    })
  })

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({ title: 'New test task' })
      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('title', 'New test task')
      expect(res.body).toHaveProperty('done', false)
    })

    it('should return 400 if title is missing', async () => {
      const res = await request(app).post('/tasks').send({})
      expect(res.statusCode).toBe(400)
    })
  })

  describe('PATCH /tasks/:id', () => {
    it('should update a task', async () => {
      const res = await request(app)
        .patch('/tasks/1')
        .send({ done: true })
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('done', true)
    })
  })

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      const res = await request(app).delete('/tasks/2')
      expect(res.statusCode).toBe(200)
    })

    it('should return 404 for already deleted task', async () => {
      const res = await request(app).get('/tasks/999')
      expect(res.statusCode).toBe(404)
    })
  })

})