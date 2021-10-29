const express = require('express');

const app = express();
const PORT = 3000;

// Mock data
let todos = [
  { id: 3, content: 'JavaScript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

app.use(express.static('public'));
app.use(express.json());

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos = [newTodo, ...todos];

  res.send(todos);
});

// PATCH /todos {completed}}
app.patch('/todos', (req, res) => {
  const { completed } = req.body;
  todos = todos.map(todo => ({ ...todo, completed }));

  res.send(todos);
});

// PATCH /todos/:id {completed} or {content}
app.patch('/todos/:id', (req, res) => {
  // :id is parameter
  const { id } = req.params;
  const payload = req.body;

  todos = todos.map(todo => (todo.id === +id ? { ...todo, ...payload } : todo));

  res.send(todos);
});

// DELETE /todos/:id
app.delete('/todos/:id([0-9]+)', (req, res) => {
  // :id is parameter
  const { id } = req.params;

  todos = todos.filter(todo => todo.id !== +id);

  res.send(todos);
});

// DELETE /todos/completed
app.delete('/todos/completed', (req, res) => {
  todos = todos.filter(todo => !todo.completed);
  res.send(todos);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
