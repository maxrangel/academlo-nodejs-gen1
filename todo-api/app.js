const express = require('express');

// Routers
const { todosRouter } = require('./routes/todos.router')

// Init app
const app = express()

app.use(express.urlencoded())
app.use(express.json())

// Endpoints
app.use('/api/v1/todos', todosRouter)

app.listen(4000, () => {
  console.log('To Do API running!');
})