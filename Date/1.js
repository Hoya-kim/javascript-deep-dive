// Date 객체를 ‘yyyy-mm-dd’ 형식의 문자열로 변환하기

/** @type { (date: Date) => string } */
const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
  return `${year}-${month}-${day}`;
};

console.log(formatDate(new Date('2021/07/24'))); // => "2021-07-24"
console.log(formatDate(new Date('1900/1/4'))); // => "1900-01-04"
