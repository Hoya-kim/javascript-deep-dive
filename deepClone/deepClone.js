function deepClone(target) {
  let clone;
  if (typeof target === 'object' && target !== null) {
    if (Array.isArray(target)) {
      // Array copy
      clone = [];
      target.forEach(el => {
        clone.push(deepClone(el));
      });
    } else {
      // object copy
      clone = {};
      for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
          clone[key] = deepClone(target[key]);
        }
      }
    }
  } else {
    // not object(primitive, function, null, ...)
    clone = target;
  }
  return clone;
}

export default deepClone;
