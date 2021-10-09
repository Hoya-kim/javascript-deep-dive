// state
let todos = [];
let currentFilter = 'all';

// state function
const getTodos = () => todos;

const getFilter = () => currentFilter;

const setTodos = newTodos => {
  todos = newTodos;
  console.log('[TODOS]:', todos);
};

const setFilter = newFilter => {
  currentFilter = newFilter;
  console.log('[FILTER]: ', currentFilter);
};

const fetchTodos = () => {
  setTodos([
    { id: 3, content: 'JavaScript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ]);
};

const generateTodoId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  setTodos([{ id: generateTodoId(), content, completed: false }, ...todos]);
};

const toggleTodoCompleted = id => {
  setTodos(todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)));
};

const toggleAllTodosCompleted = completed => {
  setTodos(todos.map(todo => ({ ...todo, completed })));
};

const updateTodoContent = (id, content) => {
  setTodos(todos.map(todo => (todo.id === +id ? { ...todo, content } : todo)));
};

const removeTodo = id => {
  setTodos(todos.filter(todo => todo.id !== +id));
};

const removeAllCompletedTodos = () => {
  setTodos(todos.filter(todo => !todo.completed));
};

const Todo = {
  getTodos,
  getFilter,
  setFilter,
  fetchTodos,
  generateTodoId,
  addTodo,
  toggleTodoCompleted,
  toggleAllTodosCompleted,
  updateTodoContent,
  removeTodo,
  removeAllCompletedTodos,
};

export default Todo;
