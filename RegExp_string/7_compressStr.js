// https://regexr.com/
const compress = str => str.replace(/(.)\1+/g, match => match[0] + match.length);

// const compress2 = str => str.replace(/(.)\1*/g, match => match[0] + match.length);

console.log(compress('ABBCCCE')); // => AB2C3E
