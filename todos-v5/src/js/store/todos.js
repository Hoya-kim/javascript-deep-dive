// import ajax from '../utils/1.xhr.js';
// import ajax from '../utils/2.promise.js';
// import ajax from '../utils/3.fetch.js';
// import ajax from '../utils/4.axios.js';
import axios from 'axios';

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

const fetchTodos = async () => {
  try {
    const { data: todos } = await axios.get('/todos');
    store.todos = todos;
  } catch (e) {
    console.error(e);
  }
};

// @TODO: change to async/await
const toggleAllTodos = async completed => {
  // PATCH /todos { completed }
  try {
    const { data: todos } = await axios.patch('/todos', { completed });
    store.todos = todos;
  } catch (e) {
    console.error(e);
  }
};

const generateId = () => Math.max(...store.todos.map(todo => todo.id), 0) + 1;

const addTodo = async content => {
  // POST /todos { id: generateId(), content, completed: false }
  try {
    const { data: todos } = await axios.post('/todos', {
      id: generateId(),
      content,
      completed: false,
    });
    store.todos = todos;
  } catch (e) {
    console.error(e);
  }
};

const toggleTodo = async id => {
  const { completed } = store.todos.find(todo => todo.id === +id);

  // PATCH /todos/${id} { completed: !todo.completed }
  try {
    const { data: todos } = await axios.patch(`/todos/${id}`, { completed: !completed });
    store.todos = todos;
  } catch (e) {
    console.error(e);
  }
};

const updateTodoContent = async (id, content) => {
  // PATCH /todos/${id} { content }
  try {
    const { data: todos } = await axios.patch(`/todos/${id}`, { content });
    store.todos = todos;
  } catch (e) {
    console.error(e);
  }
};

const removeTodo = async id => {
  // DELETE /todos/${id}
  try {
    const { data: todos } = await axios.delete(`/todos/${id}`);
    store.todos = todos;
  } catch (e) {
    console.error(e);
  }
};

const removeAllCompletedTodos = async () => {
  // @TODO : DELETE /todos?completed=true
  // DELETE /todos/completed
  try {
    const { data: todos } = await axios.delete('/todos/completed');
    store.todos = todos;
  } catch (e) {
    console.error(e);
  }
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
