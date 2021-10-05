// module 사용 - Best
// 응집도는 높이되, module내 함수들을 클로저로 반환함으로써 정보은닉을 보장

let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false },
];

const add = newTodo => {
  todos = [newTodo, ...todos];
};

const render = () =>
  todos
    .map(
      ({ id, content, completed }) => `
        <li id="${id}">
          <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
        </li>`,
    )
    .join('');

const Todos = { add, render };

export default Todos;
