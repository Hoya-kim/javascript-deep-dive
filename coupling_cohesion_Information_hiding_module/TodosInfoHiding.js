// 2. 클로저를 통한 정보은닉
const Todos = (() => {
  let todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
  ];

  return {
    add(newTodo) {
      // push 안 쓴 이유, 이 경우엔 크게 상관없지만
      // accessor 방식으로 통일하기 위함
      todos = [newTodo, ...todos];
    },
    render() {
      return todos
        .map(
          ({ id, content, completed }) => `
        <li id="${id}">
          <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
        </li>`,
        )
        .join('');
    },
  };
})();

console.log(Todos.render());
/*
<li id="3">
  <label><input type="checkbox">HTML</label>
</li>
<li id="2">
  <label><input type="checkbox" checked>CSS</label>
</li>
<li id="1">
  <label><input type="checkbox">Javascript</label>
</li>
*/
