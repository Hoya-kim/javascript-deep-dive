import Todo from './state.js';

// DOM Nodes
const $newTodo = document.querySelector('.new-todo');
const $main = document.querySelector('.main');
const $toggleAll = document.querySelector('.toggle-all');
const $todoList = document.querySelector('.todo-list');
const $footer = document.querySelector('.footer');
const $todoCount = document.querySelector('.todo-count');
const $filters = document.querySelector('.filters');
const $clearCompleted = document.querySelector('.clear-completed');

const render = () => {
  const todos = Todo.getTodos();
  const currentFilter = Todo.getFilter();

  const _todos = todos.filter(todo =>
    currentFilter === 'completed'
      ? todo.completed
      : currentFilter === 'active'
      ? !todo.completed
      : true,
  );

  $todoList.innerHTML = _todos
    .map(
      ({ id, content, completed }) => `
    <li data-id="${id}">
      <div class="view">
        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''} />
        <label>${content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${content}" />
    </li>
  `,
    )
    .join('');

  [$main, $footer].forEach($el => $el.classList.toggle('hidden', todos.length === 0));

  const activeTodos = todos.filter(todo => !todo.completed);
  $todoCount.textContent = `${activeTodos.length} ${
    activeTodos.length > 1 ? 'items' : 'item'
  } left`;

  const completedTodos = todos.filter(todo => todo.completed);
  $clearCompleted.classList.toggle('hidden', completedTodos.length === 0);
};

// Event bindings
window.addEventListener('DOMContentLoaded', () => {
  Todo.fetchTodos();
  render();
});

$newTodo.onkeyup = e => {
  if (e.key !== 'Enter') return;
  const content = $newTodo.value.trim();
  if (content) Todo.addTodo(content);
  $newTodo.value = '';
  render();
};

$todoList.onchange = e => {
  if (!e.target.classList.contains('toggle')) return;
  Todo.toggleTodoCompleted(e.target.closest('li').dataset.id);
  render();
};

$toggleAll.onchange = e => {
  Todo.toggleAllTodosCompleted($toggleAll.checked);
  render();
};

$todoList.ondblclick = e => {
  if (!e.target.matches('.view > label')) return;
  e.target.closest('li').classList.add('editing');
};

$todoList.onkeyup = e => {
  if (e.key !== 'Enter') return;
  Todo.updateTodoContent(e.target.parentNode.dataset.id, e.target.value);
  render();
};

$todoList.onclick = e => {
  if (!e.target.classList.contains('destroy')) return;
  Todo.removeTodo(e.target.closest('li').dataset.id);
  render();
};

$filters.onclick = e => {
  if (!e.target.matches('.filters > li > a')) return;

  [...$filters.querySelectorAll('a')].forEach($a => {
    $a.classList.toggle('selected', $a === e.target);
  });

  Todo.setFilter(e.target.id);
  render();
};

$clearCompleted.onclick = e => {
  Todo.removeAllCompletedTodos();
  render();
};
