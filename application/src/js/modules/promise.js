export default (fn, success, error) => {
  let promise = new Promise((resolve, reject) => {
    if ( !fn ) { reject(); return false; }
    fn() ? resolve() : reject();
  });

  let _error = error ? error : () => {
    console.log(`Promise error`);
  }

  promise.then(success, error);
}