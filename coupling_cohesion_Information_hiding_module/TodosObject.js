// 1. 캡슐화를 통한 응집도 향상
// singleton 이기 때문에 namespace의 의미로 PascalCase 적용
// base.js보다 나아진 것
// - 응집도

// base.js보다 나빠진 것
// - 정보은닉이 되지 않음
const Todos = {
  state: [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
  ],
  render() {
    return this.state
      .map(
        ({ id, content, completed }) => `
        <li id="${id}">
          <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
        </li>`,
      )
      .join('');
  },
};

console.log(Todos.state);
/*
[
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false }
]
*/

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
