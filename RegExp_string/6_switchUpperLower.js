const toggleCase = str =>
  str.replace(/./g, s => (s === s.toUpperCase() ? s.toLowerCase() : s.toUpperCase()));

console.log(toggleCase('StuDY')); // => 'sTUdy'
