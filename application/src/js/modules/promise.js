export default (fn, data, self) => {
  return new Promise((resolve, reject) => {
    resolve(fn.call(self, data || {}));
  });
}