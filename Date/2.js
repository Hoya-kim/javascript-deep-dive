// 특정 달의 말일 구하기

/** @type { (year: number, month: number) => number } */
const getLastDateOfMonth = (year, month) =>
  month === 11 ? new Date(year + 1, 0, 0).getDate() : new Date(year, month + 1, 0).getDate();

// 2021년 1월의 마지막 날은 31일
console.log(getLastDateOfMonth(2021, 0)); // => 31

// 2021년 2월의 마지막 날은 28일
console.log(getLastDateOfMonth(2021, 1)); // => 28
