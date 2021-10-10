// 3. A를 #으로

/** @type { (word: string) => string } */
const replaceAtoSharp = word => word.replace(/A/g, '#');
// replaceAll은 최신문법
// const replaceAtoSharp = word => word.replaceAll('A', '#');

console.log(replaceAtoSharp('BANANA')); // => B#N#N#
