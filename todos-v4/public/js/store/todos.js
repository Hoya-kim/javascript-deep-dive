// import ajax from '../utils/1.xhr.js';
// import ajax from '../utils/2.promise.js';
// import ajax from '../utils/3.fetch.js';
import ajax from '../utils/4.axios.js';

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
  // ajax
  //   .get('/todos')
  //   .then(todos => {
  //     store.todos = todos;
  //   })
  //   .catch(console.error);
  try {
    store.todos = await ajax.get('/todos');
  } catch (e) {
    console.error(e);
  }
};

// @TODO: change to async/await
const toggleAllTodos = completed => {
  // PATCH /todos { completed }
  ajax
    .patch('/todos', { completed })
    .then(todos => {
      store.todos = todos;
    })
    .catch(console.error);
};

const generateId = () => Math.max(...store.todos.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  // POST /todos { id: generateId(), content, completed: false }
  ajax
    .post('/todos', { id: generateId(), content, completed: false })
    .then(todos => {
      store.todos = todos;
    })
    .catch(console.error);
};

const toggleTodo = id => {
  const { completed } = store.todos.find(todo => todo.id === +id);

  // PATCH /todos/${id} { completed: !todo.completed }
  ajax
    .patch(`/todos/${id}`, { completed: !completed })
    .then(todos => {
      store.todos = todos;
    })
    .catch(console.error);
};

const updateTodoContent = (id, content) => {
  // PATCH /todos/${id} { content }
  ajax
    .patch(`/todos/${id}`, { content })
    .then(todos => {
      store.todos = todos;
    })
    .catch(console.error);
};

const removeTodo = id => {
  // DELETE /todos/${id}
  ajax
    .delete(`/todos/${id}`)
    .then(todos => {
      store.todos = todos;
    })
    .catch(console.error);
};

const removeAllCompletedTodos = () => {
  // @TODO : DELETE /todos?completed=true
  // DELETE /todos/completed
  ajax
    .delete('/todos/completed')
    .then(todos => {
      store.todos = todos;
    })
    .catch(console.error);
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
