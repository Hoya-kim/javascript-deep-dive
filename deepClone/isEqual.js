function isEqual(arg1, arg2) {
  if (arguments.length < 2) {
    throw new Error(
      `isEqual requires at least 2 argument, but only ${arguments.length} were passed`,
    );
  }

  // type check
  if (typeof arg1 !== typeof arg2) return false;
  // primitive, null
  if (typeof arg1 !== 'object' || arg1 === null) return Object.is(arg1, arg2);

  // object
  if (arg1.constructor !== arg2.constructor) return false;
  // Function, Date, RegExp, Set, Map, ...
  if (arg1.constructor !== Array && arg1.constructor !== Object) return arg1 === arg2;
  // Object, Array / recursive
  const keys = Object.keys(arg1);
  if (keys.length !== Object.keys(arg2).length) return false;

  for (const key of keys) {
    if (!isEqual(arg1[key], arg2[key])) return false;
  }
  return true;
}

export default isEqual;
