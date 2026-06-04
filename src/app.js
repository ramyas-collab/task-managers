const express = require('express')
const app = express()

app.use(express.json())

// In-memory task store
let tasks = [
  { id: 1, title: 'Learn GitHub Actions', done: false },
  { id: 2, title: 'Build CI/CD pipeline', done: false }
]

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks, total: tasks.length })
})

// GET single task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id))
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
})

// POST create task
app.post('/tasks', (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ error: 'Title is required' })

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false
  }
  tasks.push(newTask)
  res.status(201).json(newTask)
})

// PATCH update task
app.patch('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id))
  if (!task) return res.status(404).json({ error: 'Task not found' })

  if (req.body.title !== undefined) task.title = req.body.title
  if (req.body.done !== undefined) task.done = req.body.done

  res.json(task)
})

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Task not found' })

  tasks.splice(index, 1)
  res.json({ message: 'Task deleted' })
})

module.exports = app

if (require.main === module) {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}