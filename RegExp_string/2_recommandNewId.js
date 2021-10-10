const solution = newId =>
  newId
    .toLowerCase()
    .replace(/[^\w-.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.|\.$/g, '')
    .replace(/^$/g, 'a')
    .slice(0, 15)
    .replace(/^\.|\.$/g, '')
    .replace(/^.{1,2}$/g, match => match + match[match.length - 1].repeat(3 - match.length));

console.log(solution('...!@BaT#*..y.abcdefghijklm')); // bat.y.abcdefghi
console.log(solution('z-+.^.')); // z--
console.log(solution('abcdefghijklmn.p')); // abcdefghijklmn
