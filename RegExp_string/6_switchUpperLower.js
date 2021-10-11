// const toggleCase = str =>
//   str.replace(/./g, s => (s === s.toUpperCase() ? s.toLowerCase() : s.toUpperCase()));

const toggleCase = str =>
  str.replace(/([a-z]+)|([A-Z]+)/g, (_, lowerCase, upperCase) =>
    lowerCase ? lowerCase.toUpperCase() : upperCase.toLowerCase(),
  );

console.log(toggleCase('StuDY')); // => 'sTUdy'
