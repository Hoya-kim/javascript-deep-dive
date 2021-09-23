function deepClone(target) {
  // Not object(primitive, function, null, ...)
  if (typeof target !== 'object' || target === null) return target;

  // Array or Object
  const clone = target.constructor === Array ? [] : {};
  Object.keys(target).forEach(key => {
    clone[key] = deepClone(target[key]);
  });
  return clone;
}

export default deepClone;
