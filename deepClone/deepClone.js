function deepClone(target) {
  let clone = null;
  if (typeof target === 'object' && target !== null) {
    // Array or Object
    clone = target.constructor === Array ? [] : {};
    Object.keys(target).forEach(key => {
      clone[key] = deepClone(target[key]);
    });
  } else {
    // not object(primitive, function, null, ...)
    clone = target;
  }
  return clone;
}

export default deepClone;
