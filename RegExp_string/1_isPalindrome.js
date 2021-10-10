// 유효한 팰린드롬
// 영문자 숫자만 고려, 대소문자 무시, 회문 판별

/** @type { (str: string) => boolean } */
const isPalindrome = str => {
  const temp = str.toLowerCase().replace(/[^a-z0-9]/gi, '');
  return temp === [...temp].reverse().join('');
};

console.log(isPalindrome('A man, a plan, a canal: Panama')); // => true
console.log(isPalindrome('race a car')); // => false
