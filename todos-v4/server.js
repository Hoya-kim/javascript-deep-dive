const express = require('express');

const app = express();
const PORT = 3000;

// Mock data
const todos = [
  { id: 3, content: 'JavaScript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

app.use(express.static('public'));
app.use(express.json());

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
