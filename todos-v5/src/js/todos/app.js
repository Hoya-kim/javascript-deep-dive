/* eslint-disable import/extensions */
import store from '../store/todos.js';
import render from './render.js';

const $toggleAll = document.querySelector('.toggle-all');
const $newTodo = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');
const $filters = document.querySelector('.filters');
const $clearCompleted = document.querySelector('.clear-completed');

// Event bindings
// initial rendering
window.addEventListener('DOMContentLoaded', () => {
  store.fetchTodos();
});

// toggle all todo completed
$toggleAll.onchange = e => {
  store.toggleAllTodos(e.target.checked);
};

// add todo
$newTodo.onkeyup = e => {
  if (e.key !== 'Enter') return;

  const content = e.target.value.trim();
  if (content !== '') store.addTodo(content);
  e.target.value = '';
};

// toggle todo completed
$todoList.onchange = e => {
  if (!e.target.classList.contains('toggle')) return;
  store.toggleTodo(e.target.closest('li').dataset.id);
};

// edit mode
$todoList.ondblclick = e => {
  if (!e.target.matches('.view > label')) return;
  e.target.closest('li').classList.add('editing');
};

// update todo content
$todoList.onkeyup = e => {
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;
  store.updateTodoContent(e.target.closest('li').dataset.id, e.target.value);
};

// remove todo
$todoList.onclick = e => {
  if (!e.target.classList.contains('destroy')) return;
  store.removeTodo(e.target.closest('li').dataset.id);
};

// filter todos
$filters.onclick = e => {
  if (!e.target.matches('.filters > li > a')) return;

  $filters.querySelectorAll('a').forEach($filter => {
    $filter.classList.toggle('selected', $filter === e.target);
  });

  store.setFilter(e.target.id);
};

// remove all completed todos
$clearCompleted.onclick = store.removeAllCompletedTodos;

// Observe : store => state changed => render
store.subscribe(render);
