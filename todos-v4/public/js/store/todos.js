import { get } from '../utils/xhr.js';

const store = {
  state: {
    todos: [],
    currentFilter: 'all',
  },

  // observer
  listeners: [],
  notify() {
    console.log('[STATE]', this.state);
    this.listeners.forEach(listener => listener(this.state));
  },

  get todos() {
    return this.state.todos;
  },
  set todos(newTodos) {
    this.state.todos = newTodos;
    this.notify();
  },
  get currentFilter() {
    return this.state.currentFilter;
  },
  set currentFilter(newFilter) {
    this.state.currentFilter = newFilter;
    this.notify();
  },
};

// observer pattern
const subscribe = listener => {
  store.listeners.push(listener);
};

const fetchTodos = () => {
  get('/todos', todos => {
    store.todos = todos;
  });
};

const toggleAllTodos = completed => {
  store.todos = store.todos.map(todo => ({ ...todo, completed }));
};

const generateId = () => Math.max(...store.todos.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  store.todos = [{ id: generateId(), content, completed: false }, ...store.todos];
};

const toggleTodo = id => {
  store.todos = store.todos.map(todo =>
    todo.id === +id ? { ...todo, completed: !todo.completed } : todo,
  );
};

const updateTodoContent = (id, content) => {
  store.todos = store.todos.map(todo => (todo.id === +id ? { ...todo, content } : todo));
};

const removeTodo = id => {
  store.todos = store.todos.filter(todo => todo.id !== +id);
};

const removeAllCompletedTodos = () => {
  store.todos = store.todos.filter(todo => !todo.completed);
};

const setFilter = filter => {
  store.currentFilter = filter;
};

export default {
  subscribe,
  fetchTodos,
  toggleAllTodos,
  addTodo,
  toggleTodo,
  updateTodoContent,
  removeTodo,
  removeAllCompletedTodos,
  setFilter,
};
