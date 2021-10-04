// 5. 두 날짜 사이의 일수 구하기

/** @type { (date1: Date, date2: Date) => number } */
const diffDays = (date1, date2) =>
  Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / 86_400_000);

console.log(diffDays(new Date('2021/01/01'), new Date('2021/12/31'))); // => 364
