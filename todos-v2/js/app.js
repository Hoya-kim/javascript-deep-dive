import Todo from './state.js';

// DOM nodes
const $newTodoInput = document.querySelector('.new-todo');
const $toggleAll = document.getElementById('toggle-all');
const $todoList = document.querySelector('.todo-list');
const $todoCount = document.querySelector('.todo-count');
const $anchorAll = document.getElementById('all');
const $anchorActive = document.getElementById('active');
const $anchorCompleted = document.getElementById('completed');
const $clearCompleted = document.querySelector('.clear-completed');

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

const renderSelected = selected => {
  const filtered =
    selected === 'active'
      ? Todo.getTodo().filter(todo => !todo.completed)
      : Todo.getTodo().filter(todo => todo.completed);
  return render(filtered);
};

const updateCount = () => {
  const count = $todoList.children.length;
  $todoCount.innerText = `${count} ${count > 1 ? 'items' : 'item'} left`;
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

$toggleAll.onchange = e => {
  const completed = e.target.checked;
  Todo.toggleAll(completed);

  [...$todoList.children].forEach(li => {
    if (completed) li.firstElementChild.firstElementChild.setAttribute('checked', 'checked');
    else li.firstElementChild.firstElementChild.removeAttribute('checked');
  });
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

$anchorAll.onclick = e => {
  e.target.classList.add('selected');
  $anchorActive.classList.remove('selected');
  $anchorCompleted.classList.remove('selected');

  $todoList.innerHTML = render(Todo.getTodo());
  updateCount();
};

$anchorActive.onclick = e => {
  e.target.classList.add('selected');
  $anchorAll.classList.remove('selected');
  $anchorCompleted.classList.remove('selected');

  $todoList.innerHTML = renderSelected('active');
  updateCount();
};

$anchorCompleted.onclick = e => {
  e.target.classList.add('selected');
  $anchorAll.classList.remove('selected');
  $anchorActive.classList.remove('selected');

  $todoList.innerHTML = renderSelected('completed');
  updateCount();
};

$clearCompleted.onclick = e => {
  const confirmed = confirm('완료항목을 삭제하시겠습니까?');
  if (!confirmed) return;

  Todo.getTodo().forEach(todo => {
    if (!todo.completed) return;
    Todo.removeTodo(todo.id);
  });

  const clickEvent = new MouseEvent('click');
  $anchorAll.dispatchEvent(clickEvent);
};
