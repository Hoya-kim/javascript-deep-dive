# deepClone.js & isEqual.js

## 요구사항

- 원시 타입, 객체 타입에 관계없이 deep copy와 값의 비교를 할 수 있도록 구현
- 2 depth 이상의 객체를 deep copy하거나 값을 비교하기 위해 재귀를 사용

## 구현

### How to test (with jest)

```bash
$ npm test
```

### 좋은 코드에 대한 고민

- 변수의 사용을 최소로 한다
- 최대한 가독성이 좋게 구현한다
- 코드의 실행 컨트롤이 자주 바뀌지 않도록 노력한다

### 의문점

- 하나의 함수에 return(반환문)이 하나가 있는게 코드 문맥상 좋다고 배움
  - isEqual을 구현하는 가운데, 모든 조건을 체크할 변수(Boolean type)를 선언하고, 조건에 따라 변수를 재할당하는 것 보다, 그때 그때 조건에 return을 바로 해주는게 가독성 측면에서 더 좋다고 판단함.
  - 무엇이 옳은지 잘 모르겠음.

### Result

```bash
 PASS  deepClone/isEqual.test.js
 PASS  deepClone/deepClone.test.js
--------------|---------|----------|---------|---------|-------------------
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------|---------|----------|---------|---------|-------------------
All files     |     100 |      100 |     100 |     100 |
 deepClone.js |     100 |      100 |     100 |     100 |
 isEqual.js   |     100 |      100 |     100 |     100 |
--------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        3.118 s
Ran all test suites.
```
