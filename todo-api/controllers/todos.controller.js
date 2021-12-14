// Dummy data - TEST ONLY
const todos = [
  { id: 1, content: 'Learn NodeJS' }, { id: 2, content: 'Learn React' }, { id: 3, content: 'Learn MySQL' }
];

exports.getAllTodos = (req, res, next) => {
  res.status(200).json({ status: 'success', data: { todos } })
}

exports.createTodo = (req, res, next) => {
  // Get todo content from req.body
  const { content } = req.body

  const latestId = todos[todos.length - 1].id

  // Create new todo with id and content
  const newTodo = {
    id: latestId + 1,
    content
  }

  // Push new todo to array
  todos.push(newTodo)

  // Send newTodo to the client

  res.status(201).json({ status: 'success', data: { newTodo } })
}

const updateTodo = (req, res, next) => {
  const { id } = req.params
}