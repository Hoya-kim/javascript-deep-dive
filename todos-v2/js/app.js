import Todo from './state.js';

// DOM nodes
const $newTodoInput = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');
const $todoCount = document.querySelector('.todo-count');

// rendering function
/**
 * @todo 렌더링 최적화 고민
 */
const render = todos =>
  todos
    .map(
      ({ id, content, completed }) => `
    <li data-id="${id}">
      <div class="view">
        <input type="checkbox" class="toggle" ${completed ? ' checked' : ''} />
        <label>${content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${content}" />
    </li>`,
    )
    .join('');

const renderAdded = ({ id, content, completed }) => {
  const $added = document.createElement('li');
  $added.setAttribute('data-id', id);
  $added.innerHTML = `
      <div class="view">
        <input type="checkbox" class="toggle" ${completed ? ' checked' : ''} />
        <label>${content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${content}" />
    `;

  $todoList.insertBefore($added, $todoList.firstChild);
};

const renderEdited = (id, content) => {
  const $edited = [...$todoList.children].filter(todo => todo.dataset.id === id)[0];
  $edited.firstElementChild.children[1].innerText = content;
  $edited.lastElementChild.setAttribute('value', content);
};

const updateCount = () => {
  $todoCount.innerText = `${Todo.getTodoCount()} item left`;
};

// helper
const init = () => {
  // render
  $todoList.innerHTML = render(Todo.getTodo());
  updateCount();
};

const updateTodo = $eventTarget => {
  $eventTarget.parentNode.classList.remove('editing');

  const { id } = $eventTarget.parentNode.dataset;
  const content = $eventTarget.value;
  if (!content) {
    $eventTarget.getAttribute('value') !== content && Todo.updateTodo(id, content);
    $eventTarget.setAttribute('value', content);
  }
  renderEdited(id, content);
};

// Add Event Handler
window.addEventListener('DOMContentLoaded', init);

// Add new todo
$newTodoInput.onkeypress = e => {
  // use keypress event because fo Hangul issue
  // then prevent repeat press
  if (e.repeat || e.key !== 'Enter') return;

  const content = e.target.value.trim();
  e.target.value = '';
  if (!content) return;

  // @todo async await
  const newTodo = Todo.addTodo(content);
  renderAdded(newTodo);
  updateCount();
};

// toggle todo
$todoList.onchange = e => {
  if (!e.target.classList.contains('toggle')) return;

  const $target = e.target.parentNode.parentNode;
  // @todo async await
  Todo.toggleTodo($target.dataset.id);
  e.target.setAttribute('checked', true);
};

// Remove todo
$todoList.onclick = e => {
  if (!e.target.classList.contains('destroy')) return;

  const $target = e.target.parentNode.parentNode;
  // @todo async await
  Todo.removeTodo($target.dataset.id);
  $todoList.removeChild($target);
  updateCount();
};

// Editing mode
$todoList.ondblclick = e => {
  if (!e.target.matches('.view > label')) return;

  const $todo = e.target.parentNode.parentNode;
  $todo.classList.add('editing');

  const $edit = $todo.lastElementChild;
  $edit.focus();
  // Focus on end of text
  $edit.selectionStart = $edit.value.length;

  // Blur event handler
  $todo.lastElementChild.onblur = e => {
    updateTodo(e.target);
    // Call once, remove event handler
    e.target.onblur = null;
  };
};

// End of edit todo event
$todoList.onkeypress = e => {
  if (!e.target.classList.contains('edit')) return;
  // use keypress event because fo Hangul issue
  // then prevent repeat press
  if (e.repeat || e.key !== 'Enter') return;

  updateTodo(e.target);
};
