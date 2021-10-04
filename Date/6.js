// 6. 2개의 Date 객체가 같은 년도/월/날짜를 가리키는지 확인하기

/** @type { (date1: Date, date2: Date) => boolean } */
const isEqualDate = (date1, date2) =>
  Math.ceil(date1.getTime() / 3_600_000) === Math.ceil(date2.getTime() / 3_600_000);

console.log(isEqualDate(new Date('2021/07/24'), new Date('2021/07/24'))); // => true
console.log(isEqualDate(new Date('2021/07/24'), new Date('2022/07/2'))); // => false
