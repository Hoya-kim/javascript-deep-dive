// state.js
let todos = [
  { id: 3, content: 'JavaScript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];
let newId = todos.length + 1; // init

const getTodo = () => todos;

const addTodo = content => {
  const newTodo = { id: newId, content, completed: false };
  todos = [newTodo, ...todos];
  newId += 1;
  return newTodo;
};

const toggleTodo = id => {
  todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
};

const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== +id);
};

const updateTodo = (id, content) => {
  todos = todos.map(todo => (todo.id === +id ? { ...todo, content } : todo));
};

const getTodoCount = () => todos.length;

const Todo = {
  getTodo,
  addTodo,
  toggleTodo,
  removeTodo,
  updateTodo,
  getTodoCount,
};

export default Todo;
