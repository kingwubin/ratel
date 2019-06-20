function bindMethods(methods, obj) {
  methods.forEach((func) => {
    if (typeof obj[func] === 'function') {
      if (typeof obj === 'function') {
        // eslint-disable-next-line no-param-reassign
        obj[func] = obj[func].bind(obj);
      }
    }
  });
}
export default bindMethods;
