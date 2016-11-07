export default (fn, success, error) => {
  let promise = new Promise((resolve, reject) => {
    fn() ? resolve() : reject();
  });

  promise.then(success, error);

  return promise;
}