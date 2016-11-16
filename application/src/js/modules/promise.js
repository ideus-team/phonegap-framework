export default (fn) => {
  return new Promise((resolve, reject) => {
    resolve(fn());
  });
}